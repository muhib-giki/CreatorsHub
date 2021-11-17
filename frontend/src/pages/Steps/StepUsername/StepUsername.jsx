import React from "react";

const StepUsername = ({ onNext }) => {
  return (
    <>
      <div>username step</div>
      <button onClick={onNext}> Next</button>
    </>
  );
};

export default StepUsername;
