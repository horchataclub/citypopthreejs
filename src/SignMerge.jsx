/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Decal, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { ToonMat } from "./mats/ToonMat";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from "@react-three/fiber";


export function SignMerge(props) {
   

    const colorMap = useLoader(TextureLoader, 'textures/signMerge.png')
    
    
    // const { MergePosition } = useControls({
    //     MergePosition: { value: [2.7,-0.11,-3.8], step: 0.1 }
    // });
    // const { MergeScale } = useControls({
    //     MergeScale: { value: 0.17, step: 0.1 }
    // });
    // const { MergeRotation } = useControls({
    //     MergeRotation: { value: [4.65,1.63,1.6], step: 0.1 }
    // });
  

    
     // Use Leva controls for position, rotation, and scale
    //  const { signPos } = useControls({
    //     signPos: [0, 0, 0]
    //   });
    //   const { signRotation } = useControls({
    //      signRotation: [1.6,-3.17,0.78]
    //   });
    //   const { signScale } = useControls({
    //     signScale: [2.8,2.82,1]
    //   });

    const MergePosition = [2.7,-0.11,-3.8]
    const MergeScale = 0.17
    const MergeRotation = [4.65,1.63,1.6]

    const signPos = [0, 0, 0]
    const signRotation = [1.6,-3.17,0.78]
    const signScale = [2.8,2.82,1]


  const { nodes, materials } = useGLTF("models/signMerge.gltf");
  return (
    <group {...props} dispose={null} position={MergePosition} scale={MergeScale} rotation={MergeRotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        position={[0, 1, 0]}
      >
        <ToonMat color="#cccccc"  /> 
    </mesh>
      <mesh
        castShadow
        
        geometry={nodes.Plane.geometry}
        position={[-0.112, 8.418, -0.009]}
        rotation={[-Math.PI / 4, 0, Math.PI / 2]}
        scale={1.852}
      >
        <ToonMat 
          color="#E8CE27" 
          side={THREE.DoubleSide} 
        /> 
        <Decal position={signPos} rotation={signRotation} scale={signScale} map={colorMap} mapAnisotropy={16} />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/signMerge.gltf");
