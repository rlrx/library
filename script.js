const myLibrary = [];

/* Constructor for book author, title, number of pages, whether it’s been read */
function Book(author, title, numOfPages, read) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.read = read;
}

// Creating a dialog form for inputting the new book
const dialog = document.querySelector("dialog");
const newbookButton = document.querySelector('.newbook')
newbookButton.addEventListener('click', () => {
    dialog.showModal();
}) 

// Create function to add book to myLibrary array, iterate through array and display books
function addBookToLibrary(event) {
    event.preventDefault();

    let formData = new FormData(document.forms.newBookForm);
    let author = formData.get('author');
    console.log(`the auto is ${author}`);
    let title = formData.get('title');
    let numOfPages = formData.get('numOfPages');
    let read = formData.get('read');

    let isRead = read === 'yes'; // set isRead to true if checkbox ticked

    const newBook = new Book(author, title, numOfPages, isRead) // create new book object
    myLibrary.push(newBook); // push the newbook object to the array
    console.log(myLibrary);
    // remove the existing books in DOM
    let bookshelf = document.querySelector(".body");
    let books = document.querySelectorAll(".book");
    books.forEach((book) => {
        bookshelf.removeChild(book);
    })
    displayBooks(myLibrary);
}

function displayBooks(bookArray) {
    bookArray.forEach((book) => {
        let author = book.author;
        let title = book.title;
        let numOfPages = book.numOfPages;
        let read = book.read;
        // create main book div
        const bookDiv = document.createElement('div');
        bookDiv.className = "book";
        // create nested information in book div
        const authorDiv = document.createElement('div');
        authorDiv.textContent = author;
        const titleDiv = document.createElement('div');
        titleDiv.textContent = title;
        const pagesDiv = document.createElement('div');
        pagesDiv.textContent = numOfPages;
        const readButton = document.createElement('button');
        readButton.classList.add('readButton');
        if(read == true){
            readButton.textContent = "Read";
        }
        else{
            readButton.textContent = "Not Read";
        }
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = "Delete book";
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(pagesDiv);
        bookDiv.appendChild(readButton);
        bookDiv.appendChild(deleteButton);

        const bookshelf = document.querySelector(".body");
        bookshelf.appendChild(bookDiv);
    })
}

const submitButton = document.querySelector('.submit');
submitButton.addEventListener("click", addBookToLibrary);

// implementing read button toggle
document.addEventListener("click", (event) => {
    if(event.target.classList.contains('readButton')){
        const readButton = event.target;

        // Find the parent book element of the clicked button
        const bookDiv = readButton.closest('.book');
        if(bookDiv){
            const bookIndex = Array.from(bookDiv.parentElement.children).indexOf(bookDiv) - 1;
            console.log(bookIndex);
            if(bookIndex != -1){
                // update the read attribute
                myLibrary[bookIndex].read = !myLibrary[bookIndex].read;

                // update the button text content
                if(myLibrary[bookIndex].read){
                    readButton.textContent = "Read";
                }
                else{
                    readButton.textContent = "Not Read";
                }
            }
        }
    }
})

// implementing delete button 
document.addEventListener("click", (event) => {
    console.log(myLibrary);
    if(event.target.classList.contains('deleteButton')){
        const deleteButton = event.target;

        // Find the parent book element of the clicked button
        const bookDiv = deleteButton.closest('.book');
        if(bookDiv){
            const bookIndex = Array.from(bookDiv.parentElement.children).indexOf(bookDiv) - 1;
            // remove the book object from the book array
            if(bookIndex != -1){
                myLibrary.splice(bookIndex, 1);
            }
            // remove all books from DOM
            let bookshelf = document.querySelector(".body");
            let books = document.querySelectorAll(".book");
            books.forEach((book) => {
                bookshelf.removeChild(book);
            })
            // redisplay books from dom based on updated book array
            displayBooks(myLibrary);
        }
    }
})