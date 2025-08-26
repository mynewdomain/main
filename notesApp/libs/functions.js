function editMode(id){
    if(id!=null){
        return true;
    }
    return false;
}
function noteId(){
    return Date.now().toString();
}
function createdAt(){
    var d=new Date();
    var day=d.getDate();
    var month=d.getMonth()+1;
    var year=d.getFullYear();
    var hours=d.getHours();
    var minutes=d.getMinutes();
    console.log(hours,minutes);
    if(hours<10){
        hours="0"+hours;
    }
    if(minutes<10){
        minutes="0"+minutes;
    }
    var time=hours+":"+minutes;
    var date=day+"/"+month+"/"+year+" "+time;
    return date;
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
    var theme;
    var bg;
    var mainColor;
    var title;
    if(opt=="light"){
        bg="rgb(240, 240, 240)";
        mainColor="black";
        title="black";
        theme=opt;
    }else if(opt=="dark"){
        bg="black";
        mainColor="black";
        theme=opt;
    }else{
        bg="cyan";
        mainColor="black";
        theme=opt;
    }
    localStorage.setItem("themeBg",bg);
    localStorage.setItem("color",mainColor);
    localStorage.setItem("theme",theme);
    var theme=localStorage.getItem("theme");
    var back=localStorage.getItem("themeBg");
    var color=localStorage.getItem("color");
    container.style.backgroundColor=back;
    container.style.color=color;
}
function toDate(dateString) {
    var dateObj = dateString.split(" ");
    var date = dateObj[0];
    var time = dateObj[1];
    var splittedDate = date.split("/");
    var splittedTime = time.split(":");
    var day = parseInt(splittedDate[0], 10);
    var month = parseInt(splittedDate[1], 10) - 1; // JS months are 0-based
    var year = parseInt(splittedDate[2], 10);
    var hours = parseInt(splittedTime[0], 10);
    var minutes = parseInt(splittedTime[1], 10);
    return new Date(year, month, day, hours, minutes);
}
