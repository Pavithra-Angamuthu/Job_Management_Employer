import React, { useEffect, useState } from "react";
import Card from "../Component/card";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Drawer, TextField } from "@mui/material";
import AddOpening from "./addOpening";
import JobOpeningConfigAPI from "../../Service/jobopening";
import { useSelector } from "react-redux";

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const {details }  = useSelector((state) => state.auth);
  const [openingList, setOpeningList] = useState([]);
  console.log("-->> details : ", details)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function getOpeningBasedOnEmp(){
    await JobOpeningConfigAPI.getOpeningsBasedOnEmp({emp_id: details._id}).then(res=>{
        console.log(res)
        setOpeningList(res.data.data)
    })
  }

  useEffect(()=>{
    getOpeningBasedOnEmp()
  },[]);

  return (
    <React.Fragment>
      <div className="flex justify-between pb-5">
        <TextField
          id="input-with-icon-textfield"
          variant="outlined"
          size="small"
          placeholder="Filter"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleDrawerOpen();
          }}
        >
          Add Opening
        </Button>

        <Drawer
          sx={{
            width:
              windowWidth === 320
                ? 320
                : windowWidth < 320
                ? windowWidth
                : windowWidth < 700
                ? 300
                : windowWidth < 1000
                ? 400
                : 500,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width:
                windowWidth === 320
                  ? 320
                  : windowWidth < 320
                  ? windowWidth
                  : windowWidth < 700
                  ? 300
                  : windowWidth < 1000
                  ? 400
                  : 500,
            },
          }}
          anchor={"right"}
          open={open}
          onClose={() => {
            handleDrawerClose();
          }}
        >
          <div className="p-5">
            <AddOpening 
            title="Add"
            close={handleDrawerClose}
            />
          </div>
        </Drawer>
      </div>
      <Card  data={openingList}/>
    </React.Fragment>
  );
}

export default Dashboard;
