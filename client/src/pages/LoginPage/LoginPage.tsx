import { useState } from "react";
import SegmentControl from "../../components/SegmentControl/SegmentControl";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import classes from "./LoginPage.module.css";

export default function LoginPage() {
  const [activeForm, setActiveForm] = useState("Login");

  return (
    <div className={classes.container}>
      <div className={classes.imageSection}>
        <img
          src="../../../public/lab.png"
          alt="Laboratory"
          className={classes.image}
        />
        <p className={classes.welcomeMessage}>Welcome to The Lab Report App</p>
      </div>
      <div className={classes.formSection}>
        <div className={classes["segment-control"]}>
          <SegmentControl
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />
          {activeForm === "Login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
