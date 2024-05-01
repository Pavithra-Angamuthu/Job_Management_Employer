import React from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "../Page/Dashboard";
import Layout from "../Page/Layout";




function AdminWrapper() {
  //const mobile = useMediaQuery("(max-width: 780px)");

  return (
    // <AppShell
    //   header={<TopBar />}
    //   navbar={mobile ? <></> : <Sidebar />}
    //   style={{ backgroundColor: "#f1f2f7" }}
    // >
    <Layout>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default AdminWrapper;
