/* global document */

const favouriteIcons = document.querySelectorAll('.favourite-note');

favouriteIcons.forEach((icon) => {
  icon.addEventListener('click', function () {
    this.classList.add('note-favourite');
  });
});
export { favouriteIcons };
