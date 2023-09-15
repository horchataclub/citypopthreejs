
import { EffectComposer } from '@react-three/postprocessing'
import Outlines from './Outlines'
import { useRef } from 'react'
import { HalfFloatType } from 'three'


export default function Effects () {



    const outlinesRef = useRef()

    return <EffectComposer multisampling={ 8 }>
        <Outlines 
            ref={ outlinesRef }
            tDiffuse={ null } 
            uTint={ null } 
            pixelSize={  0.001 } 
            //frameBufferType={ HalfFloatType }
        />
    </EffectComposer>
}