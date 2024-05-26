import { CircularProgress, Stack, Typography } from "@mui/material";
import { RouteChart, useRouteChartData } from "../features/ShowRouteChart";
import { getRandomInt } from "../shared/lib/helpers";

const pointCount = getRandomInt(50, 150);

export const ChartPage = () => {
    const { points, tracks, routeDataLoaded } = useRouteChartData(pointCount);

    return (
        <>
            {routeDataLoaded ? (
                <RouteChart points={points} tracks={tracks} />
            ) : (
                <Stack
                    spacing={2}
                    sx={{
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress size={100} />
                    <Typography variant={"h4"}>Loading chart data...</Typography>
                </Stack>
            )}
        </>
    );
};
