var container=document.getElementById("container");
var pageNames=["Weatherify","Notehub","HealthTracker"];
var pageBgImg=["../weatherApp/assets/images/sky.jpg","./notesApp/images/note.png","./healthApp/images/healthIcon.png"];
var pageURLS=["./weatherApp","./notesApp","./healthApp"];
for(var i=0;i<pageNames.length;i++){
    var page=document.createElement("div");
    page.className="pages";
    var link = document.createElement("a");
    link.style.backgroundImage="url("+pageBgImg[i]+")";
    link.style.backgroundRepeat="no-repeat";
    link.style.backgroundPosition="center";
    link.style.backgroundSize="contain";
    link.textContent=pageNames[i];
    link.href = pageURLS[i];
    link.style.textDecoration = "none";
    page.appendChild(link);
    container.appendChild(page);
}



