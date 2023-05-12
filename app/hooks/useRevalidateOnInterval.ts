import { useEffect } from "react";
import { useRevalidate } from "./useRevalidate";

export const useRevalidateOnInterval = ({
    enabled = false,
    interval = 1000,
}: {
    enabled?: boolean;
    interval?: number;
}) => {
    let revalidate = useRevalidate();
    useEffect(
        function revalidateOnInterval() {
            if (!enabled) return;
            let intervalId = setInterval(revalidate, interval);
            return () => clearInterval(intervalId);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [revalidate]
    );
};