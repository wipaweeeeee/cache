import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import styles from './styles.module.scss';
import Model from './Model'

//TODO: add window resize to make sure things scale correctly
//TODO: add chili + typography

const vertextShader = `
    void main() {
        gl_Position = vec4( position, 1.0 );
    }
`;

const fragmentShader = `
    
    #define S(a,b,t) smoothstep(a,b,t)

    uniform vec2 u_resolution;
    uniform float u_time;

    vec3 colorA = vec3(0.149,0.141,0.912);
    vec3 colorB = vec3(1.000,0.833,0.224);

    mat2 Rot(float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, -s, s, c);
    }

    vec2 hash( vec2 p ){
        p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
	    return fract(sin(p)*43758.5453);
    }

    float noise( in vec2 p ) {
        vec2 i = floor( p );
        vec2 f = fract( p );
        
        vec2 u = f*f*(3.0-2.0*f);

        float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                            dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                    mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                            dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
        return 0.5 + 0.5*n;
    }

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        float ratio = u_resolution.x / u_resolution.y;

        vec2 tuv = st;
        tuv -= .5;

        // rotate with Noise
        float degree = noise(vec2(u_time*.1, tuv.x*tuv.y));

        tuv.y *= 1./ratio;
        tuv *= Rot(radians((degree-.5)*360.+180.));
        tuv.y *= ratio;
        
        // Wave warp with sin
        float frequency = 2.;
        float amplitude = 3.;
        float speed = u_time * .02;
        tuv.x += sin(tuv.y*frequency+speed)/amplitude;
        tuv.y += sin(tuv.x*frequency*.5+speed)/(amplitude*.5);
        
        // draw the image
        vec3 colorWhite = vec3(1, 1, 1);
        vec3 colorGreen = vec3(0, 1, 0);
        vec3 colorBlue = vec3(0.082, 0.843, 1);

        vec3 layer2 = mix(colorGreen, colorBlue, S(-.4, .2, (tuv*Rot(radians(-.5))).y));
        vec3 finalComp = mix(colorWhite, layer2, S(0.8, -0.3, tuv.x));
        
        vec3 col = finalComp;
        
        gl_FragColor = vec4(col,1.0);
    }
`;

const Bg = () => {
    const mesh = useRef();

    useFrame((state) => {
        let time = state.clock.getElapsedTime();
        mesh.current.material.uniforms.u_time.value = time;
    });

    const uniforms = useMemo(
        () => ({
            u_time: { type: "f", value: 1.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        })
    )

    return (
        <mesh ref={mesh} position={[0,0,-5]}>
            <planeGeometry args={[window.innerWidth, window.innerHeight]} />
            <shaderMaterial 
                fragmentShader={fragmentShader}
                vertextShader={vertextShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}

const Shift = () => {
    const texture = useLoader(THREE.TextureLoader, '/models/shift_logo.png')
    return (
        <mesh position={[-0.5,1.5,0]}>
            <planeGeometry attach="geometry" args={[3.6, 1.6]}/>
            <meshBasicMaterial attach="material" map={texture} transparent={true}/>
        </mesh>
    )
}

const Scene = () => {
    return (
        <div className={styles.canvas}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Suspense fallback={null}>
                    <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
                    <Shift />
                    <Model />
                    <Bg />
                    <Environment preset="city">
                        <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
                    </Environment>
                </Suspense>
             </Canvas>
        </div>
    )
}

export default Scene;