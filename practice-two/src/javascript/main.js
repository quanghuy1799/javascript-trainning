/* global document */

import { renderAllNotes } from './modules/getNotes';
import { renderNotesByCategory } from './modules/filterNotes';

document.addEventListener('DOMContentLoaded', renderAllNotes);

renderNotesByCategory();
