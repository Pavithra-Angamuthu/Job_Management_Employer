import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CardDetails(props) {
  return (
    <React.Fragment>
      <div className="flex grid grid-cols-3 gap-7">
        {props.data.map((item) => {
          return (
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.job_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.job_description}
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

export default CardDetails;
