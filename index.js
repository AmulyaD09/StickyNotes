// Get the notes container and buttons
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
const clearAllNotesButton = notesContainer.querySelector(".clear-all-notes");

// Load existing notes from local storage and display them
getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

// event listeners
addNoteButton.addEventListener("click", () => addNote());
clearAllNotesButton.addEventListener("click", () => clearAllNotes());

// Function to retrieve notes from local storage
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Function to save notes to local storage
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container");

    // Font Awesome icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-times-circle"); // Use "times-circle" icon

   
    deleteIcon.classList.add("delete-icon");

    deleteIcon.addEventListener("click", () => deleteNote(id, noteContainer));

    // textarea element for the sticky note content
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Start now, Begin capturing ...";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    // Appending the icon before the textarea
    noteContainer.appendChild(deleteIcon);
    noteContainer.appendChild(element);

    return noteContainer;
}




// Function to add a new note
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

// Function to update a note's content
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.find((note) => note.id == id);

    if (targetNote) {
        targetNote.content = newContent;
        saveNotes(notes);
    }
}

// Function to delete a note
function deleteNote(id, noteContainer) {
    const notes = getNotes().filter((note) => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(noteContainer);
}

// Function to clear all notes
function clearAllNotes() {
    localStorage.removeItem("stickynotes-notes");
    notesContainer.innerHTML = "";
}
