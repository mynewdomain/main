// Επιλογή DOM στοιχείων
const container = document.getElementById("container");
const content = document.getElementById("content");
const createNoteBtn = document.getElementById("noteBtn");
const settingsBtn = document.getElementById("settingsBtn");

// Φόρτωση stacks από localStorage ή δημιουργία νέων
let notesTitle = createStack("notesTitle");
let notesContent = createStack("notesContent");
let notesId = createStack("notesId");
// Προβολή παραθύρου προσθήκης σημείωσης
function addNewNoteDialog(id=null) {
    const window = `
        <div id="addNewNoteBg">
            <div id="addNewNote">
                <div id="dialogHeader">
                    <div id="editId" style="display:none;"></div>
                    <h2 id="dialogTitle"></h2>
                    <button type="button" id="closeBtn" onclick="closeNoteDialog()">X</button>
                </div>
                <div id="dialogContent">
                    <input type="text" id="noteTitle"  class="inputs margins" placeholder="note title">
                    <br>
                    <textarea id="noteContentInput" class="inputs margins" placeholder="write your note here"></textarea>
                </div>
                <div id="dialogMenu">
                    <button type="button" id="cancelBtn" class="buttons" onclick="closeNoteDialog()">Cancel</button>
                    <button type="button" id="SaveBtn" class="buttons"
                        onclick='saveNote(
                            document.getElementById("noteTitle").value,
                            document.getElementById("noteContentInput").value,
                            document.getElementById("editId").textContent
                        )'>
                        Save
                    </button>
                </div>
            </div>
        </div>
    `;
    content.innerHTML = window;
    var noteTitleToEdit=document.getElementById("noteTitle");
    var titleInput=document.getElementById("dialogTitle");
    var contentInput=document.getElementById("noteContentInput");
    var editId=document.getElementById("editId");
    if (editMode(id)) {
        var index = notesId.indexOf(id);
        if(index !== -1){
            noteTitleToEdit.value=notesTitle[index];
            contentInput.value=notesContent[index];
            titleInput.textContent="Edit Note";
            editId.textContent=id;
        }else{
             //Αν δεν βρεθεί το id στη λίστα, θεώρησέ το ως νέα σημείωση
            titleInput.textContent="Add new note";
            editId.textContent = noteId();
        }
    }else {
    //Κανονική νέα σημείωση
    titleInput.textContent = "Add new note";
    editId.textContent = noteId();
}
}

// Κλείσιμο του dialog
function closeNoteDialog() {
    const dialog = document.getElementById("addNewNoteBg");
    if (dialog) dialog.remove();
    displayNote();
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
    closeNoteDialog();
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
// Αρχική εμφάνιση αποθηκευμένων σημειώσεων
displayNote();