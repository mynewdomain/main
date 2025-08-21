function editMode(id){
    if(id!=null){
        return true;
    }
    return false;
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
function createdAt(){
    var d=new Date();
    var day=d.getDate();
    var month=d.getMonth()+1;
    var year=d.getFullYear();
    var hours=d.getHours();
    var minutes=d.getMinutes();
    if(hours<10 || minutes<10){
        hours="0"+hours;
        minutes="0"+minutes;
    }
    var time=hours+":"+minutes;
    var date=day+"/"+month+"/"+year+" "+time;
    return date;
}
