import { renderNotes } from './modules/getNotes';
import { renderNotesByCategory } from './modules/filterNotes';

renderNotes({
  title: 'Example Title',
  description: 'Example Description',
  category: 'business',
});
renderNotesByCategory();
