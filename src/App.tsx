import { useEffect, useState } from 'react';
import './App.css'
import Scene from './components/scene'
import Settings from './components/settings'
import { Vector3 } from 'three';
import { rgbStringToVector3 } from './utils/utils';
import { DEFUALT_SETTINGS, FOOTER_SCENE_BUTTONS_SYLE, LINKS } from './constants';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [size, setSize] = useState<number>(DEFUALT_SETTINGS.size);
  const [segments, setSegments] = useState<number>(DEFUALT_SETTINGS.segments);
  const [wireframeMode, setWireframeMode] = useState<boolean>(DEFUALT_SETTINGS.wireframeMode);
  const [noiseLod, setNoiseLod] = useState<0 | 1 | 2 | 3>(DEFUALT_SETTINGS.noiseLod as 0 | 1 | 2 | 3);
  const [noiseOffset, setNoiseOffset] = useState<number>(DEFUALT_SETTINGS.noiseOffset);
  const [colors, setColors] = useState<Vector3[]>(DEFUALT_SETTINGS.colors);

  const [showSettings, setShowSettings] = useState<boolean>(false);

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

  const isPhone = useMediaQuery('(max-aspect-ratio: 3/4)');

  return (
    <div className='main'>
      {isPhone ?
        <div className='settings-button' style={{ color: showSettings ? "#1769aa" : "white" }}>
          <IconButton color="inherit" onClick={() => {
            setShowSettings(!showSettings);
          }}>
            {showSettings ?
              <CloseIcon fontSize='large' /> :
              <SettingsIcon fontSize='large' />
            }
          </IconButton>
        </div> : null}
      {
        (isPhone && showSettings) || !isPhone ?
          <Settings
            setSize={setSize} setSegments={setSegments} setWireframeMode={setWireframeMode}
            setNoiseLod={setNoiseLod} setNoiseOffset={setNoiseOffset} setColors={setColors}
            size={size} segments={segments} wireframeMode={wireframeMode}
            noiseLod={noiseLod} noiseOffset={noiseOffset} colors={colors} /> : null
      }

      <div style={{ display: (isPhone && !showSettings) || !isPhone ? "block" : "none" }}>
        <Scene size={size} segments={segments} wireframeMode={wireframeMode}
          noiseLod={noiseLod} noiseOffset={noiseOffset} colors={colors} />
        <footer className='sceneFooter'>
          <div className='sceneButtons'>
            <Button sx={FOOTER_SCENE_BUTTONS_SYLE} color="inherit" size='large'
              href={LINKS.githubRepo} target="_blank" rel="noreferrer"
            >
              <GitHubIcon fontSize='large' />
              GitHub
            </Button> &nbsp;|
            <Button sx={FOOTER_SCENE_BUTTONS_SYLE} color="inherit" size='large'
              href={LINKS.personalWebsite} target="_blank" rel="noreferrer"
            >
              Developer
            </Button>
          </div>
          Website Made with MUI, R3F and React
        </footer>
      </div>
    </div>
  )
}

export default App
