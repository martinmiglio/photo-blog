"use client";

import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RWebShare } from "react-web-share";

export default function ShareButton({
  url,
  text,
}: {
  url: string;
  text?: string;
}) {
  return (
    <RWebShare
      data={{
        text: text,
        url: url,
      }}
      sites={["facebook", "twitter", "reddit", "copy"]}
    >
      <button className="text-md flex h-8 items-center gap-2 rounded border-b-4 border-theme-700 bg-theme-500 p-2 font-medium text-theme-50 hover:border-theme-500 hover:bg-theme-400">
        <FontAwesomeIcon icon={faShareFromSquare} />
        share
      </button>
    </RWebShare>
  );
}
