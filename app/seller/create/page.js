import { notFound } from "next/navigation";
import me from "@/graphql/query/me";
import brandQuery from "@/graphql/query/brand";
import dynamic from "next/dynamic";

const AuthPage = dynamic(() => import("@/components/auth/AuthPage"));
const CreateSeller = dynamic(() => import("@/components/auth/CreateSeller"));

export const metadata = {
  title: "Become a ChicHut seller",
  description: "Create a seller account",
};

async function CreateSellerPage() {
  const session = await me("id");
  const brand = await brandQuery({ userId: session?.id }, "id");
  if (!session?.id || brand?.id) {
    notFound();
  }
  return (
    <AuthPage
      title={
        <h1 className="text-3xl font-bold mb-10">
          Become a <span className="text-primary">ChicHut</span> seller
        </h1>
      }
    >
      <CreateSeller />
    </AuthPage>
  );
}

export default CreateSellerPage;
