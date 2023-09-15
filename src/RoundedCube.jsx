
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { CubeTextureLoader } from 'three';
import { GlassMat } from "./mats/GlassMat";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const roundedBox = new RoundedBoxGeometry(1.5, 1.5, 1.5, 16, 0.2); // Create an instance of RoundedBoxGeometry

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


export default function RoundedCube () {

  const cubeRef = useRef();

   // useFrame will run on every frame update
   useFrame(() => {
      // Rotate the mesh by updating its rotation property
      //cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    });

    return  <mesh 
      ref={ cubeRef }
        geometry={roundedBox} 
        position={ [ 1, 4.5, 0 ] }  
        // material={new MeshPhysicalMaterial({ thickness: .305, color: 'red', roughness: 0.0, metalness: 0.5, transmission: 0.5 })} 
        >
        <GlassMat 
            toneMapped={ true } 
            color={ "#52abff" } 
            thickness={ 0.5 } 
            transmission={ 0.7 } 
            roughness={0.0} 
            metalness={ 0.5} 
            envMapIntensity={ 1.175 }
            reflectivity={ 1.0 }
            clearcoat={ 1 }
            envMap={ cubeMap }

        />
      </mesh>

}