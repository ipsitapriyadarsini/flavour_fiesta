import "./globals.css";
import "next-cloudinary/dist/cld-video-player.css";
import HeroSection from "../layout/HeroSection";
import NavBar from "../layout/NavBar";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <HeroSection />
        <main>{children}</main>
      </body>
    </html>
  );
}
