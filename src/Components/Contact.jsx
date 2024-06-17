import React, { useRef, useState, Suspense } from "react";
import emailjs from '@emailjs/browser'
import { Canvas } from "@react-three/fiber";
// import { Loader } from "@react-three/drei";
import {Fox} from "../models/Fox"
import useAlert from "../hooks/useAlert";
import Loader from "./Loader";
import Alert from "./Alert";


const Contact=()=>{
const formRef=useRef()
const [form,setForm]=useState({name:'',email:'',message:''})
const [isLoading,setIsLoading]=useState(false)
const [currentAnimation,setCurrentAnimation]=useState('idle')

const handleClick=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const {alert,showAlert,hideAlert}=useAlert()

const handleFocus=()=>setCurrentAnimation('walk')

const handleBlur=()=>setCurrentAnimation('idle')

const handleSubmit=(e)=>{
e.preventDefault()
setIsLoading(true)
setCurrentAnimation('hit')
emailjs.send(
   'service_4ilrrsc',
   'template_nbe5are'
   ,
   {
   from_name:form.name,
   to_name:"Tamojit",
   from_email:form.email,
   to_email:"tamojitsaha18.ts@gmail.com",
   message:form.message
   }
// formRef.current

,

{publicKey:'EwuITua07FiF_LS3f'}
).then(() => {
setIsLoading(false);
showAlert({show:true,type:'success',text:'Message send successfully!'})
setTimeout(()=>{
hideAlert()   
setCurrentAnimation('idle')
setForm({name:'',email:'',message:''})
},[3000])

}).catch((err)=>{
console.log(err)
setIsLoading(false)
setCurrentAnimation('idle')
showAlert({show:true,type:'danger',text:'Oops!Something went wrong'})
})
}


    return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
    {alert.show && <Alert {...alert}/>}  
    <div className="flex flex-col max-w-[50%] flex-1">
    <h1 className=" head-text">Get In Touch</h1>
    <form ref={formRef} className="flex flex-col w-full gap-7 mt-14"
    onSubmit={handleSubmit}>
    <label className="text-semibold text-black-500"> 
    Name
    <input 
    type="text" 
    name="name"
    placeholder="Your name"
    required
    className="input"
    value={form.name}
    onChange={handleClick}
    onFocus={handleFocus}
    onBlur={handleBlur}
    />
    </label>
    <label className="text-semibold text-black-500"> 
    Email
    <input 
    type="email" 
    name="email"
    placeholder="your_email@gmail.com"
    required
    className="input"
    value={form.email}
    onChange={handleClick}
    onFocus={handleFocus}
    onBlur={handleBlur}
    />
    </label>
    <label className="text-semibold text-black-500"> 
    Your Message
    <textarea 
    name="message"
    rows={4}
    placeholder="Let me know how can I help you!"
    required
    className="textarea"
    value={form.message}
    onChange={handleClick}
    onFocus={handleFocus}
    onBlur={handleBlur}
    />
    </label>
    <button
    type="submit"
    className="btn"
    onFocus={handleFocus}
    onBlur={handleBlur}
    disabled={isLoading}
    >
   {isLoading ? 'Sending...':'Send Message'}
    </button>
    </form>
    </div> 
    <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
      <Canvas
      camera={{
         position:[0,0,5],
         fov:75,
         near:0.1,
         far:1000
      }}
      >
      <directionalLight position={[0,0,1]} intensity={2.5}/> 
      <ambientLight intensity={0.5}/>
      <Suspense fallback={<Loader/>}>
         <Fox
         currentAnimation={currentAnimation}
         position={[0.5,0.35,0]}
         rotation={[12.6,-0.6,0]}
         scale={[0.5,0.5,0.5]}
         />
      </Suspense>
      </Canvas>
    </div>   
    </section>
    )
}

export default Contact