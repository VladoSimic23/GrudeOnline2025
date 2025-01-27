import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { isMobileDevice } from "./libs/UserAgent/UserAgent";
import style from "./css/style.module.css";
import { Suspense } from "react";
//import NavWrap from "./Components/Nav/NavWarp";
import BootstrapClient from "./libs/BootstrapClient/BootstrapClient";
import FooterComponent from "./Components/Footer/FooterComponent";
import dynamic from "next/dynamic";
import TopNavbar from "./Components/Nav/TopNavbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
//import Script from "next/script";
//import DelayedScriptLoader from "./functions/scriptLoader";
const NavWrap = dynamic(() => import("./Components/Nav/NavWarp"));
//import OneSignalComp from "./Components/OneSIgnal/OneSignal";
//import MobileContainer from "./Components/MobileComponents/MobileContainer";
//import DesktopContainer from "./Components/DesktopComponents/DesktopContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grude Online",
  description: "Grudski News Portal",
  openGraph: {
    siteName: "Grude Online",
    description: "Grudski News Portal",
    url: "https://www.grude-online.info/",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await isMobileDevice();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${
          isMobile ? style.websiteBgDark : style.websiteBgWhite
        }`}
      >
        {/* <OneSignalComp /> */}
        {!isMobile && <TopNavbar />}
        <NavWrap />
        {children}
        <Suspense
          fallback={<h2 style={{ color: "white" }}>Loading Footer ...</h2>}
        >
          <FooterComponent />
        </Suspense>
        <BootstrapClient />
        {isMobile && <ScrollToTop />}
      </body>
    </html>
  );
}
