import { Book } from "./Book";
class LibraryApp {
	constructor(library) {
		this.library = library;

		this.dialog = document.querySelector("dialog");
		this.newbookButton = document.querySelector(".newbook");
		this.submitButton = document.querySelector(".submit");
		this.bookshelf = document.querySelector(".body");

		this.newbookButton.addEventListener("click", () => this.openDialog());
		this.submitButton.addEventListener("click", (e) =>
			this.handleSubmit(e)
		);
		document.addEventListener("click", (e) => this.handleClick(e));

		this.render();
	}
	openDialog() {
		this.dialog.showModal();
	}

	closeDialog() {
		this.dialog.close();
	}

	handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(document.forms.newBookForm);
		const author = formData.get("author");
		const title = formData.get("title");
		const numOfPages = formData.get("numOfPages");
		const readCheckbox = document.getElementById("read");
		const read = readCheckbox.checked;
		const newBook = new Book(author, title, numOfPages, read);
		newBook.info();
		this.library.addBook(newBook);
		this.render();
		console.log(this.library);
	}

	handleClick(event) {
		const target = event.target;

		// toggle close form
		if (target.classList.contains("closeForm")) {
			this.closeDialog();
		}

		// toggle read
		if (target.classList.contains("readButton")) {
			const bookDiv = target.closest(".book");
			if (!bookDiv) return;

			const index = Number(bookDiv.dataset.index);
			this.library.toggleRead(index);

			target.textContent = this.library.getAll()[index].getReadLabel();
		}

		// delete
		if (target.classList.contains("deleteButton")) {
			const bookDiv = target.closest(".book");
			if (!bookDiv) return;

			const index = Number(bookDiv.dataset.index);
			this.library.removeBook(index);

			this.render();
		}
	}

	render() {
		this.bookshelf.innerHTML = "";

		this.library.getAll().forEach((book, index) => {
			const bookDiv = document.createElement("div");
			bookDiv.className = "book";
			bookDiv.dataset.index = index;

			const authorDiv = document.createElement("div");
			authorDiv.textContent = book.author;

			const titleDiv = document.createElement("div");
			titleDiv.textContent = book.title;

			const pagesDiv = document.createElement("div");
			pagesDiv.textContent = book.numOfPages;

			const readButton = document.createElement("button");
			readButton.classList.add("readButton");
			readButton.textContent = book.getReadLabel();

			const deleteButton = document.createElement("button");
			deleteButton.classList.add("deleteButton");
			deleteButton.textContent = "Delete book";

			bookDiv.append(
				authorDiv,
				titleDiv,
				pagesDiv,
				readButton,
				deleteButton
			);
			this.bookshelf.appendChild(bookDiv);
		});
	}
}

export { LibraryApp };
