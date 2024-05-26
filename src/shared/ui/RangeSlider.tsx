import { Slider } from "@mui/material";

type RangeSliderProps = {
    value: [number, number];
    min: number;
    max: number;
    minRangePercent: number;
    orientation?: "horizontal" | "vertical";
    onChange: (value: [number, number]) => void;
};

export const RangeSlider = ({
    value,
    min,
    max,
    minRangePercent,
    orientation,
    onChange,
}: RangeSliderProps) => {
    const handleChange = (_: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) return;

        const minRange = Math.floor(((max - min) / 100) * minRangePercent);

        if (newValue[1] - newValue[0] < minRange) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], max - minRange);
                onChange([clamped, clamped + minRange]);
            } else {
                const clamped = Math.max(newValue[1], minRange);
                onChange([clamped - minRange, clamped]);
            }
        } else {
            onChange([newValue[0], newValue[1]]);
        }
    };

    return (
        <Slider
            value={value}
            min={min}
            max={max}
            valueLabelDisplay={"auto"}
            orientation={orientation}
            onChange={handleChange}
        />
    );
};
