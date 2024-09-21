"use client";

import Image from "next/image";
import { useState } from "react";
import { AIResponse } from "./api/ai/route";

export default function Home() {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");

  const fetchData = async (prompt: string) => {
    const res = await fetch(`/api/ai?prompt=${encodeURIComponent(prompt)}`);
    const data: AIResponse = await res.json();
    setAiResponse(data.message);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    fetchData(prompt);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image className="dark:invert" src="https://nextjs.org/icons/next.svg" alt="Next.js logo" width={180} height={38} priority />
      </main>
      <p>{aiResponse ? <code className="text-[#0070f3]">{aiResponse}</code> : <code className="text-[#0070f3]">Loading...</code>}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
