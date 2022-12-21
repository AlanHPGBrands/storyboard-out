import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import hpgLogoText from './static/storyboardlogotextonly.svg';
import storyboardLogo from './static/storyboardlogobracketsonly.svg';

export default function StoryBoardLogo(){
    return (
    <Row style={{cursor:'pointer'}}  onClick={()=>{window.location.href='./?story'}} className='justify-content-center'>
        <Col
            className={'hideSmall d-none d-sm-block'} xs={'auto'}
            style={{textAlign:'center',fontWeight:500,fontFamily:'Poppins',}}>
            <img src={storyboardLogo} alt='brackets' width={30} />
        </Col>
        <Col
            className={'hideSmall d-none d-md-block'} xs={'auto'}
            style={{textAlign:'center',fontWeight:500,fontFamily:'Poppins',}}>
            <img src={hpgLogoText} alt='hpglogotext' width={140} />
        </Col>
    </Row>
);
}
StoryBoardLogo.displayName='StoryBoardLogo';
