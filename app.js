var form = document.getElementById("myForm");
var imgInput = document.querySelector(".img");
var file = document.getElementById("imgInput");
var bookid = document.getElementById("bookid");
var title = document.getElementById("title");
var author = document.getElementById("author");
var yearPublish = document.getElementById("year-publish");
var publishName = document.getElementById("publish-name");
var numberPage = document.getElementById("number-page");
var numberCopy = document.getElementById("number-copy");
var submitBtn = document.querySelector(".submit");
var bookInfo = document.getElementById("data");
var modal = document.getElementById("userForm");
var modalTitle = document.querySelector(".modal-title"); 
var newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('bookProfile') ? JSON.parse(localStorage.getItem('bookProfile')) : [];

let isEdit = false, editId;

showInfo();

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Book Form";
    isEdit = false;
    imgInput.src = "./Image/bookicon.png";
    
   
    bookid.value = ""; 
    title.value = ""; 
    author.value = ""; 
    yearPublish.value = "";
    publishName.value = ""; 
    numberPage.value = ""; 
    numberCopy.value = ""; 
    
});

file.onchange = function () {
    if (file.files[0].size < 1000000) { 
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };

        fileReader.readAsDataURL(file.files[0]);
    }
    else {
        alert("This file is too large!");
    }
};

function showInfo() {
    document.querySelectorAll('.bookDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        let createElement = `<tr class="bookDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.bookTitle}</td>
            <td>${element.author}</td>
            <td>${element.yearPublish}</td>
            <td>${element.publishName}</td>
            <td>${element.numberPage}</td>
            <td>${element.numberCopy}</td>
            <td>${element.genre}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.bookTitle}', '${element.author}', '${element.yearPublish}', '${element.publishName}', '${element.numberPage}', '${element.numberCopy}', '${element.genre}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.bookId}', '${element.bookTitle}', '${element.author}', '${element.yearPublish}', '${element.numberPage}', '${element.numberCopy}', '${element.genre}', '${element.publishName}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        bookInfo.innerHTML += createElement;
    });
}

showInfo();

function readInfo(pic, name, author, date, namePublish, page, copy, genre) {
    document.querySelector('#showImg').src = pic;
    document.querySelector('#showtitle').value = name;
    document.querySelector('#showAuthor').value = author;
    document.querySelector('#showDate').value = date;
    document.querySelector('#showPublisher').value = namePublish;
    document.querySelector('#showPage').value = page;
    document.querySelector('#showCopy').value = copy;
    document.querySelector('#showGenre').value = genre;

    
    const genreSelect = document.querySelector('#showGenre');
    genreSelect.removeAttribute('disabled');
}

function editInfo(index, pic, bookId, bookTitle, author, yearPublish, numberPage, numberCopy, genre, publishName) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    bookid.value = bookId;
    title.value = bookTitle;
    document.querySelector("#author").value = author;
    document.querySelector("#year-publish").value = yearPublish;
    document.querySelector("#publish-name").value = publishName;
    document.querySelector("#number-page").value = numberPage; 
    document.querySelector("#number-copy").value = numberCopy; 

   
    document.querySelector("#genre").value = genre;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update The Form";
}




function deleteInfo(index) {
    if (confirm("Are you sure you want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("bookProfile", JSON.stringify(getData));
        console.log("Data deleted from getData array:", getData);
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        picture: imgInput.src,
        bookId: bookid.value,
        bookTitle: title.value,
        author: author.value,
        yearPublish: yearPublish.value,
        publishName: publishName.value,
        numberPage: numberPage.value,
        numberCopy: numberCopy.value,
        genre: document.querySelector("#genre").value,
    };

    if (
        information.picture === "" ||
        information.bookId === "" ||
        information.bookTitle === "" ||
        information.author === "" ||
        information.yearPublish === "" ||
        information.publishName === "" ||
        information.numberPage === "" ||
        information.numberCopy === "" ||
        information.genre === ""
    ) {
       
        alert('Please fill in all fields');
    } else {
       
        if (!isEdit) {
            getData.push(information);
        } else {
            isEdit = false;
            getData[editId] = information;
        }

        localStorage.setItem('bookProfile', JSON.stringify(getData));

        submitBtn.innerText = "Submit";
        modalTitle.innerText = "Fill the Form";

        showInfo();

        bookid.value = "";
        title.value = "";
        author.value = "";
        yearPublish.value = "";
        publishName.value = "";
        numberPage.value = "";
        numberCopy.value = "";
        document.querySelector("#genre").value = "";
        

        imgInput.src = "./Image/bookicon.png";
    }
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.appendChild(document.createTextNode(message));

    const container = document.querySelector('.modal-body');
    const form = document.querySelector('#userForm');
    container.insertBefore(alertDiv, form);

  
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

//  searchBook function to update the bookInfo section
function searchBook(searchTerm) {
    const filteredData = getData.filter(book => book.bookTitle.toLowerCase().includes(searchTerm));

    // Clear the existing bookInfo
    bookInfo.innerHTML = '';

    filteredData.forEach((element, index) => {
        let createElement = `<tr class="bookDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.bookTitle}</td>
            <td>${element.author}</td>
            <td>${element.yearPublish}</td>
            <td>${element.publishName}</td>
            <td>${element.numberPage}</td>
            <td>${element.numberCopy}</td>
            <td>${element.genre}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.bookTitle}', '${element.author}', '${element.yearPublish}', '${element.publishName}', '${element.numberPage}', '${element.numberCopy}', '${element.genre}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.bookId}', '${element.bookTitle}', '${element.author}', '${element.yearPublish}', '${element.numberPage}', '${element.numberCopy}', '${element.genre}', '${element.publishName}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        bookInfo.innerHTML += createElement;
    });
}

// Update your event listener to call the searchBook function with the search input value
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById("searchTxt").value.toLowerCase();
    searchBook(searchTerm);
});







