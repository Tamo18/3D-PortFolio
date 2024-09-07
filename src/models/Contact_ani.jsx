import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

import Scene from "../assets/3d/skiing_lady.glb"

const Conatct_ani=({currentAnimation,...props})=> {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(Scene)
  const { actions } = useAnimations(animations, group)
  // console.log(animations);

  useEffect(()=>{
  // console.log(actions)
   Object.values(actions).forEach((action)=>action.stop())
   if(actions[currentAnimation]){
   actions[currentAnimation].play()
   }
  },[actions,currentAnimation])


  return (
    // <group ref={group} {...props} dispose={null}>
    //   <group name="Sketchfab_Scene">
    //     <primitive object={nodes.GLTF_created_0_rootJoint} />
    //     <skinnedMesh
    //       name="Object_7"
    //       geometry={nodes.Object_7.geometry}
    //       material={materials.PaletteMaterial001}
    //       skeleton={nodes.Object_7.skeleton}
    //     />
    //     <skinnedMesh
    //       name="Object_8"
    //       geometry={nodes.Object_8.geometry}
    //       material={materials.PaletteMaterial001}
    //       skeleton={nodes.Object_8.skeleton}
    //     />
    //     <skinnedMesh
    //       name="Object_9"
    //       geometry={nodes.Object_9.geometry}
    //       material={materials.PaletteMaterial001}
    //       skeleton={nodes.Object_9.skeleton}
    //     />
    //     <skinnedMesh
    //       name="Object_10"
    //       geometry={nodes.Object_10.geometry}
    //       material={materials.PaletteMaterial001}
    //       skeleton={nodes.Object_10.skeleton}
    //     />
    //     <skinnedMesh
    //       name="Object_11"
    //       geometry={nodes.Object_11.geometry}
    //       material={materials.PaletteMaterial001}
    //       skeleton={nodes.Object_11.skeleton}
    //     />
    //   </group>
    // </group>



    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" position={[0, -0.196, -0.19]} rotation={[-1.437, 0, 0]}>
          <group
            name="f515ae1230584372a95a4afb619b3fe0fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.02}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="glovesL"
                  position={[36.556, 93.48, 10.868]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="face"
                  position={[0, 160.288, 5.595]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="helmet"
                  position={[0, 163.208, -0.278]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="goggles"
                  position={[0, 164.909, 3.648]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="bootsL"
                  position={[18.622, 14.376, 0.8]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="glovesR"
                  position={[-36.556, 93.48, 10.868]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="bootsR"
                  position={[-18.622, 14.376, 0.8]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="poleL"
                  position={[81.589, 100.386, 64.949]}
                  rotation={[-1.465, -0.065, 0.308]}
                  scale={[100, 100, 95.684]}>
                  <mesh
                    name="poleL_metal_texpole_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.poleL_metal_texpole_0.geometry}
                    material={materials['metal_tex.pole']}
                  />
                  <mesh
                    name="poleL_metal_green_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.poleL_metal_green_0.geometry}
                    material={materials.metal_green}
                  />
                  <mesh
                    name="poleL_plast_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.poleL_plast_black_0.geometry}
                    material={materials.plast_black}
                  />
                </group>
                <group
                  name="skiL"
                  position={[40.229, 7.463, 43.881]}
                  rotation={[-1.642, -0.127, -0.636]}
                  scale={100}>
                  <mesh
                    name="skiL_coated_texski_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiL_coated_texski_0.geometry}
                    material={materials['coated_tex.ski']}
                  />
                  <mesh
                    name="skiL_metal_silver_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiL_metal_silver_0.geometry}
                    material={materials.metal_silver}
                  />
                  <mesh
                    name="skiL_coated_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiL_coated_black_0.geometry}
                    material={materials.coated_black}
                  />
                  <mesh
                    name="skiL_plast_green_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiL_plast_green_0.geometry}
                    material={materials.plast_green}
                  />
                  <mesh
                    name="skiL_plast_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiL_plast_black_0.geometry}
                    material={materials.plast_black}
                  />
                </group>
                <group
                  name="poleR"
                  position={[-13.646, 90.971, 48.632]}
                  rotation={[-0.68, 0.053, -0.5]}
                  scale={[100, 100, 95.684]}>
                  <mesh
                    name="poleR_metal_texpole_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.poleR_metal_texpole_0.geometry}
                    material={materials['metal_tex.pole']}
                  />
                  <mesh
                    name="poleR_metal_green_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.poleR_metal_green_0.geometry}
                    material={materials.metal_green}
                  />
                  <mesh
                    name="poleR_plast_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.poleR_plast_black_0.geometry}
                    material={materials.plast_black}
                  />
                </group>
                <group
                  name="skiR"
                  position={[18.044, 5.656, 34.807]}
                  rotation={[-1.567, 0, -0.644]}
                  scale={100}>
                  <mesh
                    name="skiR_coated_texski_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiR_coated_texski_0.geometry}
                    material={materials['coated_tex.ski']}
                  />
                  <mesh
                    name="skiR_metal_silver_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiR_metal_silver_0.geometry}
                    material={materials.metal_silver}
                  />
                  <mesh
                    name="skiR_coated_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiR_coated_black_0.geometry}
                    material={materials.coated_black}
                  />
                  <mesh
                    name="skiR_plast_green_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiR_plast_green_0.geometry}
                    material={materials.plast_green}
                  />
                  <mesh
                    name="skiR_plast_black_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.skiR_plast_black_0.geometry}
                    material={materials.plast_black}
                  />
                </group>
                <group
                  name="jacket"
                  position={[0, 124.506, 2.231]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="pants"
                  position={[0, 5.799, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="facemask"
                  position={[-0.258, 152.017, 2.208]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group name="rig_deform" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_35">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_38"
                      geometry={nodes.Object_38.geometry}
                      material={materials.feather_black}
                      skeleton={nodes.Object_38.skeleton}
                    />
                    <skinnedMesh
                      name="Object_39"
                      geometry={nodes.Object_39.geometry}
                      material={materials.fabric_white}
                      skeleton={nodes.Object_39.skeleton}
                    />
                    <skinnedMesh
                      name="Object_41"
                      geometry={nodes.Object_41.geometry}
                      material={materials.skin}
                      skeleton={nodes.Object_41.skeleton}
                    />
                    <skinnedMesh
                      name="Object_42"
                      geometry={nodes.Object_42.geometry}
                      material={materials['skin.dark']}
                      skeleton={nodes.Object_42.skeleton}
                    />
                    <skinnedMesh
                      name="Object_43"
                      geometry={nodes.Object_43.geometry}
                      material={materials.material}
                      skeleton={nodes.Object_43.skeleton}
                    />
                    <skinnedMesh
                      name="Object_45"
                      geometry={nodes.Object_45.geometry}
                      material={materials.feather_black}
                      skeleton={nodes.Object_45.skeleton}
                    />
                    <skinnedMesh
                      name="Object_46"
                      geometry={nodes.Object_46.geometry}
                      material={materials.coated_white}
                      skeleton={nodes.Object_46.skeleton}
                    />
                    <skinnedMesh
                      name="Object_47"
                      geometry={nodes.Object_47.geometry}
                      material={materials.fabric_woolen_black}
                      skeleton={nodes.Object_47.skeleton}
                    />
                    <skinnedMesh
                      name="Object_48"
                      geometry={nodes.Object_48.geometry}
                      material={materials.coated_black}
                      skeleton={nodes.Object_48.skeleton}
                    />
                    <skinnedMesh
                      name="Object_49"
                      geometry={nodes.Object_49.geometry}
                      material={materials.coated_blue}
                      skeleton={nodes.Object_49.skeleton}
                    />
                    <skinnedMesh
                      name="Object_51"
                      geometry={nodes.Object_51.geometry}
                      material={materials.coated_white}
                      skeleton={nodes.Object_51.skeleton}
                    />
                    <skinnedMesh
                      name="Object_52"
                      geometry={nodes.Object_52.geometry}
                      material={materials.glass_pink}
                      skeleton={nodes.Object_52.skeleton}
                    />
                    <skinnedMesh
                      name="Object_53"
                      geometry={nodes.Object_53.geometry}
                      material={materials.fabric_woolen_black}
                      skeleton={nodes.Object_53.skeleton}
                    />
                    <skinnedMesh
                      name="Object_54"
                      geometry={nodes.Object_54.geometry}
                      material={materials['fabric_tex.goggles']}
                      skeleton={nodes.Object_54.skeleton}
                    />
                    <skinnedMesh
                      name="Object_55"
                      geometry={nodes.Object_55.geometry}
                      material={materials.fabric_white}
                      skeleton={nodes.Object_55.skeleton}
                    />
                    <skinnedMesh
                      name="Object_57"
                      geometry={nodes.Object_57.geometry}
                      material={materials.coated_white}
                      skeleton={nodes.Object_57.skeleton}
                    />
                    <skinnedMesh
                      name="Object_58"
                      geometry={nodes.Object_58.geometry}
                      material={materials.coated_black}
                      skeleton={nodes.Object_58.skeleton}
                    />
                    <skinnedMesh
                      name="Object_59"
                      geometry={nodes.Object_59.geometry}
                      material={materials.coated_green}
                      skeleton={nodes.Object_59.skeleton}
                    />
                    <skinnedMesh
                      name="Object_61"
                      geometry={nodes.Object_61.geometry}
                      material={materials.feather_black}
                      skeleton={nodes.Object_61.skeleton}
                    />
                    <skinnedMesh
                      name="Object_62"
                      geometry={nodes.Object_62.geometry}
                      material={materials.fabric_white}
                      skeleton={nodes.Object_62.skeleton}
                    />
                    <skinnedMesh
                      name="Object_64"
                      geometry={nodes.Object_64.geometry}
                      material={materials.coated_white}
                      skeleton={nodes.Object_64.skeleton}
                    />
                    <skinnedMesh
                      name="Object_65"
                      geometry={nodes.Object_65.geometry}
                      material={materials.coated_black}
                      skeleton={nodes.Object_65.skeleton}
                    />
                    <skinnedMesh
                      name="Object_66"
                      geometry={nodes.Object_66.geometry}
                      material={materials.coated_green}
                      skeleton={nodes.Object_66.skeleton}
                    />
                    <skinnedMesh
                      name="Object_68"
                      geometry={nodes.Object_68.geometry}
                      material={materials.jacket}
                      skeleton={nodes.Object_68.skeleton}
                    />
                    <skinnedMesh
                      name="Object_70"
                      geometry={nodes.Object_70.geometry}
                      material={materials.pants}
                      skeleton={nodes.Object_70.skeleton}
                    />
                    <skinnedMesh
                      name="Object_72"
                      geometry={nodes.Object_72.geometry}
                      material={materials.fabric_woolen_black}
                      skeleton={nodes.Object_72.skeleton}
                    />
                    <group
                      name="Object_37"
                      position={[36.556, 93.48, 10.868]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_40"
                      position={[0, 160.288, 5.595]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_44"
                      position={[0, 163.208, -0.278]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_50"
                      position={[0, 164.909, 3.648]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_56"
                      position={[18.622, 14.376, 0.8]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_60"
                      position={[-36.556, 93.48, 10.868]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_63"
                      position={[-18.622, 14.376, 0.8]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_67"
                      position={[0, 124.506, 2.231]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_69"
                      position={[0, 5.799, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_71"
                      position={[-0.258, 152.017, 2.208]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group name="ground" rotation={[-Math.PI / 2, 0, 0]} scale={468.525}>
                  <mesh
                    name="ground_Material_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.ground_Material_0.geometry}
                    material={materials.Material}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>

  )
}

export { Conatct_ani }
