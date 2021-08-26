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
import {toast} from "react-toastify";
import AdminService from "../../service/adminService";

interface LoginProps extends RouteComponentProps {

}

const Login: React.FC<LoginProps> = (props) => {

    // global
    const userDispatch = useUserDispatch();

    // local
    let [isLoading, setIsLoading] = useState(false);
    let [email, setLoginValue] = useState("admin@flatlogic.com");
    let [password, setPasswordValue] = useState("password");

    function handleLogin() {
        if (!email)
            return toast.warn("please fill email")
        if (!password)
            return toast.warn("please password value")
        setIsLoading(true)
        AdminService.login(email, password).then(res => {
            setIsLoading(false)
            console.log(res);
            loginUser(
                userDispatch,
                res.data.token || "",
            )
            props.history.push('/app/tables')
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
            toast.error(err.response ? err.response.data.message : "Some Error")
        })
    }

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
                            value={email}
                            onChange={e => setLoginValue(e.target.value)}
                            margin="normal"
                            placeholder="Email Adress"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            value={password}
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
                                        email.length === 0 || password.length === 0
                                    }
                                    onClick={handleLogin}
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
