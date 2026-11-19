import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "MesaPyme · Mis solicitudes" };

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="es"><body><header><strong>MesaPyme</strong><span>Portal de soporte</span></header>{children}</body></html>;
}
