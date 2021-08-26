import React from "react";

// components
import {MyTypography} from "../Wrappers/Wrappers";
import styled from "styled-components";

interface PageTitleProps {
    title: string,
    button?: any,
}

const PageTitle: React.FC<PageTitleProps> = (props) => {

    return (
        <Container>
            <HeaderTitle variant="h1" size="sm">
                {props.title}
            </HeaderTitle>
            {props.button && props.button}
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 32px;
  justify-content: space-between;
`

const HeaderTitle = styled(MyTypography)`
  color: #B9B9B9;
`
export default PageTitle
