// DOM Elements
const bookForm = document.querySelector('#book-form');
const bookModal = document.querySelector('#book-modal');
const openModal = document.querySelector('#btn-book-modal');
const formSubmit = document.querySelector('#btn-form-submit');
const formCancel = document.querySelector('#btn-form-cancel');
const libraryGrid = document.querySelector('#library-grid');

// UI Elements
const books = [];

const renderBooks = () => {
    const books = getBooks();
    books.forEach((book) => addBookToGrid(book));
}

const addBookToGrid = ( {title, author, genre, pages, read} ) => {

    // Create DOM elements
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    // bookDiv.setAttribute('id', library.indexOf(item));
    
    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.innerText = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.innerText = `by ${author}`;

    const bookGenre = document.createElement('p');
    bookGenre.classList.add('book-genre');
    bookGenre.innerText = genre;

    const bookPages = document.createElement('p');
    bookPages.classList.add('book-pages');
    bookPages.innerText = `Pages ${pages}`;
    
    const bookRead = document.createElement('p');
    bookRead.classList.add('book-read');
    bookRead.innerText = read;
    
    const bookEditContainer = document.createElement('div');
    bookEditContainer.classList.add('book-edit-container');
    
    const bookBtnContainer = document.createElement('div');
    bookBtnContainer.classList.add('book-btn-container');
    
    const editBookBtn = document.createElement('button');
    editBookBtn.classList.add('btn-edit-book', 'fa-solid', 'fa-pen-to-square', 'fa-xl');
    
    const deleteBookBtn = document.createElement('button');
    deleteBookBtn.classList.add('btn-delete-book', 'fa-solid', 'fa-trash-can', 'fa-xl');

    // Add elements to DOM
    bookBtnContainer.append(editBookBtn, deleteBookBtn);
    bookEditContainer.append(bookBtnContainer);
    bookCard.append(bookTitle, bookAuthor, bookGenre, bookPages, bookRead, bookEditContainer);
    libraryGrid.appendChild(bookCard)

}

// Local Storage
const getBooks = () => {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

const addBook = (book) => { 
    const books = getBooks();
    books.push(book);
    console.log(books);
    localStorage.setItem('books', JSON.stringify(books))
};

const removeBook = (title) => {
    const books = getBooks();
    books.forEach((book, index) => {
        if(book.title === title) {
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}

// Add books to library
class Book {
    constructor(title, author, genre, pages, read) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.read = read;
    }
}

const addBookToLibrary = (book) => {
    books.push(book);
    setData(book);
    books.forEach((book) => renderBooks(book));
}


const deleteBook = (el) => {
    if(el.classList.contains('btn-delete-book')) {
        el.parentElement.remove();
    }
}

const clearForm = () => {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-genre').value = '';
    document.querySelector('#book-pages').value = '';
}

 // Event: Display books
 document.addEventListener('DOMContentLoaded', renderBooks());

// Event: Add book from form input
bookForm.addEventListener('submit', (e) => {
    (e).preventDefault();
    
    // Get form input values
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;
    const genre = document.querySelector('#book-genre').value;
    const pages = document.querySelector('#book-pages').value;
    const read = document.querySelector('#book-read').value;
    
    const book = new Book(title, author, genre, pages, read);

    addBookToGrid(book);
    addBook(book);
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
    deleteBook(e.target);


})