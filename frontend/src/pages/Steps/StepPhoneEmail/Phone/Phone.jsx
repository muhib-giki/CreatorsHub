import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import styles from "../StepPhoneEmail.module.css";
const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  async function submit() {
    const response = await sendOtp({ phone: phoneNumber });
    console.log("response :", response && response);
  }

  return (
    <Card title="Enter your phone number" icon="telephone">
      <TextInput value={phoneNumber} onChange={handlePhoneNumber} />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit}></Button>
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you are agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
