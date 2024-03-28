import { useEffect, useState } from 'react';
import './App.css'
import Scene from './components/scene'
import Settings from './components/settings'
import { Vector3 } from 'three';
import { rgbStringToVector3 } from './utils/utils';
import { DEFUALT_SETTINGS, FOOTER_SCENE_BUTTONS_SYLE, LINKS } from './constants';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SceneFooter from './components/sceneFooter';

function App() {
  const [size, setSize] = useState<number>(DEFUALT_SETTINGS.size);
  const [segments, setSegments] = useState<number>(DEFUALT_SETTINGS.segments);
  const [wireframeMode, setWireframeMode] = useState<boolean>(DEFUALT_SETTINGS.wireframeMode);
  const [noiseLod, setNoiseLod] = useState<0 | 1 | 2 | 3>(DEFUALT_SETTINGS.noiseLod as 0 | 1 | 2 | 3);
  const [noiseOffset, setNoiseOffset] = useState<number>(DEFUALT_SETTINGS.noiseOffset);
  const [colors, setColors] = useState<Vector3[]>(DEFUALT_SETTINGS.colors);

  const [showSettings, setShowSettings] = useState<boolean>(false); // for phone

  useEffect(() => {
    const localStorageSize = localStorage.getItem('size');
    if (localStorageSize) {
      setSize(Number(localStorageSize))
    }

    const localStorageSegments = localStorage.getItem('segments');
    if (localStorageSegments) {
      setSegments(Number(localStorageSegments))
    }

    const localStorageWireframeMode = localStorage.getItem('wireframeMode');
    if (localStorageWireframeMode) {
      setWireframeMode(localStorageWireframeMode === "false" ? false : true)
    }

    const localStorageNoiseLod = localStorage.getItem('noiseLod');
    if (localStorageNoiseLod) {
      setNoiseLod(Number(localStorageNoiseLod) as 0 | 1 | 2 | 3)
    }

    const localStorageNoiseOffset = localStorage.getItem('noiseOffset');
    if (localStorageNoiseOffset) {
      setNoiseOffset(Number(localStorageNoiseOffset))
    }

    const localStorageCol1 = localStorage.getItem('col1');
    const localStorageCol2 = localStorage.getItem('col2');
    if (localStorageCol1 && localStorageCol2) {
      setColors([localStorageCol1, localStorageCol2].map((val) => rgbStringToVector3(val)));
    }
  }, []);

  const isPhone = useMediaQuery('(max-aspect-ratio: 3/4)'); // to check if using phone

  return (
    <div className='main'>
      {/* ---------------- Settings ---------------- */}
      {isPhone ?
        <div className='settings-button' style={{ color: showSettings ? "#1769aa" : "white" }}>
          <IconButton color="inherit" onClick={() => {
            setShowSettings(!showSettings);
          }}>
            {showSettings ?
              <ArrowBackIcon fontSize='large' /> :
              <SettingsIcon fontSize='large' />
            }
          </IconButton>
          {showSettings ? null : "Settings"}
        </div> : null}
      {(isPhone && showSettings) || !isPhone ?
        <Settings
          setSize={setSize} setSegments={setSegments} setWireframeMode={setWireframeMode}
          setNoiseLod={setNoiseLod} setNoiseOffset={setNoiseOffset} setColors={setColors}
          size={size} segments={segments} wireframeMode={wireframeMode}
          noiseLod={noiseLod} noiseOffset={noiseOffset} colors={colors} /> : null}

      {/* ---------------- Scene ---------------- */}
      <div style={{ display: (isPhone && !showSettings) || !isPhone ? "block" : "none" }}>
        <Scene size={size} segments={segments} wireframeMode={wireframeMode}
          noiseLod={noiseLod} noiseOffset={noiseOffset} colors={colors} />
        <SceneFooter />
      </div>
    </div>
  )
}

export default App
