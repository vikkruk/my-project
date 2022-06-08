import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';
import UserModel from '../models/user-model';

export const register: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    const hashedPassword = bcrypt.hashSync(password, 5);
    const createdUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    if (process.env.REACT_APP_TOKEN_SECRET === undefined) throw new Error('Set environment variables');
    const token = jwt.sign({ email, role: createdUser.role }, process.env.REACT_APP_TOKEN_SECRET);
    res.status(201).json({
      user: createdUser,
      token,
    });
  } catch (error) {
    let errorMessage;
    if (error instanceof Error.ValidationError) {
      if (error.errors.email) {
        errorMessage = 'This email is already taken';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Server error';
    }
    res.status(400).json({
      error: errorMessage,
    });
  }
};

export default register;
