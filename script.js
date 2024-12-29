const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function listBooks(books) {
    for (book of books) {
        console.log(book);
    }
}


addBookToLibrary("Testbook", "Some author", 231, true);
addBookToLibrary("Testbook2", "Some author2", 331, false);
addBookToLibrary("Testbook3", "Some author3", 3321, false);
listBooks(myLibrary);

