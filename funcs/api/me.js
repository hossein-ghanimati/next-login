import usersModel from "@/models/user";
import { verifyToken } from "@/utils/api/auth";
// import { verifyToken } from "@/utils/api/auth";
import { throwError } from "@/utils/api/errors";
export const findUser = async ({ _id, tokenVersion }) => {
  console.log(_id, tokenVersion);
  const user = await usersModel.findOne(
    {
      _id,
      tokenVersion,
    },
    "-tokenVersion -password -v -_id"
  );
  if (!user) {
    throwError("User not found");
  }
  return user;
};

export const findUserByToken = async (token) => {
  const payload = verifyToken(token);
  if (!payload) {
    console.log("no payload")
    throwError("Invalid token");
  }
  const user = await findUser(payload);
  return user;
};

export const sendUser = async (res, user) => {
  res.status(200).json({
    success: true,
    message: "User getted successfully",
    data: user,
  });
};
