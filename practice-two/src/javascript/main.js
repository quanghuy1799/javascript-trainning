import { filterNotesByCategory, notesArray } from './modules/getAndFilterNote.js';

const filteredNotes = filterNotesByCategory('business', notesArray);
filteredNotes;
