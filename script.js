function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    return `Book: ${this.title} Author: ${this.author} Page Count: ${this.pages} Read?: ${this.isRead}`;
}

let book = new Book("Harry Potter", "Jk Rowling", "545", "true");
console.log(book.info());

