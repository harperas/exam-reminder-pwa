"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "rsuite";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className=" bg-white h-screen w-full flex justify-center items-center ">
      <Loader size="lg" />
    </div>
  );
}
