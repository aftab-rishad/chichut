import me from "@/graphql/query/me";
import { redirect } from "next/navigation";
import dynamicImport from "next/dynamic";

const LoginForm = dynamicImport(() => import("@/components/auth/LoginForm"));
const AuthPage = dynamicImport(() => import("@/components/auth/AuthPage"));

export const metadata = {
  title: "Login to ChicHut",
  description: "Login to ChicHut",
};
export const dynamic = "force-dynamic";
async function LoginPage() {
  const isUserLoggedIn = await me("email");
  if (isUserLoggedIn?.email) {
    return redirect("/");
  }

  return (
    <AuthPage
      title={
        <h1 className="text-3xl font-bold mb-10">
          Login to <span className="text-primary">ChicHut</span>
        </h1>
      }
    >
      <LoginForm />
    </AuthPage>
  );
}

export default LoginPage;
