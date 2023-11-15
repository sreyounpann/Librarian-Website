
const visitorIdSelect = document.getElementById("visitorIdSelect");
const bookIdSelect = document.getElementById("bookIdSelect");


const bookData = localStorage.getItem("bookProfile");
const books = bookData ? JSON.parse(bookData) : [];


const visitorData = localStorage.getItem("visitorProfile");
const visitors = visitorData ? JSON.parse(visitorData) : [];



for (const book of books) {
    if (book.numberCopy > 0) {
        const option = document.createElement("option");
        option.value = book.bookId;
        option.text = book.bookTitle; 
        bookIdSelect.appendChild(option);
    }
}

for(let i = 0; i < visitors.length; i++){

    const visitor = visitors[i];
    const option = document.createElement("option");
    option.value = i ;
    option.text = visitor.visitorFullname;
    visitorIdSelect.appendChild(option);

}


document.getElementById('myForm4').addEventListener('submit', function (e) {
    e.preventDefault(); 

   
    const selectedVisitorId = visitorIdSelect.value;
    const selectedBookId = bookIdSelect.value;

    
    console.log("Selected Visitor ID: " + selectedVisitorId);
    console.log("Selected Book ID: " + selectedBookId);

  
    cardShowInfo();
});


var form = document.getElementById("myForm4");
var cardIdField = document.getElementById("cardId");
var visitorId = document.getElementById("visitorIdSelect");

var bookIdField = document.getElementById("bookIdSelect");

var borrowDateField = document.getElementById("borrowDate");
var returnDateField = document.getElementById("returnDate");
var cardSubmitBtn = document.getElementById("submit_Card");
var cardInfo = document.getElementById("dataCard");
var cardModal = document.getElementById("cardForm");
var cardModalTitle = document.querySelector(".modal-title");
var newCardBtn = document.querySelector(".newCard");

 let cardData = localStorage.getItem('cardProfile') ? JSON.parse(localStorage.getItem('cardProfile')) : [];

newCardBtn.addEventListener('click', () => {
    cardSubmitBtn.innerText = 'Submit';
    cardModalTitle.innerText = "Fill Card Form";
    
  
    cardIdField.value = ""; 
    visitorId.value = ""; 
    bookIdField.value = ""; 
    borrowDateField.value = "";
    
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
 
    const cardIdValue = cardIdField.value;
    const visitorIdValue = visitorIdSelect.value;
    const bookIdValue = bookIdSelect.value;

    // Find the selected book
    const selectedBook = books.find(book => book.bookId === bookIdValue);

    if (selectedBook && selectedBook.numberCopy > 0) {
        // Calculate the return date (e.g., 14 days from the borrow date)
        const currentDate = new Date();
        const returnDateValue = new Date(currentDate);
        returnDateValue.setDate(returnDateValue.getDate() + 14);
        const formattedReturnDate = returnDateValue.toISOString().split("T")[0];

        if (cardIdValue === "" || visitorIdValue === "" || bookIdValue === "") {
            showAlert("Please fill in all required fields.", "danger");
        } else {
            const information = {
                cardId: cardIdValue,
                visitorId: parseInt(visitorIdValue, 10),
                bookId: bookIdValue,
                borrowDate: currentDate.toISOString().split("T")[0],
                returnDate: formattedReturnDate,
            };

         
            selectedBook.numberCopy--;

          
            localStorage.setItem("bookProfile", JSON.stringify(books));

            // Use cardData to store the card information
            cardData.push(information);
            localStorage.setItem("cardProfile", JSON.stringify(cardData));
            cardSubmitBtn.innerText = "Submit";
            cardModalTitle.innerText = "Fill Card Form";
            cardShowInfo();
           
            cardId.value = "";
            

            updateBookSelectDropdown();
        }
    } else {
        showAlert("No available copies of the selected book.", "danger");
    }
}); 


function cardShowInfo() {
    document.querySelectorAll(".cardInfo").forEach((info) => info.remove());
    cardData.forEach((element, index) => {
        const selectedVisitorIndex = element.visitorId;
        const selectedBookId = element.bookId;
        const visitor = visitors[selectedVisitorIndex];
        const book = books.find(book => book.bookId === selectedBookId);
        
        // Check if the return date should be shown
        const showReturnDate = element.showReturnDate || false;
        const returnInfo = showReturnDate ? element.returnDate : `<i class="fas fa-reply" onclick="toggleReturnDate(${index})"></i>`;
        
        let createElement = `<tr class="cardInfo">
            <td>${index + 1}</td>
            <td>${visitor ? visitor.visitorFullname : 'Unknown Visitor'}</td>
            <td>${book ? book.bookTitle : 'Unknown Book'}</td>
            <td>${element.borrowDate}</td>
            <td>${returnInfo}</td>
            <td>
            <button class="btn btn-danger" onclick="cardDeleteInfo(${index})"><i class="bi bi-trash"></i></button>
        </tr>`;
        cardInfo.innerHTML += createElement;
    });
}

