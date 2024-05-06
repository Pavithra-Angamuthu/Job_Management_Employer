/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import JobApplyConfigAPI from "../../Service/jobApply";
import ViewApplicationDetails from "../Component/viewApplication";

function ViewApply() {
  const [applicationList, setApplicationList] = useState([]);
  const id = window.location.pathname.split("/")[3]

  async function getOpeningBasedOnOpening(){
    await JobApplyConfigAPI.getJobApplyBasedOnOpening({job_id:  id}).then(res=>{
        setApplicationList(res.data.data)
    })
  }

  useEffect(()=>{
    getOpeningBasedOnOpening()
  },[id]);

  return (
    <React.Fragment>
        <div className=" text-left text-l font-bold pt-5">Application Against Job Openings </div>
        <div className="pt-8">
        {
            applicationList.length> 0?
            <ViewApplicationDetails  data={applicationList}/> :<div className="h-2/4">No Application Found</div>
        }
   </div>
    
    </React.Fragment>
  );
}

export default ViewApply;
