// Main populating function
function init(){
    // set the current time to the top of the planner
    var currentTime = $("<h2>");
    currentTime.text(moment().format("dddd, MMMM Do YYYY, h:mm a"));
    $("#currentDay").append(currentTime);

    // create a time block for the hours of 9am - 5pm
    for (i = 9; i < 18; i++){
        addTimeBlock(i);
    }

    // add a clear button
    addClear();
}

function addTimeBlock(index){
    // create some base id references
    var rowId = ["9am", "10am", "11am", "noon", "1pm", "2pm", "3pm", "4pm", "5pm"];

    // create a new row with a referenceable id
    var newRow = $("<section>");
    newRow.attr("class", `row time-block`);
    newRow.attr("id", `${rowId[index-9]}`);

    // create a column for the hour
    var col1 = $("<article>");
    col1.attr("class", "col-mid-2 hour");
    col1.text(`${checkHour(index)} ${checkSplit(index)}`);

    // create a column for the notes
    var text = $("<textarea>");
    text.attr("class", `col-md-8 ${checkStatus(index)}`);
    text.text(getSavedInfo(rowId[index-9]));

    // create a column for the save button
    var save = $("<button>");
    save.attr("class", "col-md-2 saveBtn");
    // on click, grab the referenceable id of the row to use as a localStorage key
    // also grab the value in the previous field (the note field), subtracting the white space
    save.on("click", function(){ 
        saveInfo(($(this).parent().attr("id")), ($.trim($(this).prev().val())));
        resetPage();
        });
    save.text("Save");

    // add the columns to the row
    newRow.append(col1);
    newRow.append(text);
    newRow.append(save);

    // add the row to the container
    $(".container").append(newRow);
}

// check if the listed time is in the past, present or future
function checkStatus(hour){
    if(hour < moment().format("HH")){
        return ("past");
    }
    if(hour > moment().format("HH")){
        return ("future");
    }
    return ("present");
}

// get if the time is AM or PM
function checkSplit(hour){
    if(hour > 11){
        return ("PM");
    }
    return ("AM");
}

// convert the index to a usable hour
function checkHour(hour){
    if(hour > 12){
        return (hour - 12);
    }
    return hour;
}

// create a button to clear the page contents
function addClear(){
    // add a new row
    var endRow = $("<section>");
    endRow.attr("class", `row`);

    // create an empty column for spacing purposes
    var emptyOneCol = $("<article>");
    emptyOneCol.attr("class", `col-md-2`);

    // create a column to house the clear button
    var finalCol = $("<div>");
    finalCol.attr("class", `col-md-6`);

    //create the clear button
    var clear = $("<button>");
    clear.text("clear all");
    clear.attr("class", "btn-block");
    clear.on("click", function() { clearAll() });

    // add the clear button to the final column
    finalCol.append(clear);

    // add the empty and final column to the new row
    endRow.append(emptyOneCol, finalCol);

    // add the new row to the container
    $(".container").append(endRow);
}

// clear the local storage and page contents
function clearAll(){
    localStorage.clear();
    resetPage();
}

// save the current hour's text to local storage
function saveInfo(key, text){
    // if there's no text, don't bother saving
    if(text === ""){
        return;
    }
    var storage = JSON.stringify(text);
    localStorage.setItem(key, storage);
}

// clear current page containers and refresh
function resetPage(){
    $("#currentDay").empty();
    $(".container").empty();
    init();
}

// pull any local storage information
function getSavedInfo(key){
    if(JSON.parse(localStorage.getItem(key))){
        if((JSON.parse(localStorage.getItem(key)).length !== 0)){
            return(JSON.parse(localStorage.getItem(key)));
        }
    }
    return "";
}

resetPage();