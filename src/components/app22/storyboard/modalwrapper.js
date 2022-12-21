import React,{useState,useEffect} from 'react';
import {v4} from 'uuid';
import {makeStoryBoard,getProdsDynamo,getStoryById,getProductByItemNumber} from './graphQlStuffs';
import VerticalSelect from './verticalSelectForStoryboardBrands';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import Distributor from './distributor';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import EmailCircle from '@mui/icons-material/EmailCircle';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContactsIcon from '@mui/icons-material/Contacts';
import {Row,Col} from 'react-bootstrap';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
const Title=({title='title'})=>(
    <div style={{fontSize:'1.5rem',fontWeight:600,}}>
        {title.toUpperCase()}
    </div>);


export default function ModalWrapper(props){
    let framyWiff=300;
    const [userInfo,setUserInfo]=useState(null);
        // storyUser&&typeof storyUser!=='undefined'?storyUser:{email:'',client_name:'',contact_info:'',distributor:'',phone_number:''});
    const [showInputs,setShowInputs]=useState(true);

    function handleUserState(ev){
        let setterObject=JSON.parse(JSON.stringify(userInfo));
        let field=ev.target.name;
        let va=ev.target.value;
        setterObject[field]=va;
        if (field==='distributor'){ setterObject['distributor_logo']=ev.target.optionalLogo; };
        // setUserInfo(setterObject);
    };

    const fields=[
        {field:'email',icon:<EmailIcon/>,type:'Textfield'},
        {field:'phone_number',icon:<ContactsIcon/>,type:'Textfield'},
        {field:'distributor',icon:<ContactsIcon/>,type:'VerticalSelect'},
    ];
    // const {email,phone_number,distributor,distributor_logo,contact_info}=userInfo;
    const handleClose=(ev)=>{
        setShowInputs(false);
        // setStoryUser(userInfo);
    };
    
    return (
    <Modal
open={showInputs}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box
    component="form"
    sx={style}
    noValidate
    autoComplete="off"
    >
        {props.children&&props.children}
    {/* {fields.map(({field,icon,type},fieldIdx)=>(
        type==='Textfield'
    ?<TextField 
        key={'inputStory'+fieldIdx}
        InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                {icon}
            </InputAdornment>
        ),
        }}
        value={userInfo[field]}
        // onChange={handleUserState}
        name={field}
        size='small' 
        id="outlined-basic" 
        label={(/_/.test(field)?field.split('_'):[field]).map(m=>m[0].toUpperCase()+m.slice(1))}
        variant="standard"
    />
    :<div
        key={'inputStory'+fieldIdx} 
        style={{paddingTop:'.8rem'}}
        >
        <VerticalSelect 
            titulo={'Choose a Distributor'} 
            // brands={distributors}
            name={field}
            handleSelect={(val)=>{
                // handleUserState({target:{name:'distributor',value:val.label,optionalLogo:val.logo}})
            }}
            />
    </div>))} */}
</Box>
</Modal>)};