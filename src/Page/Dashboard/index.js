/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "../Component/card";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox
} from "@mui/material";
import AddOpening from "./addOpening";
import JobOpeningConfigAPI from "../../Service/jobopening";
import { useSelector } from "react-redux";
import PagePagination from "../Component/pagination";
import { department, experience, location } from "./const";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const { details } = useSelector((state) => state.auth);
  const [openingList, setOpeningList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectJob, setSelectJob] = useState({});
  const [searchName, setSearchName] = useState("");
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selectSpecialization, setSelectSpecialization] = React.useState([]);
  const [filter, setFilter] = useState({is_remote:false});

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

  const handleDrawerClose = (status = "close") => {
    setIsEdit(false);
    setSelectJob({});
    if (status === "close") {
      setOpen(false);
    }
  };


  async function getOpeningBasedOnEmp() {
    await JobOpeningConfigAPI.getOpeningsBasedOnEmp({
      emp_id: details._id,
      title: searchName,
      ...filter,
      skip: limit * (page - 1),
      limit: limit,
    }).then((res) => {
      console.log(res);
      setOpeningList(res.data.data.data);
      setTotalPageCount(res.data.data.count);
    });
  }

  console.log(filter.department);

  useEffect(() => {
    getOpeningBasedOnEmp();
  }, [open, searchName, limit, page, filter]);

  return (
    <React.Fragment>
      <div className="h-full bg-slate-50">
        <div className="text-left text-l font-bold pt-5">Job Openings </div>
        <div className="flex flex-warp justify-between pb-5 pt-8">
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            size="small"
            placeholder="Filter"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className="flex flex-row w-3/4 gap-5">
            <FormControl className="w-full">
              <InputLabel size="small">Department</InputLabel>
              <Select
                id="department"
                size="small"
                label="Department"
                value={filter?.department ? filter.department : ""}
                onChange={(e) => {
                  setSelectSpecialization(
                    department.find(
                      (data) => data.department === e.target.value
                    )?.specialization
                  );
                  let temp = { ...filter };
                  temp["department"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {department.map((data) => {
                  return (
                    <MenuItem value={data.department}>
                      {data.department}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className="w-full">
              <InputLabel size="small">Specialization</InputLabel>
              <Select
                id="Specialization"
                size="small"
                label="Specialization"
                value={filter?.specialization ? filter.specialization : ""}
                onChange={(e) => {
                  let temp = { ...filter };
                  temp["specialization"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {selectSpecialization.map((items) => {
                  return <MenuItem value={items}>{items}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel size="small" className="">
                Location
              </InputLabel>

              <Select
                id="Location"
                size="small"
                label="Location"
                placeholder="Location"
                value={filter?.location ? filter.location : ""}
                onChange={(e) => {
                  let temp = { ...filter };
                  temp["location"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {location.map((items) => {
                  return <MenuItem value={items}>{items}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel size="small">Experience</InputLabel>

              <Select
                id="Experience"
                size="small"
                label="Experience"
                value={filter?.experience ? filter.experience : ""}
                onChange={(e) => {
                  let temp = { ...filter };
                  temp["experience"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {experience.map((items) => {
                  return <MenuItem value={items}>{items}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControlLabel
            label="Remote"
            control={
              <Checkbox
                checked={filter.is_remote}
                onChange={(_, e) => {
                    let temp = { ...filter };
                    temp["is_remote"] = e;
                    setFilter(temp);
                }}
              />
            }
          />
            <Button
              variant="contained"
              size="small"
              className="w-1/2"
              onClick={() => {
                handleDrawerOpen();
              }}
            >
              Add Opening
            </Button>
            <div
              onClick={() => {
                setFilter({});
              }}
            >
              <RestartAltIcon />
            </div>
          </div>

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
                title={isEdit ? "Edit" : "Add"}
                close={handleDrawerClose}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                selectJob={selectJob}
                setSelectJob={setSelectJob}
              />
            </div>
          </Drawer>
        </div>
        {openingList.length > 0 ? (
          <Card
            data={openingList}
            openDrawer={handleDrawerOpen}
            setIsEdit={setIsEdit}
            setSelectJob={setSelectJob}
            isEdit={isEdit}
            getOpeningBasedOnEmp={getOpeningBasedOnEmp}
          />
        ) : (
          <div className="h-2/4">No Job Openings Found</div>
        )}

        {openingList.length > 0 ? (
          <PagePagination
            totalPageCount={totalPageCount}
            setLimit={setLimit}
            limit={limit}
            setPage={setPage}
            page={page}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
