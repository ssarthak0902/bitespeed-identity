import * as repo from "../repositories/contactRepository";
import { getOldestPrimary, uniqueValues } from "../utils/contactUtils";

export const identifyContact = async (
  email?: string,
  phoneNumber?: string
) => {

  // Step 1: Find matching contacts
  const matches = await repo.findMatchingContacts(
    email,
    phoneNumber
  );


  // Step 2: No matches → create primary
  if (matches.length === 0) {

    const primary = await repo.createPrimaryContact(
      email ?? null,
      phoneNumber ?? null
    );

    return {

      primaryContactId: primary.id,

      emails: email ? [email] : [],

      phoneNumbers: phoneNumber ? [phoneNumber] : [],

      secondaryContactIds: []

    };

  }


  // Step 3: Find primary contact

  const primaries = matches.filter(
    c => c.linkPrecedence === "primary"
  );


  let primary = primaries.sort(
    (a,b)=>
    a.createdAt.getTime() -
    b.createdAt.getTime()
  )[0];


  // Step 4: Merge primaries if needed

  for(const p of primaries){

    if(p.id !== primary.id){

      await repo.convertToSecondary(
        p.id,
        primary.id
      );

    }

  }


  // Step 5: Check if new info exists

  const emailExists =
    matches.some(
      c=>c.email === email
    );

  const phoneExists =
    matches.some(
      c=>c.phoneNumber === phoneNumber
    );


  if(!emailExists || !phoneExists){

    await repo.createSecondaryContact(

      email ?? null,

      phoneNumber ?? null,

      primary.id

    );

  }


  // Step 6: Fetch full contact group

  const contacts =
    await repo.getLinkedContacts(
      primary.id
    );


  const emails = uniqueValues(

    contacts
    .map(c=>c.email)
    .filter(Boolean)

  );


  const phones = uniqueValues(

    contacts
    .map(c=>c.phoneNumber)
    .filter(Boolean)

  );


  const secondaryIds = contacts

    .filter(
      c=>c.linkPrecedence==="secondary"
    )

    .map(c=>c.id);


  return{

    primaryContactId: primary.id,

    emails,

    phoneNumbers: phones,

    secondaryContactIds: secondaryIds

  };

};