class Library {
	constructor() {
		this.books = [];
	}
	addBook(book) {
		this.books.push(book);
	}
	removeBook(index) {
		this.books.splice(index, 1);
	}
	getAll() {
		return this.books;
	}
	toggleRead(index) {
		this.books[index].toggleRead();
	}
}

export { Library };
