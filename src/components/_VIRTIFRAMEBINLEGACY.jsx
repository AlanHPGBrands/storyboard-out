import React,{useEffect,useState,useRef} from 'react';
import {Row,Col} from 'react-bootstrap';
import Storage from '@aws-amplify/storage';
import Canvas from './virtualscanvas';
import VirtualsWorkBox from './_VIRTUALSWORKBOXLEGACY';
import {help}from './help.js';
import {maker}from '../utils/mkSvgs.js';
import undoarrow from './pics/comps/undo-arrow.svg';
import {getSvgTextFromId,getSvgTextFromIdVersion,getSvgMaskTextFromBucketUrl,getBackgrounds} from '../utils/_GETBUCKETSLEGACY';
import TNC from './tnc.jsx';
import VirtsExtras from './virtsextras';
import {doNewSave} from './canvasUtitlites';
import './cApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const convert = require( 'color-convert' );
const bucketUrlBase = 'https://plodes-bucket20445-dev.s3.amazonaws.com/public/';
var idFumEarl=typeof window.location.search!=='undefined' &&/virt=/i.test(window.location.search)
              ? window.location.search.toString().match(/virt=([0-9]{0,11})/)[1]:null;
var itemNoFromUrl=typeof window.location.search!=='undefined'&&/item=([A-Za-z0-9]{0,11})/i.test(window.location.search)
                  ?window.location.search.toString().match(/item=([A-Za-z0-9]{0,11})/)[1].toUpperCase():null;
const brndSrcFrmUrl='HUB';
const giveArray=(ll,mm)=>{let tempArray=[],start=mm?mm:0;for(var i=start;i<ll;i++){tempArray[i]=i;}return tempArray;};
const initialFilter=[/zxyz/i];
let initialSvgsPropsArray=[{svgContent:'textySP1',name:'fakeSP1',description:'fakeMulticolor on Light',helpContent:help.multlight}];
let initialSvg={
    nm          : 'name'                ,
    dsc         : 'Multicolor on Light' ,
    vb          : [ 0 , 0 , 999 , 999 ] ,
    grps        : 'topAssGroups'        ,
    clrs        : [ '#efefef' ]         ,
    nitClrs     : [ '#efefef' ]         ,
    initClr     : '#efefef'             ,
    whitest     : '#efefef'             ,
    blackest    : '#efefef'             ,
    aRatio      : 4 / 3                 ,
};


