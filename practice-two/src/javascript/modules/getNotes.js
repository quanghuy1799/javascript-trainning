import httpUtils from '../utils/httpUtils';
/* global document */

function renderNotes(note) {
  const { title, description, category } = note;
  const noteDate = new Date();
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
                          <span class="mr-1"><i class="fa fa-star favourite-note"></i></span>
                          <span class="mr-1"><i class="fa fa-trash remove-note"></i></span>
                          <span class="mr-1"><i class="fa fa-pencil edit-note"></i></span>
                      </div>
                  </div>
              </div>`;

  const noteFullContainer = document.getElementById('note-full-container');
  noteFullContainer.insertAdjacentHTML('afterbegin', html);
}

async function renderAllNotes() {
  try {
    const notes = await httpUtils.getNotes();
    notes.forEach((note) => renderNotes(note));
  } catch (error) {
    throw error('Failed');
  }
}

document.addEventListener('DOMContentLoaded', renderAllNotes);

export { renderAllNotes, renderNotes };
