/*global document*/
import httpUtils from '../utils/httpUtils';
const selectStarIcon = new Set();

async function favoriteNote(event) {
  if (
    event &&
    event.target &&
    event.target.classList.contains('favorite-note')
  ) {
    const starIcon = event.target;
    const noteId = starIcon.dataset.id;

    if (selectStarIcon.has(starIcon)) {
      starIcon.style.color = '';
      selectStarIcon.delete(starIcon);
      await updateFavoriteStatus(noteId, false);
      alert('Note has been removed from favorites!');
    } else {
      starIcon.style.color = '#ffc107';
      selectStarIcon.add(starIcon);
      await updateFavoriteStatus(noteId, true);
      alert('Add to favorite successfully!');
    }
  }
}
async function updateFavoriteStatus(noteId, isFavorite) {
  try {
    const updatedNote = {
      id: noteId,
      favorite: isFavorite,
    };

    await httpUtils.updateNote(noteId, updatedNote);
  } catch (error) {
    alert('An error occurred while adding favorite note: ' + error.message);
  }
}

const noteFullContainer = document.getElementById('note-full-container');
noteFullContainer.addEventListener('click', favoriteNote);
noteFullContainer.addEventListener('click', favoriteNote);

window.addEventListener('load', async () => {
  const notes = await httpUtils.getNotes();
  notes.forEach((note) => {
    if (note.favorite) {
      const starIcon = document.querySelector(`[data-id="${note.id}"]`);
      if (starIcon) {
        starIcon.style.color = '#ffc107';
        selectStarIcon.add(starIcon);
      }
    }
  });
});

export { favoriteNote };
