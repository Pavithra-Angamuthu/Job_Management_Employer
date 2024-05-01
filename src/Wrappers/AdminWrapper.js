import React from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "../Page/Dashboard";
import Layout from "../Page/Layout";
import ViewApply from "../Page/ViewApply";




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
      <Route path="/job/:id" element={<ViewApply />} />
      </Routes>
    </Layout>
  );
}

export default AdminWrapper;
