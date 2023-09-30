import { useControls } from "leva";
import { PlaneGeometry, TextureLoader } from "three";
import { useLoader } from '@react-three/fiber';
import NoiseMat from "./mats/NoiseMat";

export default function Hills () {

    // Load the texture here
  const hillShape1 = useLoader(TextureLoader, '../textures/hillShape1.png')
  const hillShape2 = useLoader(TextureLoader, '../textures/hillShape2.png')

    const { scale, position } = useControls({
        scale: { value: [5.6, 3.8, 1], step: 0.1, min: 0.1, max: 12 },
        position: { value: [0, 2.4, -24.3], step: 0.1 },
      });

 
    return <>
        <mesh position={ position } scale={scale} layers={0} >
            <planeGeometry args={[10, 3]} />
            <NoiseMat uHillShape={ hillShape1 } stencil />
        </mesh>

        <mesh position={[-1, 3, -18]} scale={[ 3.7, 2.5, 1 ]} >
            <planeGeometry args={[ 10, 3 ]} />
            <meshBasicMaterial 
                color={ 0xb2ae7e } 
                alphaMap={ hillShape2 }
                transparent={ true }
                alphaTest={ 0.5 } 
            />
        </mesh>
    </>
}