import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

// Three.js Components
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

// UI Components
import Logo from './components/Logo'
import AudioControls from './components/AudioControls'
import KeyBoardControls from './components/KeyBoardControls'
import MiniMap from './components/MiniMap'


ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Logo />
        <AudioControls />        
        <div id="controls">
            <MiniMap />
            <KeyBoardControls />
        </div>
        
        <Canvas
            shadows
            // camera={ {
            //     fov: 45,
            //     near: 0.1,
            //     far: 200,
            //     position: [ 2.5, 4, 6 ]
            // } }
        >
        <Suspense fallback={null}>
            <App />
            </Suspense>
        </Canvas>
    </>
)
