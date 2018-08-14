import styled from 'styled-components'
import React from 'react'
import {connect} from 'dva'
const Container = styled.div`
    padding:20px;
    box-sizing:border-box;
`
const H1Font = styled.h1`
    border-bottom:1px solid rgb(128, 136, 145);
    padding-bottom:10px;
`
class CurationRewards extends React.Component{
    componentDidMount(){
        this.props.getVoteReward()
    }
    render(){

        const {accounts} = this.props
        return(
            <Container>
                <H1Font>投票奖励</H1Font>
                <div style={{display:'flex',justifyContent:'space-between',color:'#333',fontSize:'16px',padding:'20px 0'}}>
                    <h4>预计上周投票奖励</h4>
                    <h4>{Object.values(accounts)[0].curation_rewards} gameStar POWER</h4>
                </div>
                
            </Container>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return { ...state.accounts.Reward }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getVoteReward: () => {
            dispatch({
                type:'accounts/Reward',
                payload:ownProps.match.params.userName
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CurationRewards)