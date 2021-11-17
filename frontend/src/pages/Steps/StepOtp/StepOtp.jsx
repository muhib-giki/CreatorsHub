import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail/StepPhoneEmail.module.css";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const handleOtp = (event) => {
    setOtp(event.target.value);
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the code you have just received" icon="lock48">
        <TextInput value={otp} onChange={handleOtp} />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={onNext}></Button>
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you are agreeing to our Terms of Service
            and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StepOtp;
