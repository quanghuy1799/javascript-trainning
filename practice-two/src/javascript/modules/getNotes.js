// Import httpUtils
import httpUtils from '../utils/httpUtils'; 

window.onload = function() {

  const ulElement = document.querySelector('.nav-pills');

  httpUtils.getNotes()
    .then(notes => {
      notes.forEach(note => {
        const liElement = document.createElement('li');

        liElement.textContent = note.title; 

        ulElement.appendChild(liElement);
      });
    })
    .catch(error => {
      const errorElement = document.createElement('p');
      errorElement.textContent = 'Error ' + error.message;

      document.body.appendChild(errorElement);
    });
};
