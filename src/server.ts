
import express from "express";
import identifyRoutes from "./routes/identifyRoutes";

const app=express();

app.use(express.json());

app.use("/",identifyRoutes);

app.listen(3000,()=>{
 console.log("Server running on port 3000");
});
