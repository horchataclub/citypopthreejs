import * as THREE from "three";
import { useRef } from 'react';
import { Color, MeshPhysicalMaterial, TextureLoader, CubeTextureLoader } from 'three';


// Vert 1 ---------------------------------------------------------------------------
const toonParallaxVert = /* glsl */`
  varying vec3 vViewPosition; // already there

  attribute vec4 tangent;

  varying vec3 vViewDirTangent;
  varying vec2 vUv;
`;

// Vert 2 --------------------------------------------------------------------------------
const toonParallaxVert2 = /* glsl */`
  #include <fog_vertex> // already there

    vUv = uv;
    vec3 vNormal = normalMatrix * normal;
    vec3 vTangent = normalMatrix * tangent.xyz;
    vec3 vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

    mat3 mTBN = transpose(mat3(vTangent, vBitangent, vNormal));
    
    vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
    vec3 viewDir = -mvPos.xyz;
    vViewDirTangent = mTBN * viewDir;

    gl_Position = projectionMatrix * mvPos;
`;

// Frag 1 --------------------------------------------------------------------------------------
const toonOverlay = /* glsl */`

    uniform float opacity; // already there

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


    //  parallax stuff
    varying vec3 vViewDirTangent;
    varying vec2 vUv;

    uniform samplerCube interiorMap;

    float min3 (vec3 v) {
      return min (min (v.x, v.y), v.z);
    }
  
`;

// Frag 2 ------------------------------------------------------------------------------------------------
const toonOutput = /* glsl */`
    #include <dithering_fragment>   



    // parallax stuff
    vec2 uv = fract(vUv); // TODO: Multiply by tiling amount
    uv.y = 1.0 - uv.y;  // ben fix to flip the map and fix vertical projection panning
    vec3 sampleDir = normalize(vViewDirTangent);

    sampleDir *= vec3(-1, -1, 1);  // -1, -1, 1
    vec3 viewInv = 1.0 / sampleDir;

    vec3 newUV = vec3(uv * 2.0 - 1.0, -1.0);  // uv * 2.0 - 1.0, -1.0
    
    float fmin = min3(abs(viewInv) - viewInv * newUV);
    sampleDir = sampleDir * fmin + newUV;

    vec4 interior = texture(interiorMap, sampleDir);
    //gl_FragColor = texture(interiorMap, sampleDir);
    // end parallax



    // smooth shaded, grayscale 
    float gray = dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));

    // adding in grayscaled interior map
    gray *= dot(interior.rgb, vec3(0.2126, 0.7152, 0.0722)) * 1.8 + .5; 
    vec4 gradientMap = texture2D(uGradientMap, vec2(gray * 2.0, 0) );


    vec3 finalColor = blendOverlay( vec3(gradientMap.rgb), diffuse);

    // output map
    #ifdef USE_MAP

    vec2 flippedMap = vec2(vMapUv.x, 1.0 - vMapUv.y);
    vec4 diffuseMap = texture2D( map, flippedMap ); 

    // USING inverse lerp SDF method to sharpen the texture
    float a = 0.5;
    float b = 0.8;

    // Apply inverse lerp to each component- -------------------

    vec4 newDiffuseMap = vec4(
      clamp((diffuseMap.r - a) / (b - a), 0.0, 1.0),
      clamp((diffuseMap.g - a) / (b - a), 0.0, 1.0),
      clamp((diffuseMap.b - a) / (b - a), 0.0, 1.0),
      clamp((diffuseMap.a - a) / (b - a), 0.0, 1.0)
  );



    // ---------------------------------------------------------

    finalColor = mix(finalColor, newDiffuseMap.rgb, newDiffuseMap.a);

    #endif  
    // --------------------


    gl_FragColor = linearToOutputTexel( vec4(finalColor, 1.0) );  // final toon glass output

    //gl_FragColor = vec4(shadow, shadow, shadow, 1.0);
`;






class customParallax extends MeshPhysicalMaterial {
    constructor(parameters) {
      super(parameters);

        // env map texture
        const cubeMap = new CubeTextureLoader().load(
          [
              "../textures/posx.jpg",
              "../textures/negx.jpg",
              "../textures/posy.jpg",
              "../textures/negy.jpg",
              "../textures/posz.jpg",
              "../textures/negz.jpg"
            ]
      ); 
      cubeMap.wrapS = THREE.ClampToEdgeWrapping;
      cubeMap.wrapT = THREE.ClampToEdgeWrapping;

      cubeMap.minFilter = THREE.NearestFilter;
      cubeMap.magFilter = THREE.NearestFilter;

      cubeMap.colorSpace = THREE.SRGBColorSpace;
      //cubeMap.colorSpace = THREE.LinearSRGBColorSpace;

      // Interior map
      const interiorMap = new CubeTextureLoader().load(
        [
            "../textures/barberPosZ.jpg",
            "../textures/barberNegZ.jpg",
            "../textures/barberPosY.jpg", // good
            "../textures/barberNegY.jpg", // good
            "../textures/barberPosX.jpg",
            "../textures/barberNegX.jpg",
          ]
      ); 

      interiorMap.wrapS = THREE.ClampToEdgeWrapping;
      interiorMap.wrapT = THREE.ClampToEdgeWrapping;
      interiorMap.minFilter = THREE.NearestFilter;
      interiorMap.magFilter = THREE.NearestFilter;
      interiorMap.colorSpace = THREE.SRGBColorSpace;
      
        // Toon tonemap
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
            // shader.uniforms.color = { value: new Color("#1678a2") };
            // shader.uniforms.specular = { value: new Color("white") };
            // shader.uniforms.shininess = { value: 10.0 };


            shader.uniforms.roughness= { value: 0 };
            shader.uniforms.transmission= { value: 0.5 }; // Add transparency
            shader.uniforms.thickness= { value: 0.305 };
            shader.uniforms.color= { value: new Color("#4b79f9") };
            shader.uniforms.envMapIntensity= { value: 2.175 };
            shader.uniforms.clearcoat= { value: 1 };
            //shader.uniforms.metalness= { value: 0 };
            shader.uniforms.reflectivity= { value: 0.5 };
            shader.uniforms.envMap= { value: cubeMap };
            shader.uniforms.interiorMap= { value: interiorMap };



            // inject code into vert shader
            shader.vertexShader = shader.vertexShader.replace(
              `varying vec3 vViewPosition;`,
                toonParallaxVert
            );
            shader.vertexShader = shader.vertexShader.replace(
              `#include <fog_vertex>`,
              toonParallaxVert2
            );
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


export const GlassParallaxMat = ({ ...rest }) => {
    const materialParallaxRef = useRef(); 
  
    return <primitive ref={materialParallaxRef} object={new customParallax({ ...rest })} />;
};