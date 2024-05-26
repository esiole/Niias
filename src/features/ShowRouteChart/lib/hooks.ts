import { useEffect, useState } from "react";
import { getPoints, Point } from "../../../entities/Point";
import { getTracks, Track } from "../../../entities/Track";

export const useRouteChartData = (pointCount: number) => {
    const [points, setPoints] = useState<Point[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [completedOperations, setCompletedOperations] = useState(0);

    useEffect(() => {
        (async () => {
            const points = await getPoints(pointCount);
            setPoints(points);
            setCompletedOperations((oldValue) => oldValue + 1);
        })();

        return () => setCompletedOperations((oldValue) => oldValue - 1);
    }, []);

    useEffect(() => {
        (async () => {
            const tracks = await getTracks(pointCount);
            setTracks(tracks);
            setCompletedOperations((oldValue) => oldValue + 1);
        })();

        return () => setCompletedOperations((oldValue) => oldValue - 1);
    }, []);

    return { points, tracks, routeDataLoaded: completedOperations === 2 };
};
