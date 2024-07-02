import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ToonMat } from "./mats/ToonMat";
import { GlassMat } from "./mats/GlassMat";
import { CubeTextureLoader } from 'three';


export default function Car(props) {


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
  

  
  const { nodes, materials } = useGLTF("../models/car-4.glb");
  return (
    <group {...props} dispose={null} rotation={[0, 3.13, 0]}> 
      <group>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[0, 0, -Math.PI / 2]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["356C_Porsche356_0"].geometry}
                    >
                    <ToonMat color="red" /> 
                  </mesh>
                </group>
              </group>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[0, 0, -Math.PI / 2]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.chrome_Porsche356_0019.geometry}
                  >
                    {/* chrome details */}
                    <GlassMat
                       toneMapped={ true } 
                       color={ "#ffffff" } 
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

                  {/* RIMS */}
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Hubcap.geometry}
                  >
                    <GlassMat
                       toneMapped={ true } 
                       color={ "#ffffff" } 
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
                </group>
              </group>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[0, 0, -Math.PI / 2]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.blinkers.geometry}
                  >
                    {/* FRONT BLINKERS */}
                    <ToonMat color={ "#FE5B00" } />
                  </mesh>

                  {/* HEADLIGHTS */}
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.headlights.geometry}
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
                  {/* TAILLIGHTS */}
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.tailLights.geometry}
                  >
                    <ToonMat color={ "#FE5B00" } />
                  </mesh>
                  {/* WINDOWS */}
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.windows.geometry}
                  >
                    <GlassMat
                       toneMapped={ true } 
                       color={ "#52abff" } 
                       thickness={ 0.5 } 
                       transmission={ 0.7 } 
                       roughness={0.0} 
                       metalness={ 0.5} 
                       envMapIntensity={ 1.175 }
                       reflectivity={ 0.0 }
                       clearcoat={ 1 }
                       envMap={ cubeMap }
                    />
                  </mesh>
                </group>
              </group>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[0, 0, -Math.PI / 2]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.interior_Porsche356_0.geometry}
                  >
                    <ToonMat color={"#12151a"} />
                  </mesh>
                </group>
              </group>
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[0, 0, -Math.PI / 2]}>
                  {/* TIRES + TRIM RUBBER */}
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.rubber_Porsche356_0.geometry}
                  >
                    <ToonMat color={"#12151a"} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("../models/car-4.glb");
