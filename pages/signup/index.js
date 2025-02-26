import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userSchema } from "@/validation/user";
import { validateForFormik } from "@/utils/api/validation/formik";


function SignUpForm() {
  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <Formik
        initialValues={{ fname: "", lname: "", username: "", email: "", password: "" }}
        validate={validateForFormik(userSchema)}
        onSubmit={async (values) => {
          console.log("in submit")
          await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then(res => res.json()).then(result => {
            alert(result.message)
            console.log(result.data)
          })
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form role="form">
            <div className="inputBox">
              <Field type="text" name="fname" autoComplete="off" required />
              <ErrorMessage name="fname" component="div" className="error" />
              <label>first name</label>
            </div>
            <div className="inputBox">
              <Field type="text" name="lname" autoComplete="off" required />
              <label>Lastname</label>
              <ErrorMessage name="lname" component="div" className="error" />
            </div>

            <div className="inputBox">
              <Field type="text" name="username" autoComplete="off" required />
              <label>Username</label>
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="inputBox">
              <Field type="email" name="email" autoComplete="off" required />
              <label>Email</label>
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="inputBox">
              <Field type="password" name="password" autoComplete="off" required />
              <label>Password</label>
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" className="register-btn" disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;