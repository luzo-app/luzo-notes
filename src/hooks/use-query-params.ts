import { useSearchParams } from "react-router";

const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getQueryParam = (key: string) => {
        return searchParams.get(key);
    };

    const setQueryParam = (key: string, value: string) => {
        setSearchParams(prev => {
            prev.set(key, value);
            return prev;
        });
    };

    const removeQueryParam = (key: string) => {
        setSearchParams(prev => {
            prev.delete(key);
            return prev;
        });
    };

    const clearQueryParams = () => {
        setSearchParams({});
    };

    return {
        getQueryParam,
        setQueryParam,
        removeQueryParam,
        clearQueryParams,
    };
}

export default useQueryParams;