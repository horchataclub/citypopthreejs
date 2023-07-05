import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Torus ({ position, ...props }) {

    const meshRef = useRef();

    // useFrame will run on every frame update
    useFrame(() => {
      // Rotate the mesh by updating its rotation property
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

    });

    return <mesh position={position} {...props} ref={meshRef} receiveShadow castShadow>
      <torusGeometry args={[ 1, 0.5, 126, 100 ]} />
      <meshStandardMaterial color="#1678a2" /> 
    </mesh>
}