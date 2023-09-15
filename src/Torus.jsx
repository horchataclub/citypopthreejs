import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ToonMat } from "./mats/ToonMat";
import { MeshPhongMaterial } from "three";
import { useControls } from "leva";


export default function Torus ({ position, ...props }) {

    const meshRef = useRef();

    // useFrame will run on every frame update
    useFrame(() => {
      // Rotate the mesh by updating its rotation property
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

    });

    const { color } = useControls({
      color: "#1678a2"
    });

    const { toneMapped } = useControls({
      toneMapped: { value: true, label: 'Toggle Tonemapping' },
    })


    return <mesh position={position} {...props} ref={meshRef} receiveShadow castShadow>
      <torusGeometry args={[ 1, 0.5, 126, 100 ]} />
      {/* <meshStandardMaterial color="#1678a2" />  */}
      <ToonMat toneMapped={ toneMapped } color={color} />
      {/* <meshPhongMaterial  color="#1678a2" shininess={ 300 } specular={ "white" } /> */}
    </mesh>
}