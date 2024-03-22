var books = [
  {title: 'Harry Potter and the Deathly Hallows',
   img: 'https://images.booksense.com/images/221/010/9780545010221.jpg',
   author: 'J.K Rowling',
   alreadyRead: false
  },
  {title: 'Harry Potter and the Prisoner of Azkaban',
   img: 'https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg',
   author: 'J.K Rowling',
   alreadyRead: true
  }];
    
var bookList = document.createElement('ul');
for (var i = 0; i < books.length; i++) {
  var bookItem = document.createElement('li');
  var bookImg = document.createElement('img');
  bookImg.src = books[i].img;
  bookItem.appendChild(bookImg);
  var bookDescription = document.createTextNode(books[i].title + ' by ' + books[i].author);
  bookItem.appendChild(bookDescription);
  if (books[i].alreadyRead) {
    bookItem.style.color = 'grey';
  }
  bookList.appendChild(bookItem);
}
document.body.appendChild(bookList);
        