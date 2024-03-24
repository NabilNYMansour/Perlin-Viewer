import { Button, Checkbox, Paper, Slider } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { rgbStringToVector3, vector3ToRgbString } from "../utils/utils";
import { DEFUALT_SETTINGS } from "../constants";

export const Settings = ({ setSize, setSegments, setWireframeMode, setNoiseLod, setNoiseOffset, setColors,
    size, segments, wireframeMode, noiseLod, noiseOffset, colors }: {
        setSize: React.Dispatch<React.SetStateAction<number>>,
        setSegments: React.Dispatch<React.SetStateAction<number>>,
        setWireframeMode: React.Dispatch<React.SetStateAction<boolean>>,
        setNoiseLod: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>,
        setNoiseOffset: React.Dispatch<React.SetStateAction<number>>,
        setColors: React.Dispatch<React.SetStateAction<Vector3[]>>,
        size: number, segments: number, wireframeMode: boolean, noiseLod: 0 | 1 | 2 | 3, noiseOffset: number, colors: Vector3[]
    }) => {

    const [stringColors, setStringColors] = useState<string[]>([vector3ToRgbString(colors[0]), vector3ToRgbString(colors[1])]);

    // if colors were updated in parent component (from local storage)
    useEffect(() => {
        setStringColors([vector3ToRgbString(colors[0]), vector3ToRgbString(colors[1])]);
    }, [colors])

    return <Paper elevation={1} className="right-bar">
        <h1 className="title">PERLIN VIEWER</h1>
        <div className="settings">
            {/* ---------------- Plane Size ---------------- */}
            <Paper elevation={2} className="setting">
                Plane size
                <Slider
                    aria-label="Plane Size"
                    onChange={(_, newValue) => {
                        setSize(newValue as number); localStorage.setItem('size', JSON.stringify(newValue as number));
                    }}
                    value={size}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    min={5}
                    max={20}
                />
            </Paper>

            {/* ---------------- Plane Segments ---------------- */}
            <Paper elevation={2} className="setting">
                Plane segments
                <Slider
                    aria-label="Plane Segments"
                    onChange={(_, newValue) => {
                        setSegments(newValue as number);
                        localStorage.setItem('segments', JSON.stringify(newValue as number));
                    }}
                    value={segments}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    min={15}
                    max={150}
                />
            </Paper>

            {/* ---------------- Noise LOD ---------------- */}
            <Paper elevation={2} className="setting">
                Noise LOD
                <Slider
                    aria-label="Noise LOD"
                    onChange={(_, newValue) => {
                        setNoiseLod(newValue as 0 | 1 | 2 | 3);
                        localStorage.setItem('noiseLod', JSON.stringify(newValue as number));
                    }}
                    value={noiseLod}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={0}
                    max={3}
                />
            </Paper>

            {/* ---------------- Noise Offset ---------------- */}
            <Paper elevation={2} className="setting">
                Noise Offset
                <Slider
                    aria-label="Noise Offset"
                    onChange={(_, newValue) => {
                        setNoiseOffset(newValue as number);
                        localStorage.setItem('noiseOffset', JSON.stringify(newValue as number));
                    }}
                    value={noiseOffset}
                    valueLabelDisplay="auto"
                    step={0.05}
                    min={-50}
                    max={50}
                />
            </Paper>

            {/* ---------------- Wireframe Mode ---------------- */}
            <Paper elevation={2} className="setting" style={{ flexDirection: 'row' }}>
                Wireframe
                <Checkbox checked={wireframeMode} onChange={(_, newValue) => {
                    setWireframeMode(newValue as boolean);
                    localStorage.setItem('wireframeMode', JSON.stringify(newValue as boolean));
                }} />
            </Paper>

            {/* ---------------- Colors ---------------- */}
            <Paper elevation={2} className="setting">
                Colors
                <MuiColorInput format="rgb" value={stringColors[0]}
                    onChange={(val) => {
                        const newStringColors = [...stringColors];
                        newStringColors[0] = val;
                        setStringColors(newStringColors);

                        // can be done differently, but using map for now
                        setColors(newStringColors.map((val) => rgbStringToVector3(val)))
                        localStorage.setItem('col1', val);
                    }} />
                <MuiColorInput format="rgb" value={stringColors[1]}
                    onChange={(val) => {
                        const newStringColors = [...stringColors];
                        newStringColors[1] = val;
                        setStringColors(newStringColors);

                        setColors(newStringColors.map((val) => rgbStringToVector3(val)))
                        localStorage.setItem('col2', val);
                    }} />
            </Paper>
            {/* ---------------- Reset ---------------- */}
            <Button
                style={{ fontFamily: 'Caviar-Dreams', fontWeight: "bolder" }}
                variant="contained"
                size="large"
                onClick={() => {
                    localStorage.clear();
                    setSize(DEFUALT_SETTINGS.size);
                    setSegments(DEFUALT_SETTINGS.segments);
                    setNoiseLod(DEFUALT_SETTINGS.noiseLod as 0 | 1 | 2 | 3);
                    setNoiseOffset(DEFUALT_SETTINGS.noiseOffset);
                    setWireframeMode(DEFUALT_SETTINGS.wireframeMode);
                    setColors(DEFUALT_SETTINGS.colors);
                }}
            >
                Reset Setting
            </Button>
        </div>
    </Paper>
}

export default Settings;