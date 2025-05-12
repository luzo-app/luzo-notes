import { AnimatePresence } from "motion/react"
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./theme"

import {
    getCookie,
    setCookie
} from "@/lib/cookies";

export function Provider({
    children,
}: {
    children: React.ReactNode
}) {
    const encryptionKey = getCookie("encryptionKey");
    const setEncryptionKey = () => {
        setCookie("encryptionKey", "coucou");
    }
    if (!encryptionKey) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Aucune clé de chiffrement trouvée</h1>
                <p className="text-sm text-muted-foreground">
                    Veuillez contacter l'administrateur du site pour obtenir une clé de chiffrement.
                </p>
                <Button
                    className="mt-4"
                    variant="outline"
                    onClick={setEncryptionKey}
                >
                    <Settings className="w-4 h-4" />
                    Contacter l'administrateur
                </Button>
            </div>
        )
    }
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AnimatePresence mode={"wait"}>
                {children}
            </AnimatePresence>
        </ThemeProvider>
    )
}