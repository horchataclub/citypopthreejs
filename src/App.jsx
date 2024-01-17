import { OrbitControls, TorusKnot, useHelper } from '@react-three/drei'
import Ground from './Ground'
import Effects from './Effects'
import Torus from './Torus'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'
import { CameraHelper, LinearSRGBColorSpace, Mesh, SRGBColorSpace, MeshPhysicalMaterial, MeshStandardMaterial, TorusKnotGeometry, DirectionalLightHelper } from 'three'
import { useEffect, useRef, useState } from 'react'
import RoundedCube from './RoundedCube'
import Hills from './Hills'
import Car from './Car'
import Bush from './Bush'
import { PerspectiveCamera } from '@react-three/drei'
import Dots from './dots'
import Wind from './Wind'
import Ribbons from './Ribbons'
import { SignMerge } from './SignMerge'
import { Billboard } from './Billboard'
import { Ground2 } from './Ground2'


function App() {
  const { gl } = useThree();  
  useEffect(() => {
    if (gl) {
      gl.outputColorSpace = SRGBColorSpace;
      // Other WebGLRenderer settings can be adjusted here
      gl.gammaInput = true;
      gl.gammaOutput = true;
      //gl.stencil = true;
    }
  }, [gl]);

  const { intensity } = useControls({
    intensity: 1.7
  });
 
  const { SunDir }= useControls({
    SunDir: { value: [8,14.5,4.5], label: 'Sun Direction', step: 0.5 },
  })
  const {ShadowBias} = useControls({
    ShadowBias: { value: 0.0, label: 'Shadow Bias', step: .001, min: -2, max: 2 }
  })
 
  const dirLight = useRef()
  const shadowCam = useRef()
  //useHelper(dirLight, DirectionalLightHelper, 1, "red");
  //useHelper(shadowCam, CameraHelper)

  // const { groundPosition } = useControls({
  //   groundPosition: { value: [0.0, 0.0, 0.0], label: 'Ground Position', step: 0.5, min: -20, max: 20 }
  // })
  
  return (
    <>
       {/* <axesHelper args={[5, 5, 5]} /> */}
      <color args={[ '#364d81' ]} attach="background" />      
      <OrbitControls  target={[1, 3, 0]} />
      <PerspectiveCamera makeDefault rotation={[10,50,0]} fov={45} near={0.1} far={200} position={[ 2, 6, 6 ]}>
        <Dots />
        <Wind />
        <Ribbons />
      </PerspectiveCamera>
      <Effects />
      
      <ambientLight intensity={0.00} />
      <directionalLight 
        color="white" 
        //shadow-bias={-0.003} 
        shadow-bias={ 0 }
        shadow-mapSize={[2048, 2048]}
        ref={ dirLight } 
        position={SunDir} 
        intensity={ intensity } 
        castShadow 
        shadow-camera-left={-20} 
        target-position={[-2, 0, -4]}
      > 
          <orthographicCamera ref={shadowCam} attach="shadow-camera" left={-10} right={10} far={22}  top={10} bottom={-10}/>
        </directionalLight>
      
      {/* <Torus position={ [ 0, 3, 0 ] } /> */}
      {/* <RoundedCube /> */}
      <Car position={ [0, 0, 3]} />
      <SignMerge />
      <Hills />
      <Bush />      
      <Ground2 rotation-y={1.6} scale={3.5} position={[-2, 0, -1]} />
      <Billboard />      
    </>
  )
} 

export default App