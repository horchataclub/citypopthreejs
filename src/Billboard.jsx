import React, { useRef } from "react";
import { Decal, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { ToonMat } from "./mats/ToonMat";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Billboard(props) {


  const colorMap = useLoader(TextureLoader, 'textures/signHWY.jpg')

     // Use Leva controls for position, rotation, and scale
    const { signPos } = useControls({
      signPos: [2.01,0.05,0]
    });
    const { signRotation } = useControls({
        signRotation: [0.74,3.136,0]
    });
    const { signScale } = useControls({
        signScale: [7.16,2.45]
    }); 

     

  const { nodes, materials } = useGLTF("models/billboard.glb");
  return (
    <group {...props} dispose={null} position={[5.06, 0.0,-4.9]} rotation={[0,-3.10,0]} scale={.2}>
      <group name="Scene">
        <mesh
          name="billboard"
          castShadow
          receiveShadow
          geometry={nodes.billboard.geometry}
          //material={nodes.billboard.material}
          position={[3.737, 22.716, -1.876]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={5.461}
        >
           <ToonMat color="#cccccc" />
          <Decal position={signPos} rotation={signRotation} scale={signScale} map={colorMap} map-anisotropy={16} />
        </mesh>
        <mesh
          name="Cube009"
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          position={[1.13, 16.344, 0.284]}
          rotation={[-Math.PI, 0, 0]}
          scale={0.448}
        >
            <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube010"
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          //material={nodes.Cube010.material}
          position={[-1.175, 16.344, -0.248]}
          rotation={[0, 0, Math.PI]}
          scale={0.448}
          >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube011"
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          //material={nodes.Cube011.material}
          position={[0.244, 16.344, -1.134]}
          rotation={[-Math.PI, -Math.PI / 2, 0]}
          scale={0.448}
        >
           <ToonMat color="#cccccc"  />  
        </mesh>
        <mesh
          name="Cube012"
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          //material={nodes.Cube012.material}
          position={[-0.289, 16.344, 1.171]}
          rotation={[-Math.PI, Math.PI / 2, 0]}
          scale={0.448}
        >
            <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube013"
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          //material={nodes.Cube013.material}
          position={[-0.649, 16.344, -0.985]}
          rotation={[0, -Math.PI / 4, Math.PI]}
          scale={0.448}
        >
            <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube014"
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          //material={nodes.Cube014.material}
          position={[0.604, 16.344, 1.021]}
          rotation={[-Math.PI, Math.PI / 4, 0]}
          scale={0.448}
        >
            <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube015"
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          //material={nodes.Cube015.material}
          position={[-1.026, 16.344, 0.645]}
          rotation={[0, Math.PI / 4, -Math.PI]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube016"
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          //material={nodes.Cube016.material}
          position={[0.981, 16.344, -0.608]}
          rotation={[-Math.PI, -Math.PI / 4, 0]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube017"
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          //material={nodes.Cube017.material}
          position={[0, 16.865, 0.041]}
          rotation={[-Math.PI, 0, 0]}
          scale={[1.785, 0.072, 1.785]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube018"
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          //material={nodes.Cube018.material}
          position={[0, 17.012, 0]}
          scale={[1, 0.082, 4.362]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube019"
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          //material={nodes.Cube019.material}
          position={[3.931, 16.864, -6.395]}
          rotation={[0.454, 0, 0]}
          scale={[0.868, 0.393, 0.575]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube020"
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          //material={nodes.Cube020.material}
          position={[3.886, 16.818, -3.752]}
          scale={[0.113, 0.086, 2.204]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube021"
          castShadow
          receiveShadow
          geometry={nodes.Cube021.geometry}
          //material={nodes.Cube021.material}
          position={[15.217, 16.818, -3.752]}
          scale={[0.113, 0.086, 2.204]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube022"
          castShadow
          receiveShadow
          geometry={nodes.Cube022.geometry}
          //material={nodes.Cube022.material}
          position={[15.261, 16.864, -6.395]}
          rotation={[0.454, 0, 0]}
          scale={[0.868, 0.393, 0.575]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube023"
          castShadow
          receiveShadow
          geometry={nodes.Cube023.geometry}
          //material={nodes.Cube023.material}
          position={[26.697, 16.818, -3.752]}
          scale={[0.113, 0.086, 2.204]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube024"
          castShadow
          receiveShadow
          geometry={nodes.Cube024.geometry}
          //material={nodes.Cube024.material}
          position={[26.741, 16.864, -6.395]}
          rotation={[0.454, 0, 0]}
          scale={[0.868, 0.393, 0.575]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          //material={nodes.Cube.material}
          position={[0, 0.072, 0]}
          scale={[1.785, 0.072, 1.785]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          //material={nodes.Cube001.material}
          position={[1.13, 0.593, -0.243]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube002"
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          //material={nodes.Cube002.material}
          position={[-1.175, 0.593, 0.29]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          //material={nodes.Cube003.material}
          position={[0.244, 0.593, 1.176]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          //material={nodes.Cube004.material}
          position={[-0.289, 0.593, -1.129]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          //material={nodes.Cube005.material}
          position={[-0.649, 0.593, 1.027]}
          rotation={[Math.PI, -Math.PI / 4, Math.PI]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube006"
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          //material={nodes.Cube006.material}
          position={[0.604, 0.593, -0.98]}
          rotation={[0, Math.PI / 4, 0]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube007"
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          //material={nodes.Cube007.material}
          position={[-1.026, 0.593, -0.603]}
          rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cube008"
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          //material={nodes.Cube008.material}
          position={[0.981, 0.593, 0.65]}
          rotation={[0, -Math.PI / 4, 0]}
          scale={0.448}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          //material={nodes.Cylinder.material}
          position={[0, 1.135, 0]}
        >
          <ToonMat color="#cccccc"  /> 
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("models//billboard.glb");
