import { useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import Ground from './Ground'
import Effects from './Effects'

function App() {

  return (
    <>
     
      <color args={[ '#364d81' ]} attach="background" />
      <OrbitControls />
      {/* <Effects /> */}
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[1, 6, 0]} castShadow /> 
      <Ground />
    </>
  )
}

export default App
