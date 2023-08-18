"use client";

import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RWebShare } from "react-web-share";

export default function ShareButton({ url }: { url: string }) {
  return (
    <RWebShare
      data={{
        text: "toadtopia",
        url: url,
        title: "share toadtopia page",
      }}
      sites={["facebook", "twitter", "reddit", "copy"]}
    >
      <button className="rounded border-b-4 border-theme-700 bg-theme-500 text-md font-bold text-theme-50 hover:border-theme-500 hover:bg-theme-400 w-8 h-8">
        <FontAwesomeIcon icon={faShareFromSquare} />
      </button>
    </RWebShare>
  );
}
