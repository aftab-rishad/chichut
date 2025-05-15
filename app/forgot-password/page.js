import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import me from "@/graphql/query/me";

export const metadata = {
  title: "Forgot your ChicHut password?",
  description: "Forgot your ChicHut password?",
};

const AuthPage = dynamic(() => import("@/components/auth/AuthPage"));
const ForgotPassForm = dynamic(() =>
  import("@/components/auth/ForgotPassForm")
);

async function ForgotPasswordPage() {
  const isUserLoggedIn = await me("email");
  if (isUserLoggedIn?.email) {
    return redirect("/");
  }
  return (
    <AuthPage
      title={
        <h1 className="text-3xl font-bold mb-10">
          Forgot your <span className="text-primary">ChicHut</span> password?
        </h1>
      }
    >
      <ForgotPassForm />
    </AuthPage>
  );
}

export default ForgotPasswordPage;
