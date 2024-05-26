import { Track } from "../types/track";
import { getRandomInt } from "../../../shared/lib/helpers";
import { Surface } from "../types/surface";
import { MaxSpeed } from "../types/maxSpeed";

export const generateTracks = (pointCount: number) => {
    const tracks: Track[] = Array.from({ length: pointCount - 1 }, (_, index) => ({
        firstId: index + 1,
        secondId: index + 2,
        distance: getRandomInt(200, 900),
        surface: getRandomSurface(),
        maxSpeed: getRandomMaxSpeed(),
    }));

    return tracks;
};

const getRandomSurface = () => {
    const number = getRandomInt(0, 3);

    switch (number) {
        case 1:
            return Surface.SAND;
        case 2:
            return Surface.ASPHALT;
        default:
            return Surface.GROUND;
    }
};

const getRandomMaxSpeed = () => {
    const number = getRandomInt(0, 3);

    switch (number) {
        case 1:
            return MaxSpeed.FAST;
        case 2:
            return MaxSpeed.NORMAL;
        default:
            return MaxSpeed.SLOW;
    }
};
