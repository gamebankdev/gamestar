import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';

import {message} from 'antd'
// 1. Initialize
const app = dva({
    onError(e,dispatch){

        message.error(e.message)
    },
    history:createHistory({
        basename:"/"
    })

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
