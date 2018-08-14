import List from '../components/myPostsList'
import {connect} from 'dva'
import React from 'react'
class MyPostList extends React.Component{
    componentDidMount(){
        this.props.getAcountComment()
    }
    render(){
        const {match,content}=this.props
        return(
            <div>
                <div>
                {
                  Object.values(content).map((item,index)=> <List {...item} key={index} />)
                }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {...state.accounts.allComment}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAcountComment:()=>{
            dispatch({
                type:'accounts/accountComment',
                path:ownProps.match.params.userName
            })
        }
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(MyPostList)