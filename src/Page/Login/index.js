import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EmployerConfigAPI from "../../Service/employer";
import { Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../Redux/Auth/action";

function Login() {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");

  const initialState = {
    business_email: "",
    password: "",
  };

  const SignUpDetails = { ...initialState };

  const validationSchema = Yup.object().shape({
    business_email: Yup.string()
      .email("Invalid Email")
      .required("Business Email Address is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...SignUpDetails,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        let payload= {
            ...values,
            password: btoa(values?.password)
        }
        try{
      const response = await EmployerConfigAPI.loginEmployer(payload);
      if (response.data.status) {
       
        dispatch(AuthActions.login(response.data.data));
        navigate("/employer/dashboard");
      } else {
        setSnackBarOpen(true);
        setError(response.data.message);
      }
    }catch(err){
        console.log(err)
        setSnackBarOpen(true);
        setError(err.message);
    }
    },
  });

  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center ">
        {/* ^ Added 'h-screen' to make it full-screen and 'flex justify-center items-center' to center vertically and horizontally */}
        <div className="grid grid-cols-1 gap-4 border-y border-x rounded-md border-inherit px-8 py-5 w-4/12">
          <p className="text-2xl font-bold">Employer Sign-In</p>
          <div className=" grid px-8 py-4 flex-wrap gap-6 ">
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
            If you don't have an account. Click here{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign-Up
            </span>
          </p>
        </div>
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={()=>{setSnackBarOpen(false)}}
        message={error}
      />
    </React.Fragment>
  );
}

export default Login;
