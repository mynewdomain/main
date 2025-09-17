function select(name){
   return JSON.parse(localStorage.getItem(name)) || [];
}
function insert(name,List){
   let db=JSON.parse(localStorage.getItem(name)) || [];
   db.push(List);
   console.log(List);
   localStorage.setItem(name,JSON.stringify(db));
}
function addCategories(name,value){
   let db=JSON.parse(localStorage.getItem(name)) || [];
   db.push(value);
   localStorage.setItem(name,JSON.stringify(db));
}
function setSession(name,value){
   localStorage.setItem(name,JSON.stringify(value));
}
function getSession(name){
   return JSON.parse(localStorage.getItem(name)) || [];
}
function updateDB(category, index, dbList){
    let db = select(category);
    db[index] = dbList;  // Replace the specific row
    localStorage.setItem(category, JSON.stringify(db));
}
function deleteFromDB(category, index){
   let db = select(category);
   db.splice(index, 1); // remove row
   localStorage.setItem(category, JSON.stringify(db));
}
function dropCategory(name){
   localStorage.removeItem(name);
}