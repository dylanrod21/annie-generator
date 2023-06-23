import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-6xl min-h-screen py-2 mx-auto">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-20 text-center sm:mt-20 background-gradient">
        <h1 className="max-w-4xl mx-auto text-5xl font-bold tracking-normal text-gray-300 font-display sm:text-7xl">
          Generating Images of Annie{" "}
          <span className="relative text-blue-600 whitespace-nowrap">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
        </h1>
        <h2 className="max-w-xl mx-auto mt-12 text-lg leading-7 text-gray-500 sm:text-gray-400">
          Enter a prompt or select one from the prompts below to generate a new AI image of Annie.
        </h2>
        <Link
          className="px-4 py-3 mt-8 font-medium text-white transition bg-blue-600 rounded-xl sm:mt-10 hover:bg-blue-500"
          href="/prompt"
        >
          Generate Annie Now!
        </Link>
        <div className="flex flex-col items-center justify-between w-full mt-6 sm:mt-10">
          <div className="flex flex-col mt-4 mb-16 space-y-10">
            <div className="flex flex-col sm:space-x-8 sm:flex-row">
              <div className="mt-8 sm:mt-0">
                <h3 className="mb-1 text-lg font-medium"></h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic-2.png"
                  className="object-cover w-full mt-2 h-96 rounded-2xl sm:mt-0"
                />
              </div>
              <div className="mt-8 sm:mt-0">
                <h3 className="mb-1 text-lg font-medium"></h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic-3.png"
                  className="object-cover w-full mt-2 h-96 rounded-2xl sm:mt-0"
                />
              </div>
              <div className="mt-8 sm:mt-0">
                <h3 className="mb-1 text-lg font-medium"></h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic-5.png"
                  className="object-cover w-full mt-2 h-96 rounded-2xl sm:mt-0"
                />
              </div>
              <div className="mt-8 sm:mt-0">
                <h3 className="mb-1 text-lg font-medium"></h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic-6.png"
                  className="object-cover w-full mt-2 h-96 rounded-2xl sm:mt-0"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
