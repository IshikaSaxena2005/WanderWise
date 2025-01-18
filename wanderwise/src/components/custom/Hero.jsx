import React from 'react';
import { Button } from '../ui/button';
import {Link} from 'react-router-dom'
function Hero() {
  return (
    <div className="flex flex-col items-center text-center px-6 mt-10">
      <h2 className="font-extrabold text-[30px] text-center">
        <span className="text-[#bebef0]">Discover Your Next Adventure with AI:</span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h2>
     <p className='text-xl text-gray-500 text-center'>Your Personalized trip planner and travel curator, creating custom itineraries tailored to your interest and budget</p> 
     <Link to={'/create-trip'} ><button>Get Strated, It's free</button></Link>
     
    </div>
  );
}

export default Hero;
