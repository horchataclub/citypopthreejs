
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { NodeToyMaterial, NodeToyTick } from '@nodetoy/react-nodetoy'
import { data } from './ShaderData.ts';

export default function Model(props) {
  const { nodes, materials } = useGLTF("./models/landscape.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Grid"
        //castShadow
        receiveShadow
        geometry={nodes.Grid.geometry}
        //material={nodes.Grid.material}
        scale={ 15 }
      >
         <NodeToyMaterial data={data} />
      </mesh>

      <mesh
        name="road"
        //castShadow
        receiveShadow
        geometry={nodes.road.geometry}
        material={nodes.road.material}
        scale={ 15 }
      />
    </group>
  );
}

useGLTF.preload("./models/landscape.gltf");