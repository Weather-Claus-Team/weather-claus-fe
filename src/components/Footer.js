import styled from "styled-components";

const Container = styled.div`
  min-height: 100px;
  margin: 130px 20px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  border: 1px solid rgba(999, 999, 999, 0.5);
  padding: 50px;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 30px;
  }
`;

const Text = styled.div`
  color: gray;
  line-height: 1.4em;
  p {
    margin-top: 20px;
  }
`;

function Footer() {
  return (
    <Container>
      <Logo>
        <h1>Weather</h1>
        <h1>Claus</h1>
      </Logo>
      <Text>
        <span>© 2024 Weather Claus. All rights reserved.</span>
        <p>
          A simple sentence is a single independent clause with a subject and
          predicate. Simple sentences convey a complete thought, but they do not
          contain any dependent clauses. Simple sentence examples Juliet waited
          on her balcony.
        </p>
      </Text>
    </Container>
  );
}

export default Footer;
