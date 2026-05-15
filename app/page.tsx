"use client"

import {SkeletonLoader} from "@/components/ui/index";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-screen items-center justify-center bg-zinc-700 font-sans dark:bg-black">
<div className="w-full">
  </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-yellow-500 dark:bg-black ">
    <SkeletonLoader />
      </main>
    </div>
  );
}
