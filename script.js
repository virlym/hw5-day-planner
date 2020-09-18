console.log(moment().format());
console.log(moment().format("h A"));

console.log(moment().format("HH"));
var holder = $(".container");

function init(){
    for (i = 9; i < 18; i++){
        var hour = i;
        var split = "AM";
        var status = "present";
        var rowId = ["9am", "10am", "11am", "noon", "1pm", "2pm", "3pm", "4pm", "5pm"];
        var reminderText = "";
        if(i > 12){
            hour -= 12;
        }
        if(i > 11){
            split = "PM";
        }

        if(i < moment().format("HH")){
            status = "past";
        }
        if(i > moment().format("HH")){
            status = "future";
        }
        if(getSavedInfo(rowId[i-9])){
            reminderText = getSavedInfo(rowId[i-9]);
        }
        var newRow = $("<section>");
        newRow.attr("class", `row time-block`);
        newRow.attr("id", `${rowId[i-9]}`);
        var col1 = $("<article>");
        col1.attr("class", "col-mid-2 hour");
        col1.text(`${hour} ${split}`);
        var text = $("<textarea>");
        text.attr("class", `col-md-8 ${status}`);
        text.text(reminderText);
        var save = $("<button>");
        save.attr("class", "col-md-2 saveBtn");
        save.on("click", function(){ 
            saveInfo(($(this).parent().attr("id")), ($.trim($(this).prev().val())));
            resetPage();
         });
        save.text("Save");
        newRow.append(col1);
        newRow.append(text);
        newRow.append(save);
        holder.append(newRow);
    }

        var endRow = $("<section>");
        endRow.attr("class", `row`);
        var emptyOneCol = $("<article>");
        emptyOneCol.attr("class", `col-md-2`);
        var finalCol = $("<div>");
        finalCol.attr("class", `col-md-6`);
        var clear = $("<button>");
        clear.text("clear all");
        clear.attr("class", "btn-block");
        clear.on("click", function() { clearAll() });
        finalCol.append(clear);
        endRow.append(emptyOneCol, finalCol);
        holder.append(endRow);

}

function clearAll(){
    localStorage.clear();
    resetPage();
}

function saveInfo(key, text){
    var storage = JSON.stringify(text);
    localStorage.setItem(key, storage);
}

function resetPage(){
    holder.empty();
    init();
}

function getSavedInfo(key){
    var stored = "";
    if(JSON.parse(localStorage.getItem(key))){
        if((JSON.parse(localStorage.getItem(key)).length !== 0)){
            stored = (JSON.parse(localStorage.getItem(key)));
        }
    }
    return stored;
}

resetPage();