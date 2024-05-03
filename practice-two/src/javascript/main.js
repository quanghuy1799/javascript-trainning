import { renderNote } from './modules/getNotes';
import { renderNotesByCategory } from './modules/filterNotes';

renderNote({ title: 'Example Title', description: 'Example Description', category: 'business' });
renderNotesByCategory();
