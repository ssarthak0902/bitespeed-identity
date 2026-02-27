export const getOldestPrimary=(contacts:any[])=>{

 return contacts

 .filter(
  c=>c.linkPrecedence==="primary"
 )

 .sort(
  (a,b)=>
  a.createdAt.getTime() -
  b.createdAt.getTime()
 )[0];

};



export const uniqueValues=(arr:any[])=>{

 return [...new Set(arr)];

};