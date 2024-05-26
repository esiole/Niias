import { Point } from "../types/point";
import { getRandomInt } from "../../../shared/lib/helpers";

export const generatePoints = (pointCount: number) => {
    const points: Point[] = Array.from({ length: pointCount }, (_, index) => ({
        id: index + 1,
        name: `Point ${index + 1}`,
        height: getRandomInt(0, 12),
    }));

    return points;
};
