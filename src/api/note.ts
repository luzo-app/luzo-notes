import api from ".";

import {
    Note,
    CreateNote
} from "@/types/note";

const noteService = {
    getNotes: async () => await api.get("/notes"),
    createNote: async (note: CreateNote) => await api.post("/notes", note),
    updateNote: async (note: Note) => await api.put(`/notes/${note.id}`, note),
    deleteNote: async (id: Note['id']) => await api.delete(`/notes/${id}`),
}

export default noteService;