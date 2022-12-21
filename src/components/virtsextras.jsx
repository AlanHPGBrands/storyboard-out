import React , { useState , useEffect } from 'react';
import { API , graphqlOperation as gqlo , Storage }         from 'aws-amplify';
              
import {
    getWars
    } from '../utils/getBuckets.js';
import { Row , Col , Dropdown , Button } from 'react-bootstrap';
import * as queries from '.././graphql/queries';









export default function VirtsExtras( props ) {
const { 
    currentProductNumber    ,
    setCurrentProductNumber ,
    showExtras              ,
    setItemDataFromAbove    ,
} = props;



    const [ itemData                    , setItemData                   ] = useState( );
    const [ itemDataObject              , setItemDataObject             ] = useState( );
    const [ availableKeywords           , setAvailableKeywords          ] = useState( [ ] );
    const [ noOfColumnsArray            , setNoOfColumnsArray           ] = useState( [ '1' , '2' , '3' ] );
    const [ productNumbersAvailable     , setProductNumbersAvailable    ] = useState( [ ] );
    const [ chosenKeyword               , setChosenKeyword              ] = useState( 'nantuket' );
    const [ productsByKeywords          , setProductsByKeywords         ] = useState( );

    function handleSettingItemData( theData ) {
        if ( typeof setItemDataFromAbove !== 'undefined' ) {
            setItemDataFromAbove( theData );
        } else {
            // setItemData( theData );
        };
    };

    // const [ rachelKeywords , setRachelKeywords ] = useState( );
    // const [ rachelProdNames , setRachelProdNames ] = useState( );
    // const [ rachelProdNums , setRachelProdNums ] = useState( );

    // useEffect( ( ) => {
    // async function getWARSfromBucket( ) {


    //     let productDataBaby;
        
    //     try {
    //         let tempBaby = await API.graphql( gqlo(
    //             queries[ 'listRachelProducts' ]
    //         ) );
    //         console.log( tempBaby );

    //         if ( 
    //             tempBaby
    //             && tempBaby.data
    //             && tempBaby.data.listRachelProducts
    //             && typeof tempBaby.data.listRachelProducts.items[ 0 ] !== 'undefined'
    //             ) {
    //                 console.log( 'LISTRACHELPRODUCTS' );
    //                 console.log( tempBaby.data.listRachelProducts.items );
    //                 productDataBaby = tempBaby.data.listRachelProducts.items;

    //             }

    //     if ( typeof productDataBaby !== 'undefined' ) {
    //         let ks = [ ];
    //         productDataBaby.forEach( m => {
    //             let mmm = m.keywords.split( ',' ).map( mim => mim.replace( '[' , '' ).replace( ']' , '' ) )
    //             mmm.forEach( mmm => {
    //                 if ( !ks.includes( mmm ) ) { ks.push( mmm ); }
    //         } )
    //         } )
    //         console.log( ks );
    //         setRachelKeywords( ks )



    //         let ms = productDataBaby.map( m => {
    //                 return ( m.product_name )
                    
    //             })
    //             console.log( ms );
    //             setRachelKeywords( ms )
    //         let ns = productDataBaby.map( m => {
    //             return ( m.product_number )
                
    //         })
    //         console.log( ns );
    //         setRachelKeywords( ns )
    //     }
    // } catch ( e ) {
    //     console.log( e );
    // };

    // if ( productDataBaby && typeof productDataBaby !== 'undefined' ) {
    //     let tempObjjj = { };
    //     productDataBaby.forEach( p => { tempObjjj[ p.itemNumber ] = p; } )
    //     setItemData( productDataBaby );
    //     handleSettingItemData( productDataBaby );
    //     setItemDataObject( tempObjjj );
    // };
    // return productDataBaby;
    // };
    // getWARSfromBucket( )

    // } , [ ] )



        useEffect( ( ) => {
            async function getProductsFromBucket( ) {
                let folderName =            'PORTAL/VIRTUALS/HUB/';
                let pollForProducts =       await Storage.list( folderName );
                let preProductNumbersOnly = pollForProducts.map( m => m.key.replace( folderName , '' ) );
                let productNumbersOnly =    preProductNumbersOnly.map( m => m.substring( 0 , m.indexOf( '/' ) ) );
                let uniqueProds =           [ ];
                productNumbersOnly.forEach( pn => {
                    if ( !uniqueProds.includes( pn ) ) { 
                        uniqueProds.push( pn );
                 } } );
    
                 let tempAvailableKeywords = [ ];
                 let tempProductsByKeywords = { };
    
    
                let tempProductsByKeywords2 =    pollForProducts
                                                .map( m => m.key.replace( folderName , '' ) )
                                                .filter( m => /VARS/i.test( m ) &&  /n=(#[A-Za-z0-9#-]{1,35}),/i.test( m ) )
    
                tempProductsByKeywords2
                            .forEach( m => {
                                let kis = m
                                            .match( /n=(#[A-Za-z0-9#-]{1,35}),/ )[ 1 ]
                                            .split( '#' )
                                            .filter( f => {
                                                if ( !tempAvailableKeywords.includes( f ) && f.length > 0 ) {
                                                    tempAvailableKeywords.push( f );
                                                };    
                                                return ( f.length > 0 )
                                            } );
                                tempAvailableKeywords.push( );
                                let itemNum = /a=([A-Za-z0-9-]{1,20}),/.test( m )
                                                ? m.match( /a=([A-Za-z0-9-]{1,20}),/ )[ 1 ]
                                                : 'asdf';
                                tempProductsByKeywords[ itemNum ] = {
                                    itemNumber  : itemNum ,
                                    filename    : m , 
                                    keywords    : kis , 
                                }
                            } );
    
                setAvailableKeywords( tempAvailableKeywords );
                setProductsByKeywords( tempProductsByKeywords );
                console.log( 'uniqueProds' );
                console.log( uniqueProds );
                console.log( uniqueProds.length )
                setProductNumbersAvailable( uniqueProds );
            };
            getProductsFromBucket( );
        } , [ ] );
    
        



if ( !showExtras ) {
    return null;
}



return (
    <>

    
    {
        Array.isArray( productNumbersAvailable )
        && productNumbersAvailable.length > 0
        && Array.isArray( availableKeywords )
        && availableKeywords.length > 0
        && chosenKeyword
        &&
        <>
        <Row
            style={ { 
                fontSize        : '.6rem'   ,
                lineHeight      : 1.2       ,
                textDecoration  : 'none'    ,
                paddingBottom   : '1rem'    ,
            } }
            >

            <Col
                xs={ 4 }
                >
                <Dropdown
                    onSelect={ e => {
                        console.log( e );
                        setChosenKeyword( e );
                    } }
                    >
                    <Dropdown.Toggle
                        size='sm'
                        variant="outline-secondary"
                        id="dropdown-basic"
                        >
                        { chosenKeyword === 'nantuket' ? 'Filter' : chosenKeyword }
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu>  
                    {
                    availableKeywords.map( ( kw , kwIdx ) => {

                    return (
                        <Dropdown.Item 
                            key={ kw + 'kikidouluvme' } 
                            eventKey={ kw }
                            >
                            { kw }
                        </Dropdown.Item>
                        )
                    } )
                    }
                    </Dropdown.Menu>
                </Dropdown>
            </Col>

        <Col 
            xs={ 3 }
            style={ {
                opacity : chosenKeyword === 'nantuket' ? .2 : 1 ,
            } }
            onClick={ ( ) => { 
                if ( chosenKeyword === 'nantuket' ) {
                } else {
                    setChosenKeyword( 'nantuket' );
                } }
                }
            >
            <svg
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                x="0px" y="0px"
                viewBox="0 0 507.2 507.2" 
                style={ { enableBackground : `new 0 0 507.2 507.2` } } 
                width={ '25px' }
                height={ '25px' }
                >
                <circle style={ { fill : '#F15249' } } cx="253.6" cy="253.6" r="253.6"/>
                <path style={ { fill: '#AD0E0E' } } d="M147.2,368L284,504.8c115.2-13.6,206.4-104,220.8-219.2L367.2,148L147.2,368z"/>
                <path style={ { fill: '#FFFFFF'  } } d="M373.6,309.6c11.2,11.2,11.2,30.4,0,41.6l-22.4,22.4c-11.2,11.2-30.4,11.2-41.6,0l-176-176
                c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L373.6,309.6z"/>
                <path style={ { fill : '#D6D6D6'  } } d="M280.8,216L216,280.8l93.6,92.8c11.2,11.2,30.4,11.2,41.6,0l23.2-23.2c11.2-11.2,11.2-30.4,0-41.6
                L280.8,216z"/>
                <path style={ { fill : '#FFFFFF'  } } d="M309.6,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6L197.6,373.6
                c-11.2,11.2-30.4,11.2-41.6,0l-22.4-22.4c-11.2-11.2-11.2-30.4,0-41.6L309.6,133.6z"/>
            </svg>
        </Col>

        
        <Col
            xs={ 4 }
            >
            <Button 
                size='sm'
                className='outline-secondary btn-tranny' 
                onClick={ ( ) => {
                if ( noOfColumnsArray.length === 4 ) {
                    setNoOfColumnsArray( ['x','x','x','x','x','x'])
                } else if ( noOfColumnsArray.length === 6 ) {
                    setNoOfColumnsArray( [ 'x' ] )
                } else {
                    setNoOfColumnsArray( [ ...noOfColumnsArray , 'x' ] );
                } } }
                >
                { noOfColumnsArray.length === 6 ? '-' : '+' } { 'columns' }
            </Button>
        </Col>


    </Row>

    <Row
        style={ { 
            fontSize        : '.8rem'   ,
            lineHeight      : 1.2       ,
            textDecoration  : 'none'    ,
        } }
        >
            {
        [ 'xyz' , ...noOfColumnsArray ].map( ( a , b , c ) => {
        let divideBy =      c.length - 1;
        let xs =            12 / divideBy;
        let incrementsOf =  parseInt( 
            productNumbersAvailable.length / divideBy - 1
        );
        return (
        <Col
            key={ chosenKeyword + 'key3dd' + b }
            xs={ xs }
                >
            { productNumbersAvailable
            .slice( (b) * incrementsOf , ( b + 2 - 1) * incrementsOf )
            .filter( f => {
                if ( chosenKeyword !== 'nantuket' ) {
                    return (
                        typeof productsByKeywords[ f ] !== 'undefined' 
                        && Array.isArray( productsByKeywords[ f ][ 'keywords' ] )
                        && productsByKeywords[ f ].keywords.includes( chosenKeyword )
                    )
                };
                return true;
            } )
            .map( ( pna , pnaIdx ) => (
            <Row
                key={ 'productAvailable' + pna }
                >
                <Col
                    xs={ 12 }
                    style={ {
        fontSize : '.5rem' ,

                        textDecoration  : 'none'                ,
                        listStyle       : 'none'                ,
                        cursor          : 'pointer'             ,
                        borderBottom    : '1px solid lightgray' ,
                        fontWeight      : currentProductNumber === pna
                        ? 600 : 400 ,
                        textAlign : 'left' ,
                    backgroundColor : currentProductNumber === pna
                                        ? 'green' 
                                        : itemDataObject && itemDataObject[ pna ]
                                        ? 'whitesmoke' : 'inherit'      } }
                    onClick={ ( ) => {
                        setCurrentProductNumber( pna );
                        setChosenKeyword( 'nantuket' );
                    } }
                    >
                    { ( ( b * incrementsOf ) + pnaIdx ) + '. ' + ( itemDataObject && itemDataObject[ pna ] ? itemDataObject[ pna ].itemName : pna ) }
                </Col>
            </Row>
            ) ) }
        </Col>
        ) } )
        }


        </Row>
        </>
        }

</>
);
    };