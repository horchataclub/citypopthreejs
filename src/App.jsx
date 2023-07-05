import { OrbitControls } from '@react-three/drei'
import Ground from './Ground'
import Effects from './Effects'
import Torus from './Torus'
import { useControls } from 'leva'

function App() {

  const { enableEffect } = useControls({
    enableEffect: { value: true, label: 'Toggle Outlines' },
  })

  return (
    <>
      
      <color args={[ '#364d81' ]} attach="background" />
      <OrbitControls />
      {enableEffect && (<Effects />)}
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[1, 6, 0]} castShadow /> 
      <Torus position={ [ 0, 5, 0 ] } />
      <Ground /> 
    </>
  )
}

export default App
