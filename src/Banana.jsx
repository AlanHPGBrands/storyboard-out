import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from './components/Panel.jsx'
import Navergation from './components/navergation'
import hpgwhite from './components/pics/comps/hpg_white_md.png'
import newIcon from './components/pics/new.svg';



let initialWhereVars =  {
        'CATS'          : false ,
        'CATSHIDDEN'    : false ,
        '_DEV'          : false ,
        'svgy'          : false ,
        'url_itemagram' : false ,
        'url_rid'       : false ,
        'url_src'       : false ,
        'url_tid'       : false ,
        'url_virntro'   : false ,
        'url_virt'      : false ,
        'url_virtagram' : false ,
    };

const hideBananas = /story|virt/i.test(window.location.search);

export default function Banana( ) {
    const [whereVars,setWhereVars]= useState(initialWhereVars);
    const colSizeNavBar = 4;
    return (
        <div 
            style={{
                backgroundColor : 'inherit' ,
                color : 'inherit' ,
                minHeight: '100vh' ,
                marginRight: '0px' ,
                overflow: 'hidden' ,
                height: '100%' ,
                marginBottom: '-120px' ,
                position: 'relative' ,
            }}
            >

            <Container fluid >

                <Row style={{display:hideBananas?'none':'flex',}} id='firstrowinapp'>
                    <Navergation
                        whereVars={whereVars }
                        setWhereVars={setWhereVars }
                        hpgLogo={hpgwhite }
                    />
                </Row>



        {!hideBananas&&
                <Row id='sercandrownapp' style={{backgroundColor: 'white',minHeight: '1px',fontSize: '1rem' }} >
                    <Col></Col>
                    <Col xs={colSizeNavBar}>
                        <Row>
                            <Col style={{fontWeight:600,letterSpacing:'.2rem',position:'relative',textAlign:'center',color :'black',textDecoration:'none',fontFamily :'Poppins',}}>
                                <a style={{color:'black',textDecoration:'none'}} id='headerLinkCatalogPlus' href='/' >
                                    {'CATALOG+'}
                                </a>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={colSizeNavBar} >
                        <Row>
                            <Col style={{fontWeight:600,letterSpacing:'.2rem',}} >
                                <img className={'d-none d-md-inline'} src={newIcon} alt="Icon for New Feature" width={35} />
                                <a                             
                                    style={{color :'black',textDecoration: 'none',fontFamily :'Poppins',}}
                                    id='headerLinkVideoPlus' href='https://www.storyboard.plus/?story' >
                                    { 'STORYBOARD+' }
                                </a>        
                            </Col>
                        </Row>
                    </Col>

                    <Col></Col>
                </Row>
                }

        {!hideBananas&&
                <Row 
                    id='NAVBOTTOM'
                    style={{
                        marginLeft      : '0px'     , 
                        marginRight     : '0px'     , 
                        justifyContent  : 'center'  ,
                        textAlign       : 'center'  ,
                        alignItems      : 'center'  ,
                    }}
                    >

                    <Col></Col>

                    <Col xs={colSizeNavBar}>
                        <Row style={{justifyContent:'center',textAlign:'center',alignItems:'center'}} >
                            <Col id='BLACKBARFORNAVBOTTOM'
                                style={{ 
                                    marginLeft      : '0px'     ,
                                    marginRight     : '0px'     , 
                                    backgroundColor : 'black'   , 
                                    paddingTop      : '4px'     ,
                                }}
                                xs={8}
                            ></Col>

                        </Row>
                    </Col>

                    <Col xs={colSizeNavBar} >
                        <Row style={{justifyContent: 'center' ,textAlign: 'center' ,alignItems: 'center'}} >
                            <Col id='secondBARFORNAVBOTTOM' xs={colSizeNavBar}
                                style={{ 
                                    marginLeft      : '0px'     ,
                                    marginRight     : '0px'     , 
                                    backgroundColor : 'inherit' , 
                                    paddingTop      : '4px'     ,
                                }}></Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
                }

                <Row sm={1} style={{marginLeft:'0px',marginRight:'0px',minHeight:'1px'}} >
                    <Col key={'colKey00'} style={{paddingTop:'5px',paddingLeft:'0px',paddingRight:'0px'}}>
                        <Panel whereVars={whereVars} />
                    </Col>
                </Row>

                <div style={{height:'120px'}} />

            </Container>

        {!hideBananas&&
            <div id='footer'
                style={ { 
                    position    : 'absolute'    ,
                    height      : '120px'       , 
                    bottom      : '0px'         ,
                    right       : '0px'         ,
                    overflow    : 'hidden'      ,
                } }
                >
                CATALOG+ is a Patent Pending tool.<br />
                © 2021 HPG. All Rights Reserved.   |   ASI #61966   |   SAGE #52284
                <br /><br />
            </div>
            }

        </div>
    );
};