import React, { useEffect } from "react";
import {  Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../Page/Dashboard";
import Layout from "../Page/Layout";
import ViewApply from "../Page/ViewApply";
import { useSelector } from "react-redux";


function AdminWrapper() {
  const navigate = useNavigate()
  const {details} = useSelector(state => state.auth)

  useEffect(()=>{
    if(!details.token){
      navigate("/login")
    }else{
      navigate("/employer/dashboard")
    }
  },[details])


  return (
    
    <Layout>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/job/:id" element={<ViewApply />} />
      </Routes>
    </Layout>
  );
}

export default AdminWrapper;
