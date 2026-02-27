import express from "express";
import identifyRoutes from "./routes/identifyRoutes";

const app = express();

app.use(express.json());

app.use("/", identifyRoutes);

// Important for Render deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});