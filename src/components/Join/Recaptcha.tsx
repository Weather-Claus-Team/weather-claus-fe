import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import { useSetRecoilState } from "recoil";
import { recaptchaTokenState } from "../../atom";

const RecaptchaBox = styled.div`
  margin: 20px 0;
  @media (max-width: 481px) {
    margin: 5px 0;
    div {
      transform: scale(0.94);
    }
  }
`;

function Recaptcha() {
  const SITE_KEY = process.env.REACT_APP_ReCAPTCHA_SITE_KEY || "";

  const setRecaptchaToken = useSetRecoilState(recaptchaTokenState);

  const handleChange:any = (token: string | ((currVal: string) => string)) => {
    setRecaptchaToken(token);
  };

  return (
    <RecaptchaBox>
      <ReCAPTCHA sitekey={SITE_KEY} onChange={handleChange} />
    </RecaptchaBox>
  );
}

export default Recaptcha;
