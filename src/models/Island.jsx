import React, { useRef,useEffect, useState } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame,useThree } from '@react-three/fiber'
import {a} from '@react-spring/three'

import islandScene from "../assets/3d/amusement_park_island.glb"

const Island=({isRotating,setIsrotating,setCurrentStage,...props})=> {
  const islandRef=useRef()
  const { nodes, materials, animations } = useGLTF(islandScene)

  const {actions}=useAnimations(animations,islandRef)
  const {gl,viewport}=useThree()

  useEffect(()=>{
    if(isRotating){
    actions['Take 001'].play()
    }
    else{
     actions['Take 001'].play()
    } 
 })
  
  
   const LastX=useRef(0)   
   const rotationSpeed=useRef(0)
   const dampingFactor=0.85

   const handlePointerDown=(e)=>{
   e.stopPropagation()
   e.preventDefault()
   setIsrotating(true)
   
   const clientX=e.touches?e.touches[0].clientX:e.clientX
   LastX.current=clientX
   }

   const handlePointerUp=(e)=>{
   e.stopPropagation()
   e.preventDefault()
   setIsrotating(false)

   }

   const handlePointerMove=(e)=>{
   e.stopPropagation()
   e.preventDefault()
   if(isRotating) {
    const clientX=e.touches?e.touches[0].clientX:e.clientX
    const delta =(clientX-LastX.current)/viewport.width
    islandRef.current.rotation.y+=delta * 0.01 * Math.PI
    LastX.current=clientX
    rotationSpeed.current=delta * 0.01 * Math.PI
   }
   }

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsrotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsrotating(true);

      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

const handleKeyUp=(e)=>{
if(e.key==='ArrowLeft' || e.key==='ArrowRight'){
  setIsrotating(false)
}
}

useFrame(()=>{
  if(!isRotating){
    rotationSpeed.current*=dampingFactor
    if(Math.abs(rotationSpeed.current)<0.001){
      rotationSpeed.current=0
    }
    islandRef.current.rotation.y+=rotationSpeed.current //for smooth movement avoid sudden stop
  }
  else{
   const rotation=islandRef.current.rotation.y 
   const normalizedRotation =
   ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
 switch (true) {
   case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
     setCurrentStage(4);
     break;
   case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
     setCurrentStage(3);
     break;
   case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
     setCurrentStage(2);
     break;
   case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
     setCurrentStage(1);
     break;
   default:
     setCurrentStage(null);
 }
}
})



  useEffect(()=>{
    const canvas=gl.domElement
    canvas.addEventListener('pointerdown',handlePointerDown)
    canvas.addEventListener('pointerup',handlePointerUp)
    canvas.addEventListener('pointermove',handlePointerMove)
    window.addEventListener('keydown',handleKeyDown)
    window.addEventListener('keyup',handleKeyUp)

    return ()=>{
    canvas.removeEventListener('pointerdown',handlePointerDown)
    canvas.removeEventListener('pointerup',handlePointerUp)
    canvas.removeEventListener('pointermove',handlePointerMove)
    window.removeEventListener('keydown',handleKeyDown)
    window.removeEventListener('keyup',handleKeyUp)
    }
  },[gl,handlePointerDown,handlePointerMove,handlePointerUp])
  


  // return (
  //   <a.group ref={islandRef} {...props}>
  //     <mesh 
  //       geometry={nodes.polySurface944_tree_body_0.geometry}
  //       material={materials.PaletteMaterial001}
  //     />
  //     <mesh
  //       geometry={nodes.polySurface945_tree1_0.geometry}
  //       material={materials.PaletteMaterial001}
  //     />
  //     <mesh
  //       geometry={nodes.polySurface946_tree2_0.geometry}
  //       material={materials.PaletteMaterial001}
  //     />
  //     <mesh
  //       geometry={nodes.polySurface947_tree1_0.geometry}
  //       material={materials.PaletteMaterial001}
  //     />
  //     <mesh
  //       geometry={nodes.polySurface948_tree_body_0.geometry}
  //       material={materials.PaletteMaterial001}
  //     />
  //     <mesh
  //       geometry={nodes.polySurface949_tree_body_0.geometry}
  //       material={materials.PaletteMaterial001}
  //     />
  //     <mesh
  //       geometry={nodes.pCube11_rocks1_0.geometry}
  //       material={materials.PaletteMaterial001}
  //     />
  //   </a.group>
  // )
  // }




//   return (
//     <a.group ref={islandRef} {...props}>
//       <group position={[-1.342, 0, 0.216]} rotation={[-Math.PI / 2, 0, 0]}>
//         <group rotation={[Math.PI / 2, 0, 0]}>
//           <group
//             position={[-3.97, 1.249, -18.815]}
//             rotation={[-0.084, -0.087, 0.233]}
//             scale={0.201}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_6.geometry}
//               material={materials.Base_PaletteJellyFish}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_7.geometry}
//               material={materials['Base_PaletteJellyFish.Emissive']}
//             />
//           </group>
//           <group position={[-10.774, -0.187, -13.178]} rotation={[-0.219, 0.185, 0]} scale={0.212}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_11.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_12.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-12.772, -0.365, -13.975]} rotation={[-0.907, 1.52, 0.866]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_14.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_15.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-3.594, 1.091, -18.718]}
//             rotation={[-0.084, -0.087, 0.233]}
//             scale={0.124}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_17.geometry}
//               material={materials.Base_PaletteJellyFish}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_18.geometry}
//               material={materials['Base_PaletteJellyFish.Emissive']}
//             />
//           </group>
//           <group position={[16.121, 2.099, -5.805]} rotation={[-0.009, 0.226, 0.005]} scale={3.735}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_20.geometry}
//               material={materials.ShipNamePalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_21.geometry}
//               material={materials.PirateFlag}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_22.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_23.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_24.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_25.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_26.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_27.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_28.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_29.geometry}
//               material={materials.EmissivePalette}
//             />
//           </group>
//           <group position={[0, 0.611, 0]} rotation={[0, 0, 0.05]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_57.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_58.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-13.368, 11.736, 8.037]} rotation={[Math.PI, -0.308, -3.091]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_66.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_67.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-12.196, 3.474, 9.197]} rotation={[0, -0.456, 0.143]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_71.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_72.geometry}
//               material={materials.Base_Palette}
//             />
//           </group>
//           <group position={[-10.52, 3.663, 9.265]} rotation={[-0.282, 0.304, -0.043]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_76.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_77.geometry}
//               material={materials.Base_Palette}
//             />
//           </group>
//           <group position={[-2.467, 3.973, -3.472]} rotation={[-0.167, 0.109, 0.1]} scale={0.407}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_97.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_98.geometry}
//               material={materials.Base_Palette}
//             />
//           </group>
//           <group position={[-1.552, 11.356, -0.886]} rotation={[-3.01, 0.26, 3.108]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_100.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_101.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-1.539, 11.795, -0.992]}
//             rotation={[-0.004, -0.263, 3.141]}
//             scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_103.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_104.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-1.51, 12.197, -0.959]} rotation={[-3.055, 0.262, 3.119]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_106.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_107.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[11.909, 2.828, 14.105]}
//             rotation={[-0.166, -0.608, -0.095]}
//             scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_109.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_110.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[11.945, 3.171, 14.097]} rotation={[0.009, -0.614, 0.005]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_112.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_113.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[11.951, 3.534, 14.075]} rotation={[0, -0.614, 0]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_115.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_116.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-1.539, 12.689, -0.992]}
//             rotation={[-Math.PI, 0.333, -Math.PI]}
//             scale={0.296}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_118.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_119.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-1.488, 13.144, -0.902]} rotation={[-2.968, 0.043, 3.134]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_121.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_122.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-1.42, 13.543, -0.881]}
//             rotation={[-Math.PI, 0.075, -Math.PI]}
//             scale={0.309}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_124.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_125.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-1.392, 13.959, -0.925]}
//             rotation={[-0.049, -0.148, 3.134]}
//             scale={0.329}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_127.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_128.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-1.139, 16.439, -1.062]}
//             rotation={[0.163, -0.623, -3.046]}
//             scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_130.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_131.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-1.205, 15.62, -1.001]} rotation={[-2.961, 0.452, 3.094]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_133.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_134.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-1.162, 14.852, -1.006]}
//             rotation={[-Math.PI, 0.349, -Math.PI]}
//             scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_136.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_137.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-1.299, 14.397, -0.935]}
//             rotation={[-0.098, -0.161, 3.135]}
//             scale={0.34}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_139.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_140.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-1.188, 15.185, -1.085]} rotation={[3.047, 0.292, -3.114]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_142.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_143.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-1.15, 16.033, -1.122]} rotation={[2.951, 0.612, -3.043]} scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_145.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_146.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-0.712, 17.257, -1.415]}
//             rotation={[-3.114, 1.212, 3.117]}
//             scale={0.316}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_148.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_149.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[-0.881, 16.81, -1.306]}
//             rotation={[-Math.PI, 1.19, Math.PI]}
//             scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_151.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_152.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-0.52, 17.563, -1.359]} rotation={[0.615, 1.434, -0.635]} scale={0.329}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_154.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_155.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group
//             position={[0.166, 18.137, -1.47]}
//             rotation={[-Math.PI, 1.275, Math.PI]}
//             scale={0.35}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_157.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_158.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[5.182, 8.612, 7.609]} rotation={[0, -0.863, 0]} scale={0.08}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_168.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_169.geometry}
//               material={materials.EmissivePalette}
//             />
//           </group>
//           <group position={[3.553, 14.976, 5.69]} rotation={[0, -0.874, 0]} scale={3.468}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_183.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_184.geometry}
//               material={materials.EmissivePalette}
//             />
//           </group>
//           <group
//             position={[-1.417, 7.654, 1.213]}
//             rotation={[-Math.PI, 0.041, -Math.PI]}
//             scale={2.663}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_606.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_607.geometry}
//               material={materials.EmissivePalette}
//             />
//           </group>
//           <group
//             position={[-1.417, 7.654, 1.213]}
//             rotation={[-Math.PI, 0.041, -Math.PI]}
//             scale={2.663}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_609.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_610.geometry}
//               material={materials.EmissivePalette}
//             />
//           </group>
//           <group position={[1.528, 2.588, -0.437]} rotation={[0, 1.312, 0]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_872.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_873.geometry}
//               material={materials.EmissivePalette}
//             />
//           </group>
//           <group position={[1.528, 2.588, -0.437]} rotation={[0, 1.312, 0]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_877.geometry}
//               material={materials.MetallicPalette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_878.geometry}
//               material={materials.EmissivePalette}
//             />
//           </group>
//           <group position={[1.528, 2.588, -0.437]} rotation={[0, 1.312, 0]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_884.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_885.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[1.966, 19.233, 2.405]} scale={0.078}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_905.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_906.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-3.858, 5.856, 7.616]} rotation={[0, 0.693, 0]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_908.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_909.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-5.582, 4.198, 8.144]} rotation={[-1.298, 0.163, 1.274]}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_911.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_912.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[0.224, -10.701, 2.845]} rotation={[0, 1.312, 0]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_914.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_915.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-6.573, 4.512, 7.41]} rotation={[Math.PI / 2, 1.312, 0]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_917.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_918.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-7.267, 4.512, 7.41]} rotation={[Math.PI / 2, 1.312, 0]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_920.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_921.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[-6.949, 4.982, 7.434]} rotation={[Math.PI / 2, 1.312, 0]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_923.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_924.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[5.591, 4.103, 0.945]} rotation={[1.038, 1.2, -0.987]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_926.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_927.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <group position={[7.9, 4.618, 13.698]} scale={0.92}>
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_929.geometry}
//               material={materials.Base_Palette}
//             />
//             <mesh
//               castShadow
//               receiveShadow
//               geometry={nodes.Object_930.geometry}
//               material={materials.MetallicPalette}
//             />
//           </group>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_4.geometry}
//             material={materials.Base_Palette}
//             position={[-13.309, 1.989, 17.944]}
//             rotation={[0, 1.148, 0]}
//             scale={0.332}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_9.geometry}
//             material={materials.Base_Palette}
//             position={[-11.979, -0.301, -14.284]}
//             rotation={[-Math.PI, -0.622, -Math.PI]}
//             scale={0.179}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_31.geometry}
//             material={materials.MetallicPalette}
//             position={[17.804, 4.679, -11.194]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_33.geometry}
//             material={materials.MetallicPalette}
//             position={[18.858, 0.108, -10.799]}
//             rotation={[1.269, 0, 0]}
//             scale={[1.316, 1.316, 0.79]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_35.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -0.087, 0]}
//             scale={0.137}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_37.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -0.087, -Math.PI / 2]}
//             scale={0.137}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_39.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -0.087, -2.44]}
//             scale={0.137}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_41.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -0.087, -Math.PI / 2]}
//             scale={0.137}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_43.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -0.087, 0]}
//             scale={0.26}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_45.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -0.087, 0]}
//             scale={0.372}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_47.geometry}
//             material={materials.MetallicPalette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[Math.PI / 2, 0, 0.087]}
//             scale={0.32}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_49.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -0.087, 0]}
//             scale={0.372}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_51.geometry}
//             material={materials.Base_Palette}
//             position={[5.457, 15.853, 5.791]}
//             rotation={[0, -1.551, 0]}
//             scale={0.372}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_53.geometry}
//             material={materials.Base_Palette}
//             position={[-5.613, 4.527, 6.229]}
//             rotation={[Math.PI, -1.426, Math.PI]}
//             scale={0.372}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_55.geometry}
//             material={materials.Base_Palette}
//             position={[5.255, 4.318, 1.953]}
//             rotation={[-2.961, -1.425, -2.738]}
//             scale={0.372}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_60.geometry}
//             material={materials.Base_Palette}
//             position={[0, 0.611, 0]}
//             rotation={[0, 0, 0.05]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_62.geometry}
//             material={materials.Base_Palette}
//             position={[0, 0.611, 0]}
//             rotation={[0, 0, 0.05]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_64.geometry}
//             material={materials.PirateFlag}
//             position={[0, 0.611, 0]}
//             rotation={[0, 0, 0.05]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_69.geometry}
//             material={materials.Base_Palette}
//             position={[-2.843, 3.596, -9.544]}
//             rotation={[-0.132, -0.51, -0.058]}
//             scale={1.329}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_74.geometry}
//             material={materials.MetallicPalette}
//             position={[-11.295, 3.59, 8.437]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_79.geometry}
//             material={materials.MetallicPalette}
//             position={[-11.276, 3.634, 8.81]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_81.geometry}
//             material={materials.Base_Palette}
//             position={[5.1, 3.532, 10.665]}
//             rotation={[0.324, -0.265, 0.392]}
//             scale={3.168}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_83.geometry}
//             material={materials.Base_Palette}
//             position={[4.108, 3.17, 11.065]}
//             rotation={[0.019, 0.458, 0.424]}
//             scale={3.168}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_85.geometry}
//             material={materials.Base_Palette}
//             position={[1.96, 2.335, 13.32]}
//             rotation={[0.009, -0.9, -0.427]}
//             scale={3.168}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_87.geometry}
//             material={materials.Base_Palette}
//             position={[16.884, 2.687, 13.412]}
//             rotation={[0, 1.385, 0]}
//             scale={0.471}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_89.geometry}
//             material={materials.Base_Palette}
//             position={[13.712, 2.976, 12.667]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_91.geometry}
//             material={materials.Base_Palette}
//             position={[-13.762, -0.339, -13.727]}
//             rotation={[3.086, -0.513, 3.131]}
//             scale={3.168}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_93.geometry}
//             material={materials.Base_Palette}
//             position={[1.497, 4.117, -3.715]}
//             rotation={[0.01, 0.111, 0.203]}
//             scale={0.407}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_95.geometry}
//             material={materials.Base_Palette}
//             position={[-0.627, 3.604, -4.879]}
//             rotation={[3.126, -0.006, 2.986]}
//             scale={0.407}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_160.geometry}
//             material={materials.Base_Palette}
//             position={[5.182, 8.612, 7.609]}
//             rotation={[0, -0.863, 0]}
//             scale={0.08}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_162.geometry}
//             material={materials.Base_Palette}
//             position={[5.182, 8.612, 7.609]}
//             rotation={[0, -0.863, -Math.PI / 2]}
//             scale={0.08}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_164.geometry}
//             material={materials.Base_Palette}
//             position={[5.182, 8.612, 7.609]}
//             rotation={[0, -0.863, -2.44]}
//             scale={0.08}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_166.geometry}
//             material={materials.Base_Palette}
//             position={[5.182, 8.612, 7.609]}
//             rotation={[0, -0.863, -Math.PI / 2]}
//             scale={0.08}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_171.geometry}
//             material={materials.Base_Palette}
//             position={[5.048, 8.001, 5.181]}
//             rotation={[0, 0.706, 0]}
//             scale={0.053}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_173.geometry}
//             material={materials.Base_Palette}
//             position={[4.271, 8.001, 4.271]}
//             rotation={[0, 0.706, 0]}
//             scale={0.053}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_175.geometry}
//             material={materials.Base_Palette}
//             position={[3.458, 3.993, 5.579]}
//             rotation={[0, -0.874, 0]}
//             scale={1.466}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_177.geometry}
//             material={materials.MetallicPalette}
//             position={[3.553, 19.645, 5.628]}
//             rotation={[Math.PI / 2, 0, -0.696]}
//             scale={0.562}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_179.geometry}
//             material={materials.Base_Palette}
//             position={[3.553, 14.275, 5.69]}
//             rotation={[0, -0.874, 0]}
//             scale={1.466}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_181.geometry}
//             material={materials.MetallicPalette}
//             position={[3.456, 15.196, 5.575]}
//             rotation={[0, 1.323, 0]}
//             scale={0.847}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_186.geometry}
//             material={materials.Glass_Palette}
//             position={[3.876, 15.204, 6.056]}
//             rotation={[0, -0.874, 0]}
//             scale={1.225}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_188.geometry}
//             material={materials.Base_Palette}
//             position={[4.325, 5.607, 6.62]}
//             scale={[1, 0.921, 1]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_190.geometry}
//             material={materials.Base_Palette}
//             position={[4.522, 8.59, 4.892]}
//             rotation={[0, 1.461, 0]}
//             scale={[0.869, 0.785, 1.163]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_192.geometry}
//             material={materials.Base_Palette}
//             position={[4.921, 8.169, 4.405]}
//             rotation={[0, -0.845, 0]}
//             scale={0.426}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_194.geometry}
//             material={materials.Base_Palette}
//             position={[4.577, 8.195, 3.505]}
//             rotation={[-0.332, 0.278, 0.094]}
//             scale={[0.182, 0.182, 0.13]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_196.geometry}
//             material={materials.Base_Palette}
//             position={[3.748, 7.74, 2.351]}
//             rotation={[2.81, -0.278, -0.094]}
//             scale={[0.182, 0.182, 0.13]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_198.geometry}
//             material={materials.Base_Island_Texture}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_200.geometry}
//             material={materials.Base_Island_Texture}
//             position={[-0.001, 0.049, 0]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_202.geometry}
//             material={materials.Base_Island_Texture}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_204.geometry}
//             material={materials.Base_Island_Texture}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_206.geometry}
//             material={materials.Base_Palette}
//             position={[-8.762, 3.51, 7.463]}
//             rotation={[0.103, -0.032, -0.114]}
//             scale={0.433}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_208.geometry}
//             material={materials.Base_Palette}
//             position={[7.541, 4.386, -19.32]}
//             rotation={[-0.213, 0.05, -0.229]}
//             scale={0.357}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_210.geometry}
//             material={materials.Base_Palette}
//             position={[-0.172, 1.778, -7.662]}
//             scale={0.465}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_212.geometry}
//             material={materials.Base_Palette}
//             position={[3.27, 1.783, -6.404]}
//             scale={0.465}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_214.geometry}
//             material={materials.Base_Palette}
//             position={[8.359, 4.183, 14.291]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_216.geometry}
//             material={materials.Base_Palette}
//             position={[7.959, 4.183, 13.992]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_218.geometry}
//             material={materials.Base_Palette}
//             position={[9.17, 4.183, 12.374]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_220.geometry}
//             material={materials.Base_Palette}
//             position={[7.591, 4.183, 13.717]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_222.geometry}
//             material={materials.Base_Palette}
//             position={[8.416, 4.183, 11.81]}
//             rotation={[Math.PI, 0.642, 3.142]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_224.geometry}
//             material={materials.Base_Palette}
//             position={[7.205, 4.183, 13.428]}
//             rotation={[Math.PI, 0.642, 3.142]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_226.geometry}
//             material={materials.Base_Palette}
//             position={[6.818, 4.183, 13.139]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_228.geometry}
//             material={materials.Base_Palette}
//             position={[8.029, 4.183, 11.521]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_230.geometry}
//             material={materials.Base_Palette}
//             position={[10.298, 4.184, 15.761]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_232.geometry}
//             material={materials.Base_Palette}
//             position={[9.898, 4.184, 15.462]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_234.geometry}
//             material={materials.Base_Palette}
//             position={[11.109, 4.182, 13.844]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_236.geometry}
//             material={materials.Base_Palette}
//             position={[9.53, 4.184, 15.186]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_238.geometry}
//             material={materials.Base_Palette}
//             position={[10.355, 4.184, 13.28]}
//             rotation={[-3.141, 0.642, 3.141]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_240.geometry}
//             material={materials.Base_Palette}
//             position={[9.144, 4.182, 14.898]}
//             rotation={[-3.141, 0.642, 3.141]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_242.geometry}
//             material={materials.Base_Palette}
//             position={[8.757, 4.183, 14.609]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_244.geometry}
//             material={materials.Base_Palette}
//             position={[9.968, 4.183, 12.99]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_246.geometry}
//             material={materials.Base_Palette}
//             position={[9.089, 3.872, 14.832]}
//             rotation={[0, -0.631, 0]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_248.geometry}
//             material={materials.Base_Palette}
//             position={[10.26, 3.872, 13.23]}
//             rotation={[0, -0.631, 0]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_250.geometry}
//             material={materials.Base_Palette}
//             position={[9.692, 3.872, 14.008]}
//             rotation={[0, -0.631, 0]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_252.geometry}
//             material={materials.Base_Palette}
//             position={[10.221, 3.661, 16.121]}
//             rotation={[-0.032, -0.01, -0.014]}
//             scale={0.935}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_254.geometry}
//             material={materials.Base_Palette}
//             position={[11.122, 2.572, 15.214]}
//             rotation={[-0.067, 0, -0.048]}
//             scale={0.935}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_256.geometry}
//             material={materials.Base_Palette}
//             position={[5.935, 3.656, 10.062]}
//             rotation={[0, -0.642, 0]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_258.geometry}
//             material={materials.Base_Palette}
//             position={[5.287, 3.789, 9.514]}
//             rotation={[0.084, -0.629, 0.057]}
//             scale={[0.242, 0.242, 0.173]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_260.geometry}
//             material={materials.Base_Palette}
//             position={[10.195, 2.691, 16.075]}
//             rotation={[0, -0.706, 0]}
//             scale={0.175}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_262.geometry}
//             material={materials.Base_Palette}
//             position={[11.715, -0.371, 13.921]}
//             rotation={[-Math.PI, 0.706, 0]}
//             scale={0.175}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_264.geometry}
//             material={materials.Base_Palette}
//             position={[9.326, -0.771, 15.666]}
//             scale={2.117}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_266.geometry}
//             material={materials.Base_Palette}
//             position={[15.956, -0.27, 15.783]}
//             rotation={[Math.PI, -1.298, Math.PI]}
//             scale={0.617}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_268.geometry}
//             material={materials.Base_Palette}
//             position={[-11.079, -0.079, 20.85]}
//             rotation={[-2.8, 1.28, -0.355]}
//             scale={0.617}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_270.geometry}
//             material={materials.Base_Palette}
//             position={[-20.164, 0.126, -5.507]}
//             scale={1.392}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_272.geometry}
//             material={materials.Base_Palette}
//             position={[-13.879, 0.249, -16.2]}
//             rotation={[Math.PI / 2, 0, 0]}
//             scale={0.579}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_274.geometry}
//             material={materials.Base_Palette}
//             position={[0, -0.445, 0]}
//             rotation={[-Math.PI, 0, -Math.PI]}
//             scale={[22.679, 17.786, 22.679]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_276.geometry}
//             material={materials.Base_PaletteSea}
//             position={[0, 2.262, 0]}
//             rotation={[-Math.PI, 0, -Math.PI]}
//             scale={[22.546, 17.681, 22.546]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_278.geometry}
//             material={materials.Base_Palette}
//             position={[-19.2, 0.856, 4.523]}
//             rotation={[0, 0.306, 0]}
//             scale={[0.129, 0.232, 0.339]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_280.geometry}
//             material={materials.Base_Palette}
//             position={[20.773, -0.223, -16.364]}
//             rotation={[0.025, -1.164, -3.119]}
//             scale={0.615}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_282.geometry}
//             material={materials.Base_Palette}
//             position={[21.46, -0.364, -17.635]}
//             rotation={[0.147, -1.503, -2.995]}
//             scale={0.069}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_284.geometry}
//             material={materials.Base_Palette}
//             position={[22.288, -0.237, -14.441]}
//             rotation={[3.099, -1.337, -0.041]}
//             scale={0.818}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_286.geometry}
//             material={materials.Base_Palette}
//             position={[18.613, -0.223, -16.364]}
//             rotation={[0.025, -1.17, -3.118]}
//             scale={0.251}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_288.geometry}
//             material={materials.Base_Palette}
//             position={[19.3, -0.364, -17.635]}
//             rotation={[3.131, -0.344, -0.004]}
//             scale={0.744}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_290.geometry}
//             material={materials.Base_Palette}
//             position={[20.129, -0.4, -14.441]}
//             rotation={[0.019, -1.015, -3.126]}
//             scale={0.859}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_292.geometry}
//             material={materials.Base_Palette}
//             position={[18.613, -0.403, 13.874]}
//             rotation={[0.014, -0.801, -3.131]}
//             scale={0.303}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_294.geometry}
//             material={materials.Base_Palette}
//             position={[19.3, -0.34, 14.763]}
//             rotation={[0.019, -1.024, -3.125]}
//             scale={0.322}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_296.geometry}
//             material={materials.Base_Palette}
//             position={[20.129, -0.248, 15.798]}
//             rotation={[0.01, -0.112, -3.14]}
//             scale={0.346}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_298.geometry}
//             material={materials.Base_Palette}
//             position={[18.613, -0.44, 18.194]}
//             rotation={[0.011, -0.483, -3.136]}
//             scale={0.685}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_300.geometry}
//             material={materials.Base_Palette}
//             position={[19.3, -0.376, 16.923]}
//             rotation={[2.995, -1.503, -0.147]}
//             scale={0.859}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_302.geometry}
//             material={materials.Base_Palette}
//             position={[20.129, -0.445, 20.117]}
//             rotation={[0.084, -1.453, -3.058]}
//             scale={0.097}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_304.geometry}
//             material={materials.Base_Palette}
//             position={[16.454, -0.228, 13.874]}
//             rotation={[3.131, -0.463, -0.005]}
//             scale={0.522}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_306.geometry}
//             material={materials.Base_Palette}
//             position={[17.14, -0.24, 12.603]}
//             rotation={[0.01, -0.32, -3.138]}
//             scale={0.62}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_308.geometry}
//             material={materials.Base_Palette}
//             position={[17.969, -0.368, 13.638]}
//             rotation={[0.015, -0.852, -3.13]}
//             scale={0.652}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_310.geometry}
//             material={materials.Base_Palette}
//             position={[16.454, -0.228, 13.874]}
//             rotation={[0.016, -0.907, -3.129]}
//             scale={0.005}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_312.geometry}
//             material={materials.Base_Palette}
//             position={[17.14, -0.354, 14.763]}
//             rotation={[3.125, -0.939, -0.013]}
//             scale={0.595}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_314.geometry}
//             material={materials.Base_Palette}
//             position={[17.969, -0.434, 15.798]}
//             rotation={[0.03, -1.241, -3.113]}
//             scale={0.768}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_316.geometry}
//             material={materials.Base_Palette}
//             position={[16.454, -0.431, 16.034]}
//             rotation={[0.016, -0.889, -3.129]}
//             scale={0.192}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_318.geometry}
//             material={materials.Base_Palette}
//             position={[17.14, -0.354, 14.763]}
//             rotation={[0.023, -1.124, -3.121]}
//             scale={0.375}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_320.geometry}
//             material={materials.Base_Palette}
//             position={[17.969, -0.434, 15.798]}
//             rotation={[0.031, -1.249, -3.112]}
//             scale={0.487}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_322.geometry}
//             material={materials.Base_Palette}
//             position={[16.454, -0.233, 20.354]}
//             rotation={[3.121, -1.071, -0.018]}
//             scale={0.585}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_324.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.205, -17.635]}
//             rotation={[3.064, -1.443, -0.077]}
//             scale={0.377}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_326.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.205, -16.601]}
//             rotation={[0.013, -0.675, -3.134]}
//             scale={0.91}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_328.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.205, -16.364]}
//             rotation={[3.125, -0.912, -0.013]}
//             scale={0.326}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_330.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.205, -17.635]}
//             rotation={[3.131, -0.239, -0.002]}
//             scale={0.256}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_332.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.205, -16.601]}
//             rotation={[0.02, -1.053, -3.124]}
//             scale={0.329}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_334.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.228, -14.204]}
//             rotation={[3.13, -0.546, -0.006]}
//             scale={0.03}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_336.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.24, -15.476]}
//             rotation={[0.01, -0.23, -3.139]}
//             scale={0.152}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_338.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.368, -14.441]}
//             rotation={[0.011, -0.352, -3.138]}
//             scale={0.53}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_340.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.228, -14.204]}
//             rotation={[0.045, -1.35, -3.098]}
//             scale={0.47}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_342.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.24, -15.476]}
//             rotation={[3.079, -1.413, -0.062]}
//             scale={0.871}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_344.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.368, -14.441]}
//             rotation={[0.011, -0.416, -3.137]}
//             scale={0.099}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_346.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.228, -14.204]}
//             rotation={[3.126, -0.89, -0.012]}
//             scale={0.273}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_348.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.319, -13.316]}
//             rotation={[0.011, -0.411, -3.137]}
//             scale={0.291}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_350.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.271, -12.281]}
//             rotation={[3.124, -0.958, -0.014]}
//             scale={0.715}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_352.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.407, -12.044]}
//             rotation={[3.132, -0.205, -0.002]}
//             scale={0.4}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_354.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.319, -13.316]}
//             rotation={[3.129, -0.621, -0.007]}
//             scale={0.285}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_356.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.271, -12.281]}
//             rotation={[3.126, -0.868, -0.012]}
//             scale={0.362}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_358.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.205, 13.874]}
//             rotation={[3.131, -0.384, -0.004]}
//             scale={0.403}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_360.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.205, 12.603]}
//             rotation={[0.01, -0.051, -3.141]}
//             scale={0.672}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_362.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.368, 15.798]}
//             rotation={[3.086, -1.392, -0.055]}
//             scale={0.55}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_364.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.228, 16.034]}
//             rotation={[3.059, -1.45, -0.082]}
//             scale={0.215}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_366.geometry}
//             material={materials.Base_Palette}
//             position={[14.98, -0.24, 14.763]}
//             rotation={[0.025, -1.168, -3.118]}
//             scale={0.724}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_368.geometry}
//             material={materials.Base_Palette}
//             position={[15.809, -0.238, 17.957]}
//             rotation={[3.102, -1.317, -0.038]}
//             scale={0.945}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_370.geometry}
//             material={materials.Base_Palette}
//             position={[14.294, -0.205, 20.354]}
//             rotation={[3.131, -0.396, -0.004]}
//             scale={0.339}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_372.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.205, -17.635]}
//             rotation={[3.127, -0.855, -0.011]}
//             scale={0.844}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_374.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.205, -16.601]}
//             rotation={[0.022, -1.096, -3.122]}
//             scale={0.069}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_376.geometry}
//             material={materials.Base_Palette}
//             position={[12.134, -0.205, -16.364]}
//             rotation={[3.13, -0.514, -0.006]}
//             scale={0.109}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_378.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.205, -17.635]}
//             rotation={[3.131, -0.438, -0.005]}
//             scale={0.436}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_380.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.237, -14.441]}
//             rotation={[0.01, -0.054, -3.141]}
//             scale={0.56}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_382.geometry}
//             material={materials.Base_Palette}
//             position={[12.134, -0.403, -14.204]}
//             rotation={[3.13, -0.517, -0.006]}
//             scale={0.13}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_384.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.25, -15.476]}
//             rotation={[3.13, -0.585, -0.007]}
//             scale={0.731}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_386.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.237, -14.441]}
//             rotation={[3.113, -1.215, -0.027]}
//             scale={0.128}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_388.geometry}
//             material={materials.Base_Palette}
//             position={[12.134, -0.403, -14.204]}
//             rotation={[3.091, -1.374, -0.049]}
//             scale={0.709}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_390.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.25, -15.476]}
//             rotation={[3.131, -0.367, -0.004]}
//             scale={0.956}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_392.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.237, -14.441]}
//             rotation={[3.124, -0.968, -0.014]}
//             scale={0.82}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_394.geometry}
//             material={materials.Base_Palette}
//             position={[12.134, -0.403, -14.204]}
//             rotation={[0.024, -1.156, -3.119]}
//             scale={0.739}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_396.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.25, -15.476]}
//             rotation={[1.148, -1.56, -1.993]}
//             scale={0.897}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_398.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.237, -14.441]}
//             rotation={[0.011, -0.472, -3.137]}
//             scale={0.01}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_400.geometry}
//             material={materials.Base_Palette}
//             position={[12.134, -0.44, -12.044]}
//             rotation={[0.011, -0.497, -3.136]}
//             scale={0.567}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_402.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.376, -13.316]}
//             rotation={[3.101, -1.323, -0.039]}
//             scale={0.548}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_404.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.411, -12.281]}
//             rotation={[0.012, -0.578, -3.135]}
//             scale={0.376}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_406.geometry}
//             material={materials.Base_Palette}
//             position={[12.134, -0.44, -12.044]}
//             rotation={[3.129, -0.676, -0.008]}
//             scale={0.592}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_408.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.376, -13.316]}
//             rotation={[3.125, -0.95, -0.014]}
//             scale={0.893}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_410.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.411, -12.281]}
//             rotation={[0.045, -1.349, -3.098]}
//             scale={0.743}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_412.geometry}
//             material={materials.Base_Palette}
//             position={[12.134, -0.218, 18.194]}
//             rotation={[3.131, -0.373, -0.004]}
//             scale={0.353}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_414.geometry}
//             material={materials.Base_Palette}
//             position={[12.82, -0.295, 16.923]}
//             rotation={[0.01, -0.088, -3.141]}
//             scale={0.855}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_416.geometry}
//             material={materials.Base_Palette}
//             position={[13.649, -0.205, 20.117]}
//             rotation={[3.13, -0.495, -0.005]}
//             scale={0.88}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_418.geometry}
//             material={materials.Base_Palette}
//             position={[9.974, -0.403, -16.364]}
//             rotation={[0.012, -0.618, -3.135]}
//             scale={0.011}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_420.geometry}
//             material={materials.Base_Palette}
//             position={[10.661, -0.25, -17.635]}
//             rotation={[0.01, -0.2, -3.14]}
//             scale={0.854}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_422.geometry}
//             material={materials.Base_Palette}
//             position={[11.489, -0.379, -14.441]}
//             rotation={[3.13, -0.528, -0.006]}
//             scale={0.831}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_424.geometry}
//             material={materials.Base_Palette}
//             position={[9.974, -0.242, -14.204]}
//             rotation={[0.045, -1.35, -3.098]}
//             scale={0.625}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_426.geometry}
//             material={materials.Base_Palette}
//             position={[10.661, -0.331, -15.476]}
//             rotation={[3.129, -0.651, -0.008]}
//             scale={0.573}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_428.geometry}
//             material={materials.Base_Palette}
//             position={[11.489, -0.379, -14.441]}
//             rotation={[0.011, -0.365, -3.138]}
//             scale={0.903}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_430.geometry}
//             material={materials.Base_Palette}
//             position={[9.974, -0.233, -12.044]}
//             rotation={[0.01, -0.121, -3.14]}
//             scale={0.706}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_432.geometry}
//             material={materials.Base_Palette}
//             position={[4.181, -0.274, -21.955]}
//             rotation={[3.109, -1.261, -0.031]}
//             scale={0.372}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_434.geometry}
//             material={materials.Base_Palette}
//             position={[5.009, -0.205, -18.761]}
//             rotation={[3.073, -1.425, -0.067]}
//             scale={0.507}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_436.geometry}
//             material={materials.Base_Palette}
//             position={[-0.826, -0.403, -20.684]}
//             rotation={[3.129, -0.67, -0.008]}
//             scale={0.148}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_438.geometry}
//             material={materials.Base_Palette}
//             position={[-0.139, -0.331, -19.795]}
//             rotation={[0.011, -0.475, -3.137]}
//             scale={0.156}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_440.geometry}
//             material={materials.Base_Palette}
//             position={[-14.43, -0.379, -14.441]}
//             rotation={[3.131, -0.305, -0.003]}
//             scale={0.59}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_442.geometry}
//             material={materials.Base_Palette}
//             position={[-15.665, 0.824, 17.937]}
//             rotation={[2.822, -1.539, -0.319]}
//             scale={0.183}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_444.geometry}
//             material={materials.Base_Palette}
//             position={[-17.252, 0.197, 16.753]}
//             rotation={[0.03, -1.236, -3.113]}
//             scale={0.802}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_446.geometry}
//             material={materials.Base_Palette}
//             position={[-16.31, 0.753, 17.692]}
//             rotation={[0.011, -0.357, -3.138]}
//             scale={0.712}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_448.geometry}
//             material={materials.Base_Palette}
//             position={[-18.004, -0.054, 20.242]}
//             rotation={[3.064, -1.442, -0.077]}
//             scale={0.436}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_450.geometry}
//             material={materials.Base_Palette}
//             position={[-17.175, 0.548, 18.834]}
//             rotation={[0.131, -1.495, -3.011]}
//             scale={0.901}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_452.geometry}
//             material={materials.Base_Palette}
//             position={[-18.749, -0.401, 2.838]}
//             rotation={[3.129, -0.675, -0.008]}
//             scale={0.022}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_454.geometry}
//             material={materials.Base_Palette}
//             position={[-20.25, -0.189, 16.017]}
//             rotation={[0.024, -1.139, -3.12]}
//             scale={0.861}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_456.geometry}
//             material={materials.Base_Palette}
//             position={[-19.564, -0.282, 14.747]}
//             rotation={[0.012, -0.625, -3.134]}
//             scale={0.196}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_458.geometry}
//             material={materials.Base_Palette}
//             position={[-18.506, 0.443, 17.688]}
//             rotation={[3.13, -0.491, -0.005]}
//             scale={0.059}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_460.geometry}
//             material={materials.Base_Palette}
//             position={[-20.239, -0.353, 20.324]}
//             rotation={[3.126, -0.881, -0.012]}
//             scale={0.85}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_462.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[20.773, -0.218, 11.714]}
//             rotation={[3.134, 0.008, -3.097]}
//             scale={0.797}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_464.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[21.46, -0.295, 10.443]}
//             rotation={[3.088, 0.021, -3.06]}
//             scale={0.314}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_466.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[21.081, -0.271, 18.064]}
//             rotation={[-3.128, 0.022, -2.982]}
//             scale={0.438}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_468.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[16.454, -0.228, 9.555]}
//             rotation={[3.13, 0.041, -3.123]}
//             scale={0.475}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_470.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-4.459, -0.364, -19.795]}
//             rotation={[3.126, 0, -2.836]}
//             scale={0.91}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_472.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-5.79, -0.271, -18.761]}
//             rotation={[3.128, -0.028, -3.139]}
//             scale={1.012}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_474.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-9.465, -0.242, -18.524]}
//             rotation={[3.098, -0.022, 3.137]}
//             scale={0.234}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_476.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-8.778, -0.331, -19.795]}
//             rotation={[-3.105, -0.007, -3.119]}
//             scale={0.538}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_478.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-7.95, -0.401, -16.601]}
//             rotation={[3.137, 0.037, 3.024]}
//             scale={0.559}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_480.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-9.465, -0.233, -14.204]}
//             rotation={[3.138, -0.015, 3.04]}
//             scale={0.858}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_482.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-15.258, -0.34, -17.635]}
//             rotation={[-3.127, -0.005, -3.068]}
//             scale={0.454}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_484.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-14.43, -0.248, -16.601]}
//             rotation={[3.134, 0.014, -3.12]}
//             scale={0.339}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_486.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-15.945, -0.417, -16.364]}
//             rotation={[3.121, 0.024, -2.887]}
//             scale={0.714}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_488.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-15.258, -0.331, -15.476]}
//             rotation={[3.137, -0.055, 3.03]}
//             scale={0.801}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_490.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-14.323, 0.185, 17.864]}
//             rotation={[3.118, -0.026, 3.141]}
//             scale={0.372}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_492.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-15.665, 0.824, 17.937]}
//             rotation={[-3.094, -0.012, 3.129]}
//             scale={0.257}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_494.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-15.147, 0.119, 16.824]}
//             rotation={[-3.132, 0.034, -2.914]}
//             scale={0.779}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_496.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-14.387, -0.044, 20.08]}
//             rotation={[3.141, 0.043, -3.13]}
//             scale={0.931}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_498.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-15.86, 0.115, 20.278]}
//             rotation={[3.106, 0.011, 3.129]}
//             scale={0.19}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_500.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.418, -0.331, -19.795]}
//             rotation={[-3.117, 0, -3.109]}
//             scale={0.584}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_502.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.589, -0.379, -18.761]}
//             rotation={[3.129, 0.037, -3.072]}
//             scale={0.683}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_504.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.105, -0.242, -18.524]}
//             rotation={[3.132, 0.001, -3.01]}
//             scale={0.77}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_506.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.418, -0.309, -17.635]}
//             rotation={[3.137, 0.052, -3.055]}
//             scale={0.263}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_508.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.589, -0.401, -16.601]}
//             rotation={[3.1, 0.029, 3.109]}
//             scale={1.057}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_510.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.105, -0.407, -14.204]}
//             rotation={[-3.131, -0.016, -2.921]}
//             scale={0.541}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_512.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.418, -0.319, -15.476]}
//             rotation={[3.118, -0.004, -2.823]}
//             scale={0.479}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_514.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.589, -0.271, -14.441]}
//             rotation={[-3.116, -0.02, -3.131]}
//             scale={0.244}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_516.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.105, -0.407, -14.204]}
//             rotation={[3.13, 0.006, -2.848]}
//             scale={0.28}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_518.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.418, -0.319, -15.476]}
//             rotation={[3.114, -0.005, 3.004]}
//             scale={0.387}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_520.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.589, -0.216, -12.281]}
//             rotation={[-3.114, 0.048, 3.026]}
//             scale={0.721}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_522.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.105, -0.218, -12.044]}
//             rotation={[-3.106, -0.011, -3.087]}
//             scale={0.3}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_524.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.418, -0.295, -13.316]}
//             rotation={[-3.14, 0.021, -2.984]}
//             scale={1.023}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_526.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.589, -0.237, -10.121]}
//             rotation={[3.123, 0.029, 3.025]}
//             scale={0.34}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_528.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.105, -0.403, -9.884]}
//             rotation={[3.135, 0.001, -2.939]}
//             scale={0.494}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_530.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.418, -0.25, -11.156]}
//             rotation={[3.108, -0.023, 3.069]}
//             scale={0.229}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_532.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.589, -0.237, -10.121]}
//             rotation={[3.105, -0.026, -2.958]}
//             scale={0.885}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_534.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.027, -0.154, 15.947]}
//             rotation={[-3.103, 0.037, -2.838]}
//             scale={0.607}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_536.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.252, 0.197, 16.753]}
//             rotation={[-3.117, -0.009, -2.892]}
//             scale={0.505}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_538.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.31, 0.753, 17.692]}
//             rotation={[3.127, 0.039, -2.897]}
//             scale={0.257}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_540.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.797, 0.691, 17.862]}
//             rotation={[3.135, -0.001, -2.898]}
//             scale={0.609}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_542.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.252, 0.197, 16.753]}
//             rotation={[3.139, 0.002, 2.969]}
//             scale={0.847}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_544.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-16.465, 0.213, 20]}
//             rotation={[3.134, -0.041, -2.987]}
//             scale={0.739}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_546.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.004, -0.054, 20.242]}
//             rotation={[3.098, 0.008, -3.028]}
//             scale={0.199}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_548.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-17.175, 0.548, 18.834]}
//             rotation={[-3.114, 0.017, -3.095]}
//             scale={0.893}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_550.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.749, -0.271, -18.761]}
//             rotation={[-3.141, 0.021, -3]}
//             scale={1.088}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_552.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-20.264, -0.407, -18.524]}
//             rotation={[3.115, -0.004, -2.856]}
//             scale={0.552}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_554.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-19.578, -0.34, -17.635]}
//             rotation={[-3.128, -0.022, -2.935]}
//             scale={0.448}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_556.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.749, -0.379, -14.441]}
//             rotation={[-3.121, -0.026, 3.121]}
//             scale={0.314}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_558.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-20.264, -0.407, -12.044]}
//             rotation={[-3.129, -0.018, -2.827]}
//             scale={0.349}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_560.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-19.578, -0.319, -13.316]}
//             rotation={[3.125, 0.002, -2.874]}
//             scale={0.638}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_562.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.749, -0.271, -12.281]}
//             rotation={[-3.118, -0.006, 2.98]}
//             scale={0.336}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_564.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-20.25, -0.189, 16.017]}
//             rotation={[3.141, -0.014, -2.848]}
//             scale={0.368}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_566.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-19.564, -0.282, 14.747]}
//             rotation={[3.11, 0, -2.889]}
//             scale={0.899}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_568.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.506, 0.443, 17.688]}
//             rotation={[-3.11, 0.002, -2.989]}
//             scale={0.366}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_570.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-20.169, -0.092, 18.083]}
//             rotation={[-3.141, 0.03, -2.983]}
//             scale={0.395}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_572.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-19.489, -0.035, 16.822]}
//             rotation={[3.13, 0.016, -2.885]}
//             scale={1.097}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_574.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-18.506, 0.443, 17.688]}
//             rotation={[3.139, -0.003, -2.964]}
//             scale={0.977}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_576.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-20.239, -0.353, 20.324]}
//             rotation={[-3.121, -0.005, 3.135]}
//             scale={0.905}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_578.geometry}
//             material={materials['Base_Palette.Corals']}
//             position={[-21.738, -0.285, -13.316]}
//             rotation={[-3.125, -0.016, -2.997]}
//             scale={0.47}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_580.geometry}
//             material={materials.Base_Palette}
//             position={[-18.725, 0.414, 4.467]}
//             rotation={[0, 0.306, 0]}
//             scale={[0.108, 0.194, 0.282]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_582.geometry}
//             material={materials.Base_Palette}
//             position={[-18.101, 0.954, 3.583]}
//             rotation={[0, 0.306, 0]}
//             scale={[0.119, 0.214, 0.312]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_584.geometry}
//             material={materials.Base_Palette}
//             position={[-6.145, 0.856, -15.896]}
//             rotation={[0, -1.563, 0]}
//             scale={[0.104, 0.188, 0.274]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_586.geometry}
//             material={materials.Base_Palette}
//             position={[-5.631, 0.452, -16.108]}
//             rotation={[0, -1.563, 0]}
//             scale={[0.168, 0.302, 0.44]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_588.geometry}
//             material={materials.Base_Palette}
//             position={[-5.046, 0.954, -16.837]}
//             rotation={[0, -1.563, 0]}
//             scale={[0.109, 0.196, 0.286]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_590.geometry}
//             material={materials.Base_Palette}
//             position={[16.811, 0.452, -15.25]}
//             rotation={[-Math.PI, 0.124, -Math.PI]}
//             scale={[0.168, 0.302, 0.44]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_592.geometry}
//             material={materials.Base_Palette}
//             position={[17.5, 0.936, -15.425]}
//             rotation={[-Math.PI, 0.124, -Math.PI]}
//             scale={[0.1, 0.181, 0.263]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_594.geometry}
//             material={materials.Base_Palette}
//             position={[-2.985, 3.72, 21.944]}
//             scale={3.704}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_596.geometry}
//             material={materials.Base_Palette}
//             position={[-3.477, 3.788, 21.127]}
//             rotation={[0, -0.168, 0]}
//             scale={2.518}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_598.geometry}
//             material={materials.Base_Palette}
//             position={[-7.391, 1.252, -4.535]}
//             rotation={[0, -0.476, 0]}
//             scale={1.888}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_600.geometry}
//             material={materials.Base_Palette}
//             position={[-3.013, 4.567, 12.297]}
//             rotation={[0, 0.059, 0]}
//             scale={2.186}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_602.geometry}
//             material={materials.Base_Palette}
//             position={[-12.573, -0.329, -11.555]}
//             rotation={[0, -0.476, 0]}
//             scale={1.888}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_604.geometry}
//             material={materials.Base_Palette}
//             position={[-0.855, 7.551, 1.127]}
//             rotation={[-Math.PI, 0.041, -Math.PI]}
//             scale={2.663}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_612.geometry}
//             material={materials.Base_Palette}
//             position={[-6.463, 7.917, 4.019]}
//             rotation={[0, -1.369, 0]}
//             scale={2.663}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_614.geometry}
//             material={materials.MetallicPalette}
//             position={[-1.798, 12.12, 2.967]}
//             rotation={[-Math.PI, 0.041, -Math.PI]}
//             scale={2.663}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_616.geometry}
//             material={materials.Base_Palette}
//             position={[4.35, 19.143, -3.57]}
//             scale={0.66}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_618.geometry}
//             material={materials.Base_Palette}
//             position={[-1.317, 20.3, -3.474]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_620.geometry}
//             material={materials.Base_Palette}
//             position={[-2.075, 22.707, -1.386]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_622.geometry}
//             material={materials.Base_Palette}
//             position={[-3.991, 20.545, 0.902]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_624.geometry}
//             material={materials.Base_Palette}
//             position={[0.698, 19.376, 6.757]}
//             scale={0.87}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_626.geometry}
//             material={materials.Base_Palette}
//             position={[3.504, 28.367, -0.5]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_628.geometry}
//             material={materials.Base_Palette}
//             position={[0.433, 29.076, 0.408]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_630.geometry}
//             material={materials.Base_Palette}
//             position={[3.802, 7.631, 1.356]}
//             rotation={[0, -0.715, 0]}
//             scale={1.209}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_632.geometry}
//             material={materials.Base_Palette}
//             position={[3.994, 16.732, 0.537]}
//             scale={0.66}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_634.geometry}
//             material={materials.Base_Palette}
//             position={[-0.394, 16.588, -3.926]}
//             scale={0.585}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_636.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_638.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_640.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_642.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_644.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_646.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_648.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_650.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_652.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_654.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_656.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_658.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_660.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_662.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_664.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_666.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_668.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_670.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_672.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_674.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_676.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_678.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_680.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_682.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_684.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_686.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_688.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_690.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_692.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_694.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_696.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_698.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_700.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_702.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_704.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_706.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_708.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_710.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_712.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_714.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_716.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_718.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_720.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_722.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_724.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_726.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_728.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_730.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_732.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_734.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_736.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_738.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_740.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_742.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_744.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_746.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_748.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_750.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_752.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_754.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_756.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_758.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_760.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_762.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_764.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_766.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_768.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_770.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_772.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_774.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_776.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_778.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_780.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_782.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_784.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_786.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_788.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_790.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_792.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_794.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_796.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_798.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_800.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_802.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_804.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_806.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_808.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_810.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_812.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_814.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_816.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_818.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_820.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_822.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_824.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_826.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_828.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_830.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_832.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_834.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_836.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_838.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_840.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_842.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_844.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_846.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_848.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_850.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_852.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_854.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_856.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_858.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_860.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_862.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_864.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_866.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_868.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_870.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_875.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_880.geometry}
//             material={materials.MetallicPalette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_882.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_887.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_889.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_891.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_893.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_895.geometry}
//             material={materials.MetallicPalette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_897.geometry}
//             material={materials.MetallicPalette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_899.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_901.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_903.geometry}
//             material={materials.Base_Palette}
//             position={[1.528, 2.588, -0.437]}
//             rotation={[0, 1.312, 0]}
//             scale={0.92}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_932.geometry}
//             material={materials.Base_Palette}
//             position={[4.767, 12.249, 7.631]}
//             rotation={[1.316, 0.236, -0.733]}
//             scale={[0.291, 0.577, 0.291]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_934.geometry}
//             material={materials.Base_Palette}
//             position={[5.693, 12.249, 4.887]}
//             rotation={[1.761, 0.29, -2.164]}
//             scale={[0.291, 0.577, 0.291]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_936.geometry}
//             material={materials.Base_Palette}
//             position={[2.727, 12.249, 3.563]}
//             rotation={[1.864, -0.185, 2.594]}
//             scale={[0.291, 0.577, 0.291]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_938.geometry}
//             material={materials.Base_Palette}
//             position={[1.302, 12.249, 6.084]}
//             rotation={[1.439, -0.32, 1.173]}
//             scale={[0.291, 0.577, 0.291]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_940.geometry}
//             material={materials.Base_Palette}
//             position={[4.767, 9.174, 7.631]}
//             rotation={[1.316, 0.236, -0.733]}
//             scale={[0.291, 0.577, 0.291]}
//           />
//         </group>
//       </group>
//     </a.group>
//   )
// }



/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Omid Saadat (https://sketchfab.com/omid3098)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/amusement-park-island-9530547b964141909af87148bf13dd49
Title: Amusement Park Island
*/


  return (
    <group ref={islandRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.055}>
          <group name="5cf52991626d4e37bd82f9fcfaea04f7fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Charkhofalak" position={[34.95, 2.518, -106.953]}>
                  <group name="Object_5" position={[0, 0, -10]}>
                    <mesh
                      name="Charkhofalak_islandMaterial_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Charkhofalak_islandMaterial_0.geometry}
                      material={materials.islandMaterial}
                    />
                  </group>
                  <group name="Rotator" position={[-0.303, 101.439, 12.736]}>
                    <group name="Object_8" position={[0.303, -101.439, -22.736]}>
                      <mesh
                        name="Rotator_islandMaterial_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rotator_islandMaterial_0.geometry}
                        material={materials.islandMaterial}
                      />
                    </group>
                    <group name="003" position={[-38.817, 54.003, 11.542]}>
                      <mesh
                        name="003_islandMaterial_0"
                        castShadow
                        receiveShadow
                        geometry={nodes['003_islandMaterial_0'].geometry}
                        material={materials.islandMaterial}
                      />
                    </group>
                    <group name="004" position={[38.971, 54.902, 11.542]}>
                      <mesh
                        name="004_islandMaterial_0"
                        castShadow
                        receiveShadow
                        geometry={nodes['004_islandMaterial_0'].geometry}
                        material={materials.islandMaterial}
                      />
                    </group>
                    <group name="005" position={[64.034, -21.472, 11.542]}>
                      <mesh
                        name="005_islandMaterial_0"
                        castShadow
                        receiveShadow
                        geometry={nodes['005_islandMaterial_0'].geometry}
                        material={materials.islandMaterial}
                      />
                    </group>
                    <group name="006" position={[2.624, -63.455, 11.542]}>
                      <mesh
                        name="006_islandMaterial_0"
                        castShadow
                        receiveShadow
                        geometry={nodes['006_islandMaterial_0'].geometry}
                        material={materials.islandMaterial}
                      />
                    </group>
                    <group name="007" position={[-64.516, -22.797, 11.542]}>
                      <mesh
                        name="007_islandMaterial_0"
                        castShadow
                        receiveShadow
                        geometry={nodes['007_islandMaterial_0'].geometry}
                        material={materials.islandMaterial}
                      />
                    </group>
                  </group>
                </group>
                <group
                  name="Tent"
                  position={[-27.035, 0, -23.499]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.818}>
                  <mesh
                    name="Tent_islandMaterial_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Tent_islandMaterial_0.geometry}
                    material={materials.islandMaterial}
                  />
                </group>
                <group
                  name="Islan_LP"
                  position={[0, -25.359, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={1.448}>
                  <mesh
                    name="Islan_LP_islandMaterial_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Islan_LP_islandMaterial_0.geometry}
                    material={materials.islandMaterial}
                  />
                </group>
                <group
                  name="FloatingRocks"
                  position={[-0.518, -52.806, 0.019]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[2.034, 2.034, 1.686]}>
                  <mesh
                    name="FloatingRocks_islandMaterial_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.FloatingRocks_islandMaterial_0.geometry}
                    material={materials.islandMaterial}
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

useGLTF.preload('/amusement_park_island.glb')




export default Island