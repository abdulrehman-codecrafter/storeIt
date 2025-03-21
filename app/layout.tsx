import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {Providers} from "@/app/providers"


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Store It",
    description: "Store It is a simple file storage service.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{
            variables: {
              colorPrimary: '#fa7275',
              colorText: 'black',
            },
          }}>
            <html lang="en">
            <body className={`${poppins.variable} font-poppins antialiased`}>
                
            <Providers>{children}</Providers>
                
            </body>
        </html>
        </ClerkProvider>
    );
}
