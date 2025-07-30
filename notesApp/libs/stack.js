function createStack(id){
    return JSON.parse(localStorage.getItem(id) || "[]");
}
function pushStart(stack,item){
    stack.unshift(item);
}
function pushEnd(stack,item){
    stack.push(item);
}
function pop(stack){
    return stack.pop();
}
function del(stack,index){
    return stack.pop(index);
}
function isEmpty(stack){
    return stack.length==0;
}