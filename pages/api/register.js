import userModel from "@/models/user";
import { throwRouteError } from "@/utils/api/errors";
import { send404Response, sendValidationErrorResponse } from "@/utils/api/responses";
import { userSchema } from "@/validation/user";
import {connectToDB} from "@/configs/db";
await connectToDB();

export default async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        let payload = null;
        try {
          payload = userSchema.parse(req.body);          
        } catch (error) {
          sendValidationErrorResponse(res, error);
        }
        const newUser = await userModel.create(payload);
          return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
          });
      default:
        throwRouteError(req.url, req.method);
    }
  } catch (error) {
    send404Response(res, error)
  }
};
