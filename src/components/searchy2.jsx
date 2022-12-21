import React ,
    { useState }    from 'react';
import {
    Col         ,
    Form        ,
    Row         }   from 'react-bootstrap';
import nineLoading  from './pics/nineloading4.gif';
import { listyGsi } from './handlelisty.js';
import { def }      from './lib/helpers';
import RenderListyBIN  from './renderlistyBIN';



const sliceIncrement =          8;
const initialSliceOfResults =   [ 0 , sliceIncrement ];



export default function Searchy2( props ) {

    const [ listy           , setListy          ] = useState( [ ] );
    const [ isLoadingNow    , setIsLoadingNow   ] = useState( false );
    const [ svgee           , setSvgee          ] = useState( null );
    const [ sliceOfResults  , setSliceOfResults ] = useState( initialSliceOfResults );
    
    const { 
        setCurrentResultId      ,    
        labelStyleFromAbove     , 
        containerStyleFromAbove ,
        controlStyleFromAbove   ,
        placeHolderFromAbove    ,
        extraHandler            ,
    } =                         props;


    const containerStyle = { fontFamily  : 'Montserrat Subrayada' };

    if ( def( containerStyleFromAbove ) ) { 
        Object.assign( containerStyle , containerStyleFromAbove );
    }; 
    
    let labelStyle =    { letterSpacing : '.1rem' }
    if ( def( labelStyleFromAbove ) ) { Object.assign( labelStyle , labelStyleFromAbove ); };


const [ charactersExistInInput , setCharactersExistInInput ] = useState( false );

    async function handleListyLocal( inny ) {

        if ( inny.length === 0 ) {
            setCharactersExistInInput( false );
        } else if ( inny.length > 0 ) {
            setCharactersExistInInput( true );
        } else {
            // console.log( 'ion know' );
        };
        
        setListy( [ ] );
        setSliceOfResults( initialSliceOfResults );

        if ( inny.length === 0 ) {
            return false;
        };


        setIsLoadingNow( true );
    
        let ninny = inny.trim( ).toLowerCase( );
    
        // L I G H T N I N G D I C K ! ! !
        listyGsi( 
            'namedByVctrzdSortName' , 
            { vectorized : 'true'   ,
              named : { beginsWith : ninny }
        } )
        .then( res => {
            // console.log( res );
            setListy( res );
            setIsLoadingNow( false );
        } )
        .catch( err => {
            console.log( err );
        } )
    };





    function handleSliceShift( incrementOrDecrement ) {
        console.log( incrementOrDecrement );

        const addOrSubtract =   input => ( incrementOrDecrement === 'INCREMENT' 
                                    ? [ 
                                        parseInt( input[ 0 ] ) + sliceIncrement ,
                                        parseInt( input[ 1 ] ) + sliceIncrement ,
                                    ]
                                    : [ 
                                        parseInt( input[ 0 ] ) - sliceIncrement ,
                                        parseInt( input[ 1 ] ) - sliceIncrement ,
                                    ]
                                );

        let tempSlice =         JSON.parse( JSON.stringify( sliceOfResults ) );
        let newSlice =          addOrSubtract( tempSlice );

        if ( newSlice[ 0 ] > listy.length ) {
            newSlice = initialSliceOfResults;
        };

        if ( newSlice[ 1 ] < 0 ) {
            newSlice = [  listy.length - sliceIncrement ,  listy.length ]
        };

        setSliceOfResults( newSlice );
    };



    function handleListItemClick( fal , id ) {
        console.log( 'CHEREUSSE' );
        // console.log( fal );
        console.log( id );
        if ( typeof extraHandler !== 'undefined' ) {
            extraHandler( true );
        };
        if ( typeof setCurrentResultId !== 'undefined' ) {
            console.log( 'Setting CurrentResultId : ' + id );
            setCurrentResultId( id );
        };
    };

    
    

    let placeHolder =       def( placeHolderFromAbove ) ? placeHolderFromAbove : 'Logo From Library';

    const formFields =      [ [ placeHolder , 'Search Logos' , 123 ] ];

    let controlStyle =      { 
                                minWidth    : '230px'   ,
                                maxWidth    : '500px'   ,
                                width       : '90%'     ,
                                marginLeft  : 'auto'    , 
                                marginRight : 'auto'    ,
                                fontSize    : '.9rem'   ,
                                padding     : '.375rem' ,
                            };

    if ( def( controlStyleFromAbove ) ) {
        Object.assign( controlStyle , controlStyleFromAbove );
    };




    return (
        <Col 
            id='searchTuey'
            style={ { 
                ...containerStyle ,
            } }
            xs={ 12 }
            style={ {
                color           : 'black'   ,
                backgroundColor : '#f9f9f9'   ,
                // color           : 'white'   ,
                // backgroundColor : 'black'   ,
                // paddingBottom   : '1rem'    ,
            } }
            >
            <Row
                className='justify-content-center'
                style={ {
                    backgroundColor : '#f9f9f9' ,
                    // backgroundColor : 'black' ,
                } }
                >


            { typeof formFields !== 'undefined' && 
                <Col
                    xs={ 12 }
                    style={ { 
                        textAlign       : 'center'  ,
                        // marginTop       : '1.25rem' ,
                        // marginBottom    : '.5rem'   ,
                    } }
                    >
                    {
                    formFields.map( ( field , f ) => (
                    <Form.Group                
                        style={ {
                            backgroundColor :'#f9f9f9'
                            // backgroundColor :'black'
                        } }
                        key={ f + 'ffgrp' } 
                        controlId={ "exampleFfforontrolInput" + f }  
                        > 
                        <Form.Label
                            id={ field[ 1 ] + 'id' } 
                            style={ labelStyle }
                            >
                            { field[ 1 ] }
                        </Form.Label>

                        <div 
                            style={ {
                                position    : 'relative'    ,
                                marginLeft  : 'auto'        ,
                                marginRight : 'auto'        ,
                            } }
                            >
                            <Form.Control
                                style={ controlStyle }
                                onChange={ event => { handleListyLocal( event.target.value ); } }
                                type={ field[ 1 ] }
                                placeholder={ field[ 0 ] }
                                size='md' 
                            />

                            { isLoadingNow && 
                                <img
                                    style={ {
                                        position    : 'absolute'    ,
                                        top         : '5px'         ,
                                        right       : '25%'         ,
                                        opacity     : .6            ,
                                    } }
                                    src={ nineLoading } 
                                    alt='loading' 
                                    width={ 20 }
                                    height={ 20 }        
                                /> 
                            }
                        </div>
                    </Form.Group> ) )
                    }
                </Col>
            }
            </Row>


            <Row >
                <Col
                    style={ {
                        zIndex      : 9999999   ,
                        fontSize    : '1rem'    ,
                        fontWeight  : 500       ,
                    } }
                    xs={ 12 }
                    >
                    { ( 
                        ( !listy || listy.length < 1 ) 
                        && !isLoadingNow 
                        && !charactersExistInInput
                    )
                    &&
                    <span
                        style={ { 
                            fontWeight : 600 ,
                        } }
                        >
                        { 'Type to select your logo from our library.' }
                    </span> 
                    }




                    { charactersExistInInput && listy.length === 0 &&
                    <>{ 'No results' }</>
                    }



                    {
                       listy 
                    && listy.length > 0 
                    &&
                    <RenderListyBIN
                        listy={ listy }
                        sliceOfResults={ sliceOfResults }
                        handleListItemClick={ handleListItemClick }
                        handleSliceShift={ handleSliceShift }
                        listyImages={ listy }
                    />
                    }
                </Col>
            </Row>
            { svgee && <div>{ svgee }</div> }
    </Col>
    );
};
