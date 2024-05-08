// /* global document */
import { filterNotesByCategory } from './modules/getAndFilterNote.js';
import addNote from './modules/addNote.js';
import { favoriteNote } from './modules/favoriteNote.js';
filterNotesByCategory('all-notes');
addNote();
favoriteNote();
import { handleDeleteClick } from './modules/deleteNotes.js';
handleDeleteClick();
