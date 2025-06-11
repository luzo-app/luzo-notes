import { SquarePen, Archive, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNote } from "@/hooks/use-note";
import useQueryParams from "@/hooks/use-query-params";

const Sidebar = (): React.ReactNode => {
    const { tags } = useNote();
    const {
        getQueryParam,
        setQueryParam,
    } = useQueryParams();

    const view = (() => {
        switch (getQueryParam("view")) {
            case "notes":
                return "notes";
            case "archive":
                return "archive";
            case "trash":
                return "trash";
            default:
                return "notes";
        }
    })();

    return (
        <Card className="w-64">
            <CardContent>
                <div className="flex flex-col gap-4">
                    <Button variant={view === "notes" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setQueryParam("view", "notes")}>
                        <SquarePen className="w-4 h-4" />
                        Notes
                    </Button>
                    <Button variant={view === "archive" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setQueryParam("view", "archive")}>
                        <Archive className="w-4 h-4" />
                        Archive
                    </Button>
                    <Button variant={view === "trash" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setQueryParam("view", "trash")}>
                        <Trash className="w-4 h-4" />
                        Corbeille
                    </Button>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Tags</span>
                    {tags.map((tag) => (
                        <Button
                            variant={view === "notes" && getQueryParam("tagId") === tag._id ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            key={tag._id}
                            onClick={() => {
                                setQueryParam("tagId", tag._id);
                            }}
                            disabled={view !== "notes"}
                        >
                            <span className="text-sm font-medium">{tag.name}</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default Sidebar;