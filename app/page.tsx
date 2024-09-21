"use client";
import { useState } from "react";

export default function Home() {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");

  const fetchData = async (prompt: string) => {
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
    event.preventDefault();
    fetchData(prompt);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>{aiResponse ? <code className="">{aiResponse}</code> : <code className="text-[#0070f3]">Loading...</code>}</p>
      <form className="fixed bottom-0 flex w-full h-12 bg-red-400  justify-between space-x-5" onSubmit={handleSubmit}>
        <textarea className="w-4/5 h-full p-4 resize-y border rounded-md text-black" type="text" value={prompt} onChange={handleChange} />
        <button className="w-1/5 h-full bg-slate-800 p-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
