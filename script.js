const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("button");
const closeButton = document.querySelector("dialog button");
const newBookForm = document.querySelector("dialog > form");

showButton.addEventListener("click", (e) => {
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    dialog.close();
});

newBookForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("is-read").checked;
    let book = addBookToLibrary(title, author, pages, isRead);
    appendBook(book);
    newBookForm.reset();
    dialog.close();
});

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    return book;
}

function appendBook(book) {
    const tableBody = document.getElementById("table-body");
    let newRow = tableBody.insertRow(0);
    newRow.insertCell(0).textContent = book.title;
    newRow.insertCell(1).textContent = book.author;
    newRow.insertCell(2).textContent = book.pages;
    let checkboxRow = newRow.insertCell(3);
    let isReadCheckbox = document.createElement("input");
    isReadCheckbox.type = "checkbox";
    isReadCheckbox.checked = book.isRead;
    checkboxRow.appendChild(isReadCheckbox);
}

function displayLibrary(books) {
    for (book of books) {
        appendBook(book);
    }
}

addBookToLibrary("Testbook", "Some author", 231, true); //use array here!
addBookToLibrary("Testbook2", "Some author2", 331, false);
addBookToLibrary("Testbook3", "Some author3", 3321, false);
displayLibrary(myLibrary);

