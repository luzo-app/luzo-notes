import { useEffect, useState } from "react";

import ContentLayout from "@/components/content-layout";

import NoteProvider from "@/providers/note";

import Header from "./header";
import Sidebar from "./sidebar";

import noteService from "@/api/note";
import tagService from "@/api/tag";
import { processError } from "@/api/error";

import { Note, CreateNote } from "@/types/note";
import { Tag } from "@/types/tag";

import useCrypto from "@/hooks/use-crypto";
import NoteCard from "./note-card";

const HomePage = (): React.ReactNode => {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const { decryptData, encryptData } = useCrypto();

    const getNotes = async () => {
        try {
            const { data } = await noteService.getNotes();
            const decryptedNotes = data.map((note: Note) => ({
                ...note,
                title: decryptData(note.title).data,
                content: decryptData(note.content).data,
                createdAt: decryptData(note.createdAt).data,
                updatedAt: decryptData(note.updatedAt).data,
            }));
            setNotes(decryptedNotes as Note[]);
        } catch (error) {
            processError(error);
        }
    }

    const getTags = async () => {
        try {
            const { data } = await tagService.getTags();
            const decryptedTags = data.map((tag: Tag) => ({
                ...tag,
                name: decryptData(tag.name).data,
            }));
            setTags(decryptedTags as Tag[]);
        } catch (error) {
            processError(error);
        }
    }

    const createNote = async (note: CreateNote) => {
        try {
            const encryptedNote = {
                ...note,
                title: encryptData(note.title).data as string,
                content: encryptData(note.content).data as string,
                createdAt: encryptData(note.createdAt).data as string,
                updatedAt: encryptData(note.updatedAt).data as string,
            };
            const new_note = await noteService.createNote(encryptedNote);
            const decryptedNote: Note = {
                ...new_note,
                title: decryptData(new_note.title).data as string,
                content: decryptData(new_note.content).data as string,
                createdAt: decryptData(new_note.createdAt).data as string,
                updatedAt: decryptData(new_note.updatedAt).data as string,
            };
            setNotes(prevNotes => [...prevNotes, decryptedNote]);
        } catch (error) {
            processError(error);
        }
    }

    const deleteNote = async (id: string) => {
        try {
            await noteService.deleteNote(id);
            await getNotes();
        } catch (error) {
            processError(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getNotes(), getTags()]).finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NoteProvider
            notes={notes}
            setNotes={setNotes}
            createNote={createNote}
            tags={tags}
            setTags={setTags}
        >
            <div className="flex h-full p-4">
                <div className="w-64 border-r border-gray-200">
                    <Sidebar />
                </div>
                <div className="flex-1 p-4">
                    <Header />
                    <ContentLayout loading={isLoading}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {notes.map((note) => (
                                <NoteCard key={note._id} note={note} deleteNote={deleteNote} />
                            ))}
                        </div>
                    </ContentLayout>
                </div>
            </div>
        </NoteProvider>
    );
}

export default HomePage;