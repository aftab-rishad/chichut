"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorIcon } from "@/components/common/Svg";
import Loader from "@/components/common/LoadingBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import resetPassword from "@/graphql/mutation/resetPassword";
import { useSearchParams, useRouter } from "next/navigation";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const tokenId = searchParams.get("tokenId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ status: false, message: "" });
    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");
      if (password !== confirmPassword) {
        setError({
          status: true,
          message: "Confirm Password does not match with Password",
        });
      } else {
        const data = await resetPassword({
          token,
          tokenId,
          password,
        });
        if (data?.error) {
          setError({ status: true, message: data?.error });
        } else {
          setError({ status: false, message: "" });
          router.push("/login");
        }
      }
    } catch (error) {
      setError({ status: true, message: error?.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground/80"
          >
            Confirm Password
            <span className="text-red-600 text-[1rem] mx-[0.115rem]">*</span>
            <Input
              type="password"
              minLength={8}
              required
              id="confirmPassword"
              placeholder="Confirm Password@1234"
              name="confirmPassword"
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
          {loading ? <Loader /> : "Reset Password"}
        </Button>
        {error?.status && (
          <Alert variant="destructive" className="mt-4 bg-red-600/10">
            <AlertTitle className="flex items-center gap-2">
              <ErrorIcon /> Reset Password Failed
            </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}

export default ResetForm;
