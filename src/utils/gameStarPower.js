import gameStar from './gameBank'
const  get_gameStar_power =(account,username,properties)=>{
    return new Promise(resolve => {
        var vesting_shares, delegated_vesting_shares, received_vesting_shares, total_vesting_shares = null;
        vesting_shares = account[0].vesting_shares;
        delegated_vesting_shares = account[0].delegated_vesting_shares;
        received_vesting_shares = account[0].received_vesting_shares;

        total_vesting_shares = properties.total_vesting_shares;
        let total_vesting_fund = properties.total_vesting_fund_gbc;
 
        var gameStar_power = gameStar.formatter.vestTogamebank(vesting_shares, total_vesting_shares, total_vesting_fund);
        gameStar_power = Math.floor(gameStar_power*1000)/1000 +' GB';

        resolve({gameStar_power: gameStar_power,});        
    });
}


// example
export default get_gameStar_power

