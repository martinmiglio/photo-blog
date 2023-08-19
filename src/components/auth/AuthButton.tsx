"use client";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientSafeProvider, signIn } from "next-auth/react";

export function ProviderAuthButton({
  provider,
}: {
  provider: ClientSafeProvider;
}) {
  return (
    <button
      className="rounded border-b-4 border-theme-700 bg-theme-500 text-xl font-bold text-theme-50 hover:border-theme-500 hover:bg-theme-400 w-full h-14"
      onClick={() => signIn(provider.id)}
    >
      <div className="flex items-center justify-center gap-4">
        <FontAwesomeIcon icon={faGoogle} height="16px" width="16px" />
        <div>sign in</div>
      </div>
    </button>
  );
}
