import { useEffect, useState } from 'react';
import './App.css'
import Scene from './components/scene'
import Settings from './components/settings'

function App() {
  const [size, setSize] = useState<number>(5);
  const [segments, setSegments] = useState<number>(5);
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);
  const [noiseLod, setNoiseLod] = useState<0 | 1 | 2>(0);

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
      setNoiseLod(Number(localStorageNoiseLod) as 0 | 1 | 2)
    }
  }, [])



  return (
    <div className='main'>
      <Settings
        setSize={setSize} setSegments={setSegments} setWireframeMode={setWireframeMode} setNoiseLod={setNoiseLod}
        size={size} segments={segments} wireframeMode={wireframeMode} noiseLod={noiseLod} />
      <Scene size={size} segments={segments} wireframeMode={wireframeMode} noiseLod={noiseLod} />
    </div>
  )
}

export default App
