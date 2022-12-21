import React,{useState,useEffect} from 'react';
import {Row,Col} from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Divider} from '@mui/material';
import {cat22AppConfig} from '../cat22/config';
import {getAndMakeInitial} from "../cat22/cat22logicbored";
import UploadAndSearch from './uploadandsearch';
import RenderSvgElement from '../../rendersvgelement';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ContactsIcon from '@mui/icons-material/Contacts';

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

const defaultUser={
    email:'',
    client_name:'',
    distributor:'',
    phone_number:''
};

export default function Distributor({setStoryUser,storyUser,closeDrawer,qBuk,}){
    const [userInfo,setUserInfo]=useState(storyUser&&typeof storyUser!=='undefined'?storyUser:defaultUser);
    const [showInputs,setShowInputs]=useState(false);
    const [distributorLogoId,setDistributorLogoId]=useState(null);

    useEffect(()=>{
        async function makeDistributorSvg(logo_id){
            let forGetAndMake = {
                id: logo_id,
                setErrorMessage:(a)=>{console.log(a);},
                setCurrentResultId:(a)=>{console.log(a);},
                setSvgPatternForFlyer_PLURAL:(a)=>{console.log(a);},
                setSvgs:(a)=>{console.log(a);},
                setSvgsPropsArray:(a)=>{console.log(a);},
            };
            let {svgs} = await getAndMakeInitial(forGetAndMake);
            let setterObject=JSON.parse(JSON.stringify(userInfo));
            setterObject['distributor_svg']=svgs[0];
            setUserInfo(setterObject);
        };
        if (distributorLogoId&&typeof distributorLogoId!=='undefined'){
            makeDistributorSvg(distributorLogoId);
        };
    },[distributorLogoId]);

    useEffect(()=>{if(storyUser&&typeof storyUser!=='undefined'){setUserInfo(storyUser);}},[storyUser]);

    function handleUserState(ev){
        let setterObject=JSON.parse(JSON.stringify(userInfo));
        let field=ev.target.name;
        let va=ev.target.value;
        setterObject[field]=va;
        console.log(ev.target);
        if (field==='distributor'){ setterObject['distributor_logo']=ev.target.optionalLogo; };
        setUserInfo(setterObject);
    };

    const fields=[
        {field:'email',         icon:<EmailIcon/>,      type:'Textfield'},
        {field:'phone_number',  icon:<ContactsIcon/>,   type:'Textfield'},
        {field:'distributor',   icon:<ContactsIcon/>,   type:'VerticalSelect'},
    ];

    const {email,phone_number,distributor,distributor_logo,contact_info,distributor_svg}=userInfo;
    const [showCloseButton,setShowCloseButton]=useState(false);

    const handleClose=(ev)=>{
        console.log(userInfo);
        setStoryUser(userInfo);
        setShowInputs(false);
        if (typeof closeDrawer!=='undefined'){
            closeDrawer(ev)
        };
    };

    return (
        <div>
        {!showInputs
        ? email!==''||phone_number!==''||distributor!==''
            ?<Row
                onClick={()=>{setShowInputs(true)}} 
                style={{width:'300px',fontSize:'.9rem',fontWeight:600,cursor:'pointer',}}
                >
                <Col style={{textAlign:'left'}} >
                    {distributor_svg&&
                    <Row>
                        <Col xs={3}>
                            <EmailIcon />
                        </Col>

                        <Col xs={9} style={{textAlign:'left'}} >
                            <RenderSvgElement 
                                currentSvg={distributor_svg}
                                svgStyleFromAbove={{maxWidth:'160px',maxHeight:'40px'}}
                            />
                            <br />
                        </Col>
                    </Row>}

                    {userInfo.email&&userInfo.email!==''&&
                    <Row>
                        <Col xs={3}>
                            <EmailIcon />
                        </Col>
                        <Col xs={9} style={{textAlign:'left'}} >
                            {userInfo.email}
                            <br />
                        </Col>
                    </Row>}

                    {userInfo.phone_number&&userInfo.phone_number!==''&&
                    <Row>
                        <Col xs={3}>
                            <PhoneIcon />
                        </Col>
                        <Col xs={9} style={{textAlign:'left'}} >
                            {userInfo.phone_number}
                            <br />
                        </Col>
                    </Row>}

                </Col>
            </Row>

            :<Row style={{width:'100%'}} onClick={()=>{setShowInputs(true);}}>
                <Col xs={12}>
                    <Button style={{whiteSpace:'nowrap',width:'300px',}}>Add Contact Info</Button>
                </Col>
            </Row>
            :
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
                    {fields.map(({field,icon,type},fieldIdx)=>(
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
                        required={field==='email'?true:undefined}
                        value={userInfo[field]}
                        onChange={handleUserState}
                        name={field}
                        size='small' 
                        id="outlined-basic" 
                        label={(/_/.test(field)?field.split('_'):[field]).map(m=>m[0].toUpperCase()+m.slice(1))}
                        variant="standard"
                    />
                    :
                    <div
                        key={'inputStory'+fieldIdx} 
                        style={{paddingTop:'.8rem'}}
                        >
                        <br />
                        <Divider />
                        <br />
                        <div style={{textAlign:'center',marginLeft:'auto',marginRight:'auto',fontWeight:600,fontSize:'1.1rem',}}>
                            {'Distributor'}
                        </div>
                        <br />
                        <UploadAndSearch
                            termsAccepted={true}
                            setTermsAccepted={()=>{console.log('hardAccepted')}}
                            qBuk={qBuk}
                            setCurrentResultId={setDistributorLogoId}
                            setTotalProcessingTime={()=>{setShowCloseButton(true);}}
                            setShowCloseButton={setShowCloseButton}
                        />
                    </div>))}
                    {showCloseButton&&<Button onClick={handleClose}>APPLY LOGO</Button>}
                </Box>
            </Modal>
        }
        </div>
    );
};

