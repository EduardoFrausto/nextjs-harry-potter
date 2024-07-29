"use client";
import {Open_Sans} from "next/font/google";
import "./globals.css";
import Providers from "@/redux/app/Providers";

const openSans = Open_Sans({subsets: ["latin"]});

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" id='htmlTag'>
        <body className={openSans.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
