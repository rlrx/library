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
    myLibrary.push(newBook);
    console.log(myLibrary);
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
        const readDiv = document.createElement('button');
        readDiv.classList.add('readButton');
        if(read == true){
            readDiv.textContent = "Read";
        }
        else{
            readDiv.textContent = "Not Read";
        }
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(pagesDiv);
        bookDiv.appendChild(readDiv);

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
        if(readButton.textContent === "Read"){
            readButton.textContent = "Not Read";
        }
        else{
            readButton.textContent = "Read";
        }
    }
})