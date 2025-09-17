let catSelect=document.getElementById('catSelect');
window.addEventListener('DOMContentLoaded',function(){
    getCategories(catSelect);
    var option=catSelect.value;
    table(document.getElementById('measTable'),option);
    chart(option);
    getSession('store');
});
var base;
var state;
var mode;
let addBtn=document.getElementById("addBtn");
addBtn.addEventListener("click",function(){
    base=document.getElementById("container");
    state=0;
    mode='';
    showDialog(base,state,mode);
});
let addCatBtn=document.getElementById("addCatBtn");
addCatBtn.addEventListener("click",function(){
    base=document.getElementById("container");
    state=0;
    categoryDialog(base,state);
});
catSelect.addEventListener("change",function(){
  var option=catSelect.value;
  localStorage.setItem('store',JSON.stringify(option));
  //console.log(option);
  table(document.getElementById('measTable'),option);
  chart(option);
  setSession('store',option);
});

var logo=document.getElementById('logo');
logo.classList.add('logoBg');