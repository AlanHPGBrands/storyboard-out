import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Row,Col} from 'react-bootstrap';

export default function BoxNaming({handler,styleProps,actionText,currentName,}) {
  const [input,setInput]=useState(currentName);
  console.log(currentName)
  console.log(input)
  const handleChangeInput=ev=>{setInput(ev.target.value);};
  const handleClose=()=>{
    handler(input);
  };
  
  const nameIsCurrent=currentName===input;

  return (

    <Row>
      <Col xs={9}>
        <TextField 
          id="filled-basic" 
          label={nameIsCurrent?"Name Storyboard":"Name Storyboard *"}
          variant="outlined" 
          onChange={handleChangeInput}
          sx={{width:'100%',
          // backgroundColor:input===currentName?undefined:'red',
        }}
        color={nameIsCurrent?undefined:'warning'}
          />
      </Col>

      <Col xs={3}>

        <Button 
          variant="outlined" color={nameIsCurrent?undefined:'warning'} sx={{color:'#4700b3',padding:'20px 35px',}}
          onClick={handleClose}>
            {typeof actionText!=='undefined'?actionText:'SAVE'}
        </Button>

      </Col>

    </Row>
  );
}