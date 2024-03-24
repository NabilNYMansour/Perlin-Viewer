import { Checkbox, Paper, Slider } from "@mui/material";

export const Settings = ({ setSize, setSegments, setWireframeMode, setNoiseLod, size, segments, wireframeMode, noiseLod }: {
    setSize: React.Dispatch<React.SetStateAction<number>>,
    setSegments: React.Dispatch<React.SetStateAction<number>>,
    setWireframeMode: React.Dispatch<React.SetStateAction<boolean>>,
    setNoiseLod: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    size: number, segments: number, wireframeMode: boolean, noiseLod: 0 | 1 | 2
}) => {
    return <Paper elevation={1} className="right-bar">
        <h1 className="title">PERLIN VIEWER</h1>
        <div className="settings">
            {/* ---------------- Plane Size ---------------- */}
            <Paper elevation={2} className="setting">
                Plane size
                <Slider
                    aria-label="Temperature"
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
                    aria-label="Temperature"
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
                    aria-label="Temperature"
                    onChange={(_, newValue) => {
                        setNoiseLod(newValue as 0 | 1 | 2);
                        localStorage.setItem('noiseLod', JSON.stringify(newValue as number));
                    }}
                    value={noiseLod}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={0}
                    max={2}
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
        </div>
    </Paper>
}

export default Settings;