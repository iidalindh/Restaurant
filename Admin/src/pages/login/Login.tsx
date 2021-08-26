import React, {useState} from "react";
import {Button, CircularProgress, Grid, TextField, Typography,} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
// @ts-ignore
import classnames from "classnames";

// styles

// logo
import logo from "./logo.svg";

// context
import {useUserDispatch} from "../../context/UserContext";
import {loginUser} from "../../context/UserReducers";
import styled from "styled-components";

interface LoginProps extends RouteComponentProps {

}

const Login: React.FC<LoginProps> = (props) => {

    // global
    const userDispatch = useUserDispatch();

    // local
    let [isLoading, setIsLoading] = useState(false);
    let [loginValue, setLoginValue] = useState("admin@flatlogic.com");
    let [passwordValue, setPasswordValue] = useState("password");

    return (
        <Container>
            <LogoTypeContainer>
                <LogoTypeImg src={logo} alt="logo"/>
                <LogotypeText>Restaurant Panel</LogotypeText>
            </LogoTypeContainer>
            <FormContainer>
                <Form>
                    <React.Fragment>
                        <TextField
                            id="email"
                            value={loginValue}
                            onChange={e => setLoginValue(e.target.value)}
                            margin="normal"
                            placeholder="Email Adress"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            value={passwordValue}
                            onChange={e => setPasswordValue(e.target.value)}
                            margin="normal"
                            placeholder="Password"
                            type="password"
                            fullWidth
                        />
                        <FormButtons>
                            {isLoading ? (
                                <LoginLoader size={26}/>
                            ) : (
                                <Button
                                    disabled={
                                        loginValue.length === 0 || passwordValue.length === 0
                                    }
                                    onClick={() =>
                                        loginUser(
                                            userDispatch,
                                            props.history,
                                        )
                                    }
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    Login
                                </Button>
                            )}
                        </FormButtons>
                    </React.Fragment>
                </Form>
            </FormContainer>
        </Container>
    );
}

const Container = styled(Grid)`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`

const LogoTypeContainer = styled.div`
  background-color: #536DFE;
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 960px) {
    width: 50%;
    display: none
  };
`

const LogoTypeImg = styled.img`
  width: 165px;
  margin-bottom: 32px
`

const LogotypeText = styled(Typography)`
  color: white;
  font-weight: 500;
  font-size: 84px;
  @media only screen and (max-width: 960px) {
    font-size: 48px;
  };
`

const FormContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 960px) {
    width: 50%;
  };
`

const Form = styled.div`
  width: 320px
`

const FormButtons = styled.div`
  width: 100%;
  display: flex;
  margin-top: 32px;
  align-items: center;
  justify-content: space-between;
`

const LoginLoader = styled(CircularProgress)`
  margin-left: 32px
`

export default withRouter(Login);
