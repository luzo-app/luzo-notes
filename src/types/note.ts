import { Dispatch, SetStateAction } from "react";
import { Tag } from "./tag";

type Note = {
    _id: string;
    title: string;
    content: string;
    tags: Tag[];
    isGroup: boolean;
    group: string;
    backgroundColor: string;
    pinned: boolean;
    archived: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

type CreateNote = Omit<Note, "_id">;

type NoteContext = {
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
    createNote: (note: CreateNote) => Promise<void>;
    tags: Tag[];
    setTags: Dispatch<SetStateAction<Tag[]>>;
}

export type { Note, NoteContext, CreateNote };