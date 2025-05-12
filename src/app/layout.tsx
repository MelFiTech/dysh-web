import localFont from 'next/font/local';
import Header from "@/components/Header";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/WEB/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WEB/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WEB/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata = {
  title: "Dysh – World Class Meals from Your Ingredients",
  description: "Discover world class meals tailored to the ingredients in your kitchen. Explore recipes from Italy, Asia, Africa & more. Breakfast, lunch, or dinner, all personalized to what you have.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Dysh Thumbnail",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="antialiased bg-[#FFFBF8] overflow-hidden font-satoshi">
        <Header />
        {children}
      </body>
    </html>
  );
}
