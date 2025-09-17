function categoryDialog(){
    var dialogBg=document.createElement('div');
    dialogBg.id="dialogBg";

    var dialog=document.createElement('div');
    dialog.id="dialog";

    var dialogHeader=document.createElement('div');
    dialogHeader.id="dialogHeader";

    var modeElement=document.createElement('p');
    modeElement.id="mode";

    var closeBtn=document.createElement('button');
    closeBtn.id="close";
    closeBtn.classList.add("closeBtn");
    closeBtn.innerHTML="X";

    var dialogContent=document.createElement('div');
    dialogContent.id="dialogContent";

    var form=document.createElement('form');
    form.id='form1';
    var input=document.createElement('input');
    input.type='text';
    input.id='metrhsh';
    input.placeholder="Δώστε κατηγορία: ";
    var submit=document.createElement('button');
    submit.type='submit';
    submit.id='submitBtn';
    submit.innerHTML="Submit";
    
    //append to DOM
    form.appendChild(input);
    form.appendChild(submit);
    dialogContent.appendChild(form);
    dialogHeader.appendChild(closeBtn);
    dialog.appendChild(dialogHeader);
    dialog.appendChild(dialogContent);
    dialogBg.appendChild(dialog);
    base.insertBefore(dialogBg, base.firstChild);
    if(state==0){
        dialogBg.style.display="flex";
    }else if(state==1){
        dialogBg.style.display="none";
    }
    //let closeBtn=document.getElementById("close");
    closeBtn.addEventListener("click",function(){
        dialogBg.remove();//remove dialog from DOM
        location.reload();
    });
    form.addEventListener("submit",function(event){
        event.preventDefault();
        console.log(input.value);
        addCategory(input.value);
    });
}
function addCategory(cat){
    var opts=JSON.parse(localStorage.getItem('categories')) || [];
    if(!opts.includes(cat)){
        addCategories("categories",cat);
    }else{
        alert("Category already exists");
    }  
}
function getCategories(select){
    var opts=JSON.parse(localStorage.getItem('categories')) || [];
    for(var opt=0;opt<opts.length;opt++){
        var option=document.createElement('option');
        option.value=opts[opt];
        option.innerHTML=opts[opt];
        select.appendChild(option);
    }
}
function getCurrentDate(){
   var d=new Date();
    var day=d.getDate();
    var month=d.getMonth()+1;
    var year=d.getFullYear();
    var hours=d.getHours();
    var minutes=d.getMinutes();
    if(hours<10){
        hours="0"+hours;
    }
    if(minutes<10){
        minutes="0"+minutes;
    }
    var time=hours+":"+minutes;
    var date=day+"-"+month+"-"+year+"-"+time;
    return date;
}
function showDialog(base, state, mode = '', category = '', index = null, rowData = null) {
    let savedCat=JSON.parse(localStorage.getItem("store")) || [];
    // Create dialog elements
    var dialogBg = document.createElement('div');
    dialogBg.id = "dialogBg";

    var dialog = document.createElement('div');
    dialog.id = "dialog";

    var dialogHeader = document.createElement('div');
    dialogHeader.id = "dialogHeader";

    var modeElement = document.createElement('p');
    modeElement.id = "mode";

    var closeBtn = document.createElement('button');
    closeBtn.id = "close";
    closeBtn.classList.add("closeBtn");
    closeBtn.innerHTML = "X";

    var dialogContent = document.createElement('div');
    dialogContent.id = "dialogContent";

    // Create form
    var form = document.createElement('form');
    form.id = 'form1';

    var input1 = document.createElement('input');
    input1.type = 'text';
    input1.id = 'metrhsh';
    input1.placeholder = "Δώστε "+savedCat+":";

    var input2 = document.createElement('input');
    input2.type = 'text';
    input2.id = 'hmeromhnia';
    input2.style.display = "none";
    input2.value=getCurrentDate();
    var select = document.createElement('select');
    select.id = "selectCateg";

    var opts = JSON.parse(localStorage.getItem("categories")) || [];
    for (let i = 0; i < opts.length; i++) {
        var opt = document.createElement('option');
        opt.value = opts[i];
        opt.innerHTML = opts[i];
        select.appendChild(opt);
    }
    var piesh2;
    if (mode == 'edit' && rowData) {
        // Prefill data for editing
        //console.log(rowData);
        input1.value = rowData[0];
        select.value = category;
        input2.value = rowData[rowData.length - 1]; // date
        input2.style.display = "block";
        if (rowData.length > 2) {
            piesh2 = document.createElement('input');
            piesh2.type = 'text';
            piesh2.placeholder = "Δώστε μικρή πίεση";
            piesh2.id = "piesh2";
            piesh2.value = rowData[1];
            form.appendChild(piesh2);
        }
    }
    select.addEventListener("change", function(event) {
        if (event.target.value === "Πίεση" || savedCat=="Πίεση") {
            input1.placeholder = "Δώστε μεγάλη πίεση";
            if (!piesh2) {
                piesh2 = document.createElement('input');
                piesh2.type = 'text';
                piesh2.placeholder = "Δώστε μικρή πίεση";
                piesh2.id = "piesh2";
                form.insertBefore(piesh2, submit);
            }
        } else {
            input1.placeholder = "Δώστε "+savedCat+":";
            if (piesh2) {
                piesh2.remove();
                piesh2 = null;
            }
        }
    });

    var submit = document.createElement('button');
    submit.type = 'submit';
    submit.id = 'submitBtn';
    submit.innerHTML = "Submit";

    // Append elements to form
    form.appendChild(select);
    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(submit);

    dialogContent.appendChild(form);
    dialogHeader.appendChild(modeElement);
    dialogHeader.appendChild(closeBtn);
    dialog.appendChild(dialogHeader);
    dialog.appendChild(dialogContent);
    dialogBg.appendChild(dialog);
    base.insertBefore(dialogBg, base.firstChild);

    dialogBg.style.display = state === 0 ? "flex" : "none";
    modeElement.innerHTML = mode === 'edit' ? 'Επεξεργασία μέτρησης' : 'Εισαγωγή νέας μέτρησης';

    closeBtn.addEventListener("click", function() {
        dialogBg.remove();
        location.reload();
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        var dbList = [input1.value];
        if (piesh2) dbList.push(piesh2.value);
        dbList.push(input2.value); // date
        if (mode == '') {
            insert(select.value, dbList);
        } else if (mode === 'edit' && index !== null) {
           updateDB(select.value, index, dbList); // you implement updateDB to update localStorage
        }
        dialogBg.remove();
        location.reload();
        //table(base, option); // refresh table
    });
}

function table(base,option){
    base.innerHTML = '';
    var categ=select('categories');
    var cat=[];
    for(var r=0;r<categ.length;r++){
        if(option==categ[r]){
            cat.push(categ[r]);
        }
    }
   //console.log(cat,option);
    for(let c=0;c<cat.length;c++){
        var db=select(cat[c]);
        var tbl=document.createElement('table');
        var caption=document.createElement('caption');
        caption.textContent=cat[c];
        caption.classList.add('tblCaption');
        tbl.appendChild(caption);
        const categoryHeaders = {
            "Πίεση": ['Μεγάλη Πίεση','Μικρή Πίεση','Ημερομηνία','Επεξεργασία','Διαγραφή'],
            "Ζάχαρο": ['Μέτρηση','Ημερομηνία','Επεξεργασία','Διαγραφή'],
            "Βάρος": ['Μέτρηση','Ημερομηνία','Επεξεργασία','Διαγραφή']
            // Add more categories here as needed
        };
        var headers=categoryHeaders[cat[c]];
        var thead=document.createElement('tr');
        for(var h=0;h<headers.length;h++){
            var th=document.createElement('th');
            th.textContent=headers[h];
            th.classList.add("tblHr");
            thead.appendChild(th);
        }
        tbl.appendChild(thead);
        for(let i=0;i<db.length;i++){
            let tr=document.createElement('tr');
            tr.id=i;
            let obj=db[i];
            for(let j=0;j<obj.length;j++){
                let td=document.createElement('td');
                td.textContent=obj[j];
                td.classList.add("tblDt");
                tr.appendChild(td);
                if(cat[c]=="Πίεση" && j==0){
                    var moreTd=document.createElement('td');
                    moreTd.textContent=obj[0];
                    moreTd.classList.add("tblDt");
                }
            }
            if(i%2==0){
                tr.classList.add('tblrowsBack');
            }
            let actions=["edit","delete"];
            let actBtns=['✏️','🗑️'];
            for(let a=0;a<actions.length;a++){
                let actionTds=document.createElement('td');
                let actionBtns=document.createElement('button');
                actionBtns.textContent=actBtns[a];
                actionTds.classList.add("tblDt");
                actionBtns.classList.add("tblBtns");
                if(actions[a] === "edit"){
                    actionBtns.addEventListener("click",function(){
                    var base=document.getElementById("container");
                        var state=0;
                        var mode='edit';
                        let category = cat[c];
                        let index = i;
                        let rowData = db[index];
                        console.log("state: "+state,"mode:"+mode,"category: "+category,"index: "+index,"rowData:"+rowData);
                       showDialog(base, state, mode, category, index, rowData);
                    });
                }else if(actions[a] === "delete"){
                    actionBtns.addEventListener("click",function(){
                        let category = cat[c];
                        let index = i;
                        deleteFromDB(category,index);
                        table(base, option); // refresh table
                        chart(option);
                    });
                }
                actionTds.appendChild(actionBtns);
                tr.appendChild(actionTds);
            }
            tbl.appendChild(tr);
            tbl.classList.add("tableProp");
        }
        //append to DOM
        base.appendChild(tbl);
    }
}
function chart(option){
    var categ=select('categories');
    var category=[];
    for(var r=0;r<categ.length;r++){
        if(option==categ[r]){
            category.push(categ[r]);
        }
    }
    switch(category[0]){
        case "Ζάχαρο":
            category.push(120);
            break;
        case "Πίεση":
            category.push(15);
            category.push(8);
            break;
        case "Βάρος":
            category.push(200);
            break;
        default: "";
    }
   console.log(category);
    var chartDiv=document.getElementById('chart');
    chartDiv.innerHTML='';
    var catLen;
    if(category.length>2){
        catLen=category.length-2;
    }else{
        catLen=category.length-1;
    }
    for(var i=0;i<catLen;i++){
        var board=document.createElement('div');
        board.classList.add('board');
        var toolContainer=document.createElement('div');
        toolContainer.classList.add('toolContainer');
        var BarContainer=document.createElement('div');
        BarContainer.classList.add('barContainer');
        var data=select(category[i]);// all measurements for this category
        //console.log(data);
        for(var j=0;j<data.length;j++){// Loop over all rows of data
            var row=data[j];
            // Loop over all values in the row except the last (date)
            for(let ch=0;ch<row.length-1;ch++){
                chartBar=document.createElement('div');
                chartBar.style.height=row[ch]+"%";
                let lim,lim2;
                if(row.length>2){
                    lim=category[1];
                    lim2=category[2];
                    if(ch==0){
                        if(row[ch]<lim){
                            chartBar.style.backgroundColor='green';
                            console.log(row[ch]+"<"+lim);
                        }else{
                            chartBar.style.backgroundColor='red';
                        }
                    }else if(ch==1){
                         if(row[ch]<lim2){
                            chartBar.style.backgroundColor='green';
                            console.log(row[ch]+"<"+lim2);
                        }else{
                            chartBar.style.backgroundColor='red';
                        }
                    }
                    console.log(category[1],category[2]);
                }else{
                    lim=category[1];
                    if(row[ch]<lim){
                       chartBar.style.backgroundColor='green';
                    }else{
                       chartBar.style.backgroundColor='red';
                    }
                    console.log(category[1]);
                }
                chartBar.innerHTML=row[ch];
                chartBar.classList.add('chart');
                BarContainer.appendChild(chartBar);
            }
        }
        board.appendChild(toolContainer);
        board.appendChild(BarContainer);
        chartDiv.appendChild(board);
    }
}