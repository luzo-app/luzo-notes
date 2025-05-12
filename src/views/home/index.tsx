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

const HomePage = (): React.ReactNode => {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const { decryptData, encryptData } = useCrypto();

    const createNote = async (note: CreateNote) => {
        try {
            const encryptedNote = {
                ...note,
                title: encryptData(note.title).data as string,
                content: encryptData(note.content).data as string,
                createdAt: encryptData(note.createdAt).data as string,
                updatedAt: encryptData(note.updatedAt).data as string,
            };
            const response = await noteService.createNote(encryptedNote);
            setNotes(prevNotes => [...prevNotes, response.data]);
        } catch (error) {
            processError(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchNotes = async () => {
            try {
                const response = await noteService.getNotes();
                const decryptedNotes = response.data.map((note: Note) => ({
                    ...note,
                    title: decryptData(note.title).data,
                    content: decryptData(note.content).data,
                    createdAt: decryptData(note.createdAt).data,
                    updatedAt: decryptData(note.updatedAt).data,
                }));
                setNotes(decryptedNotes);
            } catch (error) {
                processError(error);
            }
        }
        const fetchTags = async () => {
            try {
                const response = await tagService.getTags();
                const decryptedTags = response.data.map((tag: Tag) => ({
                    ...tag,
                    name: decryptData(tag.name).data,
                }));
                setTags(decryptedTags);
            } catch (error) {
                processError(error);
            }
        }
        Promise.all([
            fetchNotes(),
            fetchTags(),
        ]).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <NoteProvider
            notes={notes}
            setNotes={setNotes}
            createNote={createNote}
            tags={tags}
            setTags={setTags}
        >
            <div className="space-y-4 p-4">
                <Header />
                <Sidebar />
            </div>
            <ContentLayout loading={isLoading}>
            </ContentLayout>
        </NoteProvider>
    );
}

export default HomePage;