import { Effect } from "postprocessing"
import { Uniform } from "three"


const fragmentShader = /* glsl */`

    uniform sampler2D tDiffuse; // this will probably just be inputColor
    uniform float pixelSize;
    uniform vec3 uTint;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec2 texel = vec2( 1.0 / resolution.x, 1.0 / resolution.y );

        // kernel definition (in glsl matrices are filled in column-major order)

        const mat3 Gx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 ); // x direction kernel
        const mat3 Gy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 ); // y direction kernel

        // fetch the 3x3 neighbourhood of a fragment

        // first column

        float tx0y0 = texture2D( inputBuffer, uv + texel * vec2( -1, -1 ) ).r;
        float tx0y1 = texture2D( inputBuffer, uv + texel * vec2( -1,  0 ) ).r;
        float tx0y2 = texture2D( inputBuffer, uv + texel * vec2( -1,  1 ) ).r;

        // second column

        float tx1y0 = texture2D( inputBuffer, uv + texel * vec2(  0, -1 ) ).r;
        float tx1y1 = texture2D( inputBuffer, uv + texel * vec2(  0,  0 ) ).r;
        float tx1y2 = texture2D( inputBuffer, uv + texel * vec2(  0,  1 ) ).r;

        // third column

        float tx2y0 = texture2D( inputBuffer, uv + texel * vec2(  1, -1 ) ).r;
        float tx2y1 = texture2D( inputBuffer, uv + texel * vec2(  1,  0 ) ).r;
        float tx2y2 = texture2D( inputBuffer, uv + texel * vec2(  1,  1 ) ).r;

        // gradient value in x direction

        float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
            Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
            Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

        // gradient value in y direction

        float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
            Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
            Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

        // magnitute of the total gradient

        float G = sqrt( ( valueGx * valueGx ) + ( valueGy * valueGy ) );
        G = 1.0 - G;

         // Calculate the luminance (brightness) of the original color
        float luminance = dot( vec3(G), vec3(0.2126, 0.7152, 0.0722));
        
        // Determine if the pixel is part of the black outline or the transparent background
        float alpha = step(0.5, luminance);
        vec3 finalcolor = mix(vec3(0.0, 0.0, 0.0), inputColor.rgb, alpha);

        outputColor = vec4( vec3( finalcolor ), 1.0 );
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