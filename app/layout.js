import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import GSAPRegistry from "@/components/shared/GSAPRegistry";
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
  Quicksand,
  Creepster,
  Galindo,
  Kameron,
  Micro_5,
  Sofia,
  Cookie,
  Mystery_Quest,
  Special_Elite,
  Iceberg,
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

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-quicksand",
  display: "swap",
});

const creepster = Creepster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-creepster",
  display: "swap",
});

const galindo = Galindo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-galindo",
  display: "swap",
});

const kameron = Kameron({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kameron",
  display: "swap",
});

const micro5 = Micro_5({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-micro5",
  display: "swap",
});

const sofia = Sofia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sofia",
  display: "swap",
});

const cookie = Cookie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cookie",
  display: "swap",
});

const mysteryQuest = Mystery_Quest({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mystery-quest",
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special-elite",
  display: "swap",
});

const iceberg = Iceberg({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-iceberg",
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
        data-theme="emerald"
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
          ${quicksand.variable}
          ${creepster.variable}
          ${galindo.variable}
          ${kameron.variable}
          ${micro5.variable}
          ${sofia.variable}
          ${cookie.variable}
          ${mysteryQuest.variable}
          ${specialElite.variable}
          ${iceberg.variable}
        `}
      >
        <body className="bg-grid min-h-screen flex flex-col">
          <GSAPRegistry />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
