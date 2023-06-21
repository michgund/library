let myLibrary = [];

function initialRender() {
  const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
  myLibrary.push(theHobbit);
  const theLastWish = new Book("The Last Wish", "Andrzej Sapkowski", 280, 1);
  myLibrary.push(theLastWish);
  addBookToLibrary();
}
initialRender();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

Book.prototype.setRead = function () {
  this.read ? (this.read = false) : (this.read = true);
  addBookToLibrary();
};

function addBookToLibrary() {
  library.textContent = "";
  for (let book of myLibrary) {
    let card = document.createElement("div");

    let title = document.createElement("h2");
    title.textContent = book.title;
    card.appendChild(title);

    let author = document.createElement("h3");
    author.textContent = book.author;
    card.appendChild(author);

    let pages = document.createElement("h3");
    pages.textContent = book.pages;
    card.appendChild(pages);

    let read = document.createElement("h4");
    read.textContent = book.read ? "Read" : "Not read";
    card.appendChild(read);

    let btn = document.createElement("button");
    btn.textContent = book.read ? "Change to not read" : "Change to read";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(book);
      book.setRead();
    });
    card.appendChild(btn);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove book from library";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteEntry(title.textContent);
    });
    card.appendChild(deleteBtn);

    library.appendChild(card);
  }
}

function deleteEntry(book) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == book) {
      myLibrary.splice(i, 1);
    }
  }
  addBookToLibrary();
  return console.log(`${book} removed successfully`);
}

const open = document.querySelector("#open");
open.addEventListener("click", () => {
  favDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let newBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(newBook);
  addBookToLibrary(newBook);
  event.target.parentNode.parentNode.reset();
  favDialog.close();
});
