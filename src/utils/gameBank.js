import gamebank from 'gamebank'
import config from '../config'
gamebank.api.setOptions({ url: 'http://www.gbank.pro:5000/API/' })
gamebank.config.set('address_prefix','TST');
gamebank.config.set('chain_id','18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e');
export default gamebank;