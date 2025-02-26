import { sendValidationErrorResponse } from "@/utils/api/responses";
import { userSchema } from "@/validation/user";

export const validateRegister = (res, payload) => {
  try {
    return (payload = userSchema.parse(payload));
  } catch (error) {
    sendValidationErrorResponse(res, error);
  }
};

export const sendNewUserToken = (res, token) =>
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: token,
  });
