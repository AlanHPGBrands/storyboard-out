import React, {useState} from 'react';
import {useDistributorLogos} from './usedistributorslogos.js';
import VerticalSelect from './verticalSelectForStoryboardBrands';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RenderSvgElement from '../../rendersvgelement.jsx';

export default function LogosVerticalSelect({handleSelect,email,moMoney}){
    const logos = useDistributorLogos(email);
    console.log(logos);
    const booboos= logos&&logos.map(m=>({
        label:  m.id,
        logo:   m.logo.nm?m.logo.nm:'aa'
        // m.logo&&typeof m.logo!=='undefined'?
                //     <RenderSvgElement 
                //     currentSvg={m.logo}
                //     svgStyleFromAbove={{width:'60px',height:'20px'}}
                // />
                // :null
        }));


    return(
    <Col>
        <Row >
            <Col
                style={{
                    backgroundColor:'white',borderRadius:'10px',
                    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
                }}
                >
                    <div style={{position:'relative',width:'100%',height:'100%'}}>
        
                <div style={{marginTop:'.5rem',}}>
                    {
                    Array.isArray(booboos)
                    ?
                    <VerticalSelect 
                        handleSelect={(v)=>{
                            console.log(v);
                            if (v.label){
                                console.log(v.label);
                                handleSelect(v.label);
                            }
                        }}
                        brands={booboos?booboos:[{label:''}]}
                        titulo={'Your Logos'}
                        optionBoxWidth={300}
                        styleProp={{position:'absolute',top:'10px',left:'0px',border:'3px solid red',zIndex:4000,backgroundColor:'yellow',}}  
                    />
                    :<>Loading...</>
                    }
                </div>

                {/* <div style={{marginTop:'.4rem'}}>
                    {moMoney&&moMoney}
                </div> */}
                </div>
  </Col>
        </Row>
    </Col>
    );
};