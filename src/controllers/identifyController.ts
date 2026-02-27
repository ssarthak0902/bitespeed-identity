import { Request, Response } from "express";
import { identifyContact } from "../services/identifyService";

export const identify = async (
 req: Request,
 res: Response
) => {

 const { email, phoneNumber } = req.body;

 const result =
 await identifyContact(
  email,
  phoneNumber
 );

 res.json({
  contact: result
 });

};