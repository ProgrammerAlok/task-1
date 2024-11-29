import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import Payment from "../models/payment.model";
import { JwtPayload } from "jsonwebtoken";

const createAccount = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    return res.status(201).json({ user_id: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Error creating account" });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password!)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // @ts-ignore
    const token = user.generateToken();

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in" });
  }
};

const processPayment = async (
  req: Request & { user: JwtPayload },
  res: Response
): Promise<any> => {
  const { app_id, amount } = req.body;

  if (!amount || !app_id) {
    return res.status(400).json({ message: "Amount and app_id required" });
  }

  const payment = await Payment.create({
    app_id,
    amount: parseFloat(amount),
    user: req.user?._id,
  });

  return res.status(200).json({
    message: "Payment processed",
    app_id,
    confirmation_id: payment._id,
    amount,
  });
};

const paymentDetails = async (
  req: Request & { user: JwtPayload },
  res: Response
): Promise<any> => {
  const { app_id } = req.query;

  const response = await Payment.findOne({ app_id, user: req.user?._id });

  return res.status(200).json(response);
};

export { createAccount, login, processPayment, paymentDetails };
