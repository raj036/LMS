import React, { useEffect } from "react";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { useAuthContext } from "hooks/useAuthContext";
import UserLayout from "Layout/UserLayout";
import AdminLayout from "Layout/AdminLayout";

function App() {
  const { user }: any = useAuthContext();

  useEffect(() => {
    initFlowbite();
  }, [user]);

  return (
    <>
      <Router>
        {user && user.user_type === "admin" ? (
          <AdminLayout>
            <AdminRoutes />
          </AdminLayout>
        ) : (
          <UserLayout>
            <UserRoutes />
          </UserLayout>
        )}
      </Router>
    </>
  );
}

export default App;