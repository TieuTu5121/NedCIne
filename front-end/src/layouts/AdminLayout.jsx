import { Outlet, useNavigate } from "react-router-dom";

import { Suspense, useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";

export function AdminLayout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   if (role !== "ADMIN") {
  //     console.log(role);
  //     navigate("/default");
  //   }
  // }, [user]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet className="h-auto" />
      </Suspense>
    </>
  );
}
