/* global document */

import { renderAllNotes } from './modules/getNotes';

document.addEventListener('DOMContentLoaded', renderAllNotes);

import { renderNotesByCategory } from './modules/filterNotes';
renderNotesByCategory;
