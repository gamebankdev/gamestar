import Topic from '../components/Topic'
import styled from 'styled-components'
import Carousel from '../components/Carousel'
import Tabs  from '../components/Tabs'
import New from '../components/New'
import BackgroundImg from '../assets/page_bg_generated_v6b.jpg'

const Container = styled.div`
    width:940px;
    margin:0 auto;
    min-height:820px;
    padding-top:20px;
`
const BodyContainer=styled.div`
    width:100%;
    /* padding-top:20px; */
`
const ContentContainer=styled.div`
  width:100%;
  background: #1b2838 url(${BackgroundImg}) no-repeat fixed center;
  margin:0 auto;
`
const Content=()=>{

    return(
        <ContentContainer >
        <Container>
            {/* <Topic /> */}
            <BodyContainer>
                {/* <h2 style={{fontSize:'48px',color:'#fff',marginBottom:0}}>正在浏览推荐的游戏</h2>
                <div style={{color:'#9099a1',fontSize:'18px'}}>浏览 GameBank 上最新、最热销和打折的冒险产品</div> */}
                <div style={{marginTop:40}}>
                  <Carousel  />
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:40}}>
                    <div style={{width:616}}>
                      <Tabs /> 
                    </div>
                    <div style={{width:300,paddingLeft:20,boxSizing:'border-box'}}>
                      <h3 style={{color:'#fff'}}>推荐游戏</h3>
                      <New />
                    </div>
                </div>
            </BodyContainer>
        </Container>
    
        </ContentContainer>
    )
}
const mapStateToProps = (state, ownProps) => {
    return { ...state.games }
}
export default Content