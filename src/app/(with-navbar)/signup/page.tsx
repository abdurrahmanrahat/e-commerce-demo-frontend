"use client";

import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import Container from "@/components/shared/Ui/Container";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/reducers/authSlice";
import { loginUser } from "@/services/actions/loginUser";
import { registerUser } from "@/services/actions/registerUser";
import { storeUserInfo } from "@/services/auth.services";
import { decodedToken } from "@/utils/jwt";
import axios from "axios";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userSignUpSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Enter valid email"),
  password: z.string().min(1, "Enter your password"),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSignUp = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await registerUser(values);

      if (res.success) {
        // auto login after user register
        const userRes = await loginUser({
          email: values.email,
          password: values.password,
        });

        if (userRes.success) {
          const accessToken = userRes.data.accessToken;
          const refreshToken = userRes.data.refreshToken;
          const user = decodedToken(accessToken);

          dispatch(setUser({ user, accessToken, refreshToken }));

          storeUserInfo({ accessToken: userRes.data.accessToken });
          // 🎯 Set HttpOnly cookie from client via API
          await axios.post("/api/auth/set-cookies", {
            accessToken,
            refreshToken,
          });

          toast.success(userRes.message);

          setIsLoading(false);
          router.push("/");
        }
      } else {
        toast.error(res.message || "Something went wrong!");

        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Container className="max-w-md">
        <div className="flex flex-col justify-center space-y-6 shadow-cardLightShadow dark:shadow-cardDarkShadow rounded-md p-6 md:p-8 bg-white dark:bg-gray-900">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Brand Name</span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create an account
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your details to sign up for an account
            </p>
          </div>

          {/* Form */}
          <MYForm
            onSubmit={handleSignUp}
            schema={userSignUpSchema}
            defaultValues={{
              name: "",
              email: "",
              password: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="grid gap-1">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <MYInput
                    name="name"
                    placeholder="Enter your full name"
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {/* Email */}
                <div className="grid gap-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <MYInput
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {/* Password */}
                <div className="grid gap-1">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <MYInput
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-2 w-full">
                <Button className="h-11 cursor-pointer w-full" type="submit">
                  {isLoading ? (
                    <span className="flex gap-2">
                      <LoaderSpinner /> <span>Signing...</span>
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </div>
          </MYForm>

          {/* Footer link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/90">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
