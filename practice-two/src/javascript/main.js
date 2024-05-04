import { renderNotes } from './modules/getNotes';
import { renderNotesByCategory } from './modules/filterNotes';
import { addNoteAndRender } from './modules/addNote';

renderNotes({
  title: 'Example Title',
  description: 'Example Description',
  category: 'business',
});
renderNotesByCategory();
addNoteAndRender();
