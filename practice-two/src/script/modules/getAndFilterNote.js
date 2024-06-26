/* global document */
import httpUtils from '../utils/httpUtils';

let noteItems = [];

function renderNotes(note) {
  const { id, title, description, category, dateCN } = note;
  const noteDate = new Date(dateCN * 1000);
  const dd = String(noteDate.getDate()).padStart(2, '0');
  const mm = noteDate.getMonth();
  const yyyy = noteDate.getFullYear();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const formattedDate = `${dd} ${monthNames[mm]} ${yyyy}`;

  let categoryClass = '';
  switch (category) {
    case 'business':
      categoryClass = 'note-business';
      break;
    case 'social':
      categoryClass = 'note-social';
      break;
    case 'travel':
      categoryClass = 'note-travel';
      break;
    default:
      categoryClass = 'all-category';
      break;
  }

  const html = `<div class="col-md-4 single-note-item ${categoryClass} all-category">
                  <div class="card card-body">
                      <span class="side-stick"></span>
                      <h5 class="note-title text-truncate w-75 mb-0" data-noteHeading="${title}">
                          ${title}<i class="point fa fa-circle ml-1 font-10"></i>
                      </h5>
                      <p class="note-date font-12 text-muted">${formattedDate}</p>
                      <div class="note-content">
                          <p class="note-inner-content text-muted" data-noteContent="${description}">
                              ${description}
                          </p>
                      </div>
                      <div class="d-flex align-items-center">
                          <span class="mr-1"><i class="fa fa-star favorite-note" data-id="${id}"></i></span>
                          <span class="mr-1"><i class="fa fa-trash remove-note" data-id="${id}"></i></span>
                          <span class="mr-1"><i class="fa fa-pencil edit-note" data-id="${id}"></i></span>
                      </div>
                  </div>
              </div>`;

  const noteFullContainer = document.getElementById('note-full-container');
  noteFullContainer.insertAdjacentHTML('afterbegin', html);
}
async function renderAllNotes() {
  try {
    const notes = await httpUtils.getNotes();
    noteItems = notes;

    const noteFullContainer = document.getElementById('note-full-container');
    noteFullContainer.innerHTML = '';
    notes.forEach((note) => renderNotes(note));
  } catch (error) {
    throw new Error('Failed to fetch notes:', error);
  }
}

document.addEventListener('DOMContentLoaded', renderAllNotes);

function noteList() {
  return noteItems;
}

function renderNotesList(notes) {
  const noteFullContainer = document.getElementById('note-full-container');
  noteFullContainer.innerHTML = '';

  notes.forEach((note) => {
    renderNotes(note);
  });
}

function filterNotes(category, notes) {
  if (notes) {
    return notes.filter((note) => note.category === category);
  }
  return [];
}

const pillLinks = document.querySelectorAll('.note-link');
pillLinks.forEach((pill) => {
  pill.addEventListener('click', () => {
    const categoryId = pill.id;

    pillLinks.forEach((link) => {
      link.classList.remove('active');
    });
    pill.classList.add('active');

    if (categoryId === 'all-category') {
      renderNotesList(noteItems);
    } else {
      const category = categoryId.replace('note-', '');
      const filteredNotes = filterNotes(category, noteItems);
      renderNotesList(filteredNotes);
    }
  });
});

export { noteList, renderNotes, renderAllNotes, filterNotes };
