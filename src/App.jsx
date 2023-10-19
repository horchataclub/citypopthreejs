import { OrbitControls, TorusKnot, useHelper } from '@react-three/drei'
import Ground from './Ground'
import Effects from './Effects'
import Torus from './Torus'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'
import { CameraHelper, LinearSRGBColorSpace, Mesh, SRGBColorSpace, MeshPhysicalMaterial, MeshStandardMaterial, TorusKnotGeometry, DirectionalLightHelper } from 'three'
import { useEffect, useRef } from 'react'
import RoundedCube from './RoundedCube'
import Hills from './Hills'
import Car from './Car'
import { PerspectiveCamera } from '@react-three/drei'
import Dots from './dots'
import Wind from './Wind'
import Ribbons from './Ribbons'
import { SignMerge } from './SignMerge'
import { Billboard } from './Billboard'
import AudioControls from './AudioControls'



function App() {

  const { gl } = useThree();
  
  useEffect(() => {
    if (gl) {
      gl.outputColorSpace = SRGBColorSpace;
      // Other WebGLRenderer settings can be adjusted here
      gl.gammaInput = true;
      gl.gammaOutput = true;
      gl.stencil = true;
    }
  }, [gl]);

  const { enableEffect } = useControls({
    enableEffect: { value: true, label: 'Toggle Post' },
  })

  const { intensity } = useControls({
    intensity: 1.7
  });

 
  const { SunDir }= useControls({
    SunDir: { value: [2.5,7,0.5], label: 'Sun Direction', step: 0.5 },
  })
  const {ShadowBias} = useControls({
    ShadowBias: { value: 0.0, label: 'Shadow Bias', step: .001, min: -2, max: 2 }
  })

  const dirLight = useRef()
  const shadowCam = useRef()
  //useHelper(dirLight, DirectionalLightHelper, 1, "red");
  //useHelper(shadowCam, CameraHelper)

  return (
    <>
      
      <color args={[ '#364d81' ]} attach="background" />
      
      <OrbitControls  target={[1, 3, 0]} />

      <PerspectiveCamera makeDefault rotation={[10,50,0]} fov={45} near={0.1} far={200} position={[ 2, 6, 6 ]}>
        <Dots />
        <Wind />
        <Ribbons />
      </PerspectiveCamera>
      {enableEffect && (<Effects />)}
      
      <ambientLight intensity={0.00} />
      <directionalLight color="white" position={SunDir} intensity={ intensity } castShadow /> 
      <AudioControls />
      <Torus position={ [ 0, 3, 0 ] } />
      <RoundedCube />
      <Car />
      <SignMerge />
      <Hills />      
      <Ground /> 
      <Billboard />
    </>
  )
} 

export default App

