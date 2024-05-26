import { delay } from "../../../shared/lib/helpers";
import { generatePoints } from "../lib/helpers";

export const getPoints = async (pointCount: number) => {
    await delay(3_000);
    return generatePoints(pointCount);
};
