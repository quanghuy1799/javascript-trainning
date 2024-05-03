import { renderNote } from './modules/getNotes';
import { renderNotesByCategory } from './modules/filterNotes';
import { addNote} from './modules/addNote';
import { handleDeleteClick } from './modules/deleteNotes';
import { favouriteIcons } from './modules/favoriteNote';
import { editNote } from './modules/editNote';

renderNote();
renderNotesByCategory();
addNote();
handleDeleteClick();
favouriteIcons;
editNote();
