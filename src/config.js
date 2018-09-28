const NODE_ENV=process.env.NODE_ENV

export default {
    gameBankServer: NODE_ENV=='production'?'http://www.gbank.pro:5000/API/':'http://192.168.1.126:5000/API/',
    httpServer:NODE_ENV=='production'?'http://www.gbank.pro:4000/v1/':'http://192.168.1.126:4000/v1/',
    address_prefix:'TST',
    chain_id:'18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e'
}