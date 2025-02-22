import userModel from "@/models/user";
import { throwError, throwRouteError } from "@/utils/api/errors";
import {
  send404Response,
  sendValidationErrorResponse,
} from "@/utils/api/responses";
import { loginSchema } from "@/validation/user";

export default async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        let payload = null;
        try {
          payload = loginSchema.parse(req.body);
        } catch (error) {
          sendValidationErrorResponse(res, error);
        }

        const user = await userModel.findOne({
          $or: [
            { email: payload.identifier },
            { username: payload.identifier },
          ],
          password: payload.password,
        });
        if (!user) {
          return throwError("User not found");
        }
        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          data: user,
        });
      default:
        throwRouteError(req.url, req.method);
    }
  } catch (error) {
    send404Response(res, error);
  }
};
