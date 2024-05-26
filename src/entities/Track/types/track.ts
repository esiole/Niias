import { Surface } from "./surface";
import { MaxSpeed } from "./maxSpeed";

export interface Track {
    firstId: number;
    secondId: number;
    distance: number;
    surface: Surface;
    maxSpeed: MaxSpeed;
}
