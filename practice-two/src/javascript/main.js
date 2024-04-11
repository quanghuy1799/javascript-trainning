const getNotes = require('./api/getNotes');
const createNote = require('./api/createNote');
const deleteNote = require('./api/deleteNote');

(async () => {
    try {
        const notes = await getNotes();
        console.log('Notes:', notes);

        const newNote = { text: 'New note' };
        const createdNote = await createNote(newNote);
        console.log('Created note:', createdNote);

        const deletedNote = await deleteNote(createdNote.id);
        console.log('Deleted note:', deletedNote);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
