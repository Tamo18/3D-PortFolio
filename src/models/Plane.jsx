import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import planeScene from "../assets/3d/plane3.glb"


const Plane =({isRotating,...props})=>{

const planeRef=useRef()
const {scene,animations}=useGLTF(planeScene)
const {actions}=useAnimations(animations,planeRef)

// console.log(animations);
// console.log(animations);

useEffect(()=>{
   if(isRotating){
   actions['Animation'].play()
   }
   else{
    actions['Animation'].stop()
   } 
})

// useFrame(({clock,camera})=>{
//    birdRef.current.position.y=Math.sin(clock.elapsedTime)*0.2 +2
   
//    if(birdRef.current.position.x>(camera.position.x +10)){
//       birdRef.current.rotation.y=Math.PI
//    }
//    else if(birdRef.current.position.x<(camera.position.x -10)){
//       birdRef.current.rotation.y=0
//    }
   
//    if(birdRef.current.rotation.y === 0){
//       birdRef.current.position.x+=0.01
//       birdRef.current.position.z-=0.01
//    }
//    else{
//       birdRef.current.position.x-=0.01
//       birdRef.current.position.z+=0.01
//    }
//    }) 



return (
       <mesh {...props} ref={planeRef}> 
        <primitive object={scene}/>
       </mesh>



   //  <group ref={planeRef} {...props} dispose={null}>
   //    <group name="Sketchfab_Scene">
   //      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.002}>
   //        <group name="12cc6a9ff2ae45b08826ba235d9cb8b7fbx" rotation={[Math.PI / 2, 0, 0]}>
   //          <group name="Object_2">
   //            <group name="RootNode">
   //              <group name="Propeller_1" position={[0.873, -46.025, 401.434]}>
   //                <mesh
   //                  name="Propeller_1_Red_0"
   //                  castShadow
   //                  receiveShadow
   //                  geometry={nodes.Propeller_1_Red_0.geometry}
   //                  material={materials.material}
   //                />
   //                <mesh
   //                  name="Propeller_1_Body_0"
   //                  castShadow
   //                  receiveShadow
   //                  geometry={nodes.Propeller_1_Body_0.geometry}
   //                  material={materials.Body}
   //                />
   //              </group>
   //              <group name="Physical_Sky" rotation={[-0.053, -0.495, -0.003]}>
   //                <group name="Sky_Null" position={[195.251, 64.455, 239.448]}>
   //                  <group
   //                    name="Sun"
   //                    position={[-8659.807, 52407.355, 138158.203]}
   //                    rotation={[-0.363, -0.059, -0.022]}
   //                  />
   //                  <group
   //                    name="Moon"
   //                    position={[-3951.259, 517.194, -640.605]}
   //                    rotation={[-2.462, -1.365, -2.473]}
   //                  />
   //                </group>
   //                <group name="Shadow_Plane" position={[0, 10000, 0]} />
   //              </group>
   //              <group name="Plane" position={[-2.544, -22.784, 0]}>
   //                <group
   //                  name="Wheel_Back"
   //                  position={[3.215, -59.613, -256.318]}
   //                  rotation={[0.169, -0.004, -0.021]}>
   //                  <group
   //                    name="Cylinder_1"
   //                    position={[6.518, -27.543, 0]}
   //                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
   //                    <mesh
   //                      name="Cylinder_1_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cylinder_1_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group name="WheelCarcas" position={[114.386, 59.17, 0]}>
   //                    <mesh
   //                      name="WheelCarcas_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.WheelCarcas_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group
   //                    name="Wheel"
   //                    position={[0.622, -32.49, 0]}
   //                    rotation={[0, 0, -Math.PI / 2]}>
   //                    <mesh
   //                      name="Wheel_Gum_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Wheel_Gum_0.geometry}
   //                      material={materials.material_3}
   //                    />
   //                  </group>
   //                </group>
   //                <group
   //                  name="Wheel_1"
   //                  position={[81.31, -76.376, 232.741]}
   //                  rotation={[0, 0, 0.328]}>
   //                  <group
   //                    name="Cylinder_1_2"
   //                    position={[12.173, -51.437, 0]}
   //                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
   //                    <mesh
   //                      name="Cylinder_1_2_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cylinder_1_2_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group name="WheelCarcas_2" position={[213.613, 110.499, 0]}>
   //                    <mesh
   //                      name="WheelCarcas_2_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.WheelCarcas_2_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group
   //                    name="Wheel_2"
   //                    position={[1.162, -60.674, 0]}
   //                    rotation={[0, 0, -Math.PI / 2]}>
   //                    <mesh
   //                      name="Wheel_2_Gum_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Wheel_2_Gum_0.geometry}
   //                      material={materials.material_3}
   //                    />
   //                  </group>
   //                </group>
   //                <group
   //                  name="Wheel_3"
   //                  position={[-81.572, -76.376, 232.741]}
   //                  rotation={[0, 0, -0.324]}>
   //                  <group
   //                    name="Cylinder_1_3"
   //                    position={[12.173, -51.437, 0]}
   //                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
   //                    <mesh
   //                      name="Cylinder_1_3_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cylinder_1_3_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group name="WheelCarcas_3" position={[213.613, 110.499, 0]}>
   //                    <mesh
   //                      name="WheelCarcas_3_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.WheelCarcas_3_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group
   //                    name="Wheel_4"
   //                    position={[1.162, -60.674, 0]}
   //                    rotation={[0, 0, -Math.PI / 2]}>
   //                    <mesh
   //                      name="Wheel_4_Gum_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Wheel_4_Gum_0.geometry}
   //                      material={materials.material_3}
   //                    />
   //                  </group>
   //                </group>
   //                <group
   //                  name="Air_motor_right"
   //                  position={[0, -45.567, 0]}
   //                  rotation={[0, 0, -Math.PI]}>
   //                  <group name="Cube_2">
   //                    <mesh
   //                      name="Cube_2_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_2_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group name="Cube_1">
   //                    <mesh
   //                      name="Cube_1_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_1_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group name="Cube">
   //                    <mesh
   //                      name="Cube_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                </group>
   //                <group name="Air_motor_left" position={[0, 22.784, 0]}>
   //                  <group name="Cube_2_2">
   //                    <mesh
   //                      name="Cube_2_2_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_2_2_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group name="Cube_1_2">
   //                    <mesh
   //                      name="Cube_1_2_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_1_2_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                  <group name="Cube_2_3">
   //                    <mesh
   //                      name="Cube_2_3_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_2_3_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                  </group>
   //                </group>
   //                <group name="Body" position={[0, 22.784, 0]}>
   //                  <group name="Cube_1_3">
   //                    <mesh
   //                      name="Cube_1_3_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_1_3_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                    <mesh
   //                      name="Cube_1_3_Red_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_1_3_Red_0.geometry}
   //                      material={materials.material}
   //                    />
   //                    <mesh
   //                      name="Cube_1_3_Glass_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_1_3_Glass_0.geometry}
   //                      material={materials.Glass}
   //                    />
   //                    <mesh
   //                      name="Cube_1_3__0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_1_3__0.geometry}
   //                      material={materials.Cube_1_3__0}
   //                    />
   //                  </group>
   //                  <group name="Cube_3">
   //                    <mesh
   //                      name="Cube_3_Body_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_3_Body_0.geometry}
   //                      material={materials.Body}
   //                    />
   //                    <mesh
   //                      name="Cube_3_Red_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_3_Red_0.geometry}
   //                      material={materials.material}
   //                    />
   //                    <mesh
   //                      name="Cube_3_Glass_0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_3_Glass_0.geometry}
   //                      material={materials.Glass}
   //                    />
   //                    <mesh
   //                      name="Cube_3__0"
   //                      castShadow
   //                      receiveShadow
   //                      geometry={nodes.Cube_3__0.geometry}
   //                      material={materials.Cube_1_3__0}
   //                    />
   //                  </group>
   //                </group>
   //              </group>
   //            </group>
   //          </group>
   //        </group>
   //      </group>
   //    </group>
   //  </group>
  )
}


export default Plane;