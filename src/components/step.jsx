import React        from 'react';
import Row          from 'react-bootstrap/Row'
import Col          from 'react-bootstrap/Col'



export default function Step( props ) {
    var { step , stepMessage , allSubmitted } = props;
    return (
        <Row
            style={ {
                alignItems      : 'center'  , 
                justifyContent  : 'center'  ,
                padding         : '.5rem'   ,
                paddingTop      : '1.5rem'    ,
            } } >
            <Col className='step'
                style={ { 
                    fontSize : '1rem' ,
                    letterSpacing : '.05rem' ,
                    fontFamily : 'Open Sans' , 
                    fontWeight : '600'
                } }
                >
                <span style={ { fontSize : '1.1rem' , fontWeight : '600' } } >
                    { !allSubmitted ? step + ' : ' : '' }
                </span>
                <br/>
                {
                !allSubmitted
                ?
                stepMessage
                :
                ''
                }
            </Col>
        </Row>
    );
};
