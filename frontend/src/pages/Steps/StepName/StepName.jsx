import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StepName.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { setName as setNameAction } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(useSelector((state) => state.activate.name));
  function nextStep() {
    if (!name) {
      return;
    }
    dispatch(setNameAction(name));
    onNext();
  }
  return (
    <>
      <Card title="What is your full name?" icon="goggle-emoji-48">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
        <div>
          <p className={styles.paragraph}>
            People use real names at Creator'sHub :)!
          </p>
          <div>
            <Button text="Next" onClick={nextStep}></Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepName;
