// /* global document */
import { filterNotesByCategory } from './modules/getAndFilterNote.js';
import { addNoteAndRender } from './modules/addNote.js';
import { favoriteNote } from './modules/favoriteNote.js';
import { handleDeleteClick } from './modules/deleteNotes.js';
import { editNote } from './modules/editNote.js';
// import { editNotesAndRender } from './modules/editNote.js';
filterNotesByCategory('all-notes');
addNoteAndRender();
favoriteNote();
editNote();
