import React from "react";
import {projects} from '../constants'
import {Link} from 'react-router-dom'
import { arrow } from "../assets/icons";
import CTA from './CTA'


const Projects=()=>{
    return (
        <section className="max-container">
        <h1 className="head-text font-mono">
        My <span className="blue-gradient_text font-semibold drop-shadow">Projects</span>
        </h1>
    
        <div className="mt-5 flex flex-col gap-3 text-slate-500 font-mono">
        <p>Discover a selection of my work, showcasing my skills in web development and design. These projects reflect my commitment to creating innovative and user-friendly solutions. Each project highlights my ability to turn ideas into reality, focusing on functionality, aesthetics, and user experience. Explore my portfolio to see the diverse range of applications and websites I've developed.
        </p>
        </div>

        <div className="flex flex-wrap my-20 gap-16">
         {projects.map((project)=>(
           <div className="lg:w-[400px] w-full" key={project.name}>
           <div className=" block-container w-12 h-12">
               <div className={`btn-back rounded-xl ${project.theme}`}/>
            <div className="btn-front rounded-xl flex justify-center items-center">
            <img src={project.iconUrl} alt="Project Icon" 
            className="w-1/2 h-1/2 object-contain"
            />    
            </div>   
           </div>
           <div className="mt-5 flex flex-col">
           <h4 className="text-semibold text-2xl font-poppins">
          {project.name}
           </h4>
           <p className="text-slate-500 mt-2">
          {project.description}
           </p>
        <div className="mt-5 flex items-center gap-2 font-poppins">
            <Link to={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className=" font-semibold text-blue-600"
            >
            Live Link
            </Link>
            <img src={arrow} alt="" className="w-4 h-4 object-contain"/>
        </div>
        </div>
       </div>
         )
        )}
        </div>

        <hr className="border-slate-500"/>

        <CTA/>
        </section>
    )
}

export default Projects