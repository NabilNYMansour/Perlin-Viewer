import { useEffect, useState } from 'react';
import './App.css'
import Scene from './components/scene'
import Settings from './components/settings'
import { Vector3 } from 'three';
import { rgbStringToVector3 } from './utils/utils';
import { DEFUALT_SETTINGS, FOOTER_SCENE_BUTTONS_SYLE, LINKS } from './constants';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const [size, setSize] = useState<number>(DEFUALT_SETTINGS.size);
  const [segments, setSegments] = useState<number>(DEFUALT_SETTINGS.segments);
  const [wireframeMode, setWireframeMode] = useState<boolean>(DEFUALT_SETTINGS.wireframeMode);
  const [noiseLod, setNoiseLod] = useState<0 | 1 | 2 | 3>(DEFUALT_SETTINGS.noiseLod as 0 | 1 | 2 | 3);
  const [noiseOffset, setNoiseOffset] = useState<number>(DEFUALT_SETTINGS.noiseOffset);
  const [colors, setColors] = useState<Vector3[]>(DEFUALT_SETTINGS.colors);

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

  return (
    <div className='main'>
      <Settings
        setSize={setSize} setSegments={setSegments} setWireframeMode={setWireframeMode}
        setNoiseLod={setNoiseLod} setNoiseOffset={setNoiseOffset} setColors={setColors}
        size={size} segments={segments} wireframeMode={wireframeMode}
        noiseLod={noiseLod} noiseOffset={noiseOffset} colors={colors} />
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
  )
}

export default App
