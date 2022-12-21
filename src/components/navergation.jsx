import React,{useEffect} from 'react'
import {Col,Navbar,Nav} from 'react-bootstrap';

let urly=window.location.search;

const gotWhereVars = {
    CATS        :   false,
    CATSHIDDEN  :   typeof urly !=='undefined'&&/id=([0-9]{0,10})/i.test(urly)?urly.toString().toLowerCase().match(/id=([0-9]{0,10})/)[1]:false,
    url_item    :   typeof urly!=='undefined'&&/item=([A-Za-z0-9]{0,10})/i.test(urly)?urly.toString().toLowerCase().match(/item=([A-Za-z0-9]{0,10})/)[1]:false,
    url_rid     :   typeof urly!=='undefined'&&/id=([0-9]{0,10})/i.test(urly)?urly.toString().toLowerCase().match(/id=([0-9]{0,10})/)[1]:false,
    url_src     :   false,
    url_storyMain :typeof urly!=='undefined'&&/story/i.test(urly)?true:false,
    url_storyBoard :typeof urly!=='undefined'&&/story=([A-Za-z0-9-]{30,40})/i.test(urly)?urly.toString().toLowerCase().match(/story=([A-Za-z0-9-]{30,40})/i)[1]:false,
};

export default function Navergation(props){
    const {hpgLogo,setWhereVars}=props;

    useEffect(()=>{
        let tempWhereVars=JSON.parse(JSON.stringify(gotWhereVars));
        if (gotWhereVars.virntro||gotWhereVars.url_item){tempWhereVars.CATSHIDDEN=true;}
        setWhereVars(tempWhereVars);
    },[setWhereVars])
    
    return (
        <Col >
            <Navbar 
                style={{backgroundColor:'black'}}
                collapseOnSelect expand='xl' variant='dark'
                >
                <div style={{minWidth:'10px',opacity:'0'}}>
                    nther
                </div>
                <div style={{marginLeft:'20px',marginRight:'20px'}}>
                    <img src={hpgLogo} alt='hpgwhitelogo' width='70px'/>
                </div>

                <Navbar.Toggle aria-controls='responsive-navbar-nav'>
                    <svg version='1.1' x='0px' y='0px' fill='white' 
                        width='24px' height='24px' viewBox='0 0 24 24' 
                        enableBackground='new 0 0 24 24'>
                        <circle     cx='2'      cy='2'      r='2'/>
                        <circle     cx='12'     cy='2'      r='2'/>
                        <circle     cx='22'     cy='2'      r='2'/>
                        <circle     cx='2'      cy='12'     r='2'/>
                        <circle     cx='12'     cy='12'     r='2'/>
                        <circle     cx='22'     cy='12'     r='2'/>
                        <circle     cx='2'      cy='22'     r='2'/>
                        <circle     cx='12'     cy='22'     r='2'/>
                        <circle     cx='22'     cy='22'     r='2'/>
                    </svg>   
                </Navbar.Toggle>

                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto' style={{fontSize:'1rem',paddingTop:'.75rem',paddingBottom:'.05rem'}}>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div style={{position:'fixed',bottom:'10px',right:'10px',zIndex:999999999999}}>
                <svg version='1.1' x='0px' y='0px' fill='white' 
                    width='28px' height='28px' viewBox='0 0 24 24' 
                    enableBackground='new 0 0 24 24'>
                    <a href='/?virt=464927757&item=321'     ><circle cx='4'     cy='4'  r='3'/></a>
                    <a href='/?item=321'                    ><circle cx='20'    cy='12' r='3'/></a>
                    <a href='/?story&lg=281256182'  ><circle cx='4'     cy='20' r='4'/></a>
                </svg>   
            </div>
        </Col>
    )
}