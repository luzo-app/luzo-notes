import { JSX } from "react";
import {
    HTMLMotionProps,
    motion
} from "motion/react";

import Loader from "@/components/ui/loader";

const ContentLayout = ({
    loading,
    children,
    ...props
}: {
    loading: boolean;
    children?: React.ReactNode;
} & HTMLMotionProps<"div">): JSX.Element => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                ease: "easeInOut",
            }}
            {...props}
        >
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader />
                </div>
            ) : (
                children
            )}
        </motion.div>
    );
}

export default ContentLayout;