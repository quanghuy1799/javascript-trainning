import {
  filterNotesByCategory,
  notesArray,
} from './modules/getAndFilterNote.js';
import addNote from './modules/addNote.js';
const filteredNotes = filterNotesByCategory('business', notesArray);
filteredNotes;
