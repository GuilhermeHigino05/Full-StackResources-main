import { Nunito } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "../public/template/css/sb-admin-2.min.css";
import "../public/template/css/fontawesome-free/css/all.min.css";
import { CursoProvider } from "./context/cursosContext";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: "Imóveis Logate - PFS²",
  description: "Aplicação criada para o projeto das aulas de sistemas 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${nunito.variable}`}>

      <body>
        <CursoProvider>

          <h1>Layout raiz</h1>
          {children}
        </CursoProvider>
        <Toaster position="top-right" />
        <Script src="/template/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/template/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/template/js/sb-admin-2.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
