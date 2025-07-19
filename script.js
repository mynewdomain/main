var container=document.getElementById("container");
/*var row=document.creatElement("div");
row.style.display="flex";
row.style.flexDirection="row";
row.style.justifyContent="space-around";
row.style.wrap="wrap";
var rowChildren=row.children;
var screenWidth=window.innerWidth;
if(rowChildren.length<screenwidth){

}*/
var pageNames=["Weather App","Notes App",];
var pageURLS=["./weatherApp","./notesApp"]
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