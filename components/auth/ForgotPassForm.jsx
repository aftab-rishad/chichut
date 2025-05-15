"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import Loader from "@/components/common/LoadingBtn";
import { useState } from "react";
import sendResetMail from "@/graphql/mutation/sendResetMail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorIcon } from "@/components/common/Svg";

function ForgotPassForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ status: false, message: "" });
    setSuccess(false);
    try {
      const mail = new FormData(e.currentTarget);
      const data = await sendResetMail(mail.get("email"));
      if (data?.error) {
        setError({ status: true, message: data?.error });
      } else {
        setError({ status: false, message: "" });
        setSuccess(true);
      }
    } catch (error) {
      setError({ status: true, message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <div className="mb-4 w-full">
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
      <Button
        disabled={loading}
        type="submit"
        variant="default"
        className="w-full cursor-pointer p-2 bg-primary rounded-lg mt-4"
      >
        {loading ? <Loader /> : "Send Reset Password Link"}
      </Button>
      {error?.status && (
        <Alert variant="destructive" className="mt-4 bg-red-600/10">
          <AlertTitle className="flex items-center gap-2">
            <ErrorIcon /> Failed to send reset password link
          </AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-4 bg-green-600/20">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Reset Password Link sent successfully</AlertTitle>
          <AlertDescription>
            A reset password link has been sent to your email.
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}

export default ForgotPassForm;
