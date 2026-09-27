"use client";

import { useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Flat meshStandardMaterial with only ambient + directional light reads as
 * cheap plastic no matter how good the geometry is — real surfaces need
 * something to reflect. A PMREM-baked RoomEnvironment gives every
 * material in the scene soft, believable highlights for the cost of one
 * bake, no external HDRI file or network fetch needed. Same technique
 * already proven on the earlier Explore scavenger-hunt scene.
 */
export default function EnvironmentSetup() {
  const { gl, scene } = useThree();

  React.useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    return () => {
      envTexture.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);

  return null;
}
