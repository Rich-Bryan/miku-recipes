'use client'
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";

import { useAuth } from "@/lib/firebase/auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-center h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }
  return (
    <main className="flex h-screen ">
      {user && (
        <>
        <Sidebar />
        <section className="flex h-full flex-1 flex-col">
          <MobileNavigation/>
          <Header />
          <div className="main-content">{children}</div>
        </section>
        </>
      )}
    </main>
  );
};

export default Layout;


