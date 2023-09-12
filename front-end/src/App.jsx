import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import "./assets/App.css";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserLayout } from "./layouts/UserLayout";
import MovieSchedule from "./pages/MovieSchedule";
import { AdminLayout } from "./layouts/AdminLayout";
import AdminIndex from "./pages/AdminIndex";
import MovieManagement from "./pages/MovieManagement";
import MovieManagementEdit from "./pages/MovieManagementEdit";
import NotFound from "./error/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/default" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/default/sign-in" element={<SignIn />} />
        <Route path="/default/sign-up" element={<SignUp />} />
        <Route
          path="/default/showing"
          element={<MovieSchedule movieStatus="Đang chiếu" />}
        />
        <Route
          path="/default/coming"
          element={<MovieSchedule movieStatus="Sắp chiếu" />}
        />
        {/* <Route path="/site" */}
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminIndex />} />
        <Route path="/admin/movie-management" element={<MovieManagement />} />
        <Route
          path="/admin/movie-management/edit"
          element={<MovieManagementEdit />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
