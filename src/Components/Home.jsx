import {React,Suspense, useState, useEffect,useRef} from "react";
import {Canvas} from '@react-three/fiber'
import Loader from "./Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "./HomeInfo";
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from "../assets/icons";


const Home=()=>{

const audioRef=useRef(new Audio(sakura))
const[isPlayAudio,setAudio]=useState(false);
audioRef.current.volume=0.4
audioRef.current.loop=true

const [isRotating,setIsrotating]=useState(false)
const [currentStage,setCurrentStage]=useState(1)

 const screenParams=()=>{
    let screenScale=null
    let screenPosition=[0,-2.5,-12]
    let rotation=[0.1,4.7,0]
    if(window.innerWidth<768){
    screenScale=[0.9,0.9,0.9]
    }
    else{
    screenScale=[1,1,1]
    }
 return [screenScale,screenPosition,rotation]   
 }

const[scale,pos,rotat]=screenParams();


 const planeParams=()=>{
    let screenScale,screenPosition
    if(window.innerWidth<768){
    screenScale=[0.10,0.10,0.10]
     screenPosition=[0,-1.5,0]   
    }
    else{
    // screenScale=[2,2,2]
    // screenPosition=[0,-2.6,-4]
    screenScale=[0.16,0.24,0.24]
    screenPosition=[1,-2.6,-4]
    }
 return [screenScale,screenPosition]   
 }

const[scaleV,posV]=planeParams();

useEffect(()=>{
if(isPlayAudio){
    audioRef.current.play()
}
return ()=>{
    audioRef.current.pause()
}
},[isPlayAudio])


    return (
        <section className="w-full h-screen relative">
            <div className="absolute top-28 left-0 right-0 z-10 flex text-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage}/>}
            </div>
        <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating?'cursor-grabbing':'cursor-grab'}`}
                camera={{near:0.1,far:1000}}
        >
        <Suspense fallback={<Loader/>}>
         <directionalLight position={[1,1,1]} intensity={2}/>
         <ambientLight intensity={0.5}/>
         {/* <pointLight/>
         <spotLight/> */}
         <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

         <Bird isRotating={isRotating}/>
         <Sky isRotating={isRotating}/>
         <Island
         position={pos}
         scale={scale}
         rotation={rotat}
         isRotating={isRotating}
         setIsrotating={setIsrotating}
         setCurrentStage={setCurrentStage}
         />
         
        <Plane
        position={posV}
        scale={scaleV}
        isRotating={isRotating}
        rotation={[0,20,0]}
        />

        </Suspense>
        </Canvas>
       
       <div className="absolute bottom-2 left-2">
       <img src={(isPlayAudio)?soundon:soundoff} alt="sound" className="w-10 h-10 object-contain cursor-pointer" onClick={()=>setAudio(!isPlayAudio)}/>
       </div>
       
        </section>
    )
}

export default Home