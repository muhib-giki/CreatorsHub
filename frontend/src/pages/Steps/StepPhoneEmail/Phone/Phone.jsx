import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import styles from "../StepPhoneEmail.module.css";
const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  async function submit() {
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log("data:", data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
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
