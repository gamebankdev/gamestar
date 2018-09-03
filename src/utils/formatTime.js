export default (time)=>{
    const newtimes=new Date(time)
    const year = newtimes.getFullYear()
    const month = newtimes.getMonth()+1
    const day = newtimes.getDate()
    const hours  = newtimes.getHours()
    const minuts  = newtimes.getMinutes()
    return year+"-"+month+"-"+ day+"  "+hours+":"+minuts
}