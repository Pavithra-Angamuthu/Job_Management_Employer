import React, { useState } from "react";
import {
  Button,
  Drawer,
  Chip,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Option as BaseOption, Option, optionClasses } from "@mui/base/Option";
import JobOpeningConfigAPI from "../../Service/jobopening";
import { useSelector } from "react-redux";

function AddOpening(props) {
  const { title } = props;
  const [selectSpecialization, setSelectSpecialization] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");
  const {details  }  = useSelector((state) => state.auth);

  const initialState = {
    emp_id: details._id, 
    job_title: "",
    department: "",
    specialization: "",
    location: [],
    is_remote: false,
    experience: "",
    keywords: [],
    skills: "",
    job_description: "",

  };

  const department = [
    {
      department: "Engineering",
      specialization: ["Development", "Quality Assurance", "Business Analysis"],
    },
    {
      department: "Human Resources",
      specialization: ["Recruitment", "Employee relations"],
    },
    { department: "Marketing", specialization: ["Digital Marketing", "SEO"] },
    { department: "Accounting & Finance", specialization: "" },
  ];

  const location = ["Chennai", "Coimbatore", "Erode"];

  const experience = [
    "fresher",
    "< 1 year",
    "< 2 years",
    "< 3years",
    "< 4 years",
    "< 5 years",
    "> 5 years",
  ];

  const opeingDetails = { ...initialState };

  const validationSchema = Yup.object().shape({
    job_title: Yup.string()
      .required("Job Title is required")
      .min(10, "Job Title must be at least 10 characters")
      .max(40, "Job Title cannot exceed 40 characters"),
    department: Yup.string().required("Department is required"),
    specialization: Yup.string().required("Specialization is required"),
    experience: Yup.string().required("Experience is required"),
    skills: Yup.string().required("Skills is required"),
    job_description: Yup.string()
      .required("Job Description  is required")
      .min(50, "Job Title must be at least 50 characters")
      .max(2000, "Job Title cannot exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      ...opeingDetails,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let payload = {
            ...values,
            keywords: tags
        }
        const response = await JobOpeningConfigAPI.createOpening(values);
        console.log(response.data);
        if (response.data.status) {
          props.close();
        } else {
          setSnackBarOpen(true);
          setError(response.data.message);
        }
      } catch (err) {
        console.log(err);
        setSnackBarOpen(true);
        setError(err.message);
      }
    },
  });

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <React.Fragment>
      <div className="font-bold">{title} Opening</div>
      <div className=" grid grid-cols-2 py-4 flex-wrap gap-6 ">
        <div className="flex flex-col justify-start">
          <p>Job Title</p>
          <TextField
            id="job_title"
            placeholder="Enter the Job Title"
            variant="outlined"
            size="small"
            value={formik?.values?.job_title}
            onChange={(e) => {
              formik.setFieldValue("job_title", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.job_title && formik.errors.job_title && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.job_title?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>Department</p>
          <Select
            id="department"
            size="small"
            placeholder="Department"
            value={formik?.values?.department}
            onChange={(e) => {
              setSelectSpecialization(
                department.find((data) => data.department === e.target.value)
                  ?.specialization
              );
              formik.setFieldValue("department", e.target.value);
            }}
          >
            {department.map((data) => {
              return (
                <MenuItem value={data.department}>{data.department}</MenuItem>
              );
            })}
          </Select>

          {formik.touched.department && formik.errors.department && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.department?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>Specialization</p>
          <Select
            id="Specialization"
            size="small"
            placeholder="Specialization"
            value={formik?.values?.specialization}
            onChange={(e) => {
              formik.setFieldValue("specialization", e.target.value);
            }}
          >
            {selectSpecialization.map((items) => {
              return <MenuItem value={items}>{items}</MenuItem>;
            })}
          </Select>

          {formik.touched.specialization && formik.errors.specialization && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.specialization?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>Location</p>
          <Select
            id="Location"
            size="small"
            placeholder="Location"
            multiple
            value={formik?.values?.location}
            onChange={(e) => {
              formik.setFieldValue("location", e.target.value);
            }}
          >
            {location.map((items) => {
              return <MenuItem value={items}>{items}</MenuItem>;
            })}
          </Select>

          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.location?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start">
          <FormControlLabel
            label="Is Remote"
            control={
              <Checkbox
                checked={formik.values.is_remote}
                onChange={(_, e) => {
                  console.log(e);
                  formik.setFieldValue("is_remote", e);
                }}
              />
            }
          />
        </div>

        <div className="flex flex-col justify-start">
          <p>Experience</p>
          <Select
            id="Experience"
            size="small"
            placeholder="Experience"
            value={formik?.values?.experience}
            onChange={(e) => {
              formik.setFieldValue("experience", e.target.value);
            }}
          >
            {experience.map((items) => {
              return <MenuItem value={items}>{items}</MenuItem>;
            })}
          </Select>

          {formik.touched.experience && formik.errors.experience && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.experience?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start">
          <p>Keywords</p>
          <TextField
            id="keywords"
            size="small"
            placeholder="Type and Press Enter"
            variant="outlined"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="flex flex-col justify-start">
          <p>Skills</p>
          <TextField
            id="Skills"
            placeholder="Enter the Skills"
            variant="outlined"
            size="small"
            value={formik?.values?.skills}
            onChange={(e) => {
              formik.setFieldValue("skills", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.skills && formik.errors.skills && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.skills?.toString()}
            </p>
          )}
        </div>
        {tags.length > 0 ? (
          <div className="col-span-2">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={handleDeleteTag(tag)}
                style={{ margin: "5px" }}
              />
            ))}
          </div>
        ) : null}
        <div className="col-span-2">
          <p>Job Description</p>
          <TextField
            id="Job Description"
            placeholder="Enter the Job Description"
            variant="outlined"
            value={formik?.values?.job_description}
            multiline
            rows={4}
            className="w-full"
            onChange={(e) => {
              formik.setFieldValue("job_description", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.job_description && formik.errors.job_description && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.job_description?.toString()}
            </p>
          )}
        </div>
      </div>
      <div class="flex gap-5 justify-end">
        <Button
          variant="contained"
          className="b-0 "
          onClick={() => {
            formik?.handleSubmit();
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          className="b-0 "
          onClick={() => {
            formik?.handleSubmit();
          }}
        >
          Save and Add Another
        </Button>
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

export default AddOpening;
