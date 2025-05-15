"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import verifyOtp from "@/graphql/mutation/verifyOtp";
import { useRouter } from "next/navigation";
import regenerateOtp from "@/graphql/mutation/regenerateOtp";
import { HistoryIcon } from "lucide-react";
import Loader from "../common/LoadingBtn";

function VerifyForm({ id }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState({
    status: false,
    message: "",
  });
  const router = useRouter();
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResendSuccess({ status: false, message: "" });
    setError({ status: false, message: "" });
    try {
      const data = await verifyOtp({ id, otp: otp?.toString() });
      if (data?.verifyOtp) {
        router.push("/login");
      }
      if (data?.error) {
        setLoading(false);
        setError({ status: true, message: data.error });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError({ status: true, message: error });
    }
  };

  const handleRegenerateOtp = async () => {
    setResendSuccess({ status: false, message: "" });
    setError({ status: false, message: "" });
    setOtp("");

    try {
      const data = await regenerateOtp({ id });
      if (data?.regenerateOtp) {
        setResendSuccess({ status: true, message: "OTP sent successfully" });
      }
      if (data?.error) {
        setLoading(false);
        setError({ status: true, message: data.error });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError({ status: true, message: error });
    }
  };
  return (
    <div>
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md flex flex-col items-center"
      >
        <InputOTP
          value={otp}
          onChange={(value) => setOtp(value)}
          maxLength={6}
          className="w-full"
        >
          <InputOTPGroup>
            <InputOTPSlot
              className="border-foreground/60 font-semibold text-xl"
              index={0}
            />
            <InputOTPSlot
              className="border-foreground/60 font-semibold text-xl"
              index={1}
            />
            <InputOTPSlot
              className="border-foreground/60 font-semibold text-xl"
              index={2}
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              className="border-foreground/60 font-semibold text-xl"
              index={3}
            />
            <InputOTPSlot
              className="border-foreground/60 font-semibold text-xl"
              index={4}
            />
            <InputOTPSlot
              className="border-foreground/60 font-semibold text-xl"
              index={5}
            />
          </InputOTPGroup>
        </InputOTP>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRegenerateOtp}
          className="mt-4 w-full cursor-pointer"
        >
          Resend OTP <HistoryIcon />
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Please enter the one-time password sent to your email
        </p>
        {error?.status && <p className="text-red-500 mt-2">{error?.message}</p>}
        {resendSuccess?.status && (
          <p className="text-green-500 mt-2">{resendSuccess?.message}</p>
        )}
        <Button
          type="submit"
          disabled={otp.length !== 6 || loading}
          className="w-full mt-4 cursor-pointer"
        >
          {loading ? <Loader /> : "Verify"}
        </Button>
      </form>
    </div>
  );
}

export default VerifyForm;
