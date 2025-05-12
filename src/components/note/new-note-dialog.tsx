import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useNote } from "@/hooks/use-note"

const NewNoteDialog = (): React.ReactNode => {

    const {
        openNewNoteDialog,
        setOpenNewNoteDialog,
        createNote,
    } = useNote();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newNote = {
            title,
            content,
            tags: [],
            isGroup: false,
            group: "",
            backgroundColor: "#ffffff",
            pinned: false,
            archived: false,
            deleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await createNote(newNote);
        setOpenNewNoteDialog(false);
        setTitle("");
        setContent("");
    };

    return (
        <Dialog open={openNewNoteDialog} onOpenChange={setOpenNewNoteDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Créer une nouvelle note
                    </DialogTitle>
                    <DialogDescription>
                        Ajoutez une nouvelle note à votre collection. Cliquez sur enregistrer lorsque vous avez terminé.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Titre
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="content" className="text-right">
                                Contenu
                            </Label>
                            <Input
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Enregistrer la note</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NewNoteDialog;