import styled from 'styled-components'
const Container = styled.div`
    padding:20px;
    box-sizing:border-box;

`
const H1Font = styled.h1`
    border-bottom:1px solid rgb(128, 136, 145);
    padding-bottom:10px;
`
const AuthorRewards = ()=> {
    return(
        <Container>
            <H1Font>作者奖励</H1Font>
            <div style={{display:'flex',justifyContent:'space-between',color:'#333',fontSize:'16px',padding:'20px 0'}}>
                <h4>预计上周作者奖励</h4>
                <h4>0.000 GBC POWER</h4>
            </div>
            <H1Font>作者奖励历史</H1Font>
        </Container>
    )
}
export default AuthorRewards