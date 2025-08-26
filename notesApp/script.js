// Επιλογή DOM στοιχείων
const container = document.getElementById("container");
const content = document.getElementById("content");
const createNoteBtn = document.getElementById("noteBtn");
const settingsBtn = document.getElementById("settingsBtn");
const addNewNoteBg=document.getElementById("addNewNoteBg");
const settingsBg=document.getElementById("settingsBg");
document.title=appName;
document.getElementById("title").innerHTML=appName;
// Φόρτωση stacks από localStorage ή δημιουργία νέων
let notesTitle = createStack("notesTitle");
let notesContent = createStack("notesContent");
let notesId = createStack("notesId");
let notesDate=createStack("notesDate");
var themeSelect=document.getElementById("themeSelect");
var storedTitles;
var storedContents;
var storedId;
var storedDate;
// Αρχική εμφάνιση αποθηκευμένων σημειώσεων
displayNote();
window.addEventListener("DOMContentLoaded",()=>{
    var savedTheme=localStorage.getItem("theme");
    themeSelect.value=savedTheme;
    var savedThemeBg=localStorage.getItem("themeBg");
    var savedColor=localStorage.getItem("color");
    console.log("savedTheme: "+savedTheme, "savedThemeColor: "+savedThemeBg);
    if(savedTheme){
        themeSelect.value=savedTheme;
        container.style.backgroundColor=savedThemeBg;
        container.style.color=savedColor;
    }
});
// Προσθήκη και επεξεργασία σημείωσης
function addNewNoteDialog(id=null) {
    openDialog(addNewNoteBg);
    var noteTitleToEdit=document.getElementById("noteTitle");
    var titleInput=document.getElementById("dialogTitle");
    var contentInput=document.getElementById("noteContentInput");
    var editId=document.getElementById("editId");
    if (editMode(id)) {
        var index = notesId.indexOf(id);
        if(index !== -1){
            noteTitleToEdit.value=notesTitle[index];
            contentInput.value=notesContent[index];
            titleInput.textContent="Επεξεργασία σημείωσης";
            editId.textContent=id;
        }else{
             //Αν δεν βρεθεί το id στη λίστα, θεώρησέ το ως νέα σημείωση
            titleInput.textContent="Προσθήκη νέας σημείωσης";
            editId.textContent = noteId();
            noteTitleToEdit.value="";
            contentInput.value="";
        }
    }else {
        //Κανονική νέα σημείωση
        titleInput.textContent="Προσθήκη νέας σημείωσης";
        editId.textContent = noteId();
    }
}

// Αποθήκευση νέας σημείωσης
function saveNote(title,contentText,id) {
    if (title.trim() === "" && contentText.trim() === "") return;
    const index = notesId.indexOf(id);

    if (index !== -1) {
        // Ενημέρωση υπάρχουσας σημείωσης
        notesTitle[index] = title;
        notesContent[index] = contentText;
    } else {
        // Νέα σημείωση
        pushStart(notesTitle, title);
        pushStart(notesContent, contentText);
        pushStart(notesId, id);
        pushStart(notesDate,createdAt());
    }
    localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
    localStorage.setItem("notesContent", JSON.stringify(notesContent));
    localStorage.setItem("notesId", JSON.stringify(notesId));
    localStorage.setItem("notesDate", JSON.stringify(notesDate));
    closeDialog(addNewNoteBg);
    displayNote();
}

// Προβολή αποθηκευμένων σημειώσεων
function displayNote() {
    storedTitles = JSON.parse(localStorage.getItem("notesTitle") || "[]");
   storedContents = JSON.parse(localStorage.getItem("notesContent") || "[]");
    storedId = JSON.parse(localStorage.getItem("notesId") || "[]");
    storedDate = JSON.parse(localStorage.getItem("notesDate") || "[]");
    let notesHTML="";
    for (let i = 0; i < storedTitles.length; i++) {
        notesHTML += `
            <div class="note">
                <div class="note-body">
                    <h3>${storedTitles[i]}</h3>
                    <p>${storedContents[i]}</p>
                </div>
                <div class="note-actions">
                    <p id="date">${storedDate[i]}</p>
                    <hr>
                    <div class="actionBtns">
                        <button type="button" id="editBtn" onclick="addNewNoteDialog('${storedId[i]}')">✏️</button>
                        <button type="button" id="delBtn" onclick="deleteNote('${storedId[i]}')">X</button>
                    </div>
                </div>
            </div>
        `;
    }
    content.innerHTML = notesHTML;
}
function deleteNote(id) {
    let index = -1;
    for (let i = 0; i < notesId.length; i++) {
        if (notesId[i] === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        notesTitle.splice(index, 1);
        notesContent.splice(index, 1);
        notesId.splice(index, 1);
        localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
        localStorage.setItem("notesContent", JSON.stringify(notesContent));
        localStorage.setItem("notesId", JSON.stringify(notesId));
        displayNote();
    }
}
// Σύνδεση κουμπιού "Add Note" με το dialog
createNoteBtn.addEventListener("click", addNewNoteDialog);
// Κουμπί ρυθμισεων
settingsBtn.addEventListener("click",()=>openDialog(settingsBg));
//Κουμπί αλλαγής theme
themeSelect.addEventListener("change",()=>{
    theme(themeSelect.value);
});
var sortNotes=document.getElementById("sortNotes");
sortNotes.addEventListener("change",()=>{
    var opt=sortNotes.value;
    var N=storedTitles.length;
    var condition;
    for(var i=0;i<N-1;i++){
        console.log("for I"+[i]);
        for(var j=0;j<N-i-1;j++){
            console.log("for J"+[j]);
            if(opt=="atoz"){
                condition=storedTitles[j].toLowerCase()>storedTitles[j+1].toLowerCase();    
            }else if(opt=="ztoa"){
                condition=storedTitles[j].toLowerCase()<storedTitles[j+1].toLowerCase();
            }
            if(condition){
                console.log("inside if");
                [storedDate[j],storedDate[j+1]]=[storedDate[j+1],storedDate[j]];
                [storedTitles[j],storedTitles[j+1]]=[storedTitles[j+1],storedTitles[j]];
                [storedId[j],storedId[j+1]]=[storedId[j+1],storedId[j]];
                [storedContents[j],storedContents[j+1]]=[storedContents[j+1],storedContents[j]];
            }
        }
    }
    console.log("titles:", storedTitles);
    console.log("dates:", storedDate);
    console.log("contents:", storedContents);
    console.log("ids:", storedId);

    localStorage.setItem("notesTitle", JSON.stringify(storedTitles));
     localStorage.setItem("notesDates", JSON.stringify(storedDate));
    localStorage.setItem("notesContent", JSON.stringify(storedContents));
    localStorage.setItem("notesId", JSON.stringify(storedId));
    displayNote();
});

