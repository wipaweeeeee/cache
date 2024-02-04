import React, { useRef } from "react";
import { useGLTF, MeshTransmissionMaterial, PresentationControls } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'

export default function Model(props) {

  const { nodes, materials } = useGLTF("/models/chili_curve_rig.glb");
  const mesh = useRef();

  useFrame((state, delta) => {
    // mesh.current.rotation.y += delta * 0.02;
    mesh.current.rotation.z += delta * 0.02;
  })

  const deg = (angle) => {
    let radian = 2 * Math.PI * (angle / 360);

    return radian;
  }

  return (
    <group {...props} dispose={null} ref={mesh}>
      <PresentationControls
        enabled={true} // the controls can be disabled by setting this to false
        global={true} // Spin globally or by dragging the model
        cursor={false} // Whether to toggle cursor style on drag
        snap={false} // Snap-back to center (can also be a spring config)
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chili_pepper1.geometry}
          position={[0, -0.5, -2]}
          rotation={[deg(270), deg(150), deg(0)]}
          scale={1.8}
        >
          <MeshTransmissionMaterial backside backsideThickness={10} thickness={15} />
    </mesh>
    </PresentationControls>
    </group>
  );
}

useGLTF.preload("/models/chili_normal.glb");
