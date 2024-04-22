import httpUtils from '../utils/httpUtils';
import { renderNote, renderAllNotes } from './getNotes'; 

async function renderNotesByCategory(category) {
    try {
        const allNotes = await httpUtils.getNotes();
        const filteredNotes = allNotes.filter(note => note.category === category);
        filteredNotes.forEach(note => renderNote(note));
    } catch (error) {
       // error
    }
}

document.querySelectorAll('.note-link').forEach(pill => {
    pill.addEventListener('click', async () => {
        document.getElementById('note-full-container').innerHTML = ''; 
        
        const category = pill.id.split('-')[1];
        
        if (category === 'all') {
            await renderAllNotes();
        } else {
            await renderNotesByCategory(category);
        }
        
        document.querySelectorAll('.note-link').forEach(pill => {
            pill.classList.remove('active');
        });
        pill.classList.add('active');
    });
});

async function renderAllNotes() {
    try {
        const notes = await httpUtils.getNotes();
        notes.forEach(note => renderNote(note));
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

export { renderNotesByCategory };
