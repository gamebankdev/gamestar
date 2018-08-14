import { List, Avatar, Icon } from 'antd';
import {connect} from 'dva'
import {Link} from 'dva/router'
const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:'内容'
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 ,color:'#c7d5e0' }} />
    <span style={{color:'#c7d5e0'}}>{text}</span>
  </span>
);
const ListJsx=({gameList})=>{
    return(
        <List
        split={true}
        itemLayout="vertical"
        size="large"
        dataSource={gameList}
        renderItem={item => (
          <List.Item
            key={item.id}
            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
            extra={<img width={100} alt="logo" src={item.coverImg } />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<Link to={`/games/trading/${item.id}`} style={{color:'#c7d5e0'}}>{item.gameName}</Link>}
            />
            <div style={{color:'rgb(144, 153, 161)'}}>
            {item.brief}
            </div>
         
          </List.Item>
        )}
      />
    )
}
const mapStateToProps = (state, ownProps) => {
  return {...state.games}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch({
    type:'games/getAllGames',
  })
  return {}
}
export default connect(mapStateToProps,mapDispatchToProps)(ListJsx)