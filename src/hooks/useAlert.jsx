import React, { useState } from "react";

const useAlert =()=>{

const [alert,setAlert]=useState({text:'',type:'danger',show:false})

const showAlert=({text,type='danger'})=>setAlert({
show:true,
text,
type
})

const hideAlert=()=>setAlert({
show:false,
text:'',
type:'danger'
})


    return (
        {alert,showAlert,hideAlert}
    )
}

export default useAlert