import { EffectComposer, SMAA } from '@react-three/postprocessing'
import Outlines from './Outlines'
import { Suspense, useEffect, useRef, useState } from 'react'
import { HalfFloatType } from 'three'
import { RenderPass, SMAAEffect } from 'postprocessing'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Mask, useMask } from '@react-three/drei'



export default function Effects () {


  const [enableEffect, setEnableEffect] = useState(false);

  useEffect(() => {
    // Function to set enableEffect to true when the component is mounted
    setEnableEffect(true);
    console.log("loaded:", enableEffect)

    // Function to set enableEffect to true when the window is resized
    const handleResize = () => {
      setEnableEffect(!enableEffect);
      console.log("resized:", enableEffect)
    };

    // Add an event listener for the "resize" event when the component mounts
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component is unmounted to avoid memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [enableEffect]);


  // Use the useControls function to manually toggle the value
  useControls({
    enableEffect: {
      value: !enableEffect,
      label: 'Toggle Post',
      onChange: (newValue) => {
        setEnableEffect(newValue);
        console.log('enableEffect has been toggled:', enableEffect);
        // You can perform additional actions here based on the new value
      },
    },
  });



  const uTint = new THREE.Color(0.4, 0.6, 1.0);

    const outlinesRef = useRef()

    const { size } = useThree(); // Get the canvas size

  const desiredBufferResolution = [1920, 1080]; // Change this to your desired buffer resolution

  // Set the size of the render target
  const renderTargetSize = new THREE.Vector2(
    desiredBufferResolution[0] / size.width, // Calculate width ratio
    desiredBufferResolution[1] / size.height // Calculate height ratio
  );


    return <Suspense fallback={null}>
        {enableEffect && ( <EffectComposer 
          name={enableEffect}  
          frameBufferType={HalfFloatType}  
          multisampling={ 8 } 
          disableNormalPass={false} 
          //resolutionScale={1}
          //stencilBuffer={true}
        >
        <Outlines 
                ref={ outlinesRef }
                tDiffuse={ null } 
                uTint={ uTint } 
                pixelSize={  0.001 } 
                //attributes={1}
                //frameBufferType={ HalfFloatType }
                //stencilBuffer
            />
            <SMAA  
              //attributes={4} 
            />
            <Noise premultiply opacity={.25} blendFunction={BlendFunction.MULTIPLY} />
        </EffectComposer>)}
      </Suspense>
}