// Dom elements
const bookModal = document.querySelector('#book-modal');
const openModalBtn = document.querySelector('#btn-book-modal');
const bookForm = document.querySelector('#book-form');
const bookFormSubmitBtn = document.querySelector('#btn-form-submit');
const libraryGrid = document.getElementById('library-grid');

const library = JSON.parse(localStorage.getItem('library')) || [];

function Book(title, author, genre, pages, status) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.status = status;
};

const createLibraryGrid = ({ title, author, genre, pages, status }) => {
    // Create DOM elements
    const bookDiv = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const bookGenre = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookStatus = document.createElement('p');
  
    // Add class to new DOM elements
    bookDiv.classList.add('book-card');
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookGenre.classList.add('book-genre');
    bookPages.classList.add('book-pages');
    bookStatus.classList.add('book-status');
    
    // Add content to DOM elements
    bookTitle.innerText = title;
    bookAuthor.innerText = author;
    bookGenre.innerText = genre;
    bookPages.innerText = pages;
    bookStatus.innerText = status;

    // Add elements to DOM
    bookDiv.append(bookTitle, bookAuthor, bookGenre, bookPages, bookStatus);
    libraryGrid.appendChild(bookDiv)
};

const addBookToLibrary = () => {
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;
    const genre = document.querySelector('#book-genre').value;
    const pages = document.querySelector('#book-pages').value;
    const status = document.querySelector('#book-status').value;
    const newBook = new Book(title, author, genre, pages, status);

    library.push(newBook);
    localStorage.setItem('library', JSON.stringify(library));
    
    createLibraryGrid(newBook);

    return { title, author, genre, pages, status };
};

//Event listeners
openModalBtn.addEventListener('click', () => {
    bookModal.showModal();
});

// bookForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     addBookToLibrary();
// });
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

// Things to do

// Check if book exists, if so don't add
// Delete Cards
// Spacing for cards