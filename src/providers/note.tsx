import { useState } from "react";

import { NoteContext } from "@/contexts/note";

import { NoteContext as NoteContextType } from '@/types/note'

import NewNoteDialog from "@/components/note/new-note-dialog";

import useQueryParams from "@/hooks/use-query-params";

export default function NoteProvider({
    notes,
    setNotes,
    tags,
    setTags,
    createNote,
    children,
}: NoteContextType & {
    children: React.ReactNode
}) {
    const {
        getQueryParam,
        setQueryParam,
        removeQueryParam,
    } = useQueryParams();

    const [openNewNoteDialog, setOpenNewNoteDialog_] = useState(getQueryParam("openNewNoteDialog") === "true");

    const setOpenNewNoteDialog = (open: boolean) => {
        if (open === false) {
            removeQueryParam("openNewNoteDialog");
        } else {
            setQueryParam("openNewNoteDialog", open.toString());
        }
        setOpenNewNoteDialog_(open);
    }

    return (
        <NoteContext.Provider
            value={{
                notes,
                setNotes,
                createNote,
                tags,
                setTags,
                openNewNoteDialog,
                setOpenNewNoteDialog,
            }}
        >
            {children}
            <NewNoteDialog />
        </NoteContext.Provider>
    );
}