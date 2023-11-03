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
import { Street } from './Street'


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
 
  const mainCam = useRef()
  const dirLight = useRef()
  const shadowCam = useRef()

  //useHelper(mainCam, CameraHelper )
  //useHelper(dirLight, DirectionalLightHelper, 1, "red");
  //useHelper(shadowCam, CameraHelper)


  // const { groundPosition } = useControls({
  //   groundPosition: { value: [0.0, 0.0, 0.0], label: 'Ground Position', step: 0.5, min: -20, max: 20 }
  // })

  


  
  return (
    <>
       {/* <axesHelper args={[5, 5, 5]} /> */}
      <color args={[ '#364d81' ]} attach="background" /> 

      <OrbitControls target={[1, 3, 0]}

        // constraints---------------------

        // enablePan={false}
        // enableZoom={false}
        // minAzimuthAngle={-Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        // minPolarAngle={Math.PI / 6}
        // maxPolarAngle={Math.PI / 2} 

      />

      <PerspectiveCamera 
        makeDefault 
        ref={mainCam} 
        rotation={[10,50,0]} 
        fov={45} 
        near={0.1} 
        far={200} 
        position={[.77, 0.8, 10]}
      >
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
      <Street rotation-y={1.6} scale={3.7} position={[-2, 0, -1]} />
      <Billboard />      
    </>
  )
} 

export default App