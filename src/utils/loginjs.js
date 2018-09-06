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
        let pubPostingWif,postingPriWif,
            activePubWif, activePriWif,
            ownerPubWif, ownerPriWif,
            memoPubwif,memoPubkey,
            passwordType,isvalid
        try{
            // 获取posting,active,owner公钥
            pubPostingWif = loginResult[0].posting.key_auths[0][0]
            activePubWif=loginResult[0].active.key_auths[0][0]
            ownerPubWif = loginResult[0].owner.key_auths[0][0]
            memoPubkey = loginResult[0].memo_key
            // 如果输入的密码是私钥
            if(isWif){
                if(gameStar.auth.wifIsValid(password,pubPostingWif)){
                    postingPriWif=password;
                    passwordType='posting',
                    isvalid==true
                }else if(gameStar.auth.wifIsValid(password,activePubWif)){
                    activePriWif=password;
                    passwordType='active';
                    isvalid==true
                }else{
                    passwordType='error'
                    isvalid==false
                }
                resolve({
                        isLogin:isvalid,
                        userName:payload.userName,
                        passwordType,
                        postingPriWif,
                        activePriWif,
                        memo_key:memoPubkey
                    })
                
            //如果输入的是主密码
            }else{
               const PrivateKeys = gameStar.auth.getPrivateKeys(userName,password, ['owner','active','posting','memo']);
                postingPriWif=PrivateKeys.posting
                activePriWif=PrivateKeys.active,
                ownerPriWif = PrivateKeys.owner,
                memoPubwif=PrivateKeys.memo
                passwordType='master'
            } 
            isvalid = gameStar.auth.wifIsValid(postingPriWif, pubPostingWif);
         
            isvalid = gameStar.auth.wifIsValid(activePriWif, activePubWif);
           
            isvalid = gameStar.auth.wifIsValid(ownerPriWif, ownerPubWif);
            isvalid = gameStar.auth.wifIsValid(memoPubwif, memoPubkey);
            
            if(isvalid){
                resolve({
                    isLogin:isvalid,
                    userName:payload.userName,
                    passwordType,
                    privePostingWif:postingPriWif,
                    activePriWif:activePriWif,
                    ownerPriWif:ownerPriWif,
                    memo_key:memoPubkey
                })
            }else{
                throw '密码错误'
            }
        }catch(err){
          
           reject(err)
        }
    })
}
export default login