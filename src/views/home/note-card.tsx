import { Trash } from "lucide-react";
import { Note } from "@/types/note";

const NoteCard = ({ note, deleteNote }: { note: Note, deleteNote: (id: string) => void }) => {
    return (
        <div 
        className="group relative bg-white rounded-lg shadow-md p-4 hover:cursor-pointer"

        >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    className="p-1 hover:bg-gray-100 hover:cursor-pointer rounded-full"
                    onClick={() => deleteNote(note._id)}
                >
                    <Trash className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
        </div>
    );
}

export default NoteCard;