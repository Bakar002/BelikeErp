import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';


function StudentDashboard() {

  const navigate=useNavigate();
  const profileViewNavigator=()=>{
    navigate("/student-view-profile")
  }
 
  return (
    <div className=''>
   
      
         
          <div className={`   md:block col-span-1 } h-full  p-2 bg-[#033e71] text-white text-[0.7rem] md:text-[1rem] font-light md:font-semibold overflow-hidden`}>

            <ul className='md:p-2'>
              <li><h1 className='font-extrabold xl md:text-2xl'>Quick as</h1></li>
              <li className='mt-4 cursor-pointer'><h5  href={''} onClick={profileViewNavigator}>View Profile</h5></li>
             
            </ul>
           <div>
          <button>Signout</button>
           </div>
      

        </div>
     
    
    </div>
  );
}

export default StudentDashboard;
