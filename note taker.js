console.log('inn js file');
showNote();

// Adding content written as note to localStorage.

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {

    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteArray = [];
    }
    else {
        noteArray = JSON.parse(notes);
    }
    noteArray.push(addtxt.value);
    localStorage.setItem('notes', JSON.stringify(noteArray));
    addtxt.value = "";
    showNote();
})




//function to show the notes.
function showNote() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteArray = [];
    }
    else {
        noteArray = JSON.parse(notes);
    }

    let html = "";
    noteArray.forEach(function (element, index) {
        html += `
        <div class="card cardnote mx-2 my-2" style="width: 18rem;">
         <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text" style="margin-left:13px;margin-bottom:35px;margin-top:15px">${element}</p>
          <button class="btn btn-danger" id="${index}" onclick="deleteNote(this.id)">DELETE</button>
          <div id="savebtndiv${index}"   style="float:right"><button type="button" class="btn btn-success"  id="${index}" onclick="updateNote(this.id)">Update</button></div>
        </div>
      </div>            `;
    });

    let saveNote = document.getElementById('notes');

    if (noteArray.length == 0) {
        saveNote.innerHTML = `Nothing to Show. Please, Use above 'Add a Note' section to add a note. `;
    }
    else {
        saveNote.innerHTML = html;
    }

};


//Function to delete a note


function deleteNote(index) {
    //console.log("i am deleting index", index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteArray = [];
    }
    else {
        noteArray = JSON.parse(notes);
    }
    noteArray.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteArray));
    showNote();

}


//Function to search the particular note

let search = document.getElementById('searchbtn');
search.addEventListener('input', function () {
    let searchtxt = search.value;
    let notecard = document.getElementsByClassName('cardnote');

    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        if (cardtxt.includes(searchtxt)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    }

    );

})



//Function to update a note

function updateNote(index) {

    console.log('index', index)

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteArray = [];
    }
    else {
        noteArray = JSON.parse(notes);
    }


    // adding textarea to edit the content
    let whereToAdd = document.getElementsByTagName('p')[index];
    whereToAdd.innerHTML = `<textarea class="form-control" aria-label="With textarea" id='savebutton${index}' style="margin-left:0px">${noteArray[index]}</textarea>`;


    //changing update button to save button

    let placeToAddSaveBtn = document.getElementById(`savebtndiv${index}`);
    placeToAddSaveBtn.innerHTML = `<button class="btn btn-warning" id="${index}" onclick='saveNewcontent(this.id)'>Save</button>`;

}



//saving edited content
function saveNewcontent(index) {

    console.log("in save note with index =", index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteArray = [];
    }
    else {
        noteArray = JSON.parse(notes);
    }

    let updatedText = document.getElementById(`savebutton${index}`);
    console.log(updatedText);
    noteArray[index] = updatedText.value;
    localStorage.setItem('notes', JSON.stringify(noteArray));
    updatedText.value = "";

    showNote();

}









