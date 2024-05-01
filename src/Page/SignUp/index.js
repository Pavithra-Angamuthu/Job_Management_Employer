import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EmployerConfigAPI from "../../Service/employer";
import { Snackbar } from "@mui/material";

function SignUp() {
  const navigate = useNavigate();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");

  const initialState = {
    business_name: "",
    business_email: "",
    password: "",
    confirm_password: "",
  };

  const SignUpDetails = { ...initialState };

  const validationSchema = Yup.object().shape({
    business_name: Yup.string()
      .required("Business Name is required")
      .min(10, "Username must be at least 10 characters")
      .max(70, "Business Name cannot exceed 70 characters"),
    business_email: Yup.string()
      .email("Invalid Email")
      .required("Business Email Address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...SignUpDetails,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let payload = {
        ...values,
        password: btoa(values?.password),
        confirm_password: btoa(values?.confirm_password),
      };
      const response = await EmployerConfigAPI.createEmployer(payload);
      if (response.data.status) {
        navigate("/login");
      } else {
        setSnackBarOpen(true);
        setError(response.data.message);
      }
    },
  });

  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center ">
        {/* ^ Added 'h-screen' to make it full-screen and 'flex justify-center items-center' to center vertically and horizontally */}
        <div className="grid grid-cols-1 gap-4 border-y border-x rounded-md border-inherit px-8 py-5 w-4/12">
          <p className="text-2xl font-bold">Employer Sign-Up</p>
          <div className=" grid px-8 py-4 flex-wrap gap-6 ">
            <div className=" flex flex-col justify-start ">
              <TextField
                id="Business Name"
                label="Business Name"
                variant="outlined"
                size="small"
                value={formik?.values?.business_name}
                onChange={(e) => {
                  formik.setFieldValue("business_name", e.target.value);
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.business_name && formik.errors.business_name && (
                <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
                  {formik.errors.business_name?.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                id="Business Email"
                label="Business Email"
                variant="outlined"
                size="small"
                value={formik?.values?.business_email}
                onChange={(e) => {
                  formik.setFieldValue("business_email", e.target.value);
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.business_email &&
                formik.errors.business_email && (
                  <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
                    {formik.errors.business_email?.toString()}
                  </p>
                )}
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                id="Password"
                label="Password"
                variant="outlined"
                size="small"
                value={formik?.values?.password}
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
                  {formik.errors.password?.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                id="Confirm Password"
                label="Confirm Password"
                variant="outlined"
                size="small"
                value={formik?.values?.confirm_password}
                onChange={(e) => {
                  formik.setFieldValue("confirm_password", e.target.value);
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
                    {formik.errors.confirm_password?.toString()}
                  </p>
                )}
            </div>
          </div>

          <div className="">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                formik?.handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
          <p className="text-sm">
            Already have an account. Click here{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign-In
            </span>
          </p>
        </div>
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

export default SignUp;
