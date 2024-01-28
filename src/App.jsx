import { PresentationControls, OrbitControls, TorusKnot, useHelper } from '@react-three/drei'
import Ground from './Ground'
import Effects from './Effects'
import Torus from './Torus'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'
import { CubeTextureLoader, CameraHelper, LinearSRGBColorSpace, Mesh, SRGBColorSpace, MeshPhysicalMaterial, MeshStandardMaterial, TorusKnotGeometry, DirectionalLightHelper, TetrahedronGeometry } from 'three'
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
import * as THREE from 'three' 
import { Barbershop } from './Barbershop'
import { TestTorus } from './TestTorus'



 
function App() {
  const { gl } = useThree();  
  useEffect(() => {
    if (gl) {
      gl.outputColorSpace = SRGBColorSpace;
      // Other WebGLRenderer settings can be adjusted here
      gl.gammaInput = true;
      gl.gammaOutput = true;
      //gl.stencil = true;
      //gl.shadowMap.type = THREE.VSMShadowMap;
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

  
  const { camPosition } = useControls({
    camPosition: { value: [0.3,1.6,12.7], step: 0.1 },
  });

  
  return (
    <>
       {/* <axesHelper args={[5, 5, 5]} /> */}
      <color args={[ '#364d81' ]} attach="background" /> 


       <OrbitControls target={[1, 3, 0]}

        // constraints---------------------

         enablePan={false}
         enableZoom={true}
         enableDamping={true}
         minAzimuthAngle={-Math.PI / 4}
         maxAzimuthAngle={Math.PI / 4}
         minPolarAngle={Math.PI / 6}
         maxPolarAngle={Math.PI / 2} 
         minDistance={0}
         maxDistance={40}

      /> 

      <PerspectiveCamera 
        makeDefault 
        ref={mainCam} 
        rotation={[10,50,0]} 
        fov={45} 
        near={0.1} 
        far={200} 
        position={ camPosition }
      >
        <Dots />
        <Wind />
        <Ribbons />
      </PerspectiveCamera>
      <Effects />
      
      <ambientLight intensity={.08} color={"#234a99"} />
      <directionalLight 
        color="white" 
        //shadow-bias={-0.003} 
        shadow-bias={ 0 }
        //shadow-radius={ 0 }
        shadow-mapSize={[2048, 2048]}
       // shadow-mapSize={[1024, 1024]}
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

      {/* TESTING TOONMAT LUMINANCE  */}
      {/* <TestTorus position={[-10, 2, 0]} color={"red"} />
      <TestTorus position={[-6, 2, 0]} color={"#FF6B00"} />
      <TestTorus position={[-2, 2, 0]} color={"#FFE500"} />
      <TestTorus position={[2, 2, 0]} color={"#52FF00"} />
      <TestTorus position={[6, 2, 0]} color={"#00F0FF"} />
      <TestTorus position={[10, 2, 0]} color={"#0000FF"} />

      <TestTorus position={[-10, 6, 0]} color={"#7000FF"} />
      <TestTorus position={[-6, 6, 0]} color={"#FF00E5"} />
      <TestTorus position={[-2, 6, 0]} color={"#000000"} />
      <TestTorus position={[2, 6, 0]} color={"#535353"} />
      <TestTorus position={[6, 6, 0]} color={"#A7A7A7"} />
      <TestTorus position={[10, 6, 0]} color={"#DEDEDE"} /> */}



      {/* <RoundedCube /> */}
      <Car position={ [0, 0, 3]} />
      <SignMerge />
      <Hills />
      <Bush />   
      <Street rotation-y={1.6} scale={3.7} position={[-2, 0, -1]} />
      <Billboard /> 
      {/* <Barbershop scale={ 1.4 } rotation-y={ 1.6}  position={[-8, 0, 1]} /> */}
    </>
  )
} 

export default App