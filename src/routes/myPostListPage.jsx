import List from '../components/myPostsList'
import {connect} from 'dva'
import React from 'react'

class MyPostList extends React.Component{
    componentDidMount(){
        this.props.getAccountPost()
    }
    render(){
        const {content,userReputation}=this.props
        return(
            <div>
                <div>
                    {
                        Object.values(content).map((item,index)=>{
                            if(item.parent_author==""){
                                return   <List key={index} {...item} userReputation={userReputation} />
                            }else{
                                return null
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {...state.accounts.allPost,...{userReputation:state.accounts.userReputation}}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAccountPost:()=>{
            dispatch({
                type:'accounts/accountPosting',
                userName:ownProps.match.params.userName
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyPostList) 