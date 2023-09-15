import { useRef } from "react"
import * as THREE from 'three';

const NoiseMat = ({ uHillShape }) => {
    const noiseMatRef = useRef();

    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    return <shaderMaterial
        ref={ noiseMatRef }
        args={[
            {
                uniforms: {
                    uHillShape: { value: uHillShape },
                    uAlphaTest: { value: 0.5 },
                    color1: { value: new THREE.Color(0xe1bd83) },
                    color2: { value: new THREE.Color(0xb67039) },
                    resolution: { value: [resolution.x, resolution.y] },
                    uScale: { value: 0.176 },
                    alphaMap: { value: null }
                },
                vertexShader: /* glsl */`
                    uniform float textureWidth;
                    uniform float textureHeight;
            
                    varying vec2 vUv;
            
                    void main(){
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            
                        vUv = uv;
                    }
                `,
                fragmentShader: /* glsl */`
                    #define PI 3.14159265358979323846

                    uniform vec3 color1;
                    uniform vec3 color2;
                    uniform vec2 resolution;
                    uniform float uScale;
                    uniform sampler2D uHillShape;
                    uniform float uAlphaTest;
                    varying vec2 vUv;
                    
                    
                    vec4 permute(vec4 x)
                    {
                        return mod(((x*34.0)+1.0)*x, 289.0);
                    }
                    
                    vec2 fade(vec2 t) 
                    {
                        return t*t*t*(t*(t*6.0-15.0)+10.0);
                    }
                    
                    float cnoise(vec2 P)
                    {
                        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                        Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
                        vec4 ix = Pi.xzxz;
                        vec4 iy = Pi.yyww;
                        vec4 fx = Pf.xzxz;   
                        vec4 fy = Pf.yyww;
                        vec4 i = permute(permute(ix) + iy);
                        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
                        vec4 gy = abs(gx) - 0.5;
                        vec4 tx = floor(gx + 0.5);
                        gx = gx - tx; 
                        vec2 g00 = vec2(gx.x,gy.x);
                        vec2 g10 = vec2(gx.y,gy.y);  
                        vec2 g01 = vec2(gx.z,gy.z);
                        vec2 g11 = vec2(gx.w,gy.w);
                        vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
                        g00 *= norm.x;
                        g01 *= norm.y;
                        g10 *= norm.z;
                        g11 *= norm.w;
                        float n00 = dot(g00, vec2(fx.x, fy.x));
                        float n10 = dot(g10, vec2(fx.y, fy.y));
                        float n01 = dot(g01, vec2(fx.z, fy.z));
                        float n11 = dot(g11, vec2(fx.w, fy.w));
                        vec2 fade_xy = fade(Pf.xy);
                        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                        return 2.3 * n_xy; 
                    }
                    
                    
                    
                    void main() {   
                        //gl_FragCoord.xy    or vUv
                        float r = cnoise(gl_FragCoord.xy * uScale);  
                    
                        vec3 color = mix(color1, color2, step(0.3, r));
                        
                        // Alpha shape 
                        vec4 alphaShape = texture2D(uHillShape, vUv);
                    
                        float alphaValue = alphaShape.r;
                        if (alphaValue < uAlphaTest) discard;
                        gl_FragColor = vec4(color, alphaValue);
                        //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                `,
                transparent: true,
                alphaTest: 0.99
            }
        ]}
    />
}

export default NoiseMat;