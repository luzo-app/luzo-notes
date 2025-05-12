import {
    useState,
    useEffect
} from "react";
import {
    LayoutGrid,
    List,
    Plus
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import useQueryParams from "@/hooks/use-query-params";
import { useDebounce } from "@/hooks/use-debounce";
import { useNote } from "@/hooks/use-note";

import { isEmpty } from "@/lib/utils";

const Header = (): React.ReactNode => {
    const {
        setOpenNewNoteDialog,
    } = useNote();

    const {
        getQueryParam,
        setQueryParam
    } = useQueryParams();

    const [search, setSearch] = useState(getQueryParam("search") || "");

    const tab = getQueryParam("tab") || "list";

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setQueryParam("search", debouncedSearch);
    }, [debouncedSearch]);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <Button onClick={() => setOpenNewNoteDialog(true)} className="w-full sm:w-64">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle Note
                    </Button>
                    <Input
                        type="text"
                        placeholder="Rechercher une note..."
                        className="w-full sm:w-[300px]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus={isEmpty(search)}
                    />
                </div>
            </div>

            <Tabs defaultValue={tab} onValueChange={(value) => setQueryParam("tab", value)}>
                <TabsList>
                    <TabsTrigger value="list">
                        <LayoutGrid />
                    </TabsTrigger>
                    <TabsTrigger value="grid">
                        <List />
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}

export default Header