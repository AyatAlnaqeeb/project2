import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import don from '../assets/don.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const jordanGovernorates = [
    "Amman", "Irbid", "Zarqa", "Balqa", "Madaba", "Aqaba",
    "Karak", "Tafilah", "Ma'an", "Jerash", "Ajloun", "Mafraq"
  ];

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: ''
  };

  const validationSchema = Yup.object({
    fullName: !isSignIn ? Yup.string().required('Full name is required') : Yup.string(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: !isSignIn ? Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required') : Yup.string(),
    phone: !isSignIn ? Yup.string().required('Phone is required') : Yup.string(),
    country: !isSignIn ? Yup.string().required('Country is required') : Yup.string(),
  });

  const handleSubmit = (values) => {
    toast.success(`${isSignIn ? "Signed in" : "Account created"} successfully!`, {
      position: "top-center"
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-white" style={{ backgroundImage: `url(${don})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="p-4 w-100" style={{ maxWidth: '450px', backgroundColor: "rgba(255, 255, 255, 0.23)", borderRadius: '10px', boxShadow: "0 4px 8px rgb(0, 0, 0)" }}>
        <h4 className="text-center mb-3" style={{ fontSize: "30px", fontFamily: "Arial, sans-serif", color: "#808080" }}>{isSignIn ? "Welcome Back" : "Create Account"}</h4>
        <h5 className="text-center mb-4" style={{ fontSize: "18px", fontFamily: "Arial, sans-serif", color: "#005eff" }}>{isSignIn ? "Sign in to continue to Give & Gather" : "Join our community and start sharing kindness"}</h5>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              {!isSignIn && (
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <Field name="fullName" className="form-control" placeholder="Enter your full name" />
                  <ErrorMessage name="fullName" component="div" className="text-danger" />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              {!isSignIn && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <Field name="phone" className="form-control" placeholder="+962 (Phone Number)" />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Governorate</label>
                    <Field as="select" name="country" className="form-select">
                      <option value="">Select your governorate</option>
                      {jordanGovernorates.map((gov, index) => <option key={index} value={gov}>{gov}</option>)}
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-danger" />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <Field type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Enter password" />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              {!isSignIn && (
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <Field type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">{isSignIn ? "Sign In" : "Create Account"}</button>

              {isSignIn && (
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember" className="ms-2">Remember me</label>
                  </div>
                  <a href="#" className="text-primary">Forgot password?</a>
                </div>
              )}
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <p style={{ fontSize: "14px", fontFamily: "Arial, sans-serif", color: "#808080" }}>
            {isSignIn ? "Don’t have an account?" : "Already have an account?"} {" "}
            <a href="#" className="text-primary" onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "Sign Up" : "Sign In"}</a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Auth;
