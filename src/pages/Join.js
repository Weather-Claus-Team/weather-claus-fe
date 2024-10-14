import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Recaptcha from "../components/Join/Recaptcha";
import Username from "../components/Join/Username";
import Password from "../components/Join/Password";
import Email from "../components/Join/Email";

const Container = styled.div`
  margin: 70px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 40px;
  }
`;

const SignupBox = styled.div`
  width: 30vw;
  background-color: white;
  border-radius: 10px;
  color: black;
  margin-top: 50px;
  padding: 40px 50px;
  h2 {
    font-size: 40px;
    margin-bottom: 10px;
  }
  span {
    color: red;
  }
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  input {
    padding: 13px 15px;
    width: 400px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  input:focus {
    outline-color: #7e8c9e;
  }
`;

const SubmitBtn = styled.button`
  background-color: #39434f;
  color: white;
  width: 90%;
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  font-size: 18px;
  cursor: pointer;
`;

function Join() {
  const { handleSubmit, reset } = useForm();
  const onValid = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Container>
      <Title>
        <Link to="/">
          <h1>Weather Claus</h1>
        </Link>
      </Title>
      <SignupBox>
        <div>
          <h2>Sign up</h2>
          <h5>Create an account for Login</h5>
        </div>
        <SignupForm onSubmit={handleSubmit(onValid)}>
          <Username />
          <Password />
          <Email />
          <Recaptcha />
          <SubmitBtn type="submit">Sign up</SubmitBtn>
        </SignupForm>
      </SignupBox>
    </Container>
  );
}

export default Join;
