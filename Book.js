class Book {
	constructor(author, title, numOfPages, read = false) {
		this.author = author;
		this.title = title;
		this.numOfPages = numOfPages;
		this.read = read;
	}
	toggleRead() {
		this.read = !this.read;
	}
	getReadLabel() {
		return this.read ? "Read" : "Not Read";
	}
}

export { Book };
