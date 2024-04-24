/* global document */
import { renderAllNotes } from './modules/getNotes';
import { addNote } from './modules/addNote';

document.addEventListener('DOMContentLoaded', renderAllNotes);

addNote();
