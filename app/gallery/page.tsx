"use client"

import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/firebase";
import { FullMetadata, getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";

export default function Page() {
  const [imageList, setImageList] = useState<{metadata: FullMetadata, url: string}[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, "generated-annie-images/"); // Reference to the images folder
      const imageRefs = await listAll(storageRef); // List all files in the storage

      // Get the metadata and URL of each image
      const images = await Promise.all(
        imageRefs.items.map(async (ref) => {
          const metadata = await getMetadata(ref);
          const url = await getDownloadURL(ref);
          return { metadata, url };
        })
      );
      
      setImageList(images);
    };
    fetchImages();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-20 text-center sm:mt-20 background-gradient">
        <h1 className="max-w-4xl mx-auto text-5xl font-bold tracking-normal text-gray-300 font-display sm:text-7xl">
          Images of Annie Made{" "}
          <span className="relative text-blue-600 whitespace-nowrap">
            <span className="relative">using AI</span>
          </span>{" "}
        </h1>
        <h2 className="max-w-xl mx-auto mt-12 text-lg leading-7 text-gray-500 sm:text-gray-400">
          Take a look at the wonderful creations made by AI trained on Annie!
        </h2>
        <div className="flex flex-col items-center justify-between w-full mt-6 sm:mt-10">
          <div className="flex flex-col mt-4 mb-16 space-y-10">
            <div className="flex flex-col sm:space-x-8 sm:flex-row">    
              <div>
                {imageList.map((image, index) => (
                  <div key={index} className="mt-8 sm:mt-0">
                    <h3 className="mb-1 text-lg font-medium">{image.metadata.customMetadata?.prompt}</h3>
                    <Image
                      alt={`Image ${index + 1}`}
                      width={512}
                      height={512}
                      src={image.url}
                      className="object-cover w-full mt-2 h-96 rounded-2xl sm:mt-0"
                    />
                  </div>
                ))}
              </div>         
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
