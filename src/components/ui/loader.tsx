import { JSX } from "react";
import { LoaderCircle } from "lucide-react";

const Loader = (): JSX.Element => {
    return (
        <LoaderCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
    );
}

export default Loader;