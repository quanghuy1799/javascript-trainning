import httpUtils from '../utils/httpUtils';
/* global document */

function renderNote(note) {
  const noteContainer = document.createElement('div');
  noteContainer.className = 'col-md-4 single-note-item all-category';

  noteContainer.innerHTML = `
        <div class="card card-body">
            <span class="side-stick"></span>
            <h5 class="note-title text-truncate w-75 mb-0" data-noteheading="${note.title}">${note.title} <i class="point fa fa-circle ml-1 font-10"></i></h5>
            <p class="note-date font-12 text-muted">${new Date().toLocaleDateString()}</p>
            <div class="note-content">
                <p class="note-inner-content text-muted" data-notecontent="${note.description}">${note.description}</p>
            </div>
            <div class="d-flex align-items-center">
                <span class="mr-1"><i class="fa fa-star favourite-note"></i></span>
                <span class="mr-1"><i class="fa fa-trash remove-note"></i></span>
                <div class="ml-auto">
                    <div class="category-selector btn-group">
                        <a class="nav-link dropdown-toggle category-dropdown label-group p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                            <div class="category">
                                <div class="category-business"></div>
                                <div class="category-social"></div>
                                <div class="category-important"></div>
                                <span class="more-options text-dark"><i class="icon-options-vertical"></i></span>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right category-menu">
                            <a class="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success" href="javascript:void(0);">
                                <i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i>${note.category}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.getElementById('note-full-container').appendChild(noteContainer);
}

async function renderAllNotes() {
  try {
    const notes = await httpUtils.getNotes();
    notes.forEach((note) => renderNote(note));
  } catch (error) {
    throw error('Failed');
  }
}

document.addEventListener('DOMContentLoaded', renderAllNotes);

export { renderAllNotes };
