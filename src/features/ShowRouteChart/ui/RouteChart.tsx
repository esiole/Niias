import { Box, Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";
import { Point } from "../../../entities/Point";
import { Track } from "../../../entities/Track";
import { getRouteChartData } from "../lib/helpers";
import { RangeSlider } from "../../../shared/ui/RangeSlider";

type RouteChartProps = {
    points: Point[];
    tracks: Track[];
};

export const RouteChart = ({ points, tracks }: RouteChartProps) => {
    const {
        xAxisData,
        lineData,
        lineColors,
        areaData,
        areaColors,
        maxYValue,
        maxXValue,
        linePopups,
    } = useMemo(() => getRouteChartData(points, tracks), [points, tracks]);

    const [xAxisRange, setXAxisRange] = useState<[number, number]>([0, maxXValue]);
    const [yAxisRange, setYAxisRange] = useState<[number, number]>([0, maxYValue]);

    useEffect(() => setXAxisRange([0, maxXValue]), [maxXValue]);
    useEffect(() => setYAxisRange([0, maxYValue]), [maxYValue]);

    return (
        <Stack direction="row" sx={{ height: "100vh" }}>
            <Box sx={{ height: "80vh", my: "auto" }}>
                <RangeSlider
                    value={yAxisRange}
                    min={0}
                    max={maxYValue}
                    minRangePercent={10}
                    orientation={"vertical"}
                    onChange={setYAxisRange}
                />
            </Box>
            <Stack sx={{ width: "100%" }}>
                <LineChart
                    skipAnimation
                    grid={{ vertical: true, horizontal: true }}
                    axisHighlight={{ x: "none", y: "none" }}
                    tooltip={{ trigger: "item" }}
                    yAxis={[{ min: yAxisRange[0], max: yAxisRange[1], tickMinStep: 1 }]}
                    xAxis={[
                        {
                            id: "line",
                            min: xAxisRange[0],
                            max: xAxisRange[1],
                            data: xAxisData,
                            colorMap: {
                                type: "piecewise",
                                thresholds: xAxisData,
                                colors: lineColors,
                            },
                        },
                        {
                            id: "area",
                            min: xAxisRange[0],
                            max: xAxisRange[1],
                            data: xAxisData,
                            colorMap: {
                                type: "piecewise",
                                thresholds: xAxisData,
                                colors: areaColors,
                            },
                        },
                    ]}
                    series={[
                        {
                            data: lineData,
                            xAxisKey: "line",
                            valueFormatter: (element, context) => linePopups[context.dataIndex],
                        },
                        {
                            data: areaData,
                            xAxisKey: "area",
                            area: true,
                            showMark: false,
                        },
                    ]}
                />
                <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
                    <RangeSlider
                        value={xAxisRange}
                        min={0}
                        max={maxXValue}
                        minRangePercent={10}
                        onChange={setXAxisRange}
                    />
                </Box>
            </Stack>
        </Stack>
    );
};
