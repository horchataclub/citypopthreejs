import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { NodeToyMaterial, NodeToyTick } from '@nodetoy/react-nodetoy'
import { data } from './ShaderData.ts';
import { ToonMatBlack } from "./mats/ToonmatBlack.jsx";

export function Road(props) {
  const { nodes, materials } = useGLTF("/models/ground3.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Street"
        castShadow
        receiveShadow 
        geometry={nodes.Street.geometry}
        material={nodes.Street.material}
      >
      </mesh>
      <mesh
        name="Shoulder1"
        castShadow
        receiveShadow
        geometry={nodes.Shoulder1.geometry}
        //material={nodes.Shoulder1.material}
        position={[0, 0, 2]}
      >
      <ToonMatBlack color={"#EAD0A0"} />
    </mesh>
      <mesh
        name="Shoulder2"
        castShadow
        receiveShadow
        geometry={nodes.Shoulder2.geometry}
        //material={nodes.Shoulder2.material}
        position={[0, 0, -0.143]}
      >
        <ToonMatBlack color={"#EAD0A0"} />
      </mesh>
      <mesh
        name="Grass1"
        castShadow
        receiveShadow
        geometry={nodes.Grass1.geometry}
        //material={nodes.Grass1.material}
        position={[0, 0, 2.143]}
      >
        <NodeToyMaterial data={data} />
      </mesh>
      <mesh
        name="Grass2"
        castShadow
        receiveShadow
        geometry={nodes.Grass2.geometry}
        material={nodes.Grass2.material}
        position={[0, 0, -0.291]}
      >
        <NodeToyMaterial data={data} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/ground3.glb");
