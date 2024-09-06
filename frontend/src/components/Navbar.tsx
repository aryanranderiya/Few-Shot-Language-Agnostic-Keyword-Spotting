import * as React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex min-w-screen w-screen justify-center border-b-2 border border-zinc-300 fixed top-0 bg-white">
      <div className="flex justify-between min-w-[80vw] sm:w-[80vw] w-screen items-center p-[1em]">
        <Link
          className="font-bold text-2xl text-black hover:text-gray-500 transition-all"
          to="/"
        >
          SIH 2024
        </Link>
        <div className="flex gap-5">
          <Link
            to="/all"
            className="text-black  hover:text-gray-500 transition-all"
          >
            All Data
          </Link>

          <Link
            to="/dictate"
            className="text-black  hover:text-gray-500 transition-all"
          >
            Speech Dictation
          </Link>
        </div>
      </div>
    </div>
  );
}
