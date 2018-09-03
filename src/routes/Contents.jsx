
import styled from 'styled-components'
import Carousel from '../components/Carousel'
import Tabs  from '../components/Tabs'
import New from '../components/New'
const Content_container = styled.div`
    width: 100%;
`
const Content_content  = styled.div`
    width: 980px;
    margin:0 auto;
    padding-top:30px;
    padding-bottom:40px;
    box-sizing:border-box;
    display:flex;
    justify-content:flex-start;
`
const Content=()=>{
    return(
        <Content_container>
          <Carousel  />
          <Content_content>
            <Tabs /> 
            <New />
          </Content_content>
        </Content_container>
    )
}
export default Content    