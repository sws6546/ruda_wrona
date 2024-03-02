import type { Metadata } from "next";
import "./globals.css"
import { Inknut_Antiqua } from 'next/font/google'

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
        <img src="./bgImg.jpg" className="w-full h-full fixed top-0 left-0 -z-50"/>
        {children}
      </body>
    </html>
  );
}
