import React from "react";
import { skills } from "../constants";
import CTA from "./CTA";
import { socialLinks } from "../constants";

const About=()=>{
    return (
    <section className="max-container">
    <h1 className="head-text font-mono">
    Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Tamojit</span>
    </h1>

    <div className="mt-5 flex flex-col gap-3 text-slate-500 font-mono">
    <p>
    Web Developer and Data Analysis enthusiast Based in <span className="blue-gradient_text">India</span>, passionate about creating seamless and innovative online experiences. When I'm not coding, you'll find me jamming out to my favorite tunes or catching up on the latest cricket matches. As a movie buff, I enjoy exploring different genres and diving into new cinematic worlds.Fluent in Bengali, Hindi, and English, I navigate cultures and conversations with ease, adding a multilingual touch to my work and interactions. 
    </p>
    </div>

     <div className="py-10 flex flex-col">
     <h3 className=" subhead-text">My Skills</h3>

     <div className="mt-16 flex-wrap flex gap-12">
     {skills.map((skill)=>(
        <div className="block-container w-20 h-20">
            <div className="btn-back rounded-xl"/>
            <div className=" btn-front rounded-xl flex justify-center items-center ">
                <img src={skill.imageUrl} alt={skill.name} className="h-1/2 w-1/2 object-contain"/>
            </div>
        </div>
     ))}
     </div>
     </div>

     
     <div className="py-16">
        <h3 className=" subhead-text">
        Work Experience
        </h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
    <p>
    Currently pursuing a B.Tech in Mechanical Engineering at NIT Agartala. Although I am still a student and have yet to gain formal work experience, I am enthusiastic about applying my knowledge, skills, and passion to real-world challenges. Eager to contribute to innovative projects and learn from experienced professionals in the field.
     {/*update it accordingly  */}
    </p>
    </div>

    <div>

    </div>
     </div>

     <div className="py-16">
        <h3 className="subhead-text">
        Social <span className="blue-gradient_text font-semibold drop-shadow">Links</span>
        </h3>
        <div className="mt-16 flex-wrap flex gap-12">
     {socialLinks.map((link)=>(
        <div className="block-container w-20 h-20">
            <div className="btn-back rounded-xl"/>
            <div className=" btn-front rounded-xl flex justify-center items-center ">
                <a href={link.link} className="h-1/2 w-1/2 object-contain">
                <img src={link.iconUrl} alt={link.name} />
                </a>
            </div>
        </div>
     ))}
     </div>
        <div>
            
        </div> 

     </div>

     <hr className=" border-slate-400"/>
     <CTA/>
    </section>
)}

export default About