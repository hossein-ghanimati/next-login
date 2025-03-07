import usersModel from "@/models/user";
import { comparePassword } from "@/utils/api/auth";
import { throwError } from "@/utils/api/errors";
import {
  sendUnauthResponse,
  sendValidationErrorResponse,
} from "@/utils/api/responses";
import { loginSchema } from "@/validation/user";
import { NextResponse } from "next/server";

export const validateLogin = (res, payload) => {
  try {
    payload = loginSchema.parse(payload);
    return payload;
  } catch (error) {
    sendValidationErrorResponse(res, error);
  }
};

export const findUser = async (payload) => {
  const user = await usersModel.findOne({
    $or: [{ email: payload.identifier }, { username: payload.identifier }],
  });
  if (!user) {
    throwError("User not found");
  }
  return user;
};

export const validateUserPass = (res, payloadPassword, userPassword) => {
  try {
    const isPasswordValid = comparePassword(payloadPassword, userPassword);
    if (!isPasswordValid) {
      throwError("Invalid password");
    }
  } catch (error) {
    sendUnauthResponse(res, error);
  }
};

export const sendUserToken = (req, res,  token, redirect) => {
  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=604800`)
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });

  const url = `${req.headers.origin}${redirect}`
  console.log(url);
  return NextResponse.redirect(new URL(url), 302);
}


