import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffffff;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;

  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
`;

function Loader() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default Loader;
