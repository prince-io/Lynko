import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {
  Inter,
  Poppins,
  Pixelify_Sans,
  Doto,
  Molle,
  Macondo,
  Pacifico,
  Monofett,
  Monoton,
  Oswald,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixelify",
});

const doto = Doto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-doto",
});

const molle = Molle({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-molle",
});

const macondo = Macondo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-macondo",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const monofett = Monofett({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monofett",
  display: "swap",
});

const monoton = Monoton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monoton",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-oswald",
  display: "swap",
});

export const metadata = {
  title: "Lynko — One Link for Everything You Do",
  description:
    "Lynko lets you create a clean, customizable link page to share all your important links in one place. Perfect for creators, developers, and anyone who wants a simple online presence.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        data-theme="cupcake"
        className={`
          ${inter.variable}
          ${poppins.variable}
          ${pixelify.variable}
          ${doto.variable}
          ${molle.variable}
          ${macondo.variable}
          ${pacifico.variable}
          ${monofett.variable}
          ${monoton.variable}
          ${oswald.variable}
        `}
      >
        <body className="bg-grid min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
