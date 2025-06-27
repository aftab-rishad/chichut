import dynamicImport from "next/dynamic";
import { notFound } from "next/navigation";
import isValidResetUrl from "@/graphql/query/isValidResetUrl";
import me from "@/graphql/query/me";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Enter your new ChicHut password",
  description: "Enter your new ChicHut password",
};

const AuthPage = dynamicImport(() => import("@/components/auth/AuthPage"));
const ResetForm = dynamicImport(() => import("@/components/auth/ResetForm"));

export const revalidate = 0;
export const dynamic = "force-dynamic";
async function ResetPasswordPage({ searchParams: { token, tokenId } }) {
  if (!token || !tokenId) {
    notFound();
  }
  const isValid = await isValidResetUrl({ token, tokenId });
  if (!isValid?.isValidResetUrl) {
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
          Enter your new <span className="text-primary">ChicHut</span> password
        </h1>
      }
    >
      <ResetForm />
    </AuthPage>
  );
}

export default ResetPasswordPage;
