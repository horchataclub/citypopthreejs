import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'




ReactDOM.createRoot(document.getElementById('root')).render(
    
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
)
