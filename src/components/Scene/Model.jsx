import React, { useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'

export default function Model(props) {

  const { nodes, materials } = useGLTF("/models/chili_normal.glb");
  const mesh = useRef();

  useFrame((state, delta) => (mesh.current.rotation.z += delta * 0.2))

  return (
    <group {...props} dispose={null} ref={mesh}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chili_pepper2.geometry}
        position={[0, 0, 2]}
        rotation={[0, Math.PI * 1, 0]}
      >
        {/* <meshPhysicalMaterial
          roughness={0.05}
          transmission={1}
          thickness={1.5}
        /> */}
        <MeshTransmissionMaterial thickness={15} />
    </mesh>
    </group>
  );
}

useGLTF.preload("/models/chili_normal.glb");
