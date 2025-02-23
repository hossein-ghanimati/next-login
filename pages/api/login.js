import userModel from "@/models/user";
import { comparePassword } from "@/utils/api/auth";
import { throwError, throwRouteError } from "@/utils/api/errors";
import {
  send404Response,
  sendUnauthResponse,
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
        });
        if (!user) {
          return throwError("User not found");
        }
        try {
          const isPasswordValid = comparePassword(
            payload.password,
            user.password
          );
          if (!isPasswordValid) {
            throwError("Invalid password");
          }
        } catch (error) {
          sendUnauthResponse(res, error);
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
