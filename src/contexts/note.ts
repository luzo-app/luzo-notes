import {
    createContext,
} from 'react'

import { NoteContext as NoteContextType } from '@/types/note'

export const NoteContext = createContext<
    NoteContextType & {
        openNewNoteDialog: boolean;
        setOpenNewNoteDialog: (open: boolean) => void;
    } | undefined
>(
    undefined
)