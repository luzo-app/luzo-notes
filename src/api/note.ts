import api from ".";

import {
    Note,
    CreateNote
} from "@/types/note";

import { PaginatedResponse } from "@/types/api";

const noteService = {
    getNotes: async (): Promise<PaginatedResponse<Note>> => {
        const { data } = await api.get("/notes/");
        return data;
    },
    createNote: async (note: CreateNote): Promise<Note> => {
        const { data } = await api.post("/notes", note);
        return data;
    },
    updateNote: async (note: Note): Promise<Note> => {
        const { data } = await api.put(`/notes/${note._id}`, note);
        return data;
    },
    deleteNote: async (id: Note['_id']): Promise<void> => {
        await api.delete(`/notes/${id}`);
    },
}

export default noteService;