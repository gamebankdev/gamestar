import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import gamebanek from 'gamebank'
import {message} from 'antd'
import errorFun from './utils/error'
// 1. Initialize
const app = dva({
    history:createHistory({
        basename:"/"
    }),
    onError(e){
        message.error(errorFun(e.message))
    },
});
// 2. Plugins
// app.use({});
// 3. Model
app.model(require('./models/user').default);
app.model(require('./models/games').default);
app.model(require('./models/walet').default);
app.model(require('./models/global').default);
app.model(require('./models/Post').default);
app.model(require('./models/account').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
