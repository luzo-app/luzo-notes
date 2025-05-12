import { useContext } from "react";
import { NoteContext } from "@/contexts/note";

export function useNote() {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error("useNote must be used within a NoteProvider");
    }
    return context;
}