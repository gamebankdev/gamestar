import React from 'react'
import Styled from 'styled-components'
const Container=Styled.div`
    width:100%;
    height:calc(100% - 280px);
    background-color:#f4f4f4;
    background-image: url(${require('../assets/404.png')});
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-position:center;

`
const NotFound=()=>{
    return(
        <Container>


        </Container>
    )
}
export default NotFound