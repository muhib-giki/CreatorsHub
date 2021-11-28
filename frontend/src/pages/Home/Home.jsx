import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import Card from "../../components/shared/Card/Card";
import styles from "./Home.module.css";

const Home = () => {
  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/authenticate");
  };
  return (
    <div className="cardWrapper">
      <Card title="Welcome to CodersHub" icon="wavinghand">
        <p className={styles.text}>
          We are pleased to have you here in CodersHub. Here we get together to
          form an army of thinkers and creators.
        </p>

        <div>
          <Button text="Let's Go" onClick={handleRegister}></Button>
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
