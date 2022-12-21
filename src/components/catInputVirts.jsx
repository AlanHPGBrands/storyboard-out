import React , { useEffect }    from 'react';
import { 
    Row     ,
    Col     ,
    Form    ,
                     }          from 'react-bootstrap';
import aiLogo                   from './pics/comps/ai-pholder.png';


const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/








export default function CatInput( props ) {


    const { 
        details     ,
        subset      ,
        setInput    ,
        predictions ,
                    } = props;

    console.log( predictions );

    let imageArray = details[ subset ];

    useEffect( ( ) => {

        var starter = imageArray
            .map( ( m , n ) => {
                return predictions[ n ] !== 'undefined'
                        ? predictions[ n ] : false;
            } );

        setInput( 'imgInputs' , starter );

    } , [ imageArray ] );






    function setLogoInputValue( i , v ) {

        console.log(    v );
        let atales =    JSON.parse( JSON.stringify( details.imgInputs ) );
        atales[ i ] =   v;
        setInput(       'imgInputs' , atales );

    };




    return (
        <Row style={ {
                justifyContent  : 'center' ,
                alignItems      : 'center' ,
            } } 
            >
            {
            imageArray.map( ( c , d ) => {
                var ojUrl = window.URL.createObjectURL( c );
                var tpg =   c.name.substring( c.name.lastIndexOf( '.' ) );
                let placeHolder = predictions.length > 0 && typeof predictions[ d ] !== 'undefined'
                                    ? predictions[ d ].toLowerCase( ) : 'logo name';
                return (
                    <Col
                        sm={ 6 }
                        md={ 4 }
                        lg={ 3 }
                        key={ 'logoRow' + d.toString( ) }
                        style={ { alignItems : 'center' , justifyContent : 'center' , padding : '1rem' } } 
                        >
                        <Row>
                            <Col>
                                { 
                                tpg === '.pdf' 
                                ?
                                <object 
                                aria-label='hiFromAria'
                                style={ { maxHeight: '120px' , maxWidth : '120px' } } 
                                data={ ojUrl } />
                                :
                                tpg === '.ai' || tpg === '.eps'
                                ? 
                                <img 
                                src={ aiLogo }
                                style={ { maxHeight: '120px' , maxWidth : '120px' } } 
                                alt={ 'logo' + c.name } 
                                />
                                :
                                <img 
                                src={ ojUrl }
                                style={ { maxHeight: '120px' , maxWidth : '120px' } } 
                                alt={ 'logo' + c.name } />
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col>

                                <Form>
                                    { [
                                            [ 'Logo Name' , 'logoname' , false ]
                                        ]
                                        
                                        .map( ( field , f ) => {

                                        return (
                                            <Form.Group key={ f + 'ffgrp' } 
                                                controlId={ "exampleFfforontrolInput" + f }  >
                                                <br />
                                                <Form.Label 
                                                    id={ field[ 1 ] + 'id' } 
                                                    style={ {
                                                        letterSpacing : '.1rem' ,
                                                    } } >
                                                    { field[ 0 ] }
                                                </Form.Label>

                                                <Form.Control
                                                    style={ { maxWidth : '400px' , width : '80%' , marginLeft : 'auto' , marginRight : 'auto'
                                                        , color : ( ( /email/i.test( field[ 1 ] ) ) && ( !regEmail.test( details.email ) ) ) ? 'red' : '#32363a' } }
                                                    onChange={ event => {
                                                        setLogoInputValue( d , event.target.value )
                                                    } }
                                                    type={ field[ 1 ] }
                                                    placeholder={ placeHolder }
                                                    size='md' />
                                            </Form.Group> 
                                        )
                                    } ) }
                                </Form>


                            </Col>
                        </Row>

                    </Col>
                )
            } )
            }
        </Row>
    )
}

