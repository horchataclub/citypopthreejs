import { Effect } from "postprocessing"
import { Uniform } from "three"


const fragmentShader = /* glsl */`

    uniform sampler2D tDiffuse; // this will probably just be inputColor
    uniform float pixelSize;
    uniform vec3 uTint;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
        
        //vec2 textureSize = vec2(textureSize(tDiffuse, 0));
        //vec2 texelSize = 1.0 / textureSize;
        vec2 texelSize = vec2( 1.0 / resolution.x, 1.0 / resolution.y );
        vec2 texCoords = vUv;
    
        vec3 i00 = texture2D(inputBuffer, texCoords + vec2(-1.0, -1.0) * texelSize).rgb;
        vec3 i01 = texture2D(inputBuffer, texCoords + vec2(-1.0, 0.0) * texelSize).rgb;
        vec3 i02 = texture2D(inputBuffer, texCoords + vec2(-1.0, 1.0) * texelSize).rgb;
        vec3 i10 = texture2D(inputBuffer, texCoords + vec2(0.0, -1.0) * texelSize).rgb;
        vec3 i11 = texture2D(inputBuffer, texCoords).rgb;
        vec3 i12 = texture2D(inputBuffer, texCoords + vec2(0.0, 1.0) * texelSize).rgb;
        vec3 i20 = texture2D(inputBuffer, texCoords + vec2(1.0, -1.0) * texelSize).rgb;
        vec3 i21 = texture2D(inputBuffer, texCoords + vec2(1.0, 0.0) * texelSize).rgb;
        vec3 i22 = texture2D(inputBuffer, texCoords + vec2(1.0, 1.0) * texelSize).rgb;
    
        // Sobel operator masks for h+v edges
        mat3 sobelX = mat3(-1.0, 0.0, 1.0, 
                            -2.0, 0.0, 2.0, 
                            -1.0, 0.0, 1.0);
        mat3 sobelY = mat3(-1.0, -2.0, -1.0,  
                            0.0,  0.0,  0.0, 
                            1.0,  2.0,  1.0);
    
        // Convolve Sobel masks with image
        float gx = dot(sobelX[0], vec3(i00.r+i00.g+i00.b, i10.r+i10.g+i10.b, i20.r+i20.g+i20.b)) +
                dot(sobelX[1], vec3(i01.r+i01.g+i01.b, i11.r+i11.g+i11.b, i21.r+i21.g+i21.b)) +
                dot(sobelX[2], vec3(i02.r+i02.g+i02.b, i12.r+i12.g+i12.b, i22.r+i22.g+i22.b));
                
        float gy = dot(sobelY[0], vec3(i00.r+i00.g+i00.b, i10.r+i10.g+i10.b, i20.r+i20.g+i20.b)) +
                dot(sobelY[1], vec3(i01.r+i01.g+i01.b, i11.r+i11.g+i11.b, i21.r+i21.g+i21.b)) +
                dot(sobelY[2], vec3(i02.r+i02.g+i02.b, i12.r+i12.g+i12.b, i22.r+i22.g+i22.b));
                
        // Calculate edge magnitude and threshold it
        float edge = sqrt(gx*gx + gy*gy);
        //float threshold = uTint.x; // 0.2 
        float threshold =  0.036; // 0.036; // 0.2 // higher = less lines
        edge = edge > threshold ? 1.0 : 0.0;
        edge = 1.0 - edge;
        vec4 texelColor = texture(tDiffuse, vUv);

        // Output the edge color
        //gl_FragColor = vec4(vec3(edge), 1.0);
        outputColor = texelColor * ( vec4(vec3(edge), 1) );
    }
`


export default class OutlinesEffect extends Effect 
{
    constructor({ tDiffuse, uTint, pizelSize })
    {
        super(
            'OutlinesEffect', 
            fragmentShader, 
            {
                uniforms: new Map([
                    [ 'tDiffuse', new Uniform(tDiffuse) ],
                    [ 'uTint', new Uniform(uTint) ],
                    [ 'pizelSize', new Uniform(pizelSize) ]
                ])
            }
        )
    }
}