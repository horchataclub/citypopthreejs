import * as THREE from "three";
import { useRef } from 'react';
import { Color, MeshPhongMaterial, TextureLoader } from 'three';

const toonOverlay = /* glsl */`
    uniform float opacity; 

    // load gradient map
    uniform sampler2D uGradientMap;

    // Multiply instead of overlay
    vec3 blendMultiply(vec3 base, vec3 blend) {
      return base * blend;
    }

    // functions to 'overlay' color onto map
    float blendOverlay(float base, float blend) {
      return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
    }

    vec3 blendOverlay(vec3 base, vec3 blend) {
      return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
    }

    // remove this...
    vec3 sRGBToLinear(vec3 color) {
      vec3 linearColor = pow(color, vec3(2.2));
      return linearColor;
    }
  
`;


const toonOutput = /* glsl */`
    #include <dithering_fragment>   


    // smooth shaded, grayscale 
    float gray = dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec4 gradientMap = texture2D(uGradientMap, vec2(gray * 2.0, 0) );


    vec3 finalColor = blendOverlay( vec3(gradientMap.rgb), diffuse);

    // output map
    #ifdef USE_MAP

    vec4 diffuseMap = texture2D( map, vMapUv ); 
    diffuseMap.rgb *= gradientMap.rgb;

    finalColor = mix(finalColor, diffuseMap.rgb, diffuseMap.a);

    #endif  
    // ---------------------

    //gl_FragColor = gl_FragColor; // NO CHANGE
    //gl_FragColor = vec4(gray, gray, gray, 1.0);  // SLIGHTLY LIGHTER
    //gl_FragColor = vec4(gradientMap.rgb, 1.0);  // REMOVES BAND
    //gl_FragColor = vec4(diffuse.rgb, 1.0);  // CHANGES COLOR
    //gl_FragColor = vec4(finalColor, 1.0); 


    gl_FragColor = linearToOutputTexel( vec4(finalColor, 1.0) );
`;

class CustomMeshPhongMaterial extends MeshPhongMaterial {
    constructor(parameters) {
      super(parameters);

        // texture
        const gradMap = new TextureLoader().load('../textures/fourtoneLinear.jpg'); // fourtoneLinear
        gradMap.wrapS = THREE.ClampToEdgeWrapping;
        gradMap.wrapT = THREE.ClampToEdgeWrapping;

        gradMap.minFilter = THREE.NearestFilter;
        gradMap.magFilter = THREE.NearestFilter;

        gradMap.colorSpace = THREE.SRGBColorSpace;
        //gradMap.colorSpace = THREE.LinearSRGBColorSpace;

        const originalOnBeforeCompile = this.onBeforeCompile;
  
        this.onBeforeCompile = (shader) => {
            // declare uniform variable for gradient map texture
            shader.uniforms.uGradientMap = { value: gradMap };
            shader.uniforms.color = { value: new Color("#1678a2") };
            shader.uniforms.specular = { value: new Color("white") };
            shader.uniforms.shininess = { value: 10.0 };

            // inject code into the fragment shader
            shader.fragmentShader = shader.fragmentShader.replace(
                `uniform float opacity;`,
                toonOverlay
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <dithering_fragment>`,
                toonOutput
            );
    
            // Call the original onBeforeCompile if it exists
            if (originalOnBeforeCompile) {
                originalOnBeforeCompile.call(this, shader);
            }
        };
    }
  }


export const ToonMat = ({ color, ...rest }) => {
    const materialRef = useRef();
  
    return <primitive ref={materialRef} shininess={ 300 }  object={new CustomMeshPhongMaterial({ color, ...rest })} />;
};