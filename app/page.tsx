"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/hello");
        const data = await res.json();
        setData(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image className="dark:invert" src="https://nextjs.org/icons/next.svg" alt="Next.js logo" width={180} height={38} priority />
      </main>
      <p>{data ? <code className="text-[#0070f3]">{data}</code> : <code className="text-[#0070f3]">Loading...</code>}</p>
    </div>
  );
}
