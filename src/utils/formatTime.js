export default (time)=>{
    
    let newtimes=new Date(time)
    if(time && !time.includes('000Z')){
        newtimes=new Date(newtimes.getTime()+28800000)
    }
    const year = newtimes.getFullYear()
    const month = newtimes.getMonth()+1
    const day = newtimes.getDate()
    const hours  = newtimes.getHours()
    const minuts  = newtimes.getMinutes()
  
    return year+"-"+month+"-"+ day+"  "+hours+":"+minuts

}
export const timeDifference=(time)=>{
    const NowTimestamp=new Date().getTime()
    const acceptTimeStmp=new Date(time).getTime()
    const NowTimeDate=new Date().getDate()
    const acceptTimeDate=new Date(time).getDate()
    if(NowTimestamp>=acceptTimeStmp){
        return '已获得收益'
    }else{
        return `预计${(acceptTimeDate-NowTimeDate)}天后获得`
    }
}

