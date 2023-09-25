import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from 'three';
//import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useControls } from "leva";

export default function Dots () {

  const pointsRef = useRef(); 
    const angle = THREE.MathUtils.degToRad(-45);
    const circleMap = useLoader(TextureLoader, 'textures/circle.png')
    //const geometry = new THREE.BufferGeometry();
    const colors = {
      color1: new THREE.Color(`#c12855`),
      color2: new THREE.Color(`#ebcc37`),
      color3: new THREE.Color(`#4e62a6`)
    };

    let numCircles = 105;
    let positions = new Float32Array(numCircles * 3);
    let velocities = new Float32Array(numCircles * 3);
    let colorArray = new Float32Array(numCircles * 3);
    let sizesArray = new Float32Array(numCircles);
    let circles = null;
    let speed = 0.05;
    let maxRange = 17;
    let minRange = maxRange / 2;
    let minHeight = 1;
    let maxCircleSize = 30;
    let minCircleSize = 5;

    const vertexShader = `
      attribute float size;
      uniform float scale;
      attribute float sizeAttenuation;
      attribute vec3 customColor; 
      attribute float customOpacity;
      attribute vec2 particleUv;
      varying vec3 vColor;
      varying float vOpacity;
      varying vec2 vUv;

      void main() {
        vColor = customColor;
        vOpacity = customOpacity;
        vUv = particleUv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        //gl_PointSize = size * (scale / length(mvPosition.xyz));
        //if (sizeAttenuation == 1.0) {
        //  gl_PointSize *= (1.0 / -mvPosition.z);
        //}
        gl_PointSize = size; 
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D map;
      uniform sampler2D alphaMap;
      uniform float opacity; 
      varying vec3 vColor;
      varying float vOpacity;
      varying vec2 vUv;
 
      void main() {
        vec4 diffuseColor = texture2D(map, vUv);
        float alpha = texture2D(alphaMap, gl_PointCoord).r;
        vec4 alphaPreview = texture2D(alphaMap, gl_PointCoord);
        diffuseColor.a *= alpha;
        //gl_FragColor = vec4(vColor * diffuseColor.xyz, diffuseColor.a * opacity * vOpacity);
        gl_FragColor = vec4(vColor, alpha);
      } 
    `;

    const dotMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
          //size: { value: 60 },
          scale: { value: 1 },
          sizeAttenuation: { value: 0 },
          map: { value: null },
          alphaMap: { value: null },
          opacity: { value: 1 }
        },
        depthTest: false,
        depthWrite: false,
        transparent: true,
        vertexColors: true
    });

    function rollDice(percentage) {
        let randomNumber = Math.floor(Math.random() * 100);
    
        // Return true with the specified percentage
        if (randomNumber < percentage) {
          return true;
        } else {
          return false;
        }
    }


    function addDots(){
        // Destroy old circles
        if (circles !== null) {
            geometry.dispose();
            dotMaterial.dispose();
            scene.remove(circles);
    
            positions = [];
            velocities = [];
    
            // maybe destroy wind and ribbons here too...
        }

        circles.rotateZ(angle);

    } // addDots

dotMaterial.uniforms.alphaMap.value = circleMap;
dotMaterial.needsUpdate = true;




useFrame((state, delta) => {
  const positionsAttribute = pointsRef.current.geometry.attributes.position;
  const velocitiesAttribute = pointsRef.current.geometry.attributes.velocity;
  

  if (positionsAttribute) {
    for (let j = 0; j < numCircles * 3; j += 3) {
      // change x position by x velocity
      positionsAttribute.array[j] -= velocitiesAttribute.array[j];
      // change y position by y velocity
      positionsAttribute.array[j + 1] -= velocitiesAttribute.array[j + 1];
      // change z position by z velocity
      positionsAttribute.array[j + 2] -= velocitiesAttribute.array[j + 2];

      // check to see if below ground; id so, move to new starting x, y, z
      if (positionsAttribute.array[j + 1] < -20) {
        positionsAttribute.array[j] = Math.floor(
          Math.random() * maxRange - minRange
        ); // x
        positionsAttribute.array[j + 1] = Math.floor(
          Math.random() * maxRange - minRange + 17
        ); // y 0.02 - 0.3 // y
        positionsAttribute.array[j + 2] = 0; // z
      }
    }

    // Mark the attribute as needing an update
    positionsAttribute.needsUpdate = true;
  }
});



for (let i = 0; i < numCircles; i++) {
    const i3 = i * 3;

    positions[i3] = Math.floor(Math.random() * maxRange - minRange), // x
    positions[i3 + 1] = Math.floor(Math.random() * maxRange - minRange) + 17, // y
    positions[i3 + 2] = 1 // z

    velocities[i3] = 0, // x -0.3 - 0.3
    velocities[i3 + 1] = (Math.floor(Math.random() * 2) + 1) * speed, // y 0.02 - 0.3
    velocities[i3 + 2] = 0 // z -0.3 - 0.3

    // Pick colors and add to colorArray
    let keys = Object.keys(colors);
    let randomIndex = Math.floor(Math.random() * keys.length);
    let randomKey = keys[randomIndex];
    let randomValue = colors[randomKey];

    colorArray[i3] = randomValue.r,
    colorArray[i3 + 1] = randomValue.g,
    colorArray[i3 + 2] = randomValue.b
   

    let size = Math.random() * (maxCircleSize - minCircleSize) + minCircleSize;
    sizesArray[i] = size * 1;


}

const { dotsPosition } = useControls({
    dotsPosition: { value: [-12.3,-10.8,-11.2], step: 0.1 } //-1, 4, -7.0
  });


    return <>
        <points ref={pointsRef} frustumCulled={ false } position={dotsPosition} material={dotMaterial} rotation={[0, 0, angle]}>
            <bufferGeometry>
                <bufferAttribute
                    attach='attributes-position'
                    count={numCircles}
                    itemSize={3}
                    array={positions}
                />
                <bufferAttribute
                    attach="attributes-velocity"
                    count={numCircles}
                    itemSize={3}
                    array={velocities}
                />
                <bufferAttribute 
                    attach='attributes-customColor'
                    count={numCircles}
                    itemSize={3}
                    array={colorArray}
                />
                <bufferAttribute
                    attach='attributes-size'
                    count={numCircles}
                    itemSize={1}
                    array={sizesArray}
                />
            </bufferGeometry>
        </points>

    </>
    
}