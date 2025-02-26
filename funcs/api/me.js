import usersModel from "@/models/user";
import { throwError } from "@/utils/api/errors";

export const findUser = async ({_id, tokenVersion}) => {
  const user = await usersModel.findOne({
    _id,
    tokenVersion
  });
  if (!user) {
    throwError("User not found");
  }
  return user;
};

export const sendUser = async (res, user) => {
  res.status(200).json({
    success: true,
    message: "User getted successfully",
    data: user,
  });
};