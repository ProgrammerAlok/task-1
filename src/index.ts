import express from "express";
import dbConnect from "./config/dbConnect";
import { config } from "dotenv";
import {
  createAccount,
  login,
  paymentDetails,
  processPayment,
} from "./controllers";
import { authMiddleware } from "./middleware";

const app = express();
config();

const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create_account", createAccount);

app.post("/login", login);

// @ts-ignore
app.post("/process_payment", authMiddleware, processPayment);

// @ts-ignore
app.get("/payment_details", authMiddleware, paymentDetails);

app.listen(port, async () => {
  await dbConnect();
  console.info(`Server running at http://localhost:${port}`);
});
