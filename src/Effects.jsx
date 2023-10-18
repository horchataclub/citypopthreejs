import { EffectComposer, SMAA } from '@react-three/postprocessing'
import Outlines from './Outlines'
import { useRef } from 'react'
import { HalfFloatType } from 'three'
import { RenderPass, SMAAEffect } from 'postprocessing'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'



export default function Effects () {

  const uTint = new THREE.Color(0.4, 0.6, 1.0);

    const outlinesRef = useRef()

    const { size } = useThree(); // Get the canvas size

  const desiredBufferResolution = [1920, 1080]; // Change this to your desired buffer resolution

  // Set the size of the render target
  const renderTargetSize = new THREE.Vector2(
    desiredBufferResolution[0] / size.width, // Calculate width ratio
    desiredBufferResolution[1] / size.height // Calculate height ratio
  );


    return <EffectComposer  frameBufferType={HalfFloatType}  multisampling={ 8 } disableNormalPass={false} resolutionScale={1}>
      
        <Outlines 
            ref={ outlinesRef }
            tDiffuse={ null } 
            uTint={ uTint } 
            pixelSize={  0.001 } 
            //frameBufferType={ HalfFloatType }
            //stencilBuffer: boolean
        />
        <SMAA />
    </EffectComposer>
}