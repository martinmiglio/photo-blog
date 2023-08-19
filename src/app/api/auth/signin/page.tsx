import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { ProviderAuthButton } from "@/components/auth/AuthButton";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata = {
  title: {
    default: "Sign In",
  },
};

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  const providers = await getProviders();
  if (providers === null) {
    redirect("/");
  }

  return (
    <div className="flex flex-grow flex-col gap-2 items-center w-full">
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="w-full">
          <ProviderAuthButton provider={provider} />
        </div>
      ))}
    </div>
  );
}
