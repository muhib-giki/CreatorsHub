import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail/StepPhoneEmail.module.css";
import { verifyOtp } from "../../../http";
import { setAuth } from "../../../store/authSlice";

const StepOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const handleOtp = (event) => {
    setOtp(event.target.value);
  };
  const submit = async () => {
    try {
      const { data } = await verifyOtp({
        otp,
        phone: authData.otp.phone,
        hash: authData.otp.hash,
      });
      console.log("data:", data);
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the code you have just received" icon="lock48">
        <TextInput value={otp} onChange={handleOtp} />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit}></Button>
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
