// Επιλογή DOM στοιχείων
const container = document.getElementById("container");
const content = document.getElementById("content");
const createNoteBtn = document.getElementById("noteBtn");
const settingsBtn = document.getElementById("settingsBtn");
const addNewNoteBg=document.getElementById("addNewNoteBg");
const settingsBg=document.getElementById("settingsBg");
// Φόρτωση stacks από localStorage ή δημιουργία νέων
let notesTitle = createStack("notesTitle");
let notesContent = createStack("notesContent");
let notesId = createStack("notesId");
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
    }
    localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
    localStorage.setItem("notesContent", JSON.stringify(notesContent));
    localStorage.setItem("notesId", JSON.stringify(notesId));
    closeDialog(addNewNoteBg);
    displayNote();
}

// Προβολή αποθηκευμένων σημειώσεων
function displayNote() {
    const storedTitles = JSON.parse(localStorage.getItem("notesTitle") || "[]");
    const storedContents = JSON.parse(localStorage.getItem("notesContent") || "[]");
    const storedId = JSON.parse(localStorage.getItem("notesId") || "[]");
    let notesHTML = "";

    for (let i = 0; i < storedTitles.length; i++) {
        notesHTML += `
            <div class="note">
                <div id="storedNotesActions">
                    <button type="button" id="editBtn" onclick="addNewNoteDialog('${storedId[i]}')">✏️</button>
                    <button type="button" id="delBtn" onclick="deleteNote('${storedId[i]}')">X</button>
                </div>
                <h3>${storedTitles[i]}</h3>
                <p>${storedContents[i]}</p>
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
var themeSelect=document.getElementById("themeSelect");
themeSelect.addEventListener("change",()=>{
    theme(themeSelect.value);
});
// Αρχική εμφάνιση αποθηκευμένων σημειώσεων
displayNote();
window.addEventListener("DOMContentLoaded",()=>{
    var savedTheme=localStorage.getItem("theme");
    var savedColor=localStorage.getItem("color");
    if(savedTheme){
        container.style.backgroundColor=savedTheme;
        container.style.color=savedColor;
        if(savedTheme=="light"){
            themeSelect.value="white";
        }else if(savedTheme=="dark"){
            themeSelect.value="black";
        }else{
             themeSelect.value="default";
        }
        
    }
});
