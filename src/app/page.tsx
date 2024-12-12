"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `This is a website that is built using Next.js, TailwindCSS, Shadcn UI, and TypeScript. This allows user to create web pages 10X faster.`;

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full p-20 text-center h-screen">
      <TextGenerateEffect filter={false} words={words} />
    </div>
  );
}
