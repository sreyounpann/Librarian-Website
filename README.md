# Library Management System
A web-based Library Management System to help librarians keep track of books, visitors, and lending activities.The website built using HTML , CSS(Boostraps framework), Javascript store in LocalStorage. 

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Data Validation](#data-validation)
- [Entities](#entities)
- [Local Storage](#local-storage)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Introduction
  This Library Management System is designed to assist librarians in managing books, visitors, and lending activities. The system provides a user-friendly interface for performing various tasks such as adding/editing books, managing visitors, creating and updating lending cards, and viewing statistics.

## Features

### Books

- View a list of all books.
- Add a new book.
- Edit existing books.
- Delete existing books.
- Sort and search books by title, author, or number of copies.

### Visitors

- View a list of all visitors.
- Add a new visitor.
- Edit existing visitors.
- Sort and search visitors by ID or name.
- Validate visitor data (required fields, valid phone number).

### Cards

- Create new lending cards.
- Set return dates for returned books.
- Decrease/increase the number of book copies when lending/returning.
- Display only available books for lending (copies > 0).

### Statistics

- View the list of five most popular books.
- View the list of five most active visitors.

## Getting Started 
1. Clone the repositor.
2. Open index.html in a web brower.

## Usage
Follow the on-screen navigation to access different sections (Books, Visitors, Cards, Statistics) and perform relevant tasks.

## Data Validation
- All fields are required.
- Numeric fields cannot contain negative values.
- Phone numbers must contain only numbers, spaces, and dashes.

## Entities

### Book

| Field                  | Description                          |
|------------------------|--------------------------------------|
| **ID**                 | Unique identifier for each book.     |
| **Name**               | Title of the book.                   |
| **Author's Name**      | Name of the book's author.           |
| **Year of Publishing** | The year when the book was published.|
| **Publisher Name**     | Name of the publisher.               |
| **Number of Pages**    | Total pages in the book.             |
| **Copies in Library**  | Quantity of copies available.        |

### Visitor

| Field          | Description                        |
|----------------|------------------------------------|
| **ID**         | Unique identifier for each visitor.|
| **Full Name**  | Full name of the visitor.           |
| **Phone Number**| Contact number of the visitor.      |

### Cards

| Field          | Description                             |
|----------------|-----------------------------------------|
| **ID**         | Unique identifier for each lending card.|
| **Visitor's ID**| ID of the visitor associated with the card.|
| **Book's ID**  | ID of the book associated with the card.   |
| **Borrow Date** | Date when the book was borrowed.           |
| **Return Date** | Date when the book is expected to be returned.|

## Local-Storage
Data is stored in localStorage to persist information between sessions.

## Live-Demo
https://main--comfy-rugelach-04af5c.netlify.app/

# Screenshots

  Include screenshots of the interface for Visitors and Cards, as shown in the provided variant.

![Screenshot 2023-11-15 142857](https://github.com/sreyounpann/Librarian-Website/assets/83297826/26b3c0e9-7420-4a92-bcb3-7d0bd201f6d6)

1.0. Book Dashboard 

![Screenshot 2023-11-15 142842](https://github.com/sreyounpann/Librarian-Website/assets/83297826/4ca8c86a-b8b3-4c9f-a5d3-8d869f792d58)

1.1 Add Book Form 

![Screenshot 2023-11-15 143047](https://github.com/sreyounpann/Librarian-Website/assets/83297826/5e225e22-a73b-4824-b99f-2aa08fad045d)
1.2 Visitor Dashboard

![Screenshot 2023-11-15 143034](https://github.com/sreyounpann/Librarian-Website/assets/83297826/e946fa31-1100-4aa3-8649-00c417d497dc)

1.3 Add Visitor Form 

![Screenshot 2023-11-15 143223](https://github.com/sreyounpann/Librarian-Website/assets/83297826/9ebf4627-3400-499f-b7c5-09c74bd156b8)

1.4 Card Dashboard

![Screenshot 2023-11-15 143246](https://github.com/sreyounpann/Librarian-Website/assets/83297826/3de93f9f-8eac-4155-bb04-d03e28443a42)

1.5 Add Card Form(Visitor borrow the book)

![Screenshot 2023-11-15 143508](https://github.com/sreyounpann/Librarian-Website/assets/83297826/1801dbdd-004f-4aab-9de3-f24c55ca5d19)

1.6 View Books 

![Screenshot 2023-11-15 143521](https://github.com/sreyounpann/Librarian-Website/assets/83297826/ed8d94fa-0a8e-4d8a-8bd7-ec7f528e4e9c)

1.7 Modify Book

![Screenshot 2023-11-15 143605](https://github.com/sreyounpann/Librarian-Website/assets/83297826/5db5a98f-924f-4f5e-b9e9-7d0c37befe5f)

1.8 Static Dashboard (Popular Books and Popular Visitors)  

## Contributing
1. Form the repository.
2. Create a new branch.
3. Make your changes.
4. Open a pull request.

## License
This project is licensed under the [Sreyoun Pann](https://github.com/sreyounpann) - see the [LICENSE.md](LICENSE.md) file for details.













     - 
  
  
