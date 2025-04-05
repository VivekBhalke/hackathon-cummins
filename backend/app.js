import express from 'express';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";
import cors from "cors"
import bodyParser from 'body-parser';
const router = express.Router();
import logsRoutes from "./routes/logsRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/logs" , logsRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});