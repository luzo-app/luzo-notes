import api from ".";

import { PaginatedResponse } from "@/types/api";
import { Tag } from "@/types/tag";

const tagService = {
    getTags: async (): Promise<PaginatedResponse<Tag>> => {
        const { data } = await api.get("/tags/");
        return data;
    },
}

export default tagService;