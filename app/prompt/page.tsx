"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import PromptSelector from '../../components/PromptSelector';
import downloadPhoto from "../../utils/downloadPhoto";
import convertToBlob from "../../utils/convertToBlob";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import Link from "next/link";


export default function Page() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImageLoaded, setGeneratedImageLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("painting in the style of andy warhol");
  const imageFolder = "generated-annie-images"; 

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
    if (res.status !== 200) {
      setError(newPhoto);
    } else {
      let fileName = userPrompt.slice(0, 15) + "_" + v4();
      setPhotoName(fileName);
      setGeneratedImage(newPhoto[0]);
      const imageRef = ref(storage, `${imageFolder}/${fileName}.jpg`);
      const blob = await convertToBlob(newPhoto[0]);
                
      uploadBytesResumable(imageRef, blob!, {
          contentType: 'image/jpeg',
          customMetadata: {
              'prompt' : userPrompt,
          }
      }) 
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
                  <PromptSelector onPromptSelect={setPrompt} />
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
              </div>
              {generatedImage && (
                <div className="flex flex-col sm:space-x-4 sm:flex-row">
                  <div className="mt-8 sm:mt-0">
                    <h2 className="mb-1 text-lg font-medium">Generated Annie</h2>
                    <a href={generatedImage} target="_blank" rel="noreferrer">
                      <Image
                        alt="restored photo"
                        src={generatedImage}
                        className="relative w-full mt-2 rounded-2xl sm:mt-0 cursor-zoom-in h-96"
                        width={475}
                        height={475}
                        onLoadingComplete={() => setGeneratedImageLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}   
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
                {!loading && !generatedImage && (
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
                  <>
                   <button
                    onClick={() => {
                      downloadPhoto(
                        generatedImage!,
                        photoName!
                      );
                    }}
                    className="px-4 py-2 mt-8 font-medium text-black transition bg-white border rounded-full hover:bg-gray-100"
                  >
                    Download Generated Annie
                  </button>
                  <Link
                    className="px-4 py-2 mt-8 font-medium text-black transition bg-white border rounded-full hover:bg-gray-100"
                    href="/gallery"
                  >
                    View Annie Gallery
                  </Link>
                  </>

                  
                  
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
