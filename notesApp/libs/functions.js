function editMode(id){
    if(id!=null){
        return true;
    }
    return false;
}
function noteId(){
    return Date.now().toString();
}
function openDialog(bg){
    bg.style.display="flex";
}
function closeDialog(bg) {
    bg.style.display = "none";
    displayNote();
}
function confirmReset() {
  if (confirm("Θες σίγουρα να διαγράψεις ΟΛΕΣ τις σημειώσεις;")) {
    localStorage.clear();
    location.reload();
  }
}
function theme(opt){
    var bg;
    var color;
    if(opt=="light"){
        bg="white";
        color="black";
    }else if(opt=="dark"){
        bg="black";
        color="white";
    }else{
        bg="";
        color="";
    }
    localStorage.setItem("theme",bg);
    localStorage.setItem("color",color);
    var back=localStorage.getItem("theme");
    var color=localStorage.getItem("color");
    console.log(back);
    container.style.backgroundColor=back;
    container.style.color=color;
    
}
