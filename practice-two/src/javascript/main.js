/* global document */
import { renderAllNotes } from './modules/getNotes';

document.addEventListener('DOMContentLoaded', renderAllNotes);

import { addNote } from './modules/addNote';

addNote();
