import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between w-full gap-2 px-2 mt-3 border-b border-gray-500 xs:flex-row pb-7 sm:px-4">
      <Link href="/" className="flex space-x-2">
        <Image
          alt="header text"
          src="/logo.png"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        />
        <h1 className="ml-2 text-xl font-bold tracking-tight sm:text-3xl">
          Annie.Generate
        </h1>
      </Link>
    </header>
  );
}
