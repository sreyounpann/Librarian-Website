function findPopularBooks(cardData, getData) {
    const bookBorrowCount = {};

    // Count how many times a book has been borrowed
    cardData.forEach((element) => {
        const bookId = element.bookId;
        if (bookBorrowCount[bookId]) {
            bookBorrowCount[bookId]++;
        } else {
            bookBorrowCount[bookId] = 1;
        }
    });

    // Sort books by borrow count in descending order
    const popularBooks = Object.keys(bookBorrowCount).sort((a, b) => bookBorrowCount[b] - bookBorrowCount[a]);

    // Return the top 5 books
    return popularBooks
        .map((bookId) => getData.find((book) => book.bookId === bookId))
        .slice(0, 5);
}

function findActiveVisitors(cardData, getData2) {
    const visitorBorrowCounts = {};

    // Count how many books each visitor borrows
    cardData.forEach((element) => {
        const visitorId = element.visitorId;
        if (visitorBorrowCounts[visitorId]) {
            visitorBorrowCounts[visitorId]++;
        } else {
            visitorBorrowCounts[visitorId] = 1;
        }
    });

    // Create an array of active visitors with their borrow counts
    const activeVisitors = getData2.map((visitor) => {
        return {
            ...visitor,
            borrowCount: visitorBorrowCounts[visitor.visitorId] || 0
        };
    });

    return activeVisitors;
}



function displayPopularBooks(targetElement, cardData, getData) {
    const listElement = document.getElementById(targetElement);
    listElement.innerHTML = '';

    const popularBooks = findPopularBooks(cardData, getData);

    popularBooks.forEach((book, index) => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td><img src="${book.picture}" alt="${book.bookTitle}" class="book-image" width="50" height="50"></td>
            <td class="book-title">${book.bookTitle}</td>
            <td class="borrow-count">${cardData.filter(card => card.bookId === book.bookId).length}</td>
        `;
        listElement.appendChild(listItem);
    });
}

function displayActiveVisitors(targetElement, activeVisitors) {
    const listElement = document.getElementById(targetElement);
    listElement.innerHTML = '';

    activeVisitors.forEach((visitor) => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td><img src="${visitor.picture}" alt="${visitor.visitorFullname}" class="visitor-image" width="50" height="50"></td>
            <td class="visitor-name">${visitor.visitorFullname}</td>
            <td class="borrow-count">${visitor.borrowCount}</td>
        `;
        listElement.appendChild(listItem);
    });
}



displayPopularBooks('popularBooksList', cardData, getData);
const activeVisitors = findActiveVisitors(cardData, getData2);
displayActiveVisitors('activeVisitorsList', activeVisitors);

// Function to perform a search in the "static" section for books
function staticShowBooks(searchTerm) {
    const cardData = JSON.parse(localStorage.getItem('cardProfile')) || [];
    const getData = JSON.parse(localStorage.getItem('bookProfile')) || [];

    // Filter the cardData to find out which books were borrowed based on the search term
    const filteredCardData = cardData.filter((element) => {
        const book = getData.find((book) => book.bookId === element.bookId);
        const bookTitle = book.bookTitle.toLowerCase();
        return bookTitle.includes(searchTerm);
    });

    // Call the function to find popular books based on the filtered data
    const famousBooks = findPopularBooks(filteredCardData, getData);

    // Display the filtered results for books in the "static" section
    displayPopularBooks('popularBooksList', famousBooks, getData);
}

function staticShowVisitors(searchTerm) {
    const cardData = JSON.parse(localStorage.getItem('cardProfile')) || [];
    const getData2 = JSON.parse(localStorage.getItem('visitorProfile')) || [];

    // Filter the visitor data to find visitors based on the search term
    const filteredVisitors = getData2
        .filter((visitor) => {
            const visitorName = visitor.visitorFullname.toLowerCase();
            return visitorName.includes(searchTerm);
        })
        .map((visitor) => {
            const borrowCount = cardData.filter((element) => element.visitorId === visitor.visitorId).length;
            return {
                ...visitor,
                borrowCount: borrowCount
            };
        });

    // Display the filtered results for visitors in the "static" section
    displayActiveVisitors('activeVisitorsList', filteredVisitors);
}


staticShowBooks(searchTerm);
staticShowVisitors(searchTerm);



