// Import httpUtils
import httpUtils from '../utils/httpUtils';

window.onload = function() {
  const ulElement = document.querySelector('.nav-pills');

  const pills = document.querySelectorAll('.note-link');

  pills.forEach(pill => {
    pill.addEventListener('click', function() {
      const category = this.id.replace('note-', '');

      httpUtils.getNotes()
        .then(notes => {
          const filteredNotes = notes.filter(note => note.category === category);

          while (ulElement.firstChild) {
            ulElement.removeChild(ulElement.firstChild);
          }

          filteredNotes.forEach(note => {
            const liElement = document.createElement('li');

            liElement.textContent = note.title;

            ulElement.appendChild(liElement);
          });
        })
        .catch(error => {
          const errorElement = document.createElement('p');
          errorElement.textContent = 'Errors ' + error.message;

          document.body.appendChild(errorElement);
        });
    });
  });
};
