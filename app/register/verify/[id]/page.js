import isValidOtpUrl from "@/graphql/query/isValidOtpUrl";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import me from "@/graphql/query/me";
import { redirect } from "next/navigation";

const AuthPage = dynamic(() => import("@/components/auth/AuthPage"));
const VerifyForm = dynamic(() => import("@/components/auth/VerifyForm"));

export const metadata = {
  title: "Verify to ChicHut",
  description: "Verify to ChicHut",
};

export const revalidate = 0;

async function VerifyPage({ params: { id } }) {
  const isValid = await isValidOtpUrl({ id });
  if (!isValid?.isValidOtpUrl) {
    notFound();
  }
  const isUserLoggedIn = await me("email");
  if (isUserLoggedIn?.email) {
    return redirect("/");
  }
  return (
    <AuthPage
      title={
        <h1 className="text-3xl font-bold mb-10">
          Verify <span className="text-primary">ChicHut</span>
        </h1>
      }
    >
      <VerifyForm id={id} />
    </AuthPage>
  );
}

export default VerifyPage;
