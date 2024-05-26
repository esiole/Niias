import { delay } from "../../../shared/lib/helpers";
import { generateTracks } from "../lib/helpers";

export const getTracks = async (pointCount: number) => {
    await delay(4_000);
    return generateTracks(pointCount);
};
