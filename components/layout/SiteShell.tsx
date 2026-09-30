import { ReactNode } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-col">
        <Header />
        <main className="flex-1 p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}