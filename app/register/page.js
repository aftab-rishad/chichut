import dynamicImport from "next/dynamic";
import me from "@/graphql/query/me";
import { redirect } from "next/navigation";

const AuthPage = dynamicImport(() => import("@/components/auth/AuthPage"));
const RegisterForm = dynamicImport(() =>
  import("@/components/auth/RegisterForm")
);

export const metadata = {
  title: "Register to ChicHut",
  description: "Register to ChicHut",
};
export const dynamic = "force-dynamic";
async function RegisterPage() {
  const isUserLoggedIn = await me("email");
  if (isUserLoggedIn?.email) {
    return redirect("/");
  }
  return (
    <AuthPage
      title={
        <h1 className="text-3xl font-bold mb-10">
          Register to <span className="text-primary">ChicHut</span>
        </h1>
      }
    >
      <RegisterForm />
    </AuthPage>
  );
}

export default RegisterPage;
