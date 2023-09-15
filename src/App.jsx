import { OrbitControls } from '@react-three/drei'
import Ground from './Ground'
import Effects from './Effects'
import Torus from './Torus'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'
import { LinearSRGBColorSpace, Mesh, SRGBColorSpace, MeshPhysicalMaterial } from 'three'
import { useEffect } from 'react'
import RoundedCube from './RoundedCube'
import Hills from './Hills'


function App() {

  const { gl } = useThree();
  
  useEffect(() => {
    if (gl) {
      gl.outputColorSpace = SRGBColorSpace;
      // Other WebGLRenderer settings can be adjusted here
      gl.gammaInput = true;
      gl.gammaOutput = true;
    }
  }, [gl]);

  const { enableEffect } = useControls({
    enableEffect: { value: true, label: 'Toggle Post' },
  })

  const { intensity } = useControls({
    intensity: 1.7
  });




  return (
    <>
      
      <color args={[ '#364d81' ]} attach="background" />
      
      <OrbitControls />
      
      {enableEffect && (<Effects />)}
      
      <ambientLight intensity={0.00} />
      <directionalLight color="white" position={[1, 6, 0]} intensity={ intensity } castShadow /> 
      
      <Torus position={ [ 0, 3, 0 ] } />
      
      <RoundedCube />
      <Hills />
      
      <Ground /> 
    </>
  )
} 

export default App

