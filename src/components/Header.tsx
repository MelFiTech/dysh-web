import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex justify-center items-center py-8 bg-[#FCFCF6]">
      <Image src="/logo/logo.png" alt="Dysh Logo" width={100} height={20} priority />
    </header>
  );
} 