import { findUserByToken } from "@/funcs/api/me";
import { throwError } from "@/utils/api/errors";

export const getServerSideProps = async ({ req }) => {
  try {
    const cookie = req.cookies?.token;
    const user = JSON.parse(JSON.stringify(await findUserByToken(cookie)));

    if (!!user?.role === false) throwError("Invalid Role");

    return user?.role === "ADMIN"
      ? {
          props: {
            user,
          },
        }
      : {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
  } catch (error) {
    console.log(error.message);
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
};

function PAdmin({ user }) {
  return (
    <h1>
      {user?.fname} {user?.lname} -Welcome To Admin Panel ❤️
    </h1>
  );
}

export default PAdmin;
