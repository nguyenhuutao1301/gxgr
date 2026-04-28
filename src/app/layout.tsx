import "@/app/globals.css";
import { ReactNode } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { UserProvider } from "../context/UserContext";
import { PostProvider } from "../context/PostContext";
import { PreviousPageProvider } from "../context/PreviousPageContext";
import Script from "next/script";

// ✅ Bọc children trong component mới để dùng Redux hook
function AppWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        {/* Google Tag Manager script trong <head> */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M3NRJ4LX');
          `}
        </Script>
      </head>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        {/* GTM noscript trong body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3NRJ4LX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <PreviousPageProvider>
          <UserProvider>
            <PostProvider>
              <AppWrapper>
                <div className="bg-white">{children}</div>
              </AppWrapper>
            </PostProvider>
          </UserProvider>
        </PreviousPageProvider>
      </body>
    </html>
  );
}
