//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBooktoList = function (book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>&times;</td>
  `;
  list.appendChild(row);
};

//Show Alerts
UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement('div');
  //add class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');
  //insert alert
  container.insertBefore(div, form);

  //timeout after 3 seconds

  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

//Delete Book

UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

//Clear Fields after data added to table
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  //Validation
  if (title === '' || author === '' || isbn === '') {
    //Error
    ui.showAlert('Please fill all fields', 'error');
  } else {
    //Call addBookList Method
    ui.addBooktoList(book);
    //show success
    ui.showAlert('Book Added', 'success');
    //Call clear fields method
    ui.clearFields();
  }
});

//Event Listner for delete

document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();

  const ui = new UI();

  ui.deleteBook(e.target);

  //show alert

  ui.showAlert('Book Removed', 'success');
});
