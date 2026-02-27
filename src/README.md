# Bitespeed Identity Reconciliation API

## Live API Endpoint

POST https://bitespeed-identity-2cbm.onrender.com/identify

## Example Request

{
 "email": "test@gmail.com",
 "phoneNumber": "999999"
}

## Example Response

{
 "contact":{
  "primaryContactId":1,
  "emails":["test@gmail.com"],
  "phoneNumbers":["999999"],
  "secondaryContactIds":[]
 }
}

## Tech Stack

Node.js  
TypeScript  
Express  
Prisma  
PostgreSQL  
Render

## GitHub Repository

https://github.com/ssarthak0902/bitespeed-identity