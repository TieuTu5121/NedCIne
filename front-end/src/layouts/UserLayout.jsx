import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Suspense } from "react";

export function UserLayout() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto my-8 flex-shrink-0">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
      <Footer className="sticky bottom-0" />
    </>
  );
}
