import React , { useState , useRef }    from 'react';
import { Button , Alert , Row , Col }               from 'react-bootstrap';

export default function CopyLink( props ) {
    const { linky } =                       props;
    const [ showAlert , setShowAlert ] =    useState( false );
    const textAreaRef =                     useRef( null );
    console.log(linky);

    function copyToClipboard( e ) {
        textAreaRef.current.select( );
        document.execCommand( 'copy' );
        e.target.focus( );
        setShowAlert( true );
        setTimeout( ( ) => { setShowAlert( false ); } , 1200 );
    };

    return (
        <Col>
            {
            document.queryCommandSupported( 'copy' ) &&
            <Row>
                <Col
                    style={ { 
                        textAlign : 'center'
                    } } >
                <Button
                    className='overridepurp btn-tranny'
                    style={ { padding : '.25rem 1.25rem' , fontSize : '.8rem' } }
                    onClick={ copyToClipboard } 
                    >
                    Copy Link
                </Button> 
                { showAlert ? 
                        <Alert 
                            style={ {
                                position :          'absolute' ,
                                top :               '.15rem' ,
                                padding :           '.2rem 1.25rem' ,
                                fontSize :          '.75rem' ,
                                backgroundColor :   'black' ,
                                color :             'white'
                            } }
                            >
                            Link Copied
                        </Alert> : '' }
                </Col>

            </Row>
            }
            <form
                style={ { 
                    opacity : 0 ,
                    width : '2px' ,
                    height : '2px'    
                } } 
                >
                <textarea
                    ref={ textAreaRef }
                    value={ 
                    'https://www.hpgspectra.com/?' 
                    + (/id=(.+)/.test(linky)
                        ?'id='+linky.match(/id=(.+)/)[1]
                        :/tt=(.+)/.test(linky)
                            ?'tt='+linky.match(/tt=(.+)/)[1]
                            :'')
                    }
                    onChange={ ( ) => { console.log( linky + ' -NEEDED ONCHANGE TO SUBVERT REACT ERROR') } }
                />
            </form>
        </Col>
    );
};
