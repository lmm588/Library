const myLibrary = (() => { //IIFE Factory Function for encapsulation
    const books = [];

    function createBook(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        return { title, author, pages, isRead }
    };

    function addBookToLibrary(title, author, pages, isRead) {
        let book = createBook(title, author, pages, isRead);
        books.push(book);
        return book;
    };

    function returnBooks() {
        return books;
    }

    return { createBook, addBookToLibrary, returnBooks };
})();

const bookTable = (() => { //Another IIFE
    function cacheDom() {
        this.showFormButton = document.querySelector("button[title='Add book'");
        this.bookForm = document.querySelector("form");
        this.tableBody = document.getElementById("table-body");
        this.closeFormButton = document.querySelector("button[type='button']");
        this.modalDialog = document.querySelector("dialog");
        return this;
    }


    function addTableRow(book) {
        let newRow = cacheDom().tableBody.insertRow(0);
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
        deleteButton.setAttribute("onclick", "bookTable.deleteRow(this)");
        deleteButton.innerHTML = "Delete book";
        let deleteRow = newRow.insertCell(4);
        deleteRow.appendChild(deleteButton);
    };

    function buildTable(books) {
        for (book of books) {
            addTableRow(book);
        }
    };

    function submitUserCreatedBook() {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const isRead = document.getElementById("is-read").checked;
        let book = myLibrary.addBookToLibrary(title, author, pages, isRead);
        addTableRow(book);
        bookForm.reset();
        modalDialog.close();
    };

    function deleteRow(button) {
        let row = button.parentNode.parentNode;
        let table = document.getElementById("book-table");
        table.deleteRow(row.rowIndex);
    };
    return { cacheDom, addTableRow, buildTable, submitUserCreatedBook, deleteRow }
})();

bookTable.cacheDom();
bookTable.showFormButton.addEventListener("click", () => {
    bookTable.modalDialog.showModal();
});
bookTable.closeFormButton.addEventListener("click", () => {
    bookTable.modalDialog.close();
    bookTable.bookForm.reset();
});
bookTable.bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    bookTable.submitUserCreatedBook();
});
const newBook = myLibrary.addBookToLibrary("A Test Book", "Some Dude", "200", "True");
bookTable.buildTable(myLibrary.returnBooks());


