// components/Spinner.tsx

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db; /* Color of the spinner */
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: auto; /* Center spinner */
`;

const Spinner = () => <SpinnerWrapper />;

export default Spinner;
