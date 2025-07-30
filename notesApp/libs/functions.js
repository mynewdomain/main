function editMode(id){
    if(id!=null){
        return true;
    }
    return false;
}
function noteId(){
    return Date.now().toString();
}