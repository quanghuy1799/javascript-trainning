/*global document*/
const selectStarIcon = new Set();

function favoriteNote(event) {
  const target = event.target;

  if (target.classList.contains('favourite-note')) {
    const starIcon = target;

    if (selectStarIcon.has(starIcon)) {
      starIcon.style.color = '';
      selectStarIcon.delete(starIcon);
    } else {
      starIcon.style.color = '#ffc107';
      selectStarIcon.add(starIcon);
    }
  }
}

const noteFullContainer = document.getElementById('note-full-container');
noteFullContainer.addEventListener('click', favoriteNote);

export { selectStarIcon, favoriteNote };

