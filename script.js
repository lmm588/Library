class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
};

class Library {
    constructor() {
        this.books = [];
    }

    addBookToLibrary(title, author, pages, isRead) {
        let book = new Book(title, author, pages, isRead);
        this.books.push(book);
        return book;
    };

    getBooks() {
        return this.books;
    }
};

class UIController {
    constructor() {
        this.cacheDom(); //Runs cacheDOM on construct
    }

    cacheDom() { //Utility function to cache DOM elements
        this.showFormButton = document.querySelector("button[title='Add book']");
        this.bookForm = document.querySelector("form");
        this.tableBody = document.getElementById("table-body");
        this.closeFormButton = document.querySelector("button[type='button']");
        this.modalDialog = document.querySelector("dialog");
        this.bookTable = document.getElementById("book-table");
    };

    addTableRow(book) {
        let newRow = this.tableBody.insertRow(0);
        newRow.insertCell(0).textContent = book.title;
        newRow.insertCell(1).textContent = book.author;
        newRow.insertCell(2).textContent = book.pages;
        let checkboxRow = newRow.insertCell(3);
        let isReadCheckbox = document.createElement("input");
        isReadCheckbox.type = "checkbox";
        isReadCheckbox.checked = book.isRead;
        checkboxRow.appendChild(isReadCheckbox);
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("onclick", "uiController.deleteRow(this)");
        deleteButton.textContent = "Delete book";
        let deleteRow = newRow.insertCell(4);
        deleteRow.appendChild(deleteButton);
    };

    buildTable(books) {
        for (const book of books) {
            this.addTableRow(book);
        }
    };

    submitUserCreatedBook() {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const isRead = document.getElementById("is-read").checked;
        const book = myLibrary.addBookToLibrary(title, author, pages, isRead);
        this.addTableRow(book);
        this.bookForm.reset();
        this.modalDialog.close();
    };

    deleteRow(button) {
        let row = button.parentNode.parentNode;
        this.bookTable.deleteRow(row.rowIndex);
    };
};

const uiController = new UIController();
const myLibrary = new Library();

(() => {
    uiController.showFormButton.addEventListener("click", () => { uiController.modalDialog.showModal(); });
    uiController.closeFormButton.addEventListener("click", () => { uiController.modalDialog.close(); uiController.bookForm.reset(); });
    uiController.bookForm.addEventListener("submit", (e) => { e.preventDefault(); uiController.submitUserCreatedBook(); });
    myLibrary.addBookToLibrary("A Test Book", "Some Dude", "200", "True");
    uiController.buildTable(myLibrary.getBooks());
})();

