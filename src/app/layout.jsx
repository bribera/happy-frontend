// app/layout.js
import DynamicHead from "@/components/DynamicHead";
import "./globals.css";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata = {
  title: "CCJ Bénin - Centre de Culture Japonaise Bénin",
  description: "Professional Training Center",
};



export default function RootLayout({ children }) {

  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative w-full h-full">
        <DynamicHead />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
