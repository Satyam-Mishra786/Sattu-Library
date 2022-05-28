console.log("hello world");
function showBooks() {
    let books = localStorage.getItem("books");//Getting books from local storage
    if (books == null) {
        bookArray = [];
    }
    else {
        bookArray = JSON.parse(books);
    }
    let bookList = document.querySelector(".bookList")
    let html = bookList.innerHTML;
    bookArray.forEach(function (element) {
        html += `  
                <div class="bookListItem">
                    <div class="bookNameColumn">${element.bookName}</div>
                    <div class="authorNameColumn">${element.author}</div>
                    <div class="typeColumn">${element.type}</div>
                </div>`;
    });
    bookList.innerHTML = html;
}

showBooks();
class Book {
    constructor(bookName, author, type) {
        this.bookName = bookName;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        let bookList = document.querySelector(".bookList");
        let html = '';
        html = `  
                <div class="bookListItem">
                    <div class="bookNameColumn">${book.bookName}</div>
                    <div class="authorNameColumn">${book.author}</div>
                    <div class="typeColumn">${book.type}</div>
                </div>`;
        bookList.innerHTML += html;
    }

    clear() {
        let form = document.querySelector(".form");
        form.reset();
    }

    validate(book) {
        if (book.bookName.length < 4) {
            return false;
        }
        else {
            return true;
        }
    }

    showMessage(message, description) {
        let messageBox = document.querySelector(".messageBox");
        let html = "";
        html = `<div class="message"><strong>${message}</strong> : ${description}</div>`;
        messageBox.innerHTML = html;
        let messageText = document.querySelector(".message");
        if (message === "Error") {
            messageText.style.backgroundColor = 'lightpink';
        }
        else if (message === "Success") {
            messageText.style.backgroundColor = '#99efbb';
        }
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 2000);
    }


}
let form = document.querySelector(".form");
form.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(element) {
    element.preventDefault();//When form submit a page reload but this prevents that from happening
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    // Types of Books
    // Fiction , Programming, Cooking
    let Fiction = document.getElementById("Fiction");
    let Programming = document.getElementById("Programming");
    let Cooking = document.getElementById("Cooking");
    let type;

    // Getting the value of type of the Book
    if (Fiction.checked) {
        type = Fiction.value;
    }

    else if (Programming.checked) {
        type = Programming.value;
    }

    else if (Cooking.checked) {
        type = Cooking.value;
    }
    else {
        type = '';
    }

    // Creating a new book Object
    let book = new Book(name, author, type);

    //Getting Previous books if there in local Storage
    let books = localStorage.getItem("books");
    if (books == null) {
        bookArray = []; //If no books in local storage creating an array to store Book Objects
    }
    else {
        bookArray = JSON.parse(books); //Getting Books as an Array from the local storage
    }





    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.showMessage("Success", "Your book has been added succesfully");
        display.clear();
        bookArray.push(book);//Pushing new book Object in the books array 
        localStorage.setItem("books", JSON.stringify(bookArray)); //Storing the books array as an String
    }
    else {
        display.showMessage("Error", "Your book can't be added");
        display.clear();
    }
}


const search = document.querySelector(".searchInputenter");

search.addEventListener("input", function () {

    let inputVal = search.value.toUpperCase();
    console.log(inputVal);

    let bookListItem = document.querySelectorAll(".bookListItem");
    Array.from(bookListItem).forEach(function (element) {
        let bookName = element.querySelector(".bookNameColumn").innerText.toUpperCase();
        let authorName = element.querySelector(".authorNameColumn").innerText.toUpperCase();
        let bookType = element.querySelector(".typeColumn").innerText.toUpperCase();
        if (bookName.includes(inputVal) || authorName.includes(inputVal) || bookType.includes(inputVal)) {
            element.style.display = 'flex';
        }
        else {
            element.style.display = 'none';
        }

    })
})