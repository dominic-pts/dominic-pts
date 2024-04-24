import React from 'react'
import styled from "styled-components";

export default function Error() {
  return (
    <Container>
      <h1>Wrong Path</h1>
      <div></div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 50px;
justify-content: center;
align-items: center;
height: 100vh;
div {
  position: relative;
  width: 5em;
  height: 5em;
  border: 3px solid #3cefff;
  overflow: hidden;
  animation: spin 3s ease infinite;
}

div::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  width: 5em;
  height: 5em;
  background-color: hsla(185, 100%, 62%, 0.75);
  transform-origin: center bottom;
  transform: scaleY(1);
  animation: fill 3s linear infinite;
}

@keyframes spin {
  50%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fill {
  25%,
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
`;