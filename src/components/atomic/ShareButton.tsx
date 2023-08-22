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
        text: text ?? "***REMOVED***",
        url: url,
        title: "share ***REMOVED*** page",
      }}
      sites={["facebook", "twitter", "reddit", "copy"]}
    >
      <button className="rounded border-b-4 border-theme-700 bg-theme-500 text-md font-medium text-theme-50 hover:border-theme-500 hover:bg-theme-400 h-8 flex items-center gap-2 p-2">
        <FontAwesomeIcon icon={faShareFromSquare} />
        share
      </button>
    </RWebShare>
  );
}