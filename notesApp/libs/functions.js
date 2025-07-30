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
