import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateForFormik } from "@/utils/api/validation/formik";
import { loginSchema } from "@/validation/user";
import { useRouter } from "next/router";
function Index() {
  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <Formik
        initialValues={{ identifier: "", password: "" }}
        validate={validateForFormik(loginSchema)}
        onSubmit={async(values) => {
          await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
        }}
        
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="inputBox">
              <Field type="text" name="identifier" autoComplete="off" />
              <label>Username Or Email</label>
              <ErrorMessage name="identifier" component="div" className="error" />
            </div>
            <div className="inputBox">
              <Field type="password" name="password" autoComplete="off" />
              <label>Password</label>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" className="register-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Index;
