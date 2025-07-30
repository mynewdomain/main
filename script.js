var container=document.getElementById("container");
var pageNames=["Weather App","Notes App",];
var pageURLS=["./main/weatherApp","./main/notesApp"]
for(var i=0;i<pageNames.length;i++){
    var page=document.createElement("div");
    page.className="pages";
    var link = document.createElement("a");
    link.textContent=pageNames[i];
    link.href = pageURLS[i];
    link.style.textDecoration = "none";   
    page.appendChild(link);
    container.appendChild(page);
}
