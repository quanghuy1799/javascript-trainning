import httpUtils from '../utils/httpUtils';
import { renderNotes, renderAllNotes } from './getNotes';
/* global document */

async function renderNotesByCategory(category) {
  try {
    const allNotes = await httpUtils.getNotes();
    const filteredNotes = allNotes.filter((note) => note.category === category);
    filteredNotes.forEach((note) => renderNotes(note));
  } catch (error) {
    throw error('Error fetching notes');
  }
}

document.querySelectorAll('.note-link').forEach((pill) => {
  pill.addEventListener('click', async () => {
    document.getElementById('note-full-container').innerHTML = '';

    const category = pill.id.split('-')[1];

    if (category === 'all') {
      await renderAllNotes();
    } else {
      await renderNotesByCategory(category);
    }

    document.querySelectorAll('.note-link').forEach((pill) => {
      pill.classList.remove('active');
    });
    pill.classList.add('active');
  });
});

export { renderNotesByCategory };
