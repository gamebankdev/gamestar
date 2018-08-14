import { Tabs } from 'antd';
import '../style/Tab.css'
import GameList from '../components/GameList'
const TabPane = Tabs.TabPane;

const TabsJsx = () =>{
    return(
        <div className="card-container">
            <Tabs type="card" animated={true} tabBarStyle={{color:'#4f94bc'}}>
                <TabPane tab="新品游戏" key="1">
                    <GameList />
                </TabPane>
            </Tabs>
        </div>
    )
}
export default TabsJsx