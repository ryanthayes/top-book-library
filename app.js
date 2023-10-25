// Things to do

// Check if book exists, if so don't add
// Edit Books
// Are you sure you want to delete?


// DOM Elements
const bookForm = document.querySelector('#book-form');
const bookModal = document.querySelector('#book-modal');
const openModal = document.querySelector('#btn-book-modal');
const formSubmit = document.querySelector('#btn-form-submit');
const formCancel = document.querySelector('#btn-form-cancel');
const libraryGrid = document.querySelector('#library-grid');

let library =  [];

// UI Elements

const showLibraryInfo = () => {
    const booksRead = document.querySelector('#books-read');
    const booksUnread = document.querySelector('#books-unread');
    const totalBooks = document.querySelector('#total-books');

    let readBooksCounter = 0;
    let unreadBooksCounter = 0;
    
    // booksRead.textContent = 0;
    // booksUnread.textContent = 0;

    library.forEach((library) => {
        if (library.status === 'Read') {
            readBooksCounter += 1;
            console.log(`Number of books read = ${readBooksCounter}`)
        } else if (library.status === "Not Read") {
            unreadBooksCounter +=1;
            console.log(unreadBooksCounter)
        }
    });
    // totalBooks.textContent = library.length;
};   
 
const renderBooks = () => {
    libraryGrid.textContent= "";
    showLibraryInfo();
    library.forEach((library, index) => {

        // Create DOM elements
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index)

        const bookTitle = document.createElement('h2');
        bookTitle.classList.add('book-title');
        bookTitle.innerText = library.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.innerText = library.author;

        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.innerText = `Pages ${library.pages}`;

        const bookStatus = document.createElement('p');
        switch (library.status) {
            case "Read":
                bookStatus.classList.add('book-status', 'fa', 'fa-eye', 'fa-lg');
                break;
            case "Not Read": 
                bookStatus.classList.add('book-status', 'book-status__x', 'fa', 'fa-eye-slash', 'fa-lg');
                break;
        };
        bookStatus.addEventListener('click', () => {         
            switch (library.status) {
                case "Read":
                    library.status = "Not Read";
                    break;
                case "Not Read":
                    library.status = "Read";
                    break;
            }
            renderBooks();
        });
    
        const bookHeaderEdit = document.createElement('div');
        bookHeaderEdit.classList.add('book-header-edit');

        const bookHeader = document.createElement('div');
        bookHeader.classList.add('book-header');

        const editBookBtn = document.createElement('button');
        editBookBtn.classList.add('btn-edit-book', 'fa-solid', 'fa-pen-to-square', 'fa-lg');
        editBookBtn.addEventListener('click', () => {
            editBook();
        })

        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('btn-delete-book', 'fa-solid', 'fa-trash-can', 'fa-lg');
        deleteBookBtn.addEventListener('click', () => {
            deleteBook();
            addBookToStorage();
            renderBooks();
        });

        // Add elements to DOM
        bookHeader.append(bookStatus, bookHeaderEdit);
        bookHeaderEdit.append(editBookBtn, deleteBookBtn);
        bookCard.append(bookTitle, bookAuthor, bookPages, bookHeader);
        libraryGrid.appendChild(bookCard);
    }
)};

// Add books to library
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

const addBookToStorage = () => { 
    localStorage.setItem("library", JSON.stringify(library));
};

const addBookToLibrary = () => {
    
    // Get form input values
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;
    const pages = document.querySelector('#book-pages').value;
    const status = document.querySelector('#book-status').value;
    
    const book = new Book(title, author, pages, status);

    // Add book to array
    library.push(book)

    // Add book to local storage
    addBookToStorage();
}

const deleteBook = (index) => {
    library.splice(index, 1);
    addBookToStorage();
    renderBooks();
}

const editBook = () => {
    console.log("how do I edit a book?");
}

// Event: Render books to DOM
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('library')) {
        library = JSON.parse(localStorage.getItem('library'));
        renderBooks();
      }
});

// Event: Add book from form input
bookForm.addEventListener('submit', (e) => {
    (e).preventDefault();
    
    addBookToLibrary();
    renderBooks();
    bookForm.reset();
    bookModal.close();
});

// Event: Open dialog modal (form)
openModal.addEventListener('click', () => {
    bookModal.showModal();
});

// Event: Close modal when clicking cancel
formCancel.addEventListener('click', e => {
    bookModal.close();
})

// Event: Close modal when clicking outside of modal box
bookModal.addEventListener('click', e => {
    const dialogDimensions = bookModal.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        bookModal.close()
    }
});

