// Dom elements
const bookModal = document.getElementById('book-modal');
const openModalBtn = document.getElementById('btn-book-modal');
const closeModalBtn = document.getElementById('btn-book-modal-close');
const bookForm = document.getElementById('book-form');
const bookFormSubmitBtn = document.getElementById('btn-form-submit');
const libraryGrid = document.getElementById('library-grid');
const title = bookForm['book-title'].value;
const author = bookForm['book-author'].value;
const genre = bookForm['book-genre'].value;
const pages = bookForm['book-pages'].value;
const status = bookForm['book-status'].value;

const library = JSON.parse(localStorage.getItem('library')) || [];

const addBook = (title, author, genre, pages, status) => {
    library.push({
        title,
        author,
        genre,
        pages,
        status
    })

    localStorage.setItem('library', JSON.stringify(library));
    
    return { title, author, genre, pages, status };
}

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


bookForm.onsubmit = (e) => {
    e.preventDefault(); // Prevent default browser behavior 

    const newBook = addBook(
        title,
        author,
        genre,
        pages, 
        status
    );
    
    createLibraryGrid(newBook);

    title.value = "";
    author.value = "";
    genre.value = "";
    pages.value = "";
    status.value = "";
};

// Event listeners
openModalBtn.addEventListener('click', () => {
    bookModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    bookModal.close();
});

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


// const removeBook = document.createElement('button');
// removeBook.classList.add('btn', 'btn-remove-book');



// Things to do

// Check if book exists, if so don't add
// Add Book toggle on off modal
// Delete Cards
// Spacing for cards