//Library Management System Ver 1

const bookTitle = document.getElementById("bookTitle");
const author = document.getElementById("author");
const searchBook = document.getElementById("searchBook");
const addBook = document.getElementById("addBook");
const borrowBook = document.getElementById("borrowBook");
const returnBook = document.getElementById("returnBook");
const showBook = document.getElementById("showBook");
const reset = document.getElementById("reset");

let books = [];

class Book{
    static nextBookNumber = 2001;

    constructor(bookName,authorName){
        this.bookName = bookName;
        this.authorName = authorName;
        this.bookId = Book.nextBookNumber++;
        this.isBorrowed = false;
    }

    borrowBook(){
        if(this.isBorrowed){ 
        
            return false;

        }

        this.isBorrowed = true;
        return true;
    }

    returnBook(){
        if(!this.isBorrowed){ 
        
            return false;

        }

        this.isBorrowed = false;
        return true;
    }

}

addBook.onclick = function(){

    let bookName = bookTitle.value;
    let authorname = author.value;

    if(bookName === ""){
        output.textContent = "Enter a book name !!";
        return;
    }

    if(authorname === ""){
        output.textContent = "Enter an author's name !!";
        return;
    }

    const book = new Book(bookName,authorname)

    books.push(book);

    bookTitle.value = "";
    author.value = "";
    searchBook.value = "";

    output.textContent = "Book added Successfully !!";

}


borrowBook.onclick = function(){

    if(books.length === 0){
        output.textContent = "There are no books to borrow bruv";
        return;
    }

    let bookNum = Number(searchBook.value);
    
        if(isNaN(bookNum) || bookNum <=0){
        output.textContent = "Enter a valid book number !!";
        return;
    }

    const book = books.find(function(book){
        return book.bookId === bookNum;
    })

    if (!book){
    output.textContent = "Book not found.";
    return;
    }

    if(book.borrowBook()){
        output.textContent = "Book borrowed successfully !!";

    }
    else{
        output.textContent = "Book already borrowed";
    }

}

returnBook.onclick = function(){

    if(books.length === 0){
        output.textContent = "There are no books to borrow bruv";
        return;
    }

    let bookNum = Number(searchBook.value);
    
        if(isNaN(bookNum) || bookNum <=0){
        output.textContent = "Enter a valid book number !!";
        return;
    }

    const book = books.find(function(book){
        return book.bookId === bookNum;
    })

    if (!book){
    output.textContent = "Book not found.";
    return;
    }

    if(book.returnBook()){
        output.textContent = "Book returned successfully !!";

    }
    else{
        output.textContent = "Book is already available";
    }
}

showBook.onclick = function(){
    if(books.length === 0){
        output.textContent = "There are no books to borrow bruv";
        return;
    }

    output.innerHTML = "";

    books.forEach(function(book, index) {
        let status = "Available";

        if(book.isBorrowed){
            status = "Borrowed";
        }

        output.innerHTML += `
            <strong>Book ID:</strong> ${book.bookId}<br>
            <strong>Book Name:</strong> ${book.bookName}<br>
            <strong>Author:</strong> ${book.authorName}<br>
            <strong>Status:</strong> ${status}<br><br>
        `;
    });
}

reset.onclick = function(){

    books = [];

    Book.nextBookNumber = 2001;

    output.textContent = "Library has been reset.";
    
    bookTitle.value = "";
    author.value = "";
    searchBook.value = "";

}