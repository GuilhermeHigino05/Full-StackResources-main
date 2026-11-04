import { Nunito } from "next/font/google";
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

      <head>
          <script src="/template/js/sb-admin-2.min.js"></script>
          <script src="/template/js/bootstrap.bundle.min.js"></script>
          <script src="/template/js/jquery.min.js"></script>
      </head>
      <body>
        <CursoProvider>

          <h1>Layout raiz</h1>
          {children}
        </CursoProvider>
      </body>
    </html>
  );
}