function toggleReturnDate(index) {
    const card = cardData[index];
    const bookId = card.bookId;

    // Find the book in the books array
    const selectedBook = books.find(book => book.bookId === bookId);

    if (!selectedBook) {
        showAlert("Error: Book not found.", "danger");
        return;
    }

    if (card.showReturnDate) {
        selectedBook.numberCopy++;
        card.showReturnDate = false;
    } else {
        selectedBook.numberCopy++;
        card.showReturnDate = true;
    }

    // Update the quantity in the HTML element with the id "number-copy"
    const numberCopyElement = document.getElementById("number-copy");
    if (numberCopyElement) {
        numberCopyElement.textContent = selectedBook.numberCopy; // Update the element with the new value
    }

    // Update the card data and localStorage
    cardData[index] = card;
    localStorage.setItem("cardProfile", JSON.stringify(cardData));
    localStorage.setItem("bookProfile", JSON.stringify(books));

    cardShowInfo();
}






function updateSelectOptions(){
    const bookData = localStorage.getItem("bookProfile");
    const books = bookData ? JSON.parse(bookData) : [];

    const visitorData = localStorage.getItem("visitorProfile");
    const visitors = visitorData ? JSON.parse(visitorData) : [];

    
    bookIdSelect.innerHTML  = "" ;

    for (const book of books) {
        if (book.numberCopy > 0) {
            const option = document.createElement("option");
            option.value = book.bookId;
            option.text = book.bookTitle;
            bookIdSelect.appendChild(option);
        }
    }

    for(const visitor of visitors){
        const option = document.createElement("option");
        option.value = visitor.visitorId;
        option.text = visitor.visitorFullname;
        visitorIdSelect.appendChild(option);

    }
}

updateSelectOptions();

function updateData(){
    updateSelectOptions();
   
}
updateData();

setInterval(updateData, 5000);

window.addEventListener('load', () => { 
    cardData = JSON.parse(localStorage.getItem('cardProfile')) || [];

    const numberCopyElement = document.getElementById("number-copy");
    if (numberCopyElement) {
        const selectedBook = books.find(book => book.bookId === bookIdSelect.value);
        if (selectedBook) {
            numberCopyElement.textContent = selectedBook.numberCopy;
        }
    }

  
    cardShowInfo();
});


function cardDeleteInfo(index) {
    if (confirm("Are you sure you want to delete this card?")) {
        const card = cardData[index];

        if (!card.showReturnDate) {
            // If showReturnDate is false, the book hasn't been returned, so increase numberCopy
            const selectedBook = books.find(book => book.bookId === card.bookId);
            if (selectedBook) {
                selectedBook.numberCopy++;
                localStorage.setItem("bookProfile", JSON.stringify(books));
            }
        }

        cardData.splice(index, 1);
        localStorage.setItem("cardProfile", JSON.stringify(cardData));
        cardShowInfo();
    }
}

cardShowInfo();

//Function search card 
function searchCard(searchTerm) {
    const filteredData = cardData.filter((card) => {
        // Add your search logic here
        // For example, you can search by visitor name or book title
        const selectedVisitor = visitors[card.visitorId];
        const selectedBook = books.find((book) => book.bookId === card.bookId);

        const visitorName = selectedVisitor ? selectedVisitor.visitorFullname.toLowerCase() : "";
        const bookTitle = selectedBook ? selectedBook.bookTitle.toLowerCase() : "";

        return visitorName.includes(searchTerm) || bookTitle.includes(searchTerm);
    });
    cardInfo.innerHTML = "";

    filteredData.forEach((element, index) => {
        let createElement = `<tr class="cardInfo">
            <td>${index + 1}</td>
            <td>${visitor ? visitor.visitorFullname : 'Unknown Visitor'}</td>
            <td>${book ? book.bookTitle : 'Unknown Book'}</td>
            <td>${element.borrowDate}</td>
            <td>${returnInfo}</td>
            <td>
            <button class="btn btn-danger" onclick="cardDeleteInfo(${index})"><i class="bi bi-trash"></i></button>
        </tr>`;
    });
}




