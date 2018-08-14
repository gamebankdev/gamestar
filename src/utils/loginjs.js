import gameStar from './gameBank'
const login = (payload,loginResult)=>{
    return new Promise((resolve,reject)=>{
        const {userName,password}=payload
        // 判断是否是私钥
        const isWif = gameStar.auth.isWif(password);
        /**
         * pubPostingWif  String posting公钥
         * postingPriWif String posting私钥
         * PrivateKeys  Object  生成的密码对象
         * isvalid boolen  密码验证是否可用,
         * ownerPubWif string owner公钥
         * ownerPriWif  string owner私钥
         */
        let pubPostingWif,postingPriWif,PrivateKeys,isvalid,activePriWif,activePubWif,ownerPriWif,ownerPubWif;
        try{
            // 获取posting,active公钥
            pubPostingWif = loginResult[0].posting.key_auths[0][0]
            activePubWif=loginResult[0].active.key_auths[0][0]
            ownerPubWif = loginResult[0].owner.key_auths[0][0]
            // 如果输入的密码是私钥
            if(isWif){
                postingPriWif = password
                activePriWif = password,
                ownerPriWif = password
            //如果输入的是主密码
            }else{
                PrivateKeys = gameStar.auth.getPrivateKeys(userName,password, ['posting','active','memo','owner']);
                postingPriWif=PrivateKeys.posting
                activePriWif=PrivateKeys.active,
                ownerPriWif = PrivateKeys.owner
            }
        }catch(err){
           reject(err)
        }
        try{
          //通过私钥去验证公钥
            isvalid = gameStar.auth.wifIsValid(postingPriWif,pubPostingWif) || gameStar.auth.wifIsValid(activePriWif,activePubWif) ||gameStar.auth.wifIsValid(ownerPriWif,ownerPubWif) 
        }catch(error){ 
            isvalid = false
        }
        if(isvalid == true){
            resolve({
                isLogin:isvalid,
                userName:payload.userName,
                privePostingWif:postingPriWif,
                activePriWif:activePriWif,
                ownerPriWif:ownerPriWif
            })
        }else{
           reject('密码错误，请重新输入')
        } 
    })
}
export default login