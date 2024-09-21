"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");

  const fetchData2 = async (prompt: string) => {
    const res = await fetch(`/api/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    let done = false;
    let aiResponseText = "";

    const reader = res!.body!.getReader();
    const decoder = new TextDecoder("utf-8");

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        const chunkValue = decoder.decode(value);
        aiResponseText += chunkValue;
        setAiResponse(aiResponseText);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    fetchData2(prompt);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>{aiResponse ? <code className="text-[#0070f3]">{aiResponse}</code> : <code className="text-[#0070f3]">Loading...</code>}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
