import api from ".";

const tagService = {
    getTags: async () => await api.get("/tags"),
}

export default tagService;