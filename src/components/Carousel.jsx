import { Carousel } from 'antd';
import {connect} from 'dva'


const CarouselJSX =({gameList})=>{
    return(
        <Carousel effect="fade" autoplay={true}>
            <div>
                <img src={require('../assets/content_banner.png')} alt=""/>
            </div>
            <div>
                <img src={require('../assets/content_banner.png')} alt=""/>
            </div>
            <div>
                <img src={require('../assets/content_banner.png')} alt=""/>
            </div>
        </Carousel>
    )
}
const mapStateToProps = (state, ownProps) => {
    return { ...state.games }
}
export default connect(mapStateToProps)(CarouselJSX)