"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Uploader } from "uploader";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import Toggle from "../../components/Toggle";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#2563EB", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};

export default function DreamPage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImageLoaded, setGeneratedImageLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("painting of atsdm in the style of andy warhol");

  async function generatePhoto(userPrompt: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userPrompt: userPrompt }),
    });

    let newPhoto = await res.json();
    if (res.status !== 201) {
      setError(newPhoto);
    } else {
      setGeneratedImage(newPhoto[1]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-4 mb-8 text-center sm:mb-0">
        <h1 className="max-w-4xl mx-auto mb-5 text-4xl font-bold tracking-normal font-display text-slate-100 sm:text-6xl">
          Generate <span className="text-blue-600">Annie</span> now!
        </h1>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex flex-col items-center justify-between w-full mt-4">
              {!generatedImage && (
                <>
                  <div className="w-full max-w-sm space-y-4">
                    <div className="flex items-center mt-3 space-x-3">
                      <Image
                        src="/number-1-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="font-medium text-left">
                        Type your Annie prompt.
                      </p>
                    </div>
                    <input 
                      className="w-full px-2 py-1 mt-2 text-black border-2 rounded-md" 
                      value={prompt} 
                      onChange={(e) => setPrompt(e.target.value)} 
                      placeholder="Enter your prompt here..." 
                    />
                  </div>
                </>
              )}
              {generatedImage && (
                <div>
                  Here's your generated Annie{" "}
                  for the following prompt: <b>{prompt.toLowerCase()}</b>!{" "}
                </div>
              )}
              <div
                className={`${
                  generatedImageLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}
              >
                <Toggle
                  className={`${generatedImageLoaded ? "visible mb-6" : "invisible"}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {loading && (
                <button
                  disabled
                  className="w-40 px-4 pt-2 pb-3 mt-8 font-medium text-white bg-blue-500 rounded-full"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="px-4 py-3 mt-8 text-red-700 bg-red-100 border border-red-400 rounded-xl"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="flex justify-center space-x-2">
                {!loading && (
                  <button
                    onClick={() => {
                      generatePhoto(prompt);
                      setGeneratedImage(null);
                      setGeneratedImageLoaded(false);
                      setError(null);
                    }}
                    className="px-4 py-2 mt-8 font-medium text-white transition bg-blue-500 rounded-full hover:bg-blue-500/80"
                  >
                    Generate Annie
                  </button>
                )}
                {generatedImageLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(
                        generatedImage!,
                        appendNewToName(photoName!)
                      );
                    }}
                    className="px-4 py-2 mt-8 font-medium text-black transition bg-white border rounded-full hover:bg-gray-100"
                  >
                    Download Generated Annie
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
