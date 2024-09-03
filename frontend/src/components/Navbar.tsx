import * as React from "react";

export default function Navbar() {
  return (
    <div className="flex min-w-screen w-screen justify-center border-b-2 border border-zinc-300 fixed top-0">
      <div className="flex justify-between min-w-[80vw] w-[80vw] items-center p-[1em]">
        <span className="font-bold text-2xl">SIH 2024</span>
        <div className="flex gap-2">
          <span>Item1</span>
          <span>Item2</span>
          <span>Item3</span>
        </div>
      </div>
    </div>
  );
}
