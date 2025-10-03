"use client";

import { loginUser } from "@/app/actions/loginUser";
import GoogleAuthWrapper from "@/components/common/Login/GoogleAuthWrapper";
import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import Container from "@/components/shared/Ui/Container";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/reducers/authSlice";
import { storeUserInfo } from "@/services/auth.services";
import { decodedToken } from "@/utils/jwt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string().email("Enter email"),
  password: z.string().min(1, "Enter password"),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await loginUser(values);

      if (res.success) {
        const accessToken = res.data.accessToken;

        const user = decodedToken(accessToken);
        storeUserInfo({ accessToken });

        dispatch(setUser({ user }));

        toast.success(res.message);

        setIsLoading(false);
        router.push("/");
      } else {
        toast.error(res.message || "Something went wrong!");

        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-background text-foreground">
      <Container className="max-w-md">
        <div className="flex flex-col justify-center space-y-6 shadow-cardLightShadow dark:shadow-cardDarkShadow rounded-md p-6 md:p-8 bg-white dark:bg-gray-900">
          {/* Title & Subtitle */}
          <div className="space-y-2 text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Login
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <MYForm
            onSubmit={handleLogin}
            schema={userLoginSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div className="grid gap-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>

                  <MYInput
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                  />
                </div>

                {/* Password */}
                <div className="grid gap-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <MYInput
                    name="password"
                    type="password"
                    placeholder="Enter your password"
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
                    "Sign In"
                  )}
                </Button>
              </div>
            </div>
          </MYForm>

          {/* Google Auth */}
          <GoogleAuthWrapper />

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
