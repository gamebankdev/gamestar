
function recursion (content){
    return new Promise((resolve,reject)=>{
        let parent = []
        Object.values(content).forEach(item=>{
            if(item.parent_author==""){
                item.child=[]
                parent.push(item)
            }
        })
        parent.forEach((item,index) => {
            getArray(item,index)
        })
    
        function getArray(item,index) {
            let now = item.replies;
            now.map(v => {
                parent[index].child.push(content[v])
                if(content[v].replies.length>0){
                    getArray(content[v],index)
                }
            })
        }
        resolve(parent)
    })
}
export default recursion