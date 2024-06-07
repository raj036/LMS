import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Text, Heading, Input } from "../../components";
import { Link } from "react-router-dom";
import { useLogin } from "hooks/useLogin";
import Header from "components/Header";
import Footer from "components/Footer";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    user_password: "",
  });

  const { login, isLoading, error } = useLogin();

  const handleChange = (fieldName: any, value: any) => {
    setLoginData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    await login(loginData.email, loginData.user_password);
  };

  return (
    <>
      <Helmet>
        <title>ILATE Login</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      <div className="flex flex-row justify-end w-full h-full px-[40px] py-16 bg-white-A700">
        <div className="flex flex-row justify-between items-start w-full my-[75px] mx-auto max-w-[1350px]">
          <div className="flex flex-col items-center justify-start w-[70%] p-5 border rounded-lg border-teal-900 bg-teal-900/5">
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-2 items-center justify-start w-full"
            >
              <div className="flex flex-col gap-2 items-start justify-start w-full h-full">
                <Heading
                  size="7xl"
                  as="h1"
                  className="!text-black-900 !font-inter"
                >
                  Login now
                </Heading>

                <Text
                  size="xl"
                  as="p"
                  className="mt-[18px] !text-black-900 !font-inter"
                >
                  Hi, Welcome to ILATE 👋{" "}
                </Text>
                {/* <Button
                  color="teal_900"
                  size="lg"
                  leftIcon={
                    <Img
                      src="images/img_flatcoloriconsgoogle.svg"
                      alt="flat-color-icons:google"
                    />
                  }
                  className="w-full mt-[46px] gap-3 font-inter font-semibold rounded-[5px]"
                >
                  Login with Google
                </Button>
                <div className="flex flex-row justify-center items-center w-full mt-[35px] gap-[20px]">
                  <div className="h-px w-[42%] bg-black-900_3f" />
                  <Text
                    size="md"
                    as="p"
                    className="!text-black-900_3f !font-inter w-48"
                  >
                    Or Login with Email
                  </Text>
                  <div className="h-px w-[42%] bg-black-900_3f" />
                </div> */}
                <Heading
                  size="lg"
                  as="h2"
                  className="mt-5 !text-black-900 !font-inter !font-semibold"
                >
                  Email
                </Heading>
                <Input
                  color="teal_900"
                  size="xs"
                  variant="fill"
                  type="email"
                  name="email"
                  required
                  onChange={(value: any) => handleChange("email", value)}
                  placeholder="Enter your email id"
                  className="w-full mt-[18px] font-inter rounded-[5px]"
                />
                <Heading
                  size="lg"
                  as="h3"
                  className="mt-[19px] !text-black-900 !font-inter !font-semibold"
                >
                  Password
                </Heading>
                <Input
                  color="teal_900"
                  size="xs"
                  variant="fill"
                  type="password"
                  required
                  name="user_password"
                  autoComplete="on"
                  onChange={(value: any) =>
                    handleChange("user_password", value)
                  }
                  placeholder="Enter your password"
                  // suffix={
                  //   <Img
                  //     src="images/img_basileyeclosedsolid.svg"
                  //     alt="basil:eye-closed-solid"
                  //   />
                  // }
                  className="w-full mt-3.5 gap-[35px] font-inter rounded-[5px]"
                />
                {/* <div className="flex flex-row justify-between items-start w-full mt-[7px]">
                  <div className="flex flex-row justify-center w-1/4">
                    <div className="flex flex-row items-start justify-start w-full">
                      <Text
                        size="md"
                        as="p"
                        className="!text-black-900 !font-inter z-[1] mr-1"
                      >
                        Remember Me
                      </Text>
                      <input
                        type="checkbox"
                        className="border border-teal-900 m-0 p-0"
                      />
                    </div>
                  </div>
                  <a href="#">
                    <Heading
                      size="s"
                      as="h4"
                      className="!text-indigo-500 !font-inter"
                    >
                      Forgot Password?
                    </Heading>
                  </a>
                </div> */}
              </div>
              <Button
                color="teal_900"
                disabled={isLoading}
                size="md"
                className="mt-[40px] font-inter font-medium text-base rounded-[5px] border border-teal-900 hover:bg-white-A700 hover:text-teal-900"
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Log In</span>
                )}
              </Button>
            </form>
            <Text
              size="md"
              as="p"
              className="!text-black-900 !font-inter mt-2.5"
            >
              <span className="text-black-900">
                Not registered yet?
                <Link
                  to="/signup"
                  className="text-black-900 hover:underline inline mx-1"
                >
                  SignUp
                </Link>
              </span>
            </Text>
            {error && (
              <>
                <div className="mt-3 p-2 bg-red-100 text-red-500 rounded border border-red-500 m-y2 mx-0">
                  {error.toString()}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-end justify-start mt-[21px] gap-[81px]">
            {/* <Button
              color="teal_900"
              size="sm"
              className="mr-[29px] !text-gray-100 font-inter font-bold min-w-[167px] rounded-[5px]"
            >
              Sign Up
            </Button> */}
            <Img
              src="images/img_reshot_illustra.png"
              alt="reshotillustra"
              className="w-[80%] p-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
