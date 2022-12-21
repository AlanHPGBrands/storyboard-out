import React from 'react';
import {Row,Col} from 'react-bootstrap';
import aiLogo from '../../pics/comps/ai-pholder.png';

export default function CatInput(props){
    const {details,subset}=props;
    let imageArray=details[subset];

    return (
        <Row style={{justifyContent:'center',alignItems:'center'}} >
            {imageArray.map((c,d)=>{
                let ojUrl=window.URL.createObjectURL(c);
                let tpg=c.name.substring(c.name.lastIndexOf('.'));
                return (
                    <Col
                        sm={6} md={4} lg={3} key={'logoRow'+d.toString()}
                        style={{alignItems:'center',justifyContent:'center',padding:'1rem'}} 
                        >
                        <Row>
                            <Col>
                                {tpg === '.pdf' 
                                    ?<object aria-label='hiFromAria' style={{maxHeight:'120px',maxWidth:'120px'}} data={ojUrl} />
                                    :tpg === '.ai' || tpg === '.eps'
                                        ?<img src={aiLogo} style={{maxHeight:'120px',maxWidth:'120px'}} alt={'logo'+c.name} />
                                        :<img src={ojUrl} style={{maxHeight:'120px',maxWidth:'120px'}} alt={'logo'+c.name} />
                                }
                            </Col>
                        </Row>
                    </Col>
                )})}
        </Row>)
};