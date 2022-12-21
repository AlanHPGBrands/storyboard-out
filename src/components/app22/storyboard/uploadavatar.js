import React,{useState} from 'react';

export default function UploadAvatar(props){
    const [showUploadDialog,setShowUploadDialog]=useState(false);
    console.log(showUploadDialog);
    return (<div>
        {
            true
        // !showUploadDialog
        &&
        <>
            {props.buttonChildren&&typeof props.buttonChildren!=='undefined'&&
            <div onClick={()=>{setShowUploadDialog(true)}} >
                {props.buttonChildren}
            </div>}
        </>}
        {showUploadDialog&&props.children}
    </div>);
};




