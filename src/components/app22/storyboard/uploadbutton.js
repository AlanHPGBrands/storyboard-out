import React,{useState} from 'react';
import Button from '@mui/material/Button';

export default function UploadButton(props){
    const [showUploadDialog,setShowUploadDialog]=useState(false);
    const buttonText=typeof props.buttonText!=='undefined'
        ?props.buttonText:'Upload Client Logo'.toUpperCase();
        console.log(showUploadDialog);
    return (<div>
        {!showUploadDialog&&
        <Button 
        sx={{borderRadius:'0px',color:'white',backgroundColor:'#4700b3'}}
        style={{borderRadius:'0px',width:'120px',}}
        onClick={()=>{setShowUploadDialog(true);}}>
            {buttonText}
        </Button>}
        {showUploadDialog&&props.children}
    </div>);
};




