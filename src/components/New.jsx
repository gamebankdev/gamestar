import { List, Card } from 'antd';
const data = [];
  const New =()=>{
      return(
          <div  style={{background:'rgba( 64, 120, 152, 0.4 )'}}>
            <List
              grid={{ gutter: 16, column:1 }}
              dataSource={data}
              renderItem={item => (
                  <div style={{width:"100%",marginBottom:20}}>
                    <img style={{width:'100%'}} src={require('../assets/header.jpg')} alt=""/>
                  </div> 
              )}
        />
          </div>
        
      )
  }
  export default New