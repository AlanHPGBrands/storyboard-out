import React , { useState } from 'react';
import                      {
    Row                     ,
    Col                     ,
    Button                  ,
}                           from 'react-bootstrap';
// const field0 =              'misc_0';
const field0 =              'named';
const field1 =              'img_cloud_url_o';
const field2 =              'result_id';
const caretWidth =          28;
const caretHeight =         12;
let cw =                    caretWidth;
let ch =                    caretHeight;
const pointsForSvg =        {
                                pointingUp   : `1,${ ch } ${ cw / 2 },1       ${ cw },${ ch }` ,
                                pointingDown : `1,1       ${ cw / 2 },${ ch } ${ cw },1`       ,
                            };

export default function RenderListyBIN( props ) {

    const {
        listy                   ,
        listyImages             ,
        sliceOfResults          ,
        handleListItemClick     ,
        handleSliceShift        ,
    } =                         props;

    const [ selectedListItemIndex , setSelectedListItemIndex ] = useState( 99 );
    const [ showSearchResults     , setShowSearchResults     ] = useState( true );
    
    
    
    return (
    <Col
        style={ {
            zIndex : 9999999   ,
        } }
        xs={ 12 }
        >
        <Row>

                {
                    listy 
                && listy.length > 0 
                && listyImages 
                && listyImages.length > 0 
                &&

            <Col>
                <Row
                    style={ {
                        marginBottom : '.25rem'    ,
                    } }
                    >

                    <Col
                        xs={ 12 }
                        >


                        <Row
                            id='headerOfSearchResults'
                            style={ {
                                // marginBottom    : '1rem'        ,
                                marginTop       : '.5rem'        ,
                                // backgroundColor : 'lightgreen'  ,
                            } }
                            >
                                                            
                            <Col
                                xs={ 2 }
                                style={ { 
                                    position    : 'relative'    ,
                                    height      : '25px'        ,
                                    minHeight   : '1px'         ,
                                } }
                                >

                                <div
                                    style={ {
                                        position    : 'absolute'    ,
                                        left        : '5px'         ,
                                        top         : '1px'         ,
                                        width       : '30px'        ,
                                        height      : '15px'        ,
                                        cursor      : 'pointer'     ,
                                    } }
                                    onClick={ ( ) => {
                                        setShowSearchResults( !showSearchResults );
                                    } }
                                    >
                                    <svg
                                        viewBox="0 0 51 31"
                                        width="52"
                                        height="22"
                                        >
                                        <polygon
                                            points={ showSearchResults ? pointsForSvg.pointingUp : pointsForSvg.pointingDown }
                                            style={ {
                                                fill            : '#6c757d' ,
                                                stroke          : '#6c757d' ,
                                                strokeWidth     : '3px'     ,
                                                strokeLinecap   : 'round'   ,
                                            } }
                                            />
                                    </svg>

                                </div>
                            </Col>


{ showSearchResults &&
<>
                            <Col 
                                xs={ 2 }
                                style={ {
                                    fontWeight  : 600       ,
                                    fontSize    : '1rem'    ,
                                    cursor      : 'pointer' ,
                                } }
                                onClick={ ( ) => { handleSliceShift( 'DEFECATE' ); } }
                                >
                                <Button
                                    style={{lineHeight:'1'}}
                                    variant='outline-secondary'
                                    size='sm'
                                    >
                                        <span style={{fontWeight:600,fontSize:'1rem'}}>
                                            { '<' }
                                        </span>
                                </Button>
                            </Col>
                            <Col
                                xs={ 4 }
                                style={ {
                                    fontWeight  : 600       ,
                                    fontSize    : '.9rem'   ,
                                    color       : '#6c757d' ,
                                    padding     : '2px'     ,
                                } }
                                >
                                { ( sliceOfResults[ 0 ] + 1 ) + '-' + ( sliceOfResults[ 1 ] > ( listyImages.length - 1 ) ? listyImages.length : sliceOfResults[ 1 ] ) }{ ' of ' + listyImages.length }
                            </Col>
                        

                            <Col 
                                xs={ 2 }
                                style={ {
                                    fontWeight      : 600       ,
                                    fontSize        : '1rem'    ,
                                    cursor          : 'pointer' ,
                                } }
                                onClick={ ( ) => { handleSliceShift( 'INCREMENT' ); } }
                                >
                                <Button
                                    style={{lineHeight:'1'}}
                                    variant='outline-secondary'
                                    size='sm'
                                    >
                                        <span style={{fontWeight:600,fontSize:'1rem'}}>
                                            { '>' }
                                        </span>
                                </Button>
                            </Col>
                            </>
                            }


                            { !showSearchResults &&
                            <Col 
                                xs={ 8 } 
                                onClick={ ( ) => setShowSearchResults( true ) }
                                style={ { 
                                    cursor : 'pointer' ,

                                } }
                                >
                                { 'Show Results' }
                            </Col>
                            }


                            <Col xs={ 2 }></Col>


                        </Row>



                    </Col>

                    </Row>

                    <Row
                        className='justify-content-center'
                        >





                { showSearchResults &&
                <>


                    { listyImages
                    .slice( sliceOfResults[ 0 ] , sliceOfResults[ 1 ] )
                    .map( word => ( { 
                        ...word , 
                        [ field0 ] : word[ field0 ][ 0 ].toUpperCase( ) + word[ field0 ].slice( 1 )
                    } ) )
                    .map( ( a , b ) => {

                        let coonTron =  selectedListItemIndex === sliceOfResults[ 0 ] + b;
                        let colron =    coonTron ? '#2c2c2c' : '#6c757d';
                        let foonQwn =   coonTron ? 800 : 600;
                        let fonGone =   coonTron ? '1rem' : '.95rem';
                        let twerds =    /\s/.test( a[ field0 ] )
                                            ? a[ field0 ]
                                                .substring( 0 , 15 ).split( ' ' )
                                                .map( word => (
                                                    typeof word !== 'undefined' 
                                                    && typeof word[ 0 ] !== 'undefined'
                                                    ? word[ 0 ].toUpperCase( ) + word.slice( 1 ) + ' '
                                                : ' ' ) ) : a[ field0 ]
                        return (
                            <Col
                                xs={ 8 }
                                sm={ 5 }
                                md={ window.innerWidth > 767 && window.innerWidth < 860 ? 5 : 10 }
                                lg={ 5 }
                                // xl={ 4 }
                                onClick={ ( ) => { 
                                    setSelectedListItemIndex( sliceOfResults[ 0 ] + b );
                                    setShowSearchResults( false );
                                    handleListItemClick( a[ field1 ] , a[ field2 ] );
                                } }
                                key={   ( sliceOfResults[ 0 ] + b )  + 'listyRowrow' }
                                id={    ( sliceOfResults[ 0 ] + b )  + 'listyRowrow' }
                                style={ {
                                    paddingBottom   : '.5rem'   ,
                                    fontSize        : fonGone   ,
                                    fontWeight      : foonQwn   ,
                                    textAlign       : 'left'    ,
                                    paddingRight    : '5px'     ,
                                    paddingLeft     : '5px'     ,
                                    zIndex          : 9999999   ,
                                    color           : colron    ,
                                    height          : '25px'    ,
                                } }
                                >
                                <span style={ { fontSize : '.6rem' } } >
                                    { ( sliceOfResults[ 0 ] + b + 1 ) + ' ' }
                                </span>
                                { twerds }
                            </Col>
                            ) } )
                            }

                        </>
                        }
                </Row>
</Col>

            }
                </Row>


            </Col>
    );
};

