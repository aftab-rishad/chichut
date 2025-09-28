"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Loader from "@/components/common/LoadingBtn";
import { ErrorIcon } from "@/components/common/Svg";
import { useState } from "react";
import sendOtp from "@/graphql/mutation/sendOtp";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setLoading(true);
    setError({ status: false, message: "" });

    try {
      const data = await sendOtp(formData);
      if (data?.sendOtp) {
        router.push(`/register/verify/${data?.sendOtp}`);
      }
      if (data?.error) {
        setError({ status: true, message: data.error });
      }
    } catch (error) {
      console.log(error);
      setError({ status: true, message: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-foreground/80"
          >
            First Name
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="text"
              required
              id="firstName"
              placeholder="John"
              name="firstName"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-foreground/80"
          >
            Last Name
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="text"
              required
              id="lastName"
              placeholder="Doe"
              name="lastName"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground/80"
          >
            Email
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="email"
              required
              id="email"
              placeholder="boss@gmail.com"
              name="email"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground/80"
          >
            Password
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="password"
              minLength={8}
              required
              id="password"
              placeholder="Password@1234"
              name="password"
              className="mt-1 border rounded-lg w-full"
              suppressHydrationWarning
            />
          </label>
        </div>

        <Button
          disabled={loading}
          type="submit"
          variant="default"
          className="w-full cursor-pointer p-2 bg-primary rounded-lg mt-4"
        >
          {loading ? <Loader /> : "Register"}
        </Button>

        {error?.status && (
          <Alert variant="destructive" className="mt-4 bg-red-600/10">
            <AlertTitle className="flex items-center gap-2">
              <ErrorIcon /> Register Failed
            </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <p className="text-sm text-foreground/80 mt-6 flex justify-center">
          Already have an account?{" "}
          <Link prefetch href="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
