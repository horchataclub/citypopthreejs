import { ToonMat } from "./mats/ToonMat";

export function TestTorus({ position, color }) {

    return <mesh position={position} receiveShadow castShadow>
      <torusGeometry args={[ 1, 0.5, 126, 100 ]} />
      <ToonMat toneMapped={ true } color={color}  />
    </mesh>
} 