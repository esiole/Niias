import { MaxSpeed, Surface, Track } from "../../../entities/Track";
import { Point } from "../../../entities/Point";
import { formatNumber } from "../../../shared/lib/helpers";

export const getRouteChartData = (points: readonly Point[], tracks: readonly Track[]) => {
    const pointDict = points.reduce(
        (prev, current) => ({ ...prev, [current.id]: current }),
        {} as Record<number, Point>,
    );

    const xAxisData: number[] = [];
    const lineData: number[] = [];
    const areaColors: string[] = [""];
    const lineColors: string[] = [""];
    const linePopups: string[] = [];

    let distance = 0;

    for (const track of tracks) {
        const firstPoint = pointDict[track.firstId];

        xAxisData.push(distance);
        lineData.push(firstPoint.height);
        lineColors.push(getMaxSpeedColor(track.maxSpeed));
        areaColors.push(getSurfaceColor(track.surface));
        linePopups.push(formatPointPopup(firstPoint, distance));

        distance += track.distance;
    }

    const lastPoint = points[points.length - 1];
    xAxisData.push(distance);
    lineData.push(lastPoint.height);
    lineColors.push(lineColors[lineColors.length - 1]);
    areaColors.push(areaColors[areaColors.length - 1]);
    linePopups.push(formatPointPopup(lastPoint, distance));

    const maxYValue = Math.max(...lineData) * 1.05;

    return {
        xAxisData,
        lineData,
        lineColors,
        areaData: Array(points.length).fill(maxYValue),
        areaColors,
        maxYValue,
        maxXValue: distance,
        linePopups,
    };
};

const getSurfaceColor = (surface: Surface) => {
    switch (surface) {
        case Surface.ASPHALT:
            return "rgba(80, 80, 80, 0.2)";
        case Surface.SAND:
            return "rgba(250, 236, 23, 0.2)";
        case Surface.GROUND:
            return "rgba(28, 222, 16, 0.2)";
        default:
            throw new Error("Unknown Surface");
    }
};

const getMaxSpeedColor = (maxSpeed: MaxSpeed) => {
    switch (maxSpeed) {
        case MaxSpeed.FAST:
            return "#18A7B5";
        case MaxSpeed.NORMAL:
            return "#D6AE01";
        case MaxSpeed.SLOW:
            return "#D53032";
        default:
            throw new Error("Unknown MaxSpeed");
    }
};

const formatPointPopup = (point: Point, distance: number) =>
    `Point № ${point.id}: height = ${formatNumber(point.height)}, distance = ${formatNumber(distance)}.`;