export default function VirtualsIframe(props){
    let {url_virt,url_item,qBuk}=props;
    let fromPage='virtPage',initialRecommendedColor='#c3ff51';
    const canvasRef                                                       = useRef( null );
    const bgImageLoadedRef                                                = useRef( null );
    const productImageLoadedRef                                           = useRef( null );
    const svgImageLoadedRef                                               = useRef( null );
    const svgMaskImageLoadedRef                                           = useRef( null );
    const overlayImageLoadedRef                                           = useRef( null );
    const currentBrand                                                    = useRef( brndSrcFrmUrl );
    const fullColorBitmapImageLoadedRef                                   = useRef(null);
    const [ fullColorBitmaps            , setFullColorBitmaps           ] = useState(null);
    const [ imigEleFullColorBitmap      , setImigEleFullColorBitmap     ] = useState(null );
    const [ bitmapOnImprintArea         , setBitmapOnImprintArea        ] = useState(false);
    const [ currentProductNumber        , setCurrentProductNumber       ] = useState(itemNoFromUrl && !/tellme/i.test( itemNoFromUrl ) ? itemNoFromUrl : '96004' );
    const [ currentProductDB            , setCurrentProductDB           ] = useState(null );
    const [ currentResultId             , setCurrentResultId            ] = useState(typeof url_virt!=='undefined'?url_virt:idFumEarl); 
    const [ berkgroundsBucket           , setBerkgroundsBucket          ] = useState([]);
    const [ selectedBgIndex             , setSelectedBgIndex            ] = useState(0);
    const [ penkirksBucket              , setPenkirksBucket             ] = useState([] );
    const [ selectedPenIndex            , setSelectedPenIndex           ] = useState(0);
    const [ overiesBucket               , setOveriesBucket              ] = useState([] );
    const [ svgs                        , setSvgs                       ] = useState([initialSvg ] );
    const [ svgsPropsArray              , setSvgsPropsArray             ] = useState(initialSvgsPropsArray );
    const [ his                         , setHis                        ] = useState([] );
    const [ wU                          , setWU                         ] = useState(giveArray( 7 ).map( m => false ) );
    const [ showVersionByKey            , setShowVersionByKey           ] = useState('Multicolor on Light' );
    const [ pbIsActive                  , setPbIsActive                 ] = useState(false );
    const [ imprintFilter               , setImprintFilter              ] = useState(initialFilter );
    const [ showCopy                    , setShowCopy                   ] = useState(true );
    const [ recommendedColor            , setRecommendedColor           ] = useState(initialRecommendedColor );
    const [ svgWhiteUnderlay            , setSvgWhiteUnderlay           ] = useState();
    const [ errorMessage                , setErrorMessage               ] = useState( );
    const [ rotationByProdFilename      , setRotationByProdFilename     ] = useState(0)
    const [ rotation2ByProdFilename     , setRotation2ByProdFilename    ] = useState(0)
    const [ customOneColor              , setCustomOneColor             ] = useState(false);
    const [ patternOn                   , setPatternOn                  ] = useState(false);
    const [ rotationCurrentSvg          , setRotationCurrentSvg         ] = useState(1);
    const [ recommendedOpacity          , setRecommendedOpacity         ] = useState(null);
    const [ canvasSaved                 , setCanvasSaved                ] = useState(false);
    const [ flyerUrl                    , setFlyerUrl                   ] = useState(null);
    const [ extraRotate                 , setExtraRotate                ] = useState(0 );
    const [ designPatterns              , setDesignPatterns             ] = useState([ ] );
    const [ svgMaskForProductImage      , setSvgMaskForProductImage     ] = useState();
    const [ svgMaskForProductImage2     , setSvgMaskForProductImage2    ] = useState();
    const [ svgPatternForProductImage   , setSvgPatternForProductImage  ] = useState();
    const [ svgPattern                  , setSvgPattern                 ] = useState();
    const [ maskBackgroundColor         , setMaskBackgroundColor        ] = useState( '#ffffff' );
    const [ svgPatternForFlyer          , setSvgPatternForFlyer         ] = useState( [ ] );
    const [ includeWhiteUnderlay        , setIncludeWhiteUnderlay       ] = useState( false );
    const [ svgPatternUnderForFlyer     , setSvgPatternUnderForFlyer    ] = useState( [ ] );
    const [ showCanvas                  , setShowCanvas                 ] = useState( false );
    const [ imigEleBg                   , setImigEleBg                  ] = useState( null );
    const [ imigEleProd                 , setImigEleProd                ] = useState( null );
    const [ imigEleSvg                  , setImigEleSvg                 ] = useState( null );
    const [ imigEleSvg2                 , setImigEleSvg2                ] = useState( null );
    const [ imigEleSvgMask              , setImigEleSvgMask             ] = useState( null );
    const [ imigEleSvgMask2             , setImigEleSvgMask2            ] = useState( null );
    const [ imigEleSvgPattern           , setImigEleSvgPattern          ] = useState( null );
    const [ imigEleSvgPattern2          , setImigEleSvgPattern2         ] = useState( null );
    const [ imigEleOverlay              , setImigEleOverlay             ] = useState( null );
    const [ svgBlobURL                  , setSvgBlobURL                 ] = useState( null );
    const [ svgBlobURL2                 , setSvgBlobURL2                ] = useState( null );
    const [ svgMaskBlobURL              , setSvgMaskBlobURL             ] = useState( null );
    const [ svgMaskBlobURL2             , setSvgMaskBlobURL2            ] = useState( null );
    const [ svgPatternBlobURL           , setSvgPatternBlobURL          ] = useState( null );
    const [ svgPatternBlobURL2          , setSvgPatternBlobURL2         ] = useState( null );
    const [ svgPatternUNDERBlobURL      , setSvgPatternUNDERBlobURL     ] = useState( null );
    const [ flyerSvgStyle               , setFlyerSvgStyle              ] = useState( false );
    const [ flyerSvgStyle2              , setFlyerSvgStyle2             ] = useState( false );
    const [ flyerSvgMaskStyle           , setFlyerSvgMaskStyle          ] = useState( false );
    const [ passDeez                    , setPassDeez                   ] = useState( null );
    const [ designOn                    , setDesignOn                   ] = useState( false );
    const [ bgChecked                   , setBgChecked                  ] = useState( true );
    const [ imageElementsForFlyer       , setImageElementsForFlyer      ] = useState( [ ] );
    const [ blobURLS                    , setBlobURLS                   ] = useState( [ ] );
    const [ allPenkirks                 , setAllPenkirks                ] = useState( [ ] );
    const [ allMaskSvgs                 , setAllMaskSvgs                ] = useState( false );
    const [ windowSize                  , setWindowSize                 ] = useState( { 
        width   : window.innerWidth , 
        height  : window.innerHeight
    } );
    const [ patternOn_PLURAL    , setPatternOn_PLURAL   ] = useState( [false,false,false,false,false] );
    const [ extraRotate_PLURAL  , setExtraRotate_PLURAL ] = useState( [false,false,false,false,false] );
    const [ svgPatternForFlyer_PLURAL , setSvgPatternForFlyer_PLURAL ] = useState( [ ] );


    const svgRotation=`rotate(${ rotationByProdFilename }deg)`;
    const svgRotation2 =`rotate(${ rotation2ByProdFilename }deg)`;

    const lchRanges = {
        '9' : [ 0     , 20    , 'A' , 'FUSCIA'  ]   ,
        '0' : [ 20    , 40    , 'A' , 'FUSCIA'  ]   ,
        '1' : [ 41    , 66    , 'B' , 'RED'     ]   ,
        '2' : [ 67    , 86    , 'C' , 'ORANGE'  ]   ,
        '3' : [ 87    , 100   , 'D' , 'YELLOW'  ]   ,
        '4' : [ 101   , 180   , 'E' , 'CHRTRS'  ]   ,
        '5' : [ 181   , 200   , 'F' , 'GREEN'   ]   ,
        '6':  [ 200   , 225   , 'G' , 'CYAN'    ]   ,
        '7' : [ 226   , 295   , 'H' , 'AZURE'   ]   ,
        '8' : [ 295   , 320   , 'I' , 'BLUE'    ]   ,
        '9' : [ 321   , 360   , 'J' , 'VIOLET'  ]   ,
        // 'K' : [ 336   , 361   , 'K' , 'BLACK'  ]   ,
        // 'W' : [ 336   , 361   , 'K' , 'WHITE'  ]   ,
        // 'N' : [ 336   , 361   , 'K' , 'NEUTRAL'  ]   ,
    };
    let firstPickWhite = 'ffffff';
    let firstPickLite = (
                    svgs 
        && typeof   svgs !== 'undefined'
        &&          svgs[ 1 ]
        && typeof   svgs[ 1 ] !== 'undefined'
        &&          svgs[ 1 ].mainColor
        && typeof   svgs[ 1 ].mainColor !== 'undefined'
    ) ?             svgs[ 1 ].mainColor : 'ffffff';
    let firstPickDark = (
                    svgs 
        && typeof   svgs !== 'undefined'
        &&          svgs[ 2 ]
        && typeof   svgs[ 2 ] !== 'undefined'
        &&          svgs[ 2 ].mainColor
        && typeof   svgs[ 2 ].mainColor !== 'undefined'
    ) ?             svgs[ 2 ].mainColor : '000000';
    
    const canvasWidth =         1000 / 1.1;
    const canvasHeight =        1000 / 1.1;





    useEffect( ( ) => {
        function handleResize( ) {
            setWindowSize( {
                width   : window.innerWidth ,
                height  : window.innerHeight ,
            } )
        };
        window.addEventListener( 'resize' , handleResize );
        return ( ) => { window.removeEventListener( 'resize' , handleResize ) };
    } );









    
    useEffect( ( ) => {
        if ( 
                                            penkirksBucket[ selectedPenIndex ]
            && typeof                       penkirksBucket[ selectedPenIndex ] !== 'undefined' 
            &&                              penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault
            && typeof                       penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault !== 'undefined' 
            && /_/.test(                    penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault )
            && /\+/.test(                   penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault )
            && /_([A-Za-z0-9]{1,8})+/.test( penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault )
        ) {
            let limitToColor =              penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault.match( /_([A-Za-z0-9]{1,8})+/ )[ 1 ];
            console.log(            limitToColor );
            setRecommendedColor(    limitToColor[ 0 ] === '#' ? limitToColor : '#' + limitToColor );
            let limitToOpacity =            penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault.match( /\+([0-9]{1,8})/ )[ 1 ];
            setRecommendedOpacity(  limitToOpacity / 100 );
        }
    } , [ penkirksBucket ] );












    useEffect( ( ) => {
        function adjustRotationAndImprintDivisor( ) {
            let impartedRotation , imparted2Rotation;
            
            if ( typeof penkirksBucket[ selectedPenIndex ].imprintRotationDeg !== 'undefined' ) {
                impartedRotation = penkirksBucket[ selectedPenIndex ].imprintRotationDeg;
            };
            if ( typeof penkirksBucket[ selectedPenIndex ].imprint2RotationDeg !== 'undefined' ) {
                imparted2Rotation = penkirksBucket[ selectedPenIndex ].imprint2RotationDeg;
            };
            if ( 
                impartedRotation 
                &&    typeof impartedRotation     !== 'undefined' 
                && impartedRotation !== '' 
                && impartedRotation.length > 0
            ) { 
                setRotationByProdFilename( impartedRotation );
            };
            if ( imparted2Rotation &&   typeof imparted2Rotation    !== 'undefined' && imparted2Rotation !== '' && imparted2Rotation.length > 0 ) { setRotation2ByProdFilename( imparted2Rotation ); };
        };
        if ( penkirksBucket.length > 0 ) { adjustRotationAndImprintDivisor( ); }
    } , [ penkirksBucket ] );












    useEffect( ( ) => {
        async function getBlank( ) {
            console.log( 'GIT BLANKED ' );
            try {
                let productContentFolder = 'PORTAL/VIRTUALS/' + currentBrand.current.toString( ).toUpperCase( ) + '/' + currentProductNumber + '/';
                let checkingForMask =   await Storage.list( productContentFolder );
                let wasMask = false;
                let masksKeysArray = [ ];
                if ( Array.isArray( checkingForMask ) ) {
                    checkingForMask.forEach( s3File => {
                        if ( /mask/i.test( s3File.key ) ) {
                            masksKeysArray.push( s3File.key );
                            wasMask = true;
                        };
                    } );
                };
                if ( wasMask ) {
                    console.log( 'WUD maksed' );
                    
                                    async function makeSvgsMask( maskKey ) {
                                        try {
                                            let [ maskResult2 ] =        await getSvgMaskTextFromBucketUrl( { itemNo : currentProductNumber , optionalKey : maskKey } );
                                            let maskSvgs2 =              await maker( {
                                                    textySP1            : maskResult2   ,
                                                    textyUNDER          : maskResult2   , 
                                                    help                : help          ,
                                                    recommendedColor    : '#ffffff'     ,
                                                    isMask              : 'isMask'      ,
                                                    } );
                                            return maskSvgs2.svgs[ 0 ];
                                        } catch ( e ) {
                                            console.log( e );
                                        }
                                    };
                    let svgsMasks = masksKeysArray.map( m => ( makeSvgsMask( m ) ) );
                    let allMasks;
                    try {
                        allMasks = await Promise.all( svgsMasks );
                    } catch ( e ) {
                        console.log( e );
                    };
                    if ( !allMasks || typeof allMasks === 'undefined' ) setAllMaskSvgs( [ ] );
                    allMasks = allMasks.map( ( m , mIdx ) => {
                        return ( {
                            ...m ,
                            nm : 'maskForProd' + ( mIdx + 1 ) ,
                        } )
                    } );
                    if ( allMasks.length > 0 ) {
                        setSvgMaskForProductImage( {
                            ...allMasks[ 0 ] ,
                            nm : 'maskForProd1' ,
                        } );
                    };
                    if ( allMasks.length > 1 ) { 
                        setSvgMaskForProductImage2( {
                            ...allMasks[ 1 ] ,
                            nm : 'maskForProd2' ,
                            } );
                    };
                    setAllMaskSvgs( allMasks );
                } else {
                    setSvgMaskForProductImage( null );
                    setAllMaskSvgs( [ ] );
                }
            } catch ( e ) {
                console.log( e );
            };
        };

        async function getBgsFromBucket( currProdNum,currBrand){
            try {
                let allProdsBgsEtcForItem=await getBackgrounds({currProdNum:currProdNum,brand:currBrand});
                let {backgroundsFromBucket,pensFromBucket}=allProdsBgsEtcForItem[0];
                let overlaysFromBucket=pensFromBucket.filter(f=>/k=OVERLAY/i.test(f.name));
                pensFromBucket=pensFromBucket.filter(f=>!/k=OVERLAY/i.test(f.name));
                let setAllPsWitDis=allProdsBgsEtcForItem.map(m=>(m.pensFromBucket.filter(f=>!/k=OVERLAY/i.test(f.name)))); 
                setAllPenkirks(setAllPsWitDis);
                if ( backgroundsFromBucket && backgroundsFromBucket.length > 0 ) {
                    setSelectedBgIndex( 0 );
                    setBerkgroundsBucket( backgroundsFromBucket );
                };
                if ( pensFromBucket && pensFromBucket.length > 0 ) {
                    setSelectedPenIndex( 0 );
                    setPenkirksBucket( pensFromBucket );
                };
                if ( overlaysFromBucket && overlaysFromBucket.length > 0 ) {
                    setOveriesBucket( overlaysFromBucket );
                } else { setOveriesBucket([]); }
            } catch (e){ console.log(e);};
        };
        if ( currentProductNumber && currentBrand.current ) {
            getBgsFromBucket( currentProductNumber , currentBrand.current );
            getBlank();
        };
    },[currentProductNumber,recommendedColor,currentBrand]);







    useEffect( ( ) => {
        let squarePrefix = fromPage === 'virtPage'
                        ? 'unSquare' 
                        : '';

        async function getSvg( rid ) {
            let svgFolderBucket =       'LOGOS/svgapp/svgs/';
            let svgFilenameBucket =     'unSquarenewSvgSP1';
            let getVersionsOfSvg =      await Storage.list( svgFolderBucket + rid + '/' );
            let regMatch =              new RegExp( svgFilenameBucket , 'i' );
            let fileVersionsList =      [ ];
            let latestVersionNumber;
            getVersionsOfSvg.forEach( ( file , idx ) => {
                if ( regMatch.test( file.key ) ) {
                    if ( /_v([0-9]{1,9})\.svg/i.test( file.key ) ) {
                        fileVersionsList.push( parseInt(
                            file
                                .key
                                .match( /_v([0-9]{1,9})\.svg/ )
                                [ 1 ]
                            )
                        );
                    };
                    latestVersionNumber = fileVersionsList.includes( 1 )
                                                ? Math.max( ...fileVersionsList )
                                                : undefined;
                }
            } );
            return latestVersionNumber;
        };
                

        async function getAndMakeInitial( props ) {
            const {
                id , 
                recommendedColor ,
            } = props;
            let sp1Text , underText;
            try {
                let latestVersionNumber = await getSvg( id );
                [ 
                    sp1Text     ,
                    underText   ,
                ] = await getSvgTextFromIdVersion( {
                    id              : id ,
                    squarePrefix    : 'unSquare' ,
                    svgVersion      : latestVersionNumber
                } );
                
            } catch( e ) {
                console.log( e );
            };



            if ( typeof sp1Text ==='undefined' ) {
                console.log( 'DOING OLD GOOD VERSION : UNDER RETURNED FRIST' );
                [ 
                    underText   , 
                    sp1Text     ,
                ] = await getSvgTextFromId( {
                    id : id , 
                    squarePrefix : squarePrefix ,
                } );
            };

            let gotFullBitmap;
            try {
                // gotFullBitmap = await Storage.get('LOGOS/svgapp/svgs/'+id+'/4CP1COPYPING.png');
                gotFullBitmap = bucketUrlBase + 'LOGOS/svgapp/svgs/'+id+'/4CP1COPYPING.png';
                setFullColorBitmaps( [gotFullBitmap] );
            } catch (e) {
                console.log(e);
            }

            if ( /The specified key does not exist/i.test( sp1Text ) ) {
                setErrorMessage( 'That logo is currently unavailable.' );
                setCurrentResultId( null );
                setTimeout( ( ) => {
                    setErrorMessage( null );
                } , 3000 )
            } else {

                let madeSvgs;
                try {
                    madeSvgs =  await maker( 
                    {
                        textySP1            : sp1Text           , 
                        textyUNDER          : underText         , 
                        help                : help              ,
                        recommendedColor    : recommendedColor  ,
                        isMask              : undefined         ,
                    } );
                } catch ( e ) {
                    console.log( e );
                    [ 
                        sp1Text , 
                        underText ,
                    ] = await getSvgTextFromId( id , squarePrefix );
                    madeSvgs = await maker( {
                                    textySP1            : sp1Text           , 
                                    textyUNDER          : underText         ,
                                    help                : help              ,
                                    recommendedColor    : recommendedColor  ,
                                    isMask              : undefined         ,
                                } );
                };
                
                let dickTickler = typeof recommendedColor === 'undefined' 
                ? madeSvgs.svgs.filter( f => (
                    f.nm === 'SP1' 
                    || f.nm === 'SP1W'
                    || f.nm === 'SP1W2'
                    || f.nm === 'SP1W3'
                    || f.nm === '1CVIBE'
                    || f.nm === '1CPOP'
                    || f.nm === '1CW'
                    || f.nm === '1CB'
                    || f.nm === '1C'
                    || f.nm === '1CU'
                ) )
                : madeSvgs.svgs.filter( f => (
                    f.nm === '1CREC1'
                ) );

                if (
                    recommendedOpacity
                    && typeof recommendedOpacity !== 'undefined'
                ) {
                    dickTickler = dickTickler.map( m => ( { 
                        ...m ,
                        opacity : recommendedOpacity 
                } ) )
                };

                let pussyKnife =  typeof recommendedColor === 'undefined' 
                ? madeSvgs.svgsPropsArray.filter( f => (
                    f.name === 'SP1'
                    || f.name === 'SP1W'
                    || f.name === 'SP1W2'
                    || f.name === 'SP1W3'
                    || f.name === '1CVIBE'
                    || f.name === '1CPOP'
                    || f.name === '1CW'
                    || f.name === '1CB'
                    || f.name === '1C'
                    || f.name === '1CU'
                ) )
                : madeSvgs.svgsPropsArray.filter( f => (
                    f.name === '1CREC1'
                ) );

                // *****************************
                // *****************************
                let makingQuadrupleSvg = true;
                
                if ( makingQuadrupleSvg ) {
                    let quads_PLURAL = [ ];
                    let quadSvg =               { };
                    let quadSvg2 =               { };
                    let quadSvgUnder =          { };
                    let startSvg =              JSON.parse( JSON.stringify( dickTickler[ 0 ] ) );
                    let startSvgWhiteUnderlay = JSON.parse( JSON.stringify( madeSvgs.whiteUnderlay[ 0 ] ) );
                    let paddingBetweenEach =    .2;
                    let totalPaddingX = 
                    ( paddingBetweenEach / 2 *parseInt( dickTickler[ 0 ].vb[ 2 ] ) )
                    +   ( paddingBetweenEach * parseInt( dickTickler[ 0 ].vb[ 2 ] ) ); 
                if ( typeof totalPaddingX !== 'undefined' ) {
                };
                    let initialGrpsObject = [ {
                        paths        : [ ] ,
                        transform   : '' ,
                    } ];
                    quadSvg2[ 'grps' ] = initialGrpsObject;

                    quadSvgUnder[ 'grps' ] = [ {
                        paths       : [ ] ,
                        transform   : '' ,
                    } ];

                    let quadrantPattern = [ 
                        1 , 
                        4 ,
                    ];

                // 
                    [ 1 , 2 , 3 , 4 ]
                .forEach( quadrant => {
                    let addMatrix = ( [ x , y ] , vbw , vbh ) => (
                            quadrant === 1 ? 
                            [   x   + 0     + ( paddingBetweenEach / 2 * vbw )  ,
                                y   + 0     + ( paddingBetweenEach / 2 * vbw )  , ] 
                                : quadrant === 2 ? [
                                x   + vbw   + ( paddingBetweenEach * vbw )      ,
                                y   + 0     + ( paddingBetweenEach / 2 * vbw )  , ] 
                                : quadrant === 3 ? [
                                x   + 0     + ( paddingBetweenEach / 2 * vbw )  ,
                                y   + vbh   + ( paddingBetweenEach * vbw )      ,
                            ]
                            : [ 
                                x   + vbw   + ( paddingBetweenEach * vbw )      , 
                                y   + vbh   + ( paddingBetweenEach * vbw )      ,
                            ]
                    );


                    function fromStartSvgToQuad(startSvg){
                        let svgQuadVersion={};
                        svgQuadVersion['grps']=initialGrpsObject;
                        startSvg.grps.forEach(grp=>{
                            if (!quadrantPattern.includes(quadrant)) return;
                            let tt=grp.transform;
                            if ( /translate\(([0-9-,.]{1,25})\)/i.test(tt)){
                                let pret=tt.match( /translate\(([0-9-,.]{1,25})\)/i )[ 1 ]
                                let startTranslate=[ 
                                    parseInt(pret.split(',')[0]),
                                    parseInt(pret.split(',')[1]) 
                                ];
                                let newScale = '';
                                if ( /scale\(([0-9-,.]{1,25})\)/i.test( tt ) ) {
                                    newScale = tt.match( /scale\(([0-9-,.]{1,25})\)/i )[ 1 ]
                                }
                                let newTranslate = addMatrix(
                                        startTranslate              ,
                                        parseInt( dickTickler[ 0 ].vb[ 2 ] )   ,
                                        parseInt( dickTickler[ 0 ].vb[ 3 ] )   ,
                                    );
                                let newQGroup = 
                                    {
                                    ...grp ,
                                    paths       : grp.paths.map( m => {
                                                        return ( {
                                                            ...m ,
                                                            fill : m.fill ,
                                                            origFill : m.fill ,
                                                        } )
                                                    } ) ,
                                    transform   : 'translate(' + newTranslate.join( ',' ) + ') scale(' + newScale + ')' ,
                                } 
                                svgQuadVersion.grps.push( newQGroup );
                            };
                        } );
                        return svgQuadVersion;
                    };

                quadSvg =       fromStartSvgToQuad( startSvg );
                quads_PLURAL =  [ '#ffffff' , ...dickTickler[ 0 ].nitClrs ]
                                    .map( ( tickled , tIdx ) => ( {
                                        ...(fromStartSvgToQuad(startSvg)) ,
                                        name                    : 'pattern' + tIdx ,
                                        mainColor               : tickled , 
                                        vb                      : startSvg.vb.map( m => ( parseInt( m ) * 2 ) + ( m !== '0' ? totalPaddingX : '0' )  ) ,
                                        rects                   : [ { 
                                            type    : 'rect' , 
                                            width   : ( parseInt( startSvg.vb[ 2 ] ) * 2 ) + totalPaddingX , 
                                            height  : ( parseInt( startSvg.vb[ 3 ] ) * 2 ) + totalPaddingX ,
                                            fill    : tickled
                                        } ] ,
                                        grps                    : quadSvg2.grps.map( m => (
                                            { 
                                                ...m , 
                                                fill : '#' + m.fill === tickled ? 'ffffff' : m.fill ,
                                                paths : m.paths.map( p => ( {
                                                    ...p ,
                                                    fill : '#' + p.fill === tickled ? 'ffffff' : p.fill
                                            } ) ) ,
                                            } ) )
                                    } ) );

                    if ( startSvgWhiteUnderlay ) {
                        startSvgWhiteUnderlay.grps.forEach( ( wGrp , wGrpIdx ) => {
                            if ( !quadrantPattern.includes( quadrant ) ) return;
                            let tt = wGrp.transform;
                            if ( /translate\(([0-9-,.]{1,25})\)/i.test( tt ) ) {
                                let pret = tt.match( /translate\(([0-9-,.]{1,25})\)/i )[ 1 ]
                                let startTranslate =    [ 
                                    parseInt( pret.split( ',' )[ 0 ] ) , 
                                    parseInt( pret.split( ',' )[ 1 ] ) 
                                ];
                                let newScale = '';
                                if ( /scale\(([0-9-,.]{1,25})\)/i.test( tt ) ) {
                                    newScale = tt.match( /scale\(([0-9-,.]{1,25})\)/i )[ 1 ]
                                };
                                let newTranslate = addMatrix(
                                        startTranslate              ,
                                        parseInt( dickTickler[ 0 ].vb[ 2 ] )   ,
                                        parseInt( dickTickler[ 0 ].vb[ 3 ] )   ,
                                    );
                                let newQGroup = {
                                    ...wGrp     ,
                                    fill        : 'pink' ,
                                    transform   : 'translate(' + newTranslate.join( ',' ) + ') scale(' + newScale + ')' ,
                                    paths       : wGrp.paths.map( m => {
                                                        return ( {
                                                            ...m ,
                                                            fill : m.fill ,
                                                            origFill : m.fill ,
                                                        } )
                                                    } ) ,
                                };
                                quadSvgUnder.grps.push( newQGroup );
                            };
                        } );
                    };
                } );

                let newVb = startSvg.vb.map( m => ( parseInt( m ) * 2 ) + ( m !== '0' ? totalPaddingX : '0' )  );
                let newVbUnder = startSvg.vb.map( m => ( parseInt( m ) * 2 ) + ( m !== '0' ? totalPaddingX : '0' )  );

                
                let patternSvg = {
                    ...quadSvg ,
                    vb   : newVb ,
                    nm   : 'SP1Pattern' ,
                };
                let patternSvgUnder = {
                    ...quadSvgUnder ,
                    vb   : newVbUnder ,
                    nm   : 'SP1PatternUnder' ,
                };
                    setSvgPatternForFlyer( [ patternSvg ] );
                    setSvgPatternForFlyer_PLURAL( quads_PLURAL );
                    setSvgPatternUnderForFlyer( [ patternSvgUnder ] );
                };
                    setSvgWhiteUnderlay(    madeSvgs.whiteUnderlay[ 0 ] );
                    setSvgs(                dickTickler );
                    setSvgsPropsArray(      pussyKnife );
            };
        };

        if ( currentResultId ) {
            if ( recommendedColor !== initialRecommendedColor ) {
                getAndMakeInitial( {
                    id                  : currentResultId , 
                    recommendedColor    : recommendedColor === initialRecommendedColor
                                            ? undefined : recommendedColor , 
                } )
            } else {
                getAndMakeInitial( { id : currentResultId } );
            }
        };
    } , [ currentResultId , recommendedColor ] );





    useEffect( ( ) => {
        if ( 
            svgs
            && svgs.length > 0
            && svgPatternForFlyer
            && svgPatternForFlyer.length > 0
        ) {
        let carlor = patternOn === 1 
                        ? firstPickLite 
                        : patternOn === 2 
                            ? firstPickDark 
                            : patternOn === 3 
                                ? firstPickWhite 
                                : '#ffffff';
        let startSvg =          JSON.parse( JSON.stringify( svgPatternForFlyer[ 0 ] ) );
        let startSvgUnder;
        if ( 
            svgPatternUnderForFlyer
            && svgPatternUnderForFlyer.length > 0
        ) {
            startSvgUnder = JSON.parse( JSON.stringify( svgPatternUnderForFlyer[ 0 ] ) );
        };
        let tempSvg =           JSON.parse( JSON.stringify( startSvg ) );

        startSvg.grps.forEach( ( a , b ) => {
            if (
                a.paths
                && Array.isArray( a.paths )
                && a.paths[ 0 ] 
                && typeof a.paths[ 0 ] !== 'undefined'
                &&
                a.paths[ 0 ].type === 'rect' ) {
                tempSvg.grps[ b ].paths[ 0 ] = {
                    ...( startSvg.grps[ b ].paths[ 0 ] ) ,
                    fill : carlor ,
                }
            };
            a.paths.forEach( ( pt , pti ) => {
                let reginald = new RegExp( carlor.replace( '#' , '' ) , 'i' );
                if ( 
                    pt.fill === '#ffffff' 
                    && pt.origFill
                    && typeof pt.origFill !== 'undefined'
                    && pt.origFill.length > 0
                    && pt.origFill !== 'ffffff'
                    && pt.origFill !== '#ffffff'
                    &&
                    !includeWhiteUnderlay
                 ) {
                     tempSvg.grps[ b ].paths[ pti ].fill = pt.origFill[ 0 ] === '#'
                     ? pt.origFill : '#' + pt.origFill;
                 } else if ( reginald.test( pt.fill ) ) {
                    tempSvg.grps[ b ].paths[ pti ].fill = '#ffffff';
                } else {
                    // console.log( 'utha konderchins nut mit' )
                };
            } )
        } );
        setSvgPatternForFlyer( [ tempSvg ] );
        if ( 
            svgPatternUnderForFlyer
            && svgPatternUnderForFlyer.length > 0
        ) {
            setSvgPatternUnderForFlyer( [ {
                ...startSvgUnder    ,
                grps : [
                    ...(startSvgUnder.grps)  ,
                    ...(startSvg.grps)  ,
                ] } ] 
            );
        };
    };
    } , [ patternOn , includeWhiteUnderlay ] );




    useEffect(()=>{
        let artu = document.getElementById( 'footer' );
        if (artu&&typeof artu!=='undefined'){ artu.style.display = 'none'; }
        let irgu = document.getElementById('firstrowinapp');
        if (irgu&&typeof irgu!=='undefined'){ irgu.style.display = 'none'; };
    },[])



    useEffect( ( ) => {
        async function handleNeededShowVersion( imprintFilterIFS ) {
            setShowVersionByKey( svgsPropsArray[ 0 ].description );
        };
        if ( imprintFilter && svgsPropsArray ) { handleNeededShowVersion( imprintFilter ); };
    } , [ imprintFilter ] );








    useEffect(()=>{
        if (customOneColor) {
            let tempSvgs = JSON.parse( JSON.stringify( svgs ) );
            let idxOneColor = tempSvgs.map( m => m.nm ).indexOf( '1CB' );
            let tempCustomOneColor = JSON.parse( JSON.stringify( tempSvgs[ idxOneColor ] ) );
            if ( typeof tempCustomOneColor.grps !== 'undefined' ) {
                tempCustomOneColor.grps.forEach( ( grp , grpIdx ) => {
                    tempCustomOneColor.grps[ grpIdx ].fill = customOneColor;
                    grp.paths.forEach( ( path , pathIdx ) => {
                        tempCustomOneColor.grps[ grpIdx ].paths[ pathIdx ].fill = customOneColor;
                    });
                });
            };
            let finalTempSvgs=[ 
                ...tempSvgs, 
                {
                        ...tempCustomOneColor , 
                    nm :'1CU' ,
                    dsc :'One Color Custom'
            }];

            if ( svgsPropsArray && svgsPropsArray.filter( f => f.description === 'One Color Custom' ).length < 1 ) {
                setSvgsPropsArray([
                    ...svgsPropsArray ,
                    {
                        description : 'One Color Custom' ,
                        name : '1CU' ,
                        helpContent : 'help' ,
                        svgContent : ''
                    }
                ])
            };
            setSvgs(finalTempSvgs);
        }
    },[customOneColor]);





    useEffect(()=>{
        if (   
            (imigEleBg&&imigEleProd)
            && typeof imigEleBg !== 'undefined' 
            && typeof imigEleProd !== 'undefined'
            && typeof imigEleSvg !== 'undefined'
        ) {
            let imagesForCanvas = [ ];
            const addFull = ( n , e ) => imagesForCanvas.push( { name : n , element : e , placement : [ 0 , 0 , canvasWidth , canvasWidth ] } );
            if ( 
                typeof imigEleBg !== 'undefined'
                && bgChecked
            ) { addFull( 'backgroundImage' , imigEleBg ); };
            if ( typeof imigEleProd !== 'undefined' ) {
                addFull( 'productImage' , imigEleProd ); };
           
                
            if (typeof imigEleFullColorBitmap!=='undefined'&&bitmapOnImprintArea){
                if (typeof imigEleSvg !== 'undefined'&& ((allPenkirks.length>1&&patternOn_PLURAL[0].toString()==='false')||designOn||allPenkirks.length===1)){
                    imagesForCanvas.push({
                        name:'fullColorLogoImage',element:imigEleFullColorBitmap,
                        placement  : { left        : flyerSvgStyle.left    / 100 * canvasWidth ,
                                        top         : flyerSvgStyle.top     / 100 * canvasWidth ,
                                        width       : flyerSvgStyle.width   / 100 * canvasWidth ,
                                        height      : flyerSvgStyle.height  / 100 * canvasWidth ,
                                        rotation    : flyerSvgStyle.rotation}});
                } else {addFull('fullColorLogoImage',imigEleFullColorBitmap);};
            } else {
            if ( 
                !patternOn_PLURAL[ 1 ]
                && imigEleSvgMask2
                && typeof imigEleSvgMask2 !== 'undefined'
            ) {
                addFull( 'svgMask2' , imigEleSvgMask2 );
            };

            if (typeof imigEleSvg2 !== 'undefined' &&
            ((allPenkirks.length>1&&patternOn_PLURAL[1].toString()==='false')||designOn)){
                   imagesForCanvas.push({
                    name        : 'svgLogo2'     ,
                    element     : imigEleSvg2    ,
                    placement   :   {
                                        left        : flyerSvgStyle2.left    / 100 * canvasWidth ,
                                        top         : flyerSvgStyle2.top     / 100 * canvasWidth ,
                                        width       : flyerSvgStyle2.width   / 100 * canvasWidth ,
                                        height      : flyerSvgStyle2.height  / 100 * canvasWidth ,
                                        rotation    : flyerSvgStyle2.rotation                    ,
                                    }
                    })
            };
            if ( 
                patternOn_PLURAL[ 1 ].toString( ) === '0' ||
                patternOn_PLURAL[ 1 ].toString( ) === '1' ||
                patternOn_PLURAL[ 1 ].toString( ) === '2' ||
                patternOn_PLURAL[ 1 ].toString( ) === '3' ||
                patternOn_PLURAL[ 1 ].toString( ) === '4' 
                && imigEleSvgPattern2
                && typeof imigEleSvgPattern2 !== 'undefined' 
        ) {
            addFull( 'svgPattern2' , imigEleSvgPattern2 );
        };
        if (
            !patternOn_PLURAL[ 0 ]
            && imigEleSvgMask
            && typeof imigEleSvgMask !== 'undefined'
        ) {
            addFull( 'svgMask' , imigEleSvgMask );
        };
        if ( 
            typeof imigEleSvg !== 'undefined'
            && ( (
                allPenkirks.length > 1 
                && patternOn_PLURAL[ 0 ].toString( ) === 'false' 
             ) || designOn || allPenkirks.length === 1 )
        ) {
                imagesForCanvas.push( {
                name        : 'svgLogo'     ,
                element     : imigEleSvg    ,
                placement   :   {
                                    left        : flyerSvgStyle.left    / 100 * canvasWidth ,
                                    top         : flyerSvgStyle.top     / 100 * canvasWidth ,
                                    width       : flyerSvgStyle.width   / 100 * canvasWidth ,
                                    height      : flyerSvgStyle.height  / 100 * canvasWidth ,
                                    rotation    : flyerSvgStyle.rotation                    ,
                                }
                            });
        };
            if ( 
                patternOn_PLURAL[ 0 ].toString( ) === '0' ||
                patternOn_PLURAL[ 0 ].toString( ) === '1' ||
                patternOn_PLURAL[ 0 ].toString( ) === '2' ||
                patternOn_PLURAL[ 0 ].toString( ) === '3' ||
                patternOn_PLURAL[ 0 ].toString( ) === '4' 
                && imigEleSvgPattern
                && typeof imigEleSvgPattern !== 'undefined' 
            ) {
                addFull( 'svgPattern' , imigEleSvgPattern );
            };

        };// IF NOT !!! FULLCOLOR BITMAP

            if (imigEleOverlay&&typeof imigEleOverlay!=='undefined'){
                imagesForCanvas.push({ 
                    element         : imigEleOverlay     ,
                    placement       : [ 0 , 0 , canvasWidth , canvasWidth ]
                })
            };
            setPassDeez( imagesForCanvas );
        };
    },[
        imigEleFullColorBitmap,
    
        imigEleBg           ,
        imigEleProd         ,
        imigEleOverlay      ,

        imigEleSvg          ,
        imigEleSvg2          ,
        
        imigEleSvgMask      ,
        imigEleSvgMask2      ,
        
        imigEleSvgPattern   ,
        imigEleSvgPattern2   ,
        
        // imigEleSvgUNDERPattern   ,
        bgChecked           ,
        flyerSvgStyle       ,
        flyerSvgMaskStyle   ,
        patternOn_PLURAL    ,
        imageElementsForFlyer ,
    ] );







        
    useEffect(()=>{
        if (svgBlobURL&&((imigEleSvg&&JSON.parse(JSON.stringify(imigEleSvg.src))!==JSON.parse(JSON.stringify(svgBlobURL)))||!imigEleSvg)){
            let i=new Image();
            i.alt='virtLogo';
            i.crossOrigin='Anonymous';
            i.addEventListener('load',()=>{setImigEleSvg(i);})
            i.src=svgBlobURL;
        };

        if (svgBlobURL2&&((imigEleSvg2&&JSON.parse(JSON.stringify(imigEleSvg2.src))!==JSON.parse(JSON.stringify(svgBlobURL2)))||!imigEleSvg2)) {
            let i =new Image();
            i.alt ='virtLogo2';
            i.crossOrigin ='Anonymous';
            i.addEventListener('load',()=>{setImigEleSvg2(i);})
            i.src = svgBlobURL2;
        };

        if (svgMaskBlobURL){
            let i = new Image( );
            i.alt = 'virtMask';
            i.crossOrigin = 'Anonymous';
            i.addEventListener('load',()=>{setImigEleSvgMask(i);})
            i.src = svgMaskBlobURL;
        };
        
        if (svgMaskBlobURL2){
            let i=new Image();
            i.alt = 'virtMask2';
            i.crossOrigin = 'Anonymous';
            i.addEventListener('load',()=>{setImigEleSvgMask2(i);})
            i.src = svgMaskBlobURL2;
        };

        if (svgPatternBlobURL) {
            let i = new Image();
            i.alt = 'virtPATTERN1st';
            i.crossOrigin = 'Anonymous';
            i.addEventListener('load',()=>{setImigEleSvgPattern(i);})
            i.src = svgPatternBlobURL;
        };

        if ( svgPatternBlobURL2 ) {
            let i = new Image();
            i.crossOrigin = 'Anonymous';
            i.addEventListener('load',()=>{setImigEleSvgPattern2(i);})
            i.src = svgPatternBlobURL2;
        };

        if(svgPatternUNDERBlobURL){
            let i=new Image();
            i.crossOrigin='Anonymous';
            i.addEventListener('load',()=>{setImigEleSvgPattern(i);})
            i.src = svgPatternUNDERBlobURL;
        };
    },[svgBlobURL,svgBlobURL2,svgMaskBlobURL,svgPatternBlobURL,svgPatternBlobURL2]);


    useEffect(()=>{
        if(typeof svgs !== 'undefined'&&typeof svgs[0]!=='undefined'&& typeof svgs[0].blackest!=='undefined'){
            let hueFromLogoToMatch=parseInt(convert.hex.lch(svgs[0].blackest)[2]);
            let hueFromLogoToMatch2=parseInt(convert.hex.lch(svgs[0].whitest)[2]);
            let higherUpSwitchTo;
            let rangeMatch;
            Object.keys(lchRanges).forEach(ran=> {
                let nums=[lchRanges[ran][0],lchRanges[ran][1]];
                if (hueFromLogoToMatch > nums[0]&&hueFromLogoToMatch<nums[1]){
                    rangeMatch = ran;
                    if (typeof penkirksBucket !== 'undefined' ) {
                        let switchTo;
                        penkirksBucket.forEach((pen,penIdx)=>{
                            if ( typeof pen.lchColorRangeInd!=='undefined'){
                                if ( pen.lchColorRangeInd.toString()===rangeMatch.toString()){
                                switchTo =          penIdx;
                                higherUpSwitchTo =  penIdx;
                            }}
                        });
                        if(typeof switchTo!=='undefined'){setSelectedPenIndex(switchTo);};
                    };
                };
            } );
            if (typeof higherUpSwitchTo==='undefined') {
                Object.keys(lchRanges).forEach(ran=> {
                    let nums=[lchRanges[ran][0],lchRanges[ran][1]];
                    if (hueFromLogoToMatch2>nums[0]&&hueFromLogoToMatch2<nums[1]){
                        rangeMatch=ran;
                        if (typeof penkirksBucket!=='undefined'){
                            let switchTo;
                            penkirksBucket.forEach((pen,penIdx)=>{
                                if ( typeof pen.lchColorRangeInd !=='undefined'){
                                if ( pen.lchColorRangeInd.toString()===rangeMatch.toString()){
                                    switchTo=penIdx;
                                    higherUpSwitchTo=penIdx;
                                }}
                            });
                            if (typeof switchTo!=='undefined'){
                                setSelectedPenIndex(switchTo);
                            };
                        };
                    };
                } );
            };
        };
    },[svgs,currentProductNumber]);



    let ovary = overiesBucket.length > 0 ? overiesBucket[ 0 ].file : '';

    const [ showTerms , setShowTerms ] = useState( false );

    const [ extras , setExtras ] = useState( false );

    function handleSetShowVersion(a,descriptorrr){setShowVersionByKey(descriptorrr);};
                
    function handleBgSelection(){setBgChecked(!bgChecked)};
                    
    function handleSetSvgs(tt){
        let tmpsv =         [ ...tt ];
        let hsind =         Object.keys( his ).length;
        let tmphs =         JSON.parse( JSON.stringify( his ) );
        tmphs[ hsind ] =    tmpsv;
        setHis( tmphs );
        setSvgs( tmpsv );
    };

                    //______________________________________________________________________________________________________________________________
                    const hasUnderlay = svge => ( svge.grps.filter( f => typeof f.name !== 'undefined' && f.name === 'w' ).length );
                    function getUnderInd( svge ) { for ( var i = 0; i < svge.grps.length; i ++ ) { if ( svge.grps[ i ].name === 'w' ) return i; } };
                    const rmGroup = ( n , svge ) => ( { ...svge , grps : [ ...svge.grps.slice( 0 , n ) , ...svge.grps.slice( n + 1 ) ] } );
                    function toggleWhiteUnderlay( svgIndex ) { // console.log( 'Toggling White Underlay' );
                    let tempUnd = JSON.parse( JSON.stringify( wU ) ); tempUnd[ svgIndex ] = !tempUnd[ svgIndex ];
                    setWU( tempUnd ); let tempSvgs =  JSON.parse( JSON.stringify( svgs ) );
                    let essvg =     tempSvgs[ svgIndex ]; if ( hasUnderlay( essvg ) ) {
                    tempSvgs[ svgIndex ] = rmGroup( getUnderInd( essvg ) , essvg );
                    } else { let tempWhiteUnderlay = { name : 'w' ,  ...JSON.parse( JSON.stringify( svgWhiteUnderlay.grps[ 1 ] ) )  };
                    tempWhiteUnderlay = { ...tempWhiteUnderlay ,  paths : tempWhiteUnderlay.paths.map( ( p , q ) => ( { 
                    ...p,transformOrigin:'center'}))};if(svgIndex===4){// BC THIS LOGO VERSION HAS A SQUARE PATH ( BG ) ADDED TO THE FRONT OF GROUPS 
                    tempSvgs[ svgIndex ].grps = [ tempSvgs[ svgIndex ].grps[ 0 ] , tempWhiteUnderlay , ...tempSvgs[ svgIndex ].grps.slice( 1 )];
                    } else { tempSvgs[ svgIndex ].grps = [ tempWhiteUnderlay , ...tempSvgs[ svgIndex ].grps    , ]; }; }; handleSetSvgs( tempSvgs ); };







    const [ itemData , setItemData ] = useState( );
    const [ itemDataObject , setItemDataObject ] = useState( );



    useEffect(()=>{
        if (itemData){
            let tmep ={};
            itemData.forEach(fe=>{if(fe.itemName&&fe.itemNumber){tmep[fe.itemNumber.toUpperCase()]=fe;}});
            setItemDataObject(tmep);
        };
    },[itemData]);


    // const artReturn = `
    // ██████╗░███████╗████████╗██╗░░░██╗██████╗░███╗░░██╗
    // ██╔══██╗██╔════╝╚══██╔══╝██║░░░██║██╔══██╗████╗░██║
    // ██████╔╝█████╗░░░░░██║░░░██║░░░██║██████╔╝██╔██╗██║
    // ██╔══██╗██╔══╝░░░░░██║░░░██║░░░██║██╔══██╗██║╚████║
    // ██║░░██║███████╗░░░██║░░░╚██████╔╝██║░░██║██║░╚███║
    // ╚═╝░░╚═╝╚══════╝░░░╚═╝░░░░╚═════╝░╚═╝░░╚═╝╚═╝░░╚══╝`;
    return (

    <Col   
        style={{
            overflowX       : 'hidden'  ,
            position        : 'fixed'   ,
            top             : '0px'     ,
            left            : '0px'     ,
            right           : '0px'     ,
            bottom          : '0px'     ,
            zIndex          : 9999999   ,
            width           : '100vw'   ,
            minHeight       : '100vh'   ,
            backgroundColor : 'white'   ,
            paddingBottom   : '80px'    ,
            paddingLeft     : '5px'     ,
            paddingRight    : '5px'     ,
        }}
        >

                                    { showTerms &&
                                        <Row className='justify-content-center' >
                                            <Col 
                                                style={{ 
                                                    fontSize : '.8rem' ,
                                                    zIndex : 99999999999999999999 ,
                                                }}
                                                onClick={()=>{setShowTerms(false)}}
                                                >
                                                <TNC />
                                            </Col>
                                        </Row>}



        <Row>
            <Col>
                { canvasSaved &&
                <div
                    style={{
                        position        : 'fixed'   ,
                        top             : '0px'     ,
                        left            : '0px'     ,
                        bottom          : '0px'     ,
                        right           : '0px'     ,
                        backgroundColor : 'black'   ,
                        opacity         : 1         ,
                        zIndex          : 99999999999 ,
                        display         : 'block'   ,
                        color           : 'white'   ,
                        fontSize        : '1rem'    ,
                        fontWeight      : 600       ,
                    }}
                    onClick={()=>{
                        setCanvasSaved(false);
                        setShowCanvas(false);
                    }}
                    >
                    <a id="download" target='_blank' download="FLYER.png" href={flyerUrl} >
                    <img crossOrigin={'Anonymous'} src={flyerUrl} alt='flyer' width='400' />
                    </a>
                    <br /><br />
                    Click image to download
                </div>
                }
            </Col>
        </Row>


        <Row>
        {showCanvas &&
            <Canvas
                canvasRef={             canvasRef }
                width={                 canvasWidth } 
                height={                canvasHeight } 
                draw={                  doNewSave }
                images={                passDeez }
                textContent={           currentProductDB}
                display={               'none' }
                svgs={                  svgs }
                currentResultId={       currentResultId }
                setCanvasSaved={        setCanvasSaved }
                setFlyerUrl={           setFlyerUrl}
                allMaskSvgs
                clippaNigga={           allMaskSvgs&&typeof allMaskSvgs!=='undefined'&&Array.isArray(allMaskSvgs)&&allMaskSvgs.length>1 
                                            ?allMaskSvgs[1].grps[0].paths[0].d:undefined}
            />}




        {   penkirksBucket.length > 0
        &&  allPenkirks.length > 0
        &&  allMaskSvgs
        ?
        <VirtualsWorkBox
            imigEleFullColorBitmap={ imigEleFullColorBitmap}
            setImigEleFullColorBitmap={ setImigEleFullColorBitmap}
            fullColorBitmapImageLoadedRef={fullColorBitmapImageLoadedRef}
            bitmapOnImprintArea={bitmapOnImprintArea}
            setBitmapOnImprintArea={setBitmapOnImprintArea}
            fullColorBitmaps={fullColorBitmaps}
            currentProductNumber={ currentProductNumber }
            itemDataObject={ itemDataObject }
            itemData={ itemData }
            extraRotate_PLURAL={        extraRotate_PLURAL }
            setExtraRotate_PLURAL={     setExtraRotate_PLURAL }
            patternOn_PLURAL ={         patternOn_PLURAL }
            setPatternOn_PLURAL={       setPatternOn_PLURAL }
            allMaskSvgs={               allMaskSvgs }
            allPenkirks={               allPenkirks }
            bgImageLoadedRef={          bgImageLoadedRef    }
            bgChecked={                 bgChecked           }
            berkgroundsBucket={         berkgroundsBucket   }
            blobURLS={                  blobURLS }
            canvasRef={                 canvasRef }
            currentResultId={           currentResultId     }
            customOneColor={            customOneColor }
            designOn={                  designOn }
            designPatterns={            designPatterns }
            extraRotate={               extraRotate }
            errorMessage={              errorMessage }
            flyerSvgStyle={             flyerSvgStyle }
            fromPage={                  fromPage }
            giveArray={                 giveArray }
            handleBgSelection={         handleBgSelection   }
            handleSetShowVersion={      handleSetShowVersion}
            handleSetSvgs={             handleSetSvgs }
            his={                       his }
            imigEleBg  ={               imigEleBg           }
            imigEleProd={               imigEleProd             }
            imigEleSvg={                imigEleSvg          }
            imprintFilter={             imprintFilter       }
            imigEleSvgMask={            imigEleSvgMask          }
            imigEleOverlay={            imigEleOverlay          }
            imageElementsForFlyer={     imageElementsForFlyer }
            includeWhiteUnderlay={      includeWhiteUnderlay }
            maskBackgroundColor={       maskBackgroundColor }
            overlayImageLoadedRef={     overlayImageLoadedRef   }
            productImageLoadedOverlay={ ovary                                       }
            penkirksBucket={            penkirksBucket      }
            productImageLoadedRef={     productImageLoadedRef   }
            patternOn={                 patternOn }
            pbIsActive={                pbIsActive                                  }
            productImageLoadedPen={     penkirksBucket[ selectedPenIndex ].file     }
            productImageData={          penkirksBucket[ selectedPenIndex ]          }
            qBuk={                      qBuk }
            rotationCurrentSvg={        rotationCurrentSvg }
            svgPatternForFlyer_PLURAL={ svgPatternForFlyer_PLURAL }
            setAllMaskSvgs={            setAllMaskSvgs }
            // setSvgPatternUnder={        setSvgPatternUnder }
            setIncludeWhiteUnderlay={   setIncludeWhiteUnderlay }
            // setImigEleWhiteUnderlay={   setImigEleWhiteUnderlay }
            setImageElementsForFlyer={  setImageElementsForFlyer }
            setBlobURLS={               setBlobURLS }
            svgWhiteUnderlay={          svgWhiteUnderlay }
            setExtraRotate={            setExtraRotate }
            setRotationCurrentSvg={     setRotationCurrentSvg }
            setDesignOn={               setDesignOn }
            setSvgPatternForFlyer={     setSvgPatternForFlyer }
            setSvgPatternUnderForFlyer={ setSvgPatternUnderForFlyer }
            setShowTerms={              setShowTerms }
            showTerms={                 showTerms }
            setMaskBackgroundColor={    setMaskBackgroundColor }
            setPatternOn={              setPatternOn }
            svgPatternUnderForFlyer={   svgPatternUnderForFlyer }
            svgPatternForFlyer={        svgPatternForFlyer }
            setCustomOneColor={         setCustomOneColor }
            setPbIsActive={             setPbIsActive                               }
            showVersionByKey={          showVersionByKey                            }
            svgs={                      svgs                                        }
            svgRotation={               svgRotation                                 }
            svgRotation2={              svgRotation2                                }
            svgContBackgroundImage={    berkgroundsBucket[ selectedBgIndex ].file   }
            setShowCopy={               setShowCopy                                 }
            showCopy={                  showCopy                                    }
            stacked={                   true                                        }
            setSvgBlobURL={             setSvgBlobURL       }
            setSvgBlobURL2={             setSvgBlobURL2       }
            svgBlobURL= {               svgBlobURL          }
            svgBlobURL2= {               svgBlobURL2          }
            setSvgPatternBlobURL={      setSvgPatternBlobURL }
            setSvgPatternBlobURL2={      setSvgPatternBlobURL2 }
            setSvgMaskBlobURL={         setSvgMaskBlobURL       }
            setSvgMaskBlobURL2={        setSvgMaskBlobURL2       }
            svgMaskBlobURL= {           svgMaskBlobURL          }
            svgMaskBlobURL2= {          svgMaskBlobURL2          }
            setFlyerSvgStyle={          setFlyerSvgStyle        }
            setFlyerSvgStyle2={          setFlyerSvgStyle2        }
            setFlyerSvgMaskStyle={      setFlyerSvgMaskStyle    }
            setImigEleBg={              setImigEleBg        }
            setImigEleProd={            setImigEleProd          }
            setImigEleSvg={             setImigEleSvg       }
            svgImageLoadedRef={         svgImageLoadedRef   }
            setImigEleSvgMask={         setImigEleSvgMask       }
            svgMaskImageLoadedRef={     svgMaskImageLoadedRef   }
            setImigEleOverlay={         setImigEleOverlay       }
            setCurrentResultId ={       setCurrentResultId  }
            selectedBgIndex={           selectedBgIndex     }
            selectedPenIndex={          selectedPenIndex    }
            svgsPropsArray={svgsPropsArray}
            setSelectedPenIndex={setSelectedPenIndex}
            showVersionFilterExpressionFromAbove={(c,f)=>{let ff=new RegExp(f,'i');return!ff.test(c)}}
            setCurrentProductNumber={setCurrentProductNumber}
            setShowCanvas={setShowCanvas}
            svgMaskForProductImage={svgMaskForProductImage}
            svgMaskForProductImage2={svgMaskForProductImage2}
            setSvgMaskForProductImage={setSvgMaskForProductImage}
            setSvgMaskForProductImage2={setSvgMaskForProductImage2}
            svgPatternForProductImage={svgPatternForProductImage}
            setSvgPatternForProductImage={setSvgPatternForProductImage}
            setSvgPattern={setSvgPattern}
            svgPattern={svgPattern}
            tokstAline={'right'}
            url_virt={url_virt}
            url_item={url_item}
            undoarrow={undoarrow}
            wU ={wU}
        /> 
        : 
        <>
        <br />
        </>
        }
        </Row>



    <div 
        style={ {
            fontSize : '.95rem' ,
            fontWeight : 600 ,
            lineHeight : 1 ,
            color : 'black' ,
            cursor : 'ponter' ,
        }}
        onClick={()=>{setExtras(!extras)}}
        >
        {extras?'-':
        <svg 
            fill="#000000" xmlns="http://www.w3.org/2000/svg"  
            viewBox="0 0 50 50"  width="20px" height="20px" style={{cursor:'pointer'}}
            >
            <path 
                d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 
                4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 
                L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
            />
        </svg>}
    </div>

    {currentResultId&&typeof currentResultId!=='undefined'&&
    <a style={{fontSize:'.6rem'}}
        target={'_blank'}
        href={
            (currentProductNumber&&typeof currentProductNumber!=='undefined'
                ?'/?virt='+currentResultId+'&item='+currentProductNumber
                :'/?virt='+currentResultId)}
        >
        {'Start with this logo'}
    </a>}

    {extras &&
    <VirtsExtras 
        currentProductNumber={ currentProductNumber }
        setCurrentProductNumber={ setCurrentProductNumber }
        showExtras={ extras }
        setItemDataFromAbove={ setItemData }
    /> }
</Col>
);
};