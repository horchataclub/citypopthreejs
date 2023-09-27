import { useEffect, useRef, useState  } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";


export default function Ribbons() {

  const angle = THREE.MathUtils.degToRad(-45);
  const ribbonOdds = 0.1;
  const ribbonBounds = [0, 12];
  
  let removedItem;



  function rollDice(percentage) {
    let randomNumber = Math.floor(Math.random() * 100);

    // Return true with the specified percentage
    if (randomNumber < percentage) {
      return true;
    } else {
      return false;
    }
  }

  function positionRibbon(item) {
    // set item somewhere between bounds
    item.current.position.x = Math.random() * ribbonBounds[1];
  }

    const ribbonMeshes = []; 
    const ribbonSpeed = 0.08;
    const ribbonRotationSpeed = 0.1;
    const [ribbonGeometry, setRibbonGeometry] = useState(null); // State to store the ribbon geometry
    const [ribbonMat] = useState(
        
        new THREE.ShaderMaterial({
            uniforms: {
              colorFront: { value: new THREE.Color(0xd8806a) },
              colorBack: { value: new THREE.Color(0xf0ec88) }
            },
            depthTest: false,
            depthWrite: false,
            transparent: true,
            side: THREE.DoubleSide,
            vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
      
            void main() {
                vNormal = normal;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,
            fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
      
            uniform mat4 modelMatrix;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;
            uniform vec3 colorFront;
            uniform vec3 colorBack;
      
            void main() {
                vec3 objectNormal = normalize(normalMatrix * vNormal);
                vec3 objectPosition = vec3(modelMatrix * vec4(vPosition, 1.0));
                vec3 viewPosition = -cameraPosition.xyz * objectPosition.z / cameraPosition.z + objectPosition;
                vec3 viewNormal = normalize(viewPosition - cameraPosition);
                float dotProduct = dot(viewNormal, objectNormal);
                vec3 color = mix(colorFront, colorBack, step(0.0, dotProduct));
                gl_FragColor = vec4(color, 1.0);
            }
            `
          })

    ); // Material

      // Create refs for each line
    const ribbons = useRef();
    const ribbon1 = useRef();
    const ribbon2 = useRef();
    const ribbon3 = useRef();
    const ribbon4 = useRef();
    
    
  let availableRibbon = [ribbon1, ribbon2, ribbon3, ribbon4];
  let blowingRibbon = [];
    

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load("/models/ribbon.gltf", (gltf) => {
          const loadedGeometry = gltf.scene.children[0].geometry;
          loadedGeometry.computeVertexNormals();
          setRibbonGeometry(loadedGeometry); // Set the loaded geometry in the state
        });
        
        if (ribbons.current) {
          ribbons.current.renderOrder = 999; // Adjust the value as needed
          ribbons.current.onBeforeRender = function (renderer) { renderer.clearDepth(); };
        }

      }, []);


      useFrame(() => {

        // ribbon rotation
        if(ribbon4.current){
          ribbon1.current.rotation.y += ribbonRotationSpeed;
          ribbon2.current.rotation.y += ribbonRotationSpeed;
          ribbon3.current.rotation.y += ribbonRotationSpeed;
          ribbon4.current.rotation.y += ribbonRotationSpeed;
        }

        // ribbon blowing
        if (rollDice(ribbonOdds)) {
          // select ribbon from availableRibbon and add to blowingRibbon
          if (availableRibbon.length > 0) {
            removedItem = availableRibbon.splice(0, 1)[0];
            blowingRibbon.push(removedItem);
          }
          if (blowingRibbon[blowingRibbon.length - 1]) {
            positionRibbon(blowingRibbon[blowingRibbon.length - 1]);
          }
        }
    
        
        // animate wind
        if (blowingRibbon.length > 0) {
          for (let k = 0; k < blowingRibbon.length; k++) {
            
            blowingRibbon[k].current.position.y -= ribbonSpeed;
            
            if (blowingRibbon[k].current.position.y < -20) {
              blowingRibbon[k].current.position.y = 2;
              removedItem = blowingRibbon.splice(k, 1)[0];
              availableRibbon.push(removedItem);
            }
          }
        }

      });

    
    const { ribbonsPosition } = useControls({
        ribbonsPosition: { value: [6.6,9.5,-10], step: 0.1 } //-1, 4, -7.0
      });    
   
   
    return <>
        <group ref={ribbons} position={ribbonsPosition} frustumCulled={false} rotation={[0, 0, angle]}>
      {ribbonGeometry && ( // Render only if the geometry is loaded
        <mesh ref={ribbon1} geometry={ribbonGeometry} material={ribbonMat} scale={[0.025, 0.025, 0.025]} position={[0, 2, 0]} />
      )}
      {ribbonGeometry && ( // Render only if the geometry is loaded
        <mesh ref={ribbon2} geometry={ribbonGeometry} material={ribbonMat} scale={[0.025, 0.025, 0.025]} position={[0.5, 2, 0]} />
      )}
      {ribbonGeometry && ( // Render only if the geometry is loaded
        <mesh ref={ribbon3} geometry={ribbonGeometry} material={ribbonMat} scale={[0.025, 0.025, 0.025]} position={[1, 2, 0]} />
      )}
      {ribbonGeometry && ( // Render only if the geometry is loaded
        <mesh ref={ribbon4} geometry={ribbonGeometry} material={ribbonMat} scale={[0.025, 0.025, 0.025]} position={[1.5, 2, 0]} />
      )}
    </group>
    </>
}