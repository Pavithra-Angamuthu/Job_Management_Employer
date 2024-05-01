import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function ViewApplicationDetails(props) {
  console.log("-> props ", props);
  return (
    <React.Fragment>
      <div className="flex grid grid-cols-3 gap-7">
        {props.data.map((item) => {
          return (
            <Card  className="text-left">
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.jobopenings.job_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span className="font-bold">Name :</span> {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span className="font-bold">Qualification :</span> {item.qualification}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span className="font-bold"> Passed out year :</span> {item.passed_out_year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span className="font-bold">Experience :</span> {item.experience}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span className="font-bold"> Email :</span> {item.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span className="font-bold">Phone number :</span> {item.phone_number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <span className="font-bold">Resume :</span> {item.resume}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Share</Button>
      <Button size="small">Learn More</Button> */}
              </CardActions>
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default ViewApplicationDetails;
