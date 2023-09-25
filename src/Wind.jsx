import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import * as THREE from "three";

export default function Wind() {

  const angle = THREE.MathUtils.degToRad(-45);
  const windSpeed = 0.18;
  const windOdds = 0.3;
  const windBounds = [0, 9];
  const points = [
    [0, 0, 0],  // start point
    [0, 1.5, 0] // end point
  ];

  const lineProps = {
    color: 'black',
    lineWidth: 1
    //depthTest: false
    //depthWrite: false
  };

  // Create refs for each line
  const wind1 = useRef();
  const wind2 = useRef();
  const wind3 = useRef();
  const wind4 = useRef();

  let removedItem;

  let availableWind = [wind1, wind2, wind3, wind4];
  let blowingWind = [];


  function rollDice(percentage) {
    let randomNumber = Math.floor(Math.random() * 100);

    // Return true with the specified percentage
    if (randomNumber < percentage) {
      return true;
    } else {
      return false;
    }
  }

  function positionWind(item) {
    // set item somewhere between bounds
    item.current.position.x = Math.random() * windBounds[1];
  }

  useFrame((state, delta) => {
    
    if (rollDice(windOdds)) {
      // select wind from availableWind and add to blowingWind
      if (availableWind.length > 0) {
        removedItem = availableWind.splice(0, 1)[0];
        blowingWind.push(removedItem);
      }
      if (blowingWind[blowingWind.length - 1]) {
        positionWind(blowingWind[blowingWind.length - 1]);
      }
    }

    
    // animate wind
    if (blowingWind.length > 0) {
      for (let k = 0; k < blowingWind.length; k++) {
        
        blowingWind[k].current.position.y -= windSpeed;
        
        if (blowingWind[k].current.position.y < -20) {
          blowingWind[k].current.position.y = 2;
          removedItem = blowingWind.splice(k, 1)[0];
          availableWind.push(removedItem);
        }
      }
    }

  }); // useFrame


  const { windPosition } = useControls({
    windPosition: { value: [1.1,0.8,-4.3], step: 0.1 } //-1, 4, -7.0
  });

  
  return (
    <>
      <group position={ windPosition } frustumCulled={false} rotation={[0, 0, angle]}>
        <Line ref={wind1} points={points} position={[0, 2, 0]} {...lineProps} />
        <Line ref={wind2} points={points} position={[0.5, 2, 0]} {...lineProps} />
        <Line ref={wind3} points={points} position={[1, 2, 0]} {...lineProps} />
        <Line ref={wind4} points={points} position={[1.5, 2, 0]} {...lineProps} />
      </group>
    </>
  );
}
