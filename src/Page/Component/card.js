import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Button, Snackbar } from "@mui/material";
import JobOpeningConfigAPI from "../../Service/jobopening";

function CardDetails(props) {
  const navigate = useNavigate();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");

  const  deleteJob = async (status, id)=> {
   const response = await JobOpeningConfigAPI.updateOpening({status: status, _id: id});
   if (response.data.status) {
    setSnackBarOpen(true);
    setError(response.data.message);
    props.getOpeningBasedOnEmp();
  } else {
    setSnackBarOpen(true);
    setError(response.data.message);
  }
  }

  return (
    <React.Fragment>
      <div className="flex grid grid-cols-3 gap-7 text-left">
        {props.data.map((item) => {
          return (
            <Card>
              <CardContent
                onClick={() => {
                  navigate(`/employer/job/${item._id}`);
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {item.job_title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="text-left"
                >
                  {item.job_description}
                </Typography>
              </CardContent>
              <CardActions className="flex justify-end">
                <Button
                  size="small"
                  variant="contained"
                  disabled={!item.status}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setSelectJob(item);
                    props.setIsEdit(true);
                    props.openDrawer();
                  }}
                >
                  Edit
                </Button>
                <Button size="small" variant="contained" onClick={() =>{deleteJob(!item.status, item._id)}}>
                  {  !item.status? "Active" :"De-Active"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackBarOpen(false);
        }}
        message={error}
      />
    </React.Fragment>
  );
}

export default CardDetails;
