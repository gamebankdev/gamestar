import List from '../components/myPostsList'
import {connect} from 'dva'
import React from 'react'
class MyPostList extends React.Component{
    componentDidMount(){
        this.props.getAccountMessage()
    }
    render(){
        const {match,content}=this.props
        return(
            <div>
                <div>
                    {
                        Object.values(content).map((item,index)=>  <List {...item} key={index} />)
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return { ...state.accounts.allReplays }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const {userName}=ownProps.match.params
    return {
        getAccountMessage:()=>{
            dispatch({
                type:'accounts/accountReplay',
                path:userName
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyPostList)