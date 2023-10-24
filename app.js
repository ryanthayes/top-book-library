// Things to do

// Spacing for cards
// Check if book exists, if so don't add
// Delete books from local storage
// Edit Books


// DOM Elements
const bookForm = document.querySelector('#book-form');
const bookModal = document.querySelector('#book-modal');
const openModal = document.querySelector('#btn-book-modal');
const formSubmit = document.querySelector('#btn-form-submit');
const formCancel = document.querySelector('#btn-form-cancel');
const libraryGrid = document.querySelector('#library-grid');

// UI Elements
const library = JSON.parse(localStorage.getItem("library")) || [];

const renderBooks = () => {
    
    library.forEach((library) => {

        // Create DOM elements
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

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
        if (library.status === "Read") {
            bookStatus.classList.add('book-status', 'fa', 'fa-eye', 'fa-lg');
        } else {
            bookStatus.classList.add('book-status', 'fa', 'fa-eye-slash', 'fa-lg');
        }
        

        const bookHeaderEdit = document.createElement('div');
        bookHeaderEdit.classList.add('book-header-edit');

        const bookHeader = document.createElement('div');
        bookHeader.classList.add('book-header');

        const editBookBtn = document.createElement('button');
        editBookBtn.classList.add('btn-edit-book', 'fa-solid', 'fa-pen-to-square', 'fa-lg');

        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('btn-delete-book', 'fa-solid', 'fa-trash-can', 'fa-lg');

        // Add elements to DOM
        bookHeader.append(bookStatus, bookHeaderEdit);
        bookHeaderEdit.append(editBookBtn, deleteBookBtn);
        bookCard.append(bookTitle, bookAuthor, bookPages, bookHeader);
        libraryGrid.appendChild(bookCard);
    }

)};

// Local Storage
const getBooksFromStorage = () => { 
    if (localStorage.getItem('library') === null) {
        library = [];
    } else {
        const booksFromStorage = JSON.parse(localStorage.getItem("library"));
        library = booksFromStorage;
    }
}

const addBookToStorage = () => { 
    localStorage.setItem("library", JSON.stringify(library));
};

const removeBook = () => {
    
}

// Add books to library
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

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

const deleteBook = (el) => {
    if(el.classList.contains('btn-delete-book')) {
        el.parentElement.parentElement.parentElement.remove();
    }

}
const editBook = (el) => {
    if(el.classList.contains('btn-edit-book')) {
        
    }
}

const clearForm = () => {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-genre').value = '';
    document.querySelector('#book-status').value = '';
}

// Event: Display books
document.addEventListener('DOMContentLoaded', renderBooks());

// Event: Add book from form input
bookForm.addEventListener('submit', (e) => {
    (e).preventDefault();
    
    addBookToLibrary();
    renderBooks();
    clearForm();
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

// Event: Remove book from DOM
libraryGrid.addEventListener('click', e => {
deleteBook(e.target);})

// Event: Edit book
libraryGrid.addEventListener('click', e => { editBook(e.target);})
