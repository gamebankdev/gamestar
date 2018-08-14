import styled from 'styled-components'
import { Input } from 'antd';
const Search = Input.Search;

const Container = styled.div`
    width:100%;
    background:rgba( 62, 126, 167, 0.8);
    display:flex;
    justify-content:space-between;
`
const Categories = styled.div`
    display:flex;
    justify-content:flex-start;
    font-size:13px;
    p{
      line-height:34px;
      margin-bottom:0;
      color:#d9dadd;
      padding:0 10px;
    },
    
`
const InputSerch = styled.div`
        padding:5px;
        box-sizing:border-box;
        input{
            color:#0e1c25;
            background:#316282;
            border-color:#000
        }
`
const Topic=()=>{
    return(
        <Container>
            <Categories>
              <p>推荐</p>
              {/* <p>休闲</p>
              <p>体育</p>
              <p>冒险</p>
              <p>动作</p>
              <p>模拟</p>
              <p>竞速</p> */}
            </Categories>
            {/* <InputSerch>
                <Search
                    placeholder="搜索游戏"
                    onSearch={value => console.log(value)}
                    style={{ width: 200}}
                    />
            </InputSerch> */}
        </Container>
    )
}
export default Topic