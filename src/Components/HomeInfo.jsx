import React from "react";
import {Link} from "react-router-dom"
import {arrow} from "../assets/icons"

const InfoBox=({text,link,btnText})=>{
   return (
   <div className="info-box">
        <p className=" font-mono font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
        {btnText}
        <img src={arrow} className="w-4 h-4 object-contain" />
        </Link>
    </div>
)}

const renderContent={
    1:(
    <h1 className="sm:text-xl sm:leading-snug text-centre 
    neo-brutalism-blue py-1 px-5 text-white mx-3 ">
    Hi, I am <span className="font-semibold">Tamojit</span>
    <br />
    A Web Developer From <span className="text-yellow-300  font-mono font-semibold">India...</span>
    <p>"Drag To Explore"</p>
    </h1>
    ),
    2:(
    <InfoBox
    text="Ready to uncover the mystery behind the screen? Click below and let's embark on a digital adventure!"
    link='/about'
    btnText='know more'
    />
    ),
    3:(
        <InfoBox
        text="Keen to witness my digital tapestry?Click the button below to explore my portfolio!"
        link='/projets'
        btnText='my works'
        />
    ),
    4:(
        <InfoBox
        text="If you want to collaborate or need a project done or looking for a dev? I'm just a few keystrokes away."
        link='/contact'
        btnText="Let's talk"
        />
    )
}


const HomeInfo=({currentStage})=>{
    return renderContent[currentStage] || null
}

export default HomeInfo