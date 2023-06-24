"use client";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ApolloProvider client={client}>
          <main>{children}</main>
        </ApolloProvider>
      </body>
    </html>
  );
}