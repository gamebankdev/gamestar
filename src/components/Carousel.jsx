import { Carousel } from 'antd';
import {connect} from 'dva'
const CarouselJSX =({gameList})=>{
    return(
        <Carousel effect="fade" autoplay={true}>
            {
                gameList[0].banner?
                JSON.parse(gameList[0].banner).map((item,index)=>{
                    return  <div key={index}>
                    <img style={{width:'100%'}} src={item} alt=""/>
                </div>
                }):null
            }
        </Carousel>
    )
}
const mapStateToProps = (state, ownProps) => {
    return { ...state.games }
}
export default connect(mapStateToProps)(CarouselJSX)