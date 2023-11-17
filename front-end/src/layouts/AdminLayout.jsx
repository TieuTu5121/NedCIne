import { Outlet, useNavigate } from "react-router-dom";

import { Suspense, useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { useState } from "react";

export function AdminLayout() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/admin/login");
    }
    setIsLoading(false);
  }, [user]);

  return (
    <>
      <Suspense fallback={isLoading && <div>Loading...</div>}>
        <Outlet className="h-auto" />
      </Suspense>
    </>
  );
}
