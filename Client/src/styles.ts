import styled from "styled-components";

export const colorScheme = {
    main: "#004CBF"
}

export const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 2px solid ${colorScheme.main};
`;

export const Button = styled.button`
width: 55%;
background-color: white;
color: black;
padding: 10px;
margin: 8px 15px;
border: 1px solid ${colorScheme.main};
border-radius: 50px;
cursor: pointer;
font-size: 1.5em;

:hover {
  background-color: #213fea;
}

:focus {
  background-color: #213fea;
  color: white;
}

:disabled {
  background-color: #d4d4d4;
  :hover {
    cursor: not-allowed;
  }
}
`;

export const AuthContainer = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
`;