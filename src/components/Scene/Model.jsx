import { useRef, useEffect, useState } from "react";
import { useGLTF, MeshTransmissionMaterial, PresentationControls } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useScrollData } from '@/hooks/useScrollData';

export default function Model({ windowWidth, posY }) {

  const { nodes } = useGLTF("/models/chilli_curve_smooth.glb");
  const mesh = useRef();

  const [scale, setScale] = useState(2.8);
  const [vertical, setVertical] = useState(false);

  const { scrolling, direction } = useScrollData();
  const scrollY = direction.y;

  useFrame((state, delta) => {
    
    if (scrolling) {
      if (scrollY == 'down') {
        mesh.current.rotation.y += delta * 1.5;
        // mesh.current.rotation.x -= delta * 0.5;
      } else {
        mesh.current.rotation.y -= delta * 1.5;
        // mesh.current.rotation.x += delta * 0.5;
      }
      
    } else {
      mesh.current.rotation.y += delta * 0.02;
      // mesh.current.rotation.x -= delta * 0.02;
    }
  })

  const deg = (angle) => {
    let radian = 2 * Math.PI * (angle / 360);
    return radian;
  }

  useEffect(() => {

    if (windowWidth > 1440) {
      setScale(2.2)
      setVertical(false);
    } else if (windowWidth >= 1024 && windowWidth < 1439) {
      setScale(2)
      setVertical(false);
    } else if (windowWidth >= 768 && windowWidth < 1023) {
      setScale(1.7)
      setVertical(false);
    } else if (windowWidth < 767) {
      setScale(1.1)
      setVertical(true);
    }

  },[windowWidth])

  return (
    <group dispose={null} ref={mesh}>
      <PresentationControls
        enabled={true} // the controls can be disabled by setting this to false
        global={false} // Spin globally or by dragging the model
        cursor={false} // Whether to toggle cursor style on drag
        snap={false} // Snap-back to center (can also be a spring config)
      >
        <mesh
          geometry={nodes.chilli_curve_smooth.geometry}
          position={[0, vertical ? 0 : 0.5, 0]}
          rotation={[deg(90), vertical ? deg(30) : deg(0), vertical ? deg(20) : deg(0)]}
          scale={scale}
        >
          <MeshTransmissionMaterial thickness={15} ior={3} clearcoat={1} envMapIntensity={1}/>
      </mesh>
    </PresentationControls>
    </group>
  );
}

useGLTF.preload("/models/chilli_curve_smooth.glb");
