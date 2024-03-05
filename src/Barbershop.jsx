import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GlassParallaxMat } from "./mats/GlassParallaxMat";
import { CubeTextureLoader } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

// Env map
const cubeMap = new CubeTextureLoader().load(
  [
      "../textures/posx.jpg",
      "../textures/negx.jpg",
      "../textures/posy.jpg",
      "../textures/negy.jpg",
      "../textures/posz.jpg",
      "../textures/negz.jpg"
    ]
); 

cubeMap.wrapS = THREE.ClampToEdgeWrapping;
cubeMap.wrapT = THREE.ClampToEdgeWrapping;

cubeMap.minFilter = THREE.NearestFilter;
cubeMap.magFilter = THREE.NearestFilter;

cubeMap.colorSpace = THREE.SRGBColorSpace;


// Interior map
const interiorMap = new CubeTextureLoader().load(
  [
      "../textures/barberPosX.jpg",
      "../textures/barberNegX.jpg",
      "../textures/barberPosY.jpg",
      "../textures/barberNegY.jpg",
      "../textures/barberPosZ.jpg",
      "../textures/barberNegZ.jpg"
    ]
); 

interiorMap.wrapS = THREE.ClampToEdgeWrapping;
interiorMap.wrapT = THREE.ClampToEdgeWrapping;

interiorMap.minFilter = THREE.NearestFilter;
interiorMap.magFilter = THREE.NearestFilter;

interiorMap.colorSpace = THREE.SRGBColorSpace;



export function Barbershop(props) {

  // rotate for lul
  const meshRef = useRef();

  let rotationDirection = 1;
  useFrame((state, delta) => {
    // Calculate the rotation angle based on time and speed
    // const rotationSpeed = 0.6;
    // const rotationAngle = Math.sin(state.clock.elapsedTime * rotationSpeed) / 2.0 + 1.4;

    // Update the rotation property of the mesh
    // meshRef.current.rotation.y = rotationAngle;
  });

  const colorMap = useLoader(TextureLoader, 'textures/barber.png');
  const { nodes, materials } = useGLTF("models/barberShop.glb");
  return (
    <group {...props} dispose={null} ref={meshRef}>
      <mesh
        name="Exterior_walls"
        castShadow
        receiveShadow
        geometry={nodes.Exterior_walls.geometry}
        //material={nodes.Exterior_walls.material}
      >
        <GlassParallaxMat 
            toneMapped={ false } 
            color={ "#52abff" } 
            thickness={ 0.5 } 
            transmission={ 0.7 } 
            roughness={0.0} 
            metalness={ 0.5} 
            map={ colorMap }
            envMapIntensity={ 1.175 }
            reflectivity={ 1.0 }
            clearcoat={ 1 }
            envMap={ cubeMap }
            interiorMap={ interiorMap }
        />
      </mesh>
      <mesh
        name="Awning"
        castShadow
        receiveShadow
        geometry={nodes.Awning.geometry}
        material={nodes.Awning.material}
      />
      <mesh
        name="Fringe"
        castShadow
        receiveShadow
        geometry={nodes.Fringe.geometry}
        material={nodes.Fringe.material}  
      />
    </group>  
  );
} 

useGLTF.preload("models/barberShop.glb");