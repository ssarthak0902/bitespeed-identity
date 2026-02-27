import { prisma } from "../config/prisma";


export const findMatchingContacts = (
 email?:string,
 phoneNumber?:string
)=>{

 return prisma.contact.findMany({

  where:{
   OR:[
    {email:email || undefined},
    {phoneNumber:phoneNumber || undefined}
   ]
  }

 });

};



export const createPrimaryContact=(

 email:string|null,
 phoneNumber:string|null

)=>{

 return prisma.contact.create({

  data:{
   email,
   phoneNumber,
   linkPrecedence:"primary"
  }

 });

};



export const createSecondaryContact=(

 email:string|null,
 phoneNumber:string|null,
 primaryId:number

)=>{

 return prisma.contact.create({

  data:{
   email,
   phoneNumber,
   linkedId:primaryId,
   linkPrecedence:"secondary"
  }

 });

};



export const getLinkedContacts=(primaryId:number)=>{

 return prisma.contact.findMany({

  where:{
   OR:[
    {id:primaryId},
    {linkedId:primaryId}
   ]
  }

 });

};



export const convertToSecondary=(

 id:number,
 primaryId:number

)=>{

 return prisma.contact.update({

  where:{id},

  data:{
   linkedId:primaryId,
   linkPrecedence:"secondary"
  }

 });

};