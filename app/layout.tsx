import type { Metadata } from "next";
import "./globals.css"
import { Inknut_Antiqua } from 'next/font/google'
import Navbar from "@/components/Navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "RUDA WRONA ORŁA NIE POKONA!!!",
  description: "praca szkolna :D"
};

const inknutAntiqua = Inknut_Antiqua({
  subsets: ['latin'],
  weight: '500'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inknutAntiqua.className}>
        <Image src="/bgImg.jpg" alt="wrona vs orzel" width={200} height={200} className="w-full h-full fixed top-0 left-0 -z-50" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
