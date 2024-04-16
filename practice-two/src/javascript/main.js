document.addEventListener("DOMContentLoaded", function() {
  var categoryButtons = document.querySelectorAll('.note-link');

  categoryButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          categoryButtons.forEach(function(btn) {
              btn.classList.remove('active');
          });

          this.classList.add('active');

          var category = this.id.replace('note-', '');

          var notes = document.querySelectorAll('.single-note-item');

          if (category === 'all-category') {
              notes.forEach(function(note) {
                  note.style.display = 'block';
              });
          } else {
              notes.forEach(function(note) {
                  note.style.display = 'none';
              });

              var categoryNotes = document.querySelectorAll('.note-' + category);
              categoryNotes.forEach(function(note) {
                  note.style.display = 'block';
              });
          }
      });
  });
});
