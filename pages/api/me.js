import { connectToDB } from "@/configs/db";

import {  findUserByToken, sendUser } from "@/funcs/api/me";

import {  throwRouteError } from "@/utils/api/errors";
import { send404Response } from "@/utils/api/responses";

await connectToDB();

export const getUser = async (res, token) => {  
  const user = await findUserByToken(token)

  sendUser(res, user);
};

export default async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        await getUser(res, req.cookies.token);
        break;

      default:
        throwRouteError(req.url, req.method);
        break;
    }
  } catch (error) {
    
    send404Response(res, error);
  }
};
