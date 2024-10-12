import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";

const RecaptchaBox = styled.div`
  margin: 13px 0;
`;

function Recaptcha() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const SITE_KEY = process.env.REACT_APP_ReCAPTCHA_SITE_KEY;
  const handleChange = (value) => {
    setCaptchaValue(value);
    console.log(value);
  };

  return (
    <RecaptchaBox>
      <ReCAPTCHA sitekey={SITE_KEY} onChange={handleChange} />
    </RecaptchaBox>
  );
}

export default Recaptcha;
