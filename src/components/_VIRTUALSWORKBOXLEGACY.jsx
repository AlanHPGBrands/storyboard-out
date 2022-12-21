import React , {useRef, useState , useEffect } from 'react'; 
import undoarrow            from './pics/comps/undo-arrow.svg';
import DaTool               from './_DATOOLBINLEGACY';
import {Button ,Col ,Form ,Row ,Nav} from 'react-bootstrap';
import paintbrush30black    from './pics/arrow7.svg';
import paintbrush30         from './pics/arrow7.svg';
import Searchy2             from './searchy2';
import Uploader             from './lib/uploaderSimple.jsx';
import VirtScreenTwo        from './_VIRTUALSSCREENTWOLEGACY';
import leftArrow            from './pics/left-arrow.png';
import RenderSvgElement     from './rendersvgelement';
import CatInput             from './catInputVirts.jsx';
import Sharer               from './sharer.jsx';
const convert =             require( 'color-convert' );

const initialSearchOrUpload = 'upload';
let val1 =      600;
let val2 =      800;
let val3 =      1200;
let mltpr1 =    1;


let bitti = ( ) => (    window.innerWidth < val1
                            ? mltpr1 * window.innerWidth
                            : window.innerWidth < val2 
                                ? val1 * mltpr1
                                : window.innerWidth < val3
                                    ? ( val1 * mltpr1 ) + ( ( window.innerWidth - val2 ) * .18 )
                                    : ( ( val1 * mltpr1 ) + ( ( val3 - val2 ) * .18 ) + ( ( window.innerWidth - val3 ) * .5 ) ) > window.innerHeight
                                        ? mltpr1 * window.innerHeight
                                        : ( val1 * mltpr1 ) + ( ( val3 - val2 ) * .18 ) + ( ( window.innerWidth - val3 ) * .5 )
                        );

const column2Style = ( ) => {
    let a = {
            width : 
                window.innerWidth < 860
                    ? bitti( ) + 'px'
                    : ( ( window.innerWidth - bitti( ) ) - 40 ) + 'px'
                                            ,
            position        : 'relative'    ,
            marginRight     : 'auto'        ,
            marginLeft      : 'auto'        ,
            verticalAlign   : 'top'         ,
            paddingBottom   : '1rem'        ,
            borderRadius    : '5px'         ,
    };
    return a;
};


const svgContStyle2 = ( ) => {
        let hit = bitti( ) + 'px';
        return ( {
            width           : hit           ,
            height          : hit           ,
            position        : 'relative'    ,
            backgroundSize  : 'contain'     ,
            marginRight     : 'auto'        ,
            marginLeft      : 'auto'        ,
            overflow        : 'hidden'      ,
            borderRadius    : '3px'         ,
} ) };



const DownloadFlyerButton = props => {
    const { 
        steps                   ,
        renderDownload          ,
        termsAccepted           ,
        setShowCanvas           ,
        enableDownload          ,
     } = props;
    return (
    <Col  >
    <Button
        key={ termsAccepted.toString( ) + 'tarmisUrnksapted' }
        disabled={ 
            !termsAccepted 
            || !enableDownload
            || !renderDownload
            || !steps[ 1 ]
         }
        id='savesvgbuton' 
        className='btn-tranny btn-hpg'
        style={{
            margin: 0                   ,
            height: 'auto' ,
            padding: `.65rem` ,
            textTransform: 'none' ,
            fontFamily: 'Raleway' ,
            fontWeight: 700 ,
            letterSpacing: '.06em' ,
            lineHeight: '1' ,
            borderRadius:0 ,
            fontSize : '14px' ,
            backgroundColor : '#4700b3' ,
            position: 'relative' ,
            overflow: 'hidden' ,
        }}
        onClick={ ( ) => {
            console.log( 'um' )
            setShowCanvas( true );
        } }
        >
        Download Flyer
    </Button> 
</Col>
    );
};

const VirtsNav =({ steps ,setSteps ,termsAccepted ,svgs ,blinking ,setBlinking}) => {
    let navButtonStyle = { 
        fontSize    : '.8rem'           ,
        padding     : '.15rem .25rem'   ,
    };
    let navHeight = '28px';

    return (
    <Col xs={ 12 } >
        <Row 
            className={ 'justify-content-around' } 
            style={ { 
                alignItems      : 'end'     ,
                justifyContent  : 'stretch' ,
                marginTop       : '.5rem'   ,
                backgroundColor : '#f9f9f9' ,
                paddingBottom   : '.5rem'    ,
            } }
            >
            <Col 
                xs={ 3 }
                >
                <Button
                    style={ {
                        margin: 0                   ,
                        height: 'auto'              ,
                        padding: `.65rem`           ,
                        textTransform: 'none'       ,
                        fontFamily: 'Raleway'       ,
                        fontWeight: 700             ,
                        letterSpacing: '.06em'      ,
                        lineHeight: '1'             ,
                        border :'none'              ,
                        borderRadius:0              ,
                        backgroundColor : '#4700b3' ,
                        fontSize : '14px'           ,
                        opacity : termsAccepted 
                        && svgs 
                        && typeof svgs !== 'undefined' 
                        && svgs.length > 0 
                        &&
                        !steps[ 1 ]
                        ? 1 : .5 ,
                    } }
                    variant='outline-secondary'
                    className={ 'btn-tranny btn-hpg' }
                    disabled={steps[0]}
                    onClick={()=>{
                        let tempSteps= JSON.parse( JSON.stringify( steps ) );
                        steps.forEach((a,b)=>{if(a){tempSteps[b]=false;tempSteps[b-1]=true}})
                        setSteps(tempSteps);
                    }}
                    >
                        <span style={{fontSize:'.65rem'}} >
                            <svg    
                                version="1.1" 
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px" y="0px"
                                width={ navHeight }
                                height={ navHeight }
                                viewBox="0 0 30.239 30.239" 
                                >
                                <g>
                                    <path d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735
                                    c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0
                                    c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z
                                    M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0
                                    C21.517,9.026,21.517,14.63,18.073,18.074z"/>
                                </g>
                            </svg>
                            {steps[1]?'Find':'Find'}
                        </span>
                </Button>    
            </Col>

            <Col xs={3} >
                <Button
                    style={{
                        ...navButtonStyle ,
                        opacity : termsAccepted 
                                        && svgs 
                                        && typeof svgs !== 'undefined' 
                                        && svgs.length > 0 
                                        &&
                                        !steps[ 0 ]
                                        ? 1 : .5 ,
                            margin              : 0                 ,
                            height              : 'auto'            ,
                            padding             : `.65rem`          ,
                            textTransform       : 'none'            ,
                            fontFamily          : 'Raleway'         ,
                            fontWeight          : 700               ,
                            letterSpacing       : '.06em'           ,
                            lineHeight          : '1'               ,
                    border :'none' ,
                    borderRadius:0,fontSize:'14px',backgroundColor:'#4700b3',}}
                    disabled={steps[steps.length-1]}
                    variant='outline-secondary'
                    className={ 'btn-tranny btn-hpg' }
                    onClick={()=>{
                        setBlinking( 0 );
                        let itAGo = termsAccepted 
                                        && svgs 
                                        && typeof svgs !== 'undefined' 
                                        && svgs.length > 0;
                        if (!itAGo){ }else {
                            let tempSteps=JSON.parse(JSON.stringify(steps));
                            steps.forEach((a,b)=>{if(a){tempSteps[b]=false;tempSteps[b+1]=true}
                            });
                            setSteps(tempSteps);}}}
                    >
                    <span   
                        className={ blinking === 2 ? 'blink' : '' }
                        style={ { fontSize : '.65rem' } }
                        >
                                                
                        <svg 
                            height="511pt" 
                            viewBox="-58 1 511 511.999" 
                            width={ navHeight }
                            height={ navHeight }
                            xmlns="http://www.w3.org/2000/svg"
                            style={ { filter : !steps[ steps.length - 1 ] ? `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))` : undefined } }
                        >
                            <g>
                            <path 
                                d="m356.078125 0h-92.664063c-21.613281 0-39.195312 17.582031-39.195312 39.191406v92.667969c0 21.609375 17.582031 39.191406 39.195312 39.191406h92.664063c21.609375 0 39.191406-17.582031 39.191406-39.191406v-92.667969c.003907-21.609375-17.578125-39.191406-39.191406-39.191406zm9.195313 131.859375c0 5.066406-4.125 9.191406-9.195313 9.191406h-92.664063c-5.070312 0-9.191406-4.125-9.191406-9.191406v-92.667969c0-5.066406 4.121094-9.191406 9.191406-9.191406h92.664063c5.070313 0 9.195313 4.125 9.195313 9.191406zm0 0"/><path d="m284.296875 208.5c-7.199219 0-13.984375 1.785156-19.941406 4.9375-7.675781-11.5-20.765625-19.085938-35.597657-19.085938-7.660156 0-14.855468 2.023438-21.082031 5.566407-7.792969-10.582031-20.335937-17.460938-34.457031-17.460938-4.445312 0-8.734375.679688-12.769531 1.945313v-13.351563h3.5625c21.613281 0 39.195312-17.582031 39.195312-39.195312v-92.664063c0-21.609375-17.582031-39.191406-39.195312-39.191406h-92.664063c-21.609375 0-39.191406 17.582031-39.191406 39.191406v92.667969c0 21.609375 17.582031 39.191406 39.191406 39.191406h3.566406v92.921875c-2.320312-2.324218-4.925781-4.398437-7.785156-6.175781-9.214844-5.722656-20.019531-7.714844-30.613281-5.675781-11.394531.457031-21.617187 5.429687-28.257813 13.800781-6.976562 8.792969-9.398437 20.582031-6.652343 32.347656l19.714843 84.363281c11.242188 70.386719 66.148438 123.046876 68.488282 125.261719 2.785156 2.636719 6.476562 4.105469 10.3125 4.105469h168.710937c5.050781 0 9.757813-2.542969 12.535157-6.761719 29.878906-45.453125 45.679687-98.226562 45.683593-152.617187l.015625-101.351563s0 0 0-.003906c0-23.582031-19.1875-42.765625-42.769531-42.765625zm-177.875 273.5c-12.089844-12.859375-47.714844-54.382812-55.554687-104.5625-.058594-.371094-.128907-.738281-.214844-1.097656l-19.835938-84.894532c-.660156-2.835937-.328125-5.28125.941406-6.878906 1.265626-1.597656 3.4375-2.433594 6.335938-2.710937 1.457031-.136719 2.0625-.308594 3.414062-.390625 3.402344-.207032 6.890626.015625 9.789063 1.816406s4.917969 4.621094 5.695313 7.941406l17.109374 73.226563c1.429688 6.113281 6.515626 10.691406 12.742188 11.472656l1.203125.148437c4.269531.535157 8.5625-.789062 11.789063-3.636718 3.226562-2.847656 5.074218-6.945313 5.074218-11.246094v-238.394531c0-7.042969 5.726563-12.769531 12.769532-12.769531 7.039062 0 12.769531 5.726562 12.769531 12.769531v140.660156c0 8.28125 6.714843 15 15 15 8.285156 0 15-6.71875 15-15v-38.226563c0-7.042968 5.726562-12.769531 12.769531-12.769531 7.039062 0 12.769531 5.726563 12.769531 12.769531v39.933594c0 8.285156 6.714844 15 15 15 8.285157 0 15-6.714844 15-15v-28.039062c0-7.039063 5.730469-12.769532 12.769531-12.769532 7.042969 0 12.769532 5.730469 12.769532 12.769532v38.515625c0 8.28125 6.714844 15 15 15s15-6.71875 15-15v-24.367188c0-7.042969 5.730468-12.773437 12.769531-12.773437 7.042969 0 12.769531 5.730468 12.769531 12.769531l-.015625 101.351563c-.003906 45.847656-12.589843 90.40625-36.464843 129.382812zm-44.265625-350.140625v-92.667969c0-5.066406 4.125-9.191406 9.191406-9.191406h92.664063c5.070312 0 9.195312 4.125 9.195312 9.191406v92.667969c0 5.066406-4.125 9.191406-9.195312 9.191406h-3.5625v-18.261719c0-23.582031-19.1875-42.769531-42.769531-42.769531-23.582032 0-42.769532 19.1875-42.769532 42.769531v18.261719h-3.5625c-5.066406 0-9.191406-4.125-9.191406-9.191406zm0 0"
                            />
                            </g>
                        </svg>
                        { steps[ 0 ] ? 'Imprint' : 'Imprint' }
                    </span>
                </Button>
            </Col>
        </Row>
    </Col> )
};










export default function VirtualsWorkBox( props ) {

    const {
        fullColorBitmapImageLoadedRef,
        fullColorBitmaps,
        bitmapOnImprintArea,
        setBitmapOnImprintArea,
        setImigEleFullColorBitmap,
        // associatedItemsForCurrentProductNumber ,
        currentProductNumber ,
        itemDataObject ,
        itemData ,
        setExtraRotate_PLURAL                   ,
        extraRotate_PLURAL                      ,
        setPatternOn_PLURAL                     ,
        patternOn_PLURAL                        ,
        svgPatternForFlyer_PLURAL               ,
        setAllMaskSvgs                          ,
        allMaskSvgs                             ,
        allPenkirks                             ,
        imageElementsForFlyer                   ,
        setImageElementsForFlyer                ,
        setBlobURLS                             ,
        blobURLS                                ,
        setImigEleWhiteUnderlay                 ,
        svgWhiteUnderlay                        ,
        setShowTerms                            ,
        showTerms                               ,
        fromPage                                ,
        giveArray                               ,
        handleBackOne                           ,
        handleSetSvgs                           ,
        his                                     ,
        pbIsActive                              ,
        setPbIsActive                           ,
        showVersionByKey                        ,
        svgs                                    ,
        wU                                      ,
        svgRotation                             ,
        setShowCopy                             ,
        showCopy                                ,
        showVersionFilterExpressionFromAbove    ,
        detailSize                              ,
        showDetailView                          ,
        setFlyerSvgStyle                        ,
        setFlyerSvgStyle2                        ,
        setFlyerSvgMaskStyle                    ,
        bgImageLoadedRef                        ,
        productImageLoadedRef                   ,
        svgImageLoadedRef                       ,
        setImigEleSvg                           ,
        setSvgBlobURL                           ,
        setSvgBlobURL2                           ,
        setSvgMaskBlobURL                       ,
        setSvgMaskBlobURL2                      ,
        setSvgPatternBlobURL                    ,
        setSvgPatternBlobURL2                    ,
        svgBlobURL                              ,
        svgBlobURL2                              ,
        svgMaskBlobURL                          ,
        svgMaskBlobURL2                         ,
        imigEleSvg                              ,
        setImigEleBg                            ,
        imigEleSvgMask                          ,
        url_virt                                ,
        url_item                                ,
        setCurrentResultId                      ,
        currentResultId                         ,
        blanks                                  ,
        selectedBgIndex                         ,
        penkirksBucket                          ,
        selectedPenIndex                        ,
        svgsPropsArray                          ,
        handleSetShowVersion                    ,
        imprintFilter                           ,
        showVersion                             ,
        bgChecked                               ,
        handleBgSelection                       ,
        setSelectedPenIndex                     ,
        errorMessage                            ,
        setShowCanvas                           ,
        qBuk                                    ,
        svgMaskForProductImage                  ,
        svgMaskForProductImage2                 ,
        setSvgMaskForProductImage               ,
        setSvgMaskForProductImage2              ,
        svgPatternForProductImage               ,
        setSvgPatternForProductImage            ,
        setSvgPattern                           ,
        setSvgPatternUnder                      ,
        berkgroundsBucket                       ,
        setImigEleProd                          ,
        imigEleBg                               ,        
        imigEleProd                             ,
        svgRotation2                            ,
        overlayImageLoadedRef                   ,
        setImigEleOverlay                       ,
        productImageLoadedOverlay               ,
        canvasRef                               ,
        customOneColor                          ,
        setCustomOneColor                       ,
        svgPatternForFlyer                      ,
        svgPatternUnderForFlyer                 ,
        svgPattern                              ,
        patternOn                               ,
        setPatternOn                            ,
        setMaskBackgroundColor                  ,
        maskBackgroundColor                     ,
        designPatterns                          ,
        setSvgPatternForFlyer                   ,
        setDesignOn                             ,
        designOn                                ,
        rotationCurrentSvg                      ,
        setRotationCurrentSvg                   ,
        includeWhiteUnderlay                    ,
        setIncludeWhiteUnderlay                 ,
        setCurrentProductNumber ,
    } =                                         props;

    const currentCursorOut = [ `url(${ paintbrush30 }) 0 0, progress` , 1 ];
    const currentCursorIn =  [ `url(${ paintbrush30black }) 0 0, progress` , 1 ];
    const isArktuvUNDO = false;
    const [ selectedColor       , setSelectedColor      ] = useState( '#7F2346' );
    const [ radioAllOrPath      , setRadioAllOrPath     ] = useState( 'single' );
    const [ currentTool         , setCurrentTool        ] = useState( 'paint' );
    const [ details             , setDetails            ] = useState( { a : 'a' , imageys : [ ] } );
    function setInput(k,v){
        let tempKVs=JSON.parse(JSON.stringify(details));
        tempKVs[k]=v;
        setDetails(tempKVs);
    };

    const showVersionFilterExpression = typeof showVersionFilterExpressionFromAbove!=='undefined'
        ?(c,f)=>(showVersionFilterExpressionFromAbove(c,f)):(c,f)=>c.toString()!==f.toString();
    let usingSvgs = svgs;
    let currentSvg = Array.isArray( svgs ) && svgs.length > 0
                        && svgs.filter( s => s.dsc === showVersionByKey ).length > 0
                        ? svgs.filter( s => s.dsc === showVersionByKey )[ 0 ]
                        : svgs[ 0 ];
    let currSvgIndex = 0;
    usingSvgs = usingSvgs
                    .filter((currentSvg,currSvgIndex)=>{
                        if ((typeof usingSvgs!=='undefined'&&typeof usingSvgs[currSvgIndex]['grps'][0]==='undefined')
                        ||showVersionFilterExpression(currentSvg.dsc,showVersionByKey)){return false;}else{return true;};});
    const rowsHeightForOptions = 60;
    const [editOverlay,setEditOverlay] = useState( false );
    const [logoVersionsHaveEnlarged,setLogoVersionsHaveEnlarged] = useState('600px');
    const [steps,setSteps]=useState([true,false]);
    const [ termsAccepted       , setTermsAccepted          ] = useState( false );
    const [ imageIsProcessing   , setImageIsProcessing      ] = useState( false );
    const [ totalProcessingTime , setTotalProcessingTime    ] = useState( null );
    const [ choosePadX          , setChoosePadX             ] = useState( 0 );
    const [ choosePadY          , setChoosePadY             ] = useState( 0 );
    const [searchOrUpload,setSearchOrUpload]=useState(initialSearchOrUpload);
    const [ blinking , setBlinking ] = useState( 1 );
    const [ showVersionByKey_PLURAL     , setShowVersionByKey_PLURAL    ] = useState(['Multicolor on Light','One Color on Light']);
    const [ maskBackgroundColor_PLURAL  , setMaskBackgroundColor_PLURAL ] = useState(['none','#e9e9e9']);
    const handleSetShozy_PLURAL=(version,imprintIndex,showVersionByKey_PLURAL)=>{
        if ( showVersionByKey_PLURAL && typeof showVersionByKey_PLURAL !== 'undefined' ) {
        let tempVers = JSON.parse( JSON.stringify( showVersionByKey_PLURAL ) );
        console.log( showVersionByKey_PLURAL );
        if (tempVers[imprintIndex] !== version ) {
            tempVers[imprintIndex] = version;
            setShowVersionByKey_PLURAL( tempVers );
        };
    }};

    useEffect(()=>{
        if (
            svgs
            && typeof svgs !== 'undefined'
            && svgs[ 0 ]
            && typeof svgs[ 0 ] !== 'undefined'
        ) {setMaskBackgroundColor_PLURAL( ['none','none','none','none','none','none']);};
    } , [ penkirksBucket , svgs ] );




    useEffect( ( ) => {
        function changeMaskColor_PLURAL( color , mask , essveegees , imprintIndex ) {
            console.log( 'hi0' );
            let firstPickWhite = '#ffffff';
            let firstPickLite = (
                            svgs 
                && typeof   svgs !== 'undefined'
                &&          svgs[ 1 ]
                && typeof   svgs[ 1 ] !== 'undefined'
                &&          svgs[ 1 ].mainColor
                && typeof   svgs[ 1 ].mainColor !== 'undefined'
            ) ?             svgs[ 1 ].mainColor : '#ffffff';
            let firstPickDark = (
                            svgs 
                && typeof   svgs !== 'undefined'
                &&          svgs[ 2 ]
                && typeof   svgs[ 2 ] !== 'undefined'
                &&          svgs[ 2 ].mainColor
                && typeof   svgs[ 2 ].mainColor !== 'undefined'
            ) ?             svgs[ 2 ].mainColor : '000000';
            let carlor = patternOn.toString( ) === '1' 
                            ? firstPickLite 
                            : patternOn.toString( ) === '2' 
                                ? firstPickDark 
                                : patternOn.toString( ) === '3' 
                                    ? firstPickWhite 
                                    : designOn && /#/.test( patternOn )
                                    ? patternOn
                                    : color;
            return carlor;
        };


        function matchMaskBgColorToSvgMainColor_PLURAL( maskBackgroundColor , svgMaskForProductImage , svgs  , imprintIndex ) {
            console.log( 'TRYN  WIT CRLS: ' + maskBackgroundColor + '  --> ' + imprintIndex );
            if ( maskBackgroundColor && svgMaskForProductImage && svgs.length > 0 ) {
                let zeeColor = changeMaskColor_PLURAL( maskBackgroundColor , svgMaskForProductImage , svgs , imprintIndex );
                if ( svgs && typeof svgs !== 'undefined' ) {
                    let foundOne = false;
                    if (/ffffff/i.test(zeeColor)){
                        console.log( 'marack1' )
                        handleSetShozy_PLURAL( 'Multicolor on Light' , imprintIndex , showVersionByKey_PLURAL );    
                        return zeeColor;
                    };
                    for ( var s = 0; s < svgs.length; s ++ ) {
                        if (
                            svgs[s].mainColor 
                            && typeof svgs[s].mainColor !== 'undefined'
                            && /SP1W/i.test(svgs[s].nm)
                            && svgs[s].mainColor.replace('#','') === zeeColor.replace( '#' , '' )
                        ) {
                            foundOne = true;
                            console.log( 'MERK sp1w: ' + svgs[ s ].dsc );
                            handleSetShozy_PLURAL( svgs[ s ].dsc , imprintIndex , showVersionByKey_PLURAL );
                            return zeeColor;
                        };
                    };

                    if (!foundOne) {
                        for ( var s = 0; s < svgs.length; s ++ ) {
                            if (
                                svgs[s].mainColor 
                                && typeof svgs[s].mainColor !== 'undefined'
                                && /SP1/i.test(svgs[s].nm)
                                && svgs[s].mainColor.replace('#','') === zeeColor.replace( '#' , '' )
                            ) {
                                foundOne = true;
                                console.log( 'MERK2(SP1ALL): ' + svgs[ s ].dsc );
                                handleSetShozy_PLURAL( svgs[ s ].dsc , imprintIndex , showVersionByKey_PLURAL );
                                return zeeColor;
                            };
                        }
                    };

                    if ( !foundOne ) {
                        console.log( 'NERT FADTED' );
                        for (var ss=0; ss<svgs.length;ss++) {
                            if (
                                svgs[ ss ].mainColor 
                                && typeof svgs[ ss ].mainColor !== 'undefined'
                                && /SP1/i.test( svgs[ ss ].nm )
                        ) {
                            let hueLogoColor =      convert.hex.lch( svgs[ ss ].mainColor );
                            let hueCurrentMask =    convert.hex.lch( maskBackgroundColor );
                            if (
                                    parseInt( hueLogoColor[ 2 ] ) > ( parseInt( hueCurrentMask[ 2 ] ) - 9 )
                                &&  parseInt( hueLogoColor[ 2 ] ) < ( parseInt( hueCurrentMask[ 2 ] ) + 9 )
                            ) {
                                console.log( 'MCKT3: ' + svgs[ ss ].dsc );
                                handleSetShozy_PLURAL( svgs[ ss ].dsc , imprintIndex , showVersionByKey_PLURAL );
                                return zeeColor;
                            }
                          }  };
                    }
                };
                return zeeColor;
            };
        };

        if (    maskBackgroundColor 
            &&  svgMaskForProductImage 
            &&  typeof svgs !== 'undefined' 
            &&  svgs.length > 0
        ) {
            if (
                maskBackgroundColor_PLURAL
                && allPenkirks
                && Array.isArray( allPenkirks )
                && allPenkirks.length > 0
            ) {
                let mappedImprintObjects = allPenkirks
                    .map((m,n)=>(
                        matchMaskBgColorToSvgMainColor_PLURAL(maskBackgroundColor_PLURAL[ n ] , allMaskSvgs[ n ] , svgs , n ) ) );
            }
        } 
    },[maskBackgroundColor_PLURAL,patternOn,svgs,designOn]);











        

    useEffect( ( ) => {
        let mapped;
        if ( 
            typeof penkirksBucket !== 'undefined' 
        && Array.isArray( penkirksBucket ) 
        && penkirksBucket.length > 0 
        && typeof selectedPenIndex !== 'undefined'
        ) {
            if ( 
                typeof penkirksBucket[ selectedPenIndex ] !== 'undefined' 
            && typeof penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault !== 'undefined'
            ) {
                console.log( 'SPPII__: ' + selectedPenIndex );
                if ( 
                    typeof svgsPropsArray !== 'undefined' 
                && Array.isArray( svgsPropsArray ) 
                && svgsPropsArray.length > 0
                && typeof svgsPropsArray[ 0 ] !== 'undefined'
                && typeof svgsPropsArray[ 0 ].name !== 'undefined'
                && typeof svgsPropsArray[ 0 ].description !== 'undefined'
                ) {

                    console.log( penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault );
                    console.log( svgsPropsArray );
                    let lvDefault = 
                    penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault === '1CV' 
                    ? '1CVIBE'
                    : penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault === '1CP' 
                        ? '1CPOP'
                        : penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault === '1CW'
                            ? '1CW'
                            : penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault === '1C'
                                ? '1CB'
                                    : /1C_/.test( penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault )
                                        ? '1CREC1'
                                        : penkirksBucket[ selectedPenIndex ].imprintLogoVersionDefault;
                    console.log( lvDefault );
                    let tempArray = svgsPropsArray.filter( sv => sv.name === lvDefault );
                    console.log( tempArray );
                    if ( tempArray.length > 0 ) {
                        mapped = tempArray[ 0 ].description;
                        // setShowVersionByKey( mapped );
                        handleSetShozy_PLURAL( mapped , 0 , showVersionByKey_PLURAL );
                    };
                }
            };
            let tempFilter = [ ];
            if (
                penkirksBucket[ selectedPenIndex ].imprintMulticolor 
            && typeof penkirksBucket[ selectedPenIndex ].imprintMulticolor !== 'undefined'
            ) {
                if ( penkirksBucket[ selectedPenIndex ].imprintMulticolor === 'F' ) {
                    tempFilter.push( /SP1/ );
                };

            };
            if (
                penkirksBucket[ selectedPenIndex ].imprintOnecolor 
            && typeof penkirksBucket[ selectedPenIndex ].imprintOnecolor !== 'undefined'
            ) {
                if ( penkirksBucket[ selectedPenIndex ].imprintOnecolor === 'F' ) {
                    tempFilter.push( /1C/ );
                };
            };
        }
    } , [ penkirksBucket , selectedPenIndex ] );


    const renderDownload =  ( berkgroundsBucket.length > 0 && penkirksBucket.length > 0 )
                                    && typeof penkirksBucket[ selectedPenIndex ] !== 'undefined'
                                    && typeof berkgroundsBucket[ selectedBgIndex ] !== 'undefined'
                                    && svgs
                                    && typeof svgs !== 'undefined'
                                    && svgs[ 0 ]
                                    && typeof svgs[ 0 ] !== 'undefined'
    const enableDownload =  svgs
                                && typeof svgs !== 'undefined'
                                && svgs[ 0 ]
                                && typeof svgs[ 0 ] !== 'undefined'

    
    useEffect( ( ) => {
        if ( totalProcessingTime ) {
            setBlinking( 2 );
        } else if ( !termsAccepted ) {
            setBlinking( 1 );
        } else { 
            setBlinking( 0 )
        }
    } , [ totalProcessingTime , termsAccepted  ] );

    let initialImprintObject = {
        name                                : 'logo1'                   ,
        svgsPropsArray                      : svgsPropsArray            ,
        berkgroundsBucket                   : berkgroundsBucket         ,
        includeWhiteUnderlay                : includeWhiteUnderlay      ,
        handleSetShowVersion                : handleSetShozy_PLURAL ,
        handleSetMaskBackgroundColor_PLURAL : handleSetMaskBackgroundColor_PLURAL , 
        maskBackgroundColor                 : maskBackgroundColor       ,
        patternOn                           : patternOn                 ,
        customOneColor                      : customOneColor            ,
    };

        
    function handleSetPatternOn_PLURAL( val , ideex ) {
        console.log( 'settinPAT: ' + ideex + ' -> ' + val );
        let tempPon = JSON.parse( JSON.stringify( patternOn_PLURAL ) );
        tempPon[ ideex ] = val;
        console.log( 'PERTERN: ' + val );
        setPatternOn_PLURAL( tempPon );
    };

    const imprintObjects = allPenkirks.map( ( fe , feIdx ) => ( {
        ...initialImprintObject ,
        ...( fe[ 0 ] )          ,
        name                    : 'logo' + ( feIdx + 1 )                ,
        maskBackgroundColor     : maskBackgroundColor_PLURAL[ feIdx ]   ,
        svgMaskForProductImage  : allMaskSvgs && typeof allMaskSvgs !== 'undefined' ? allMaskSvgs[ feIdx ] : undefined ,
        showVersionByKey_PLURAL : showVersionByKey_PLURAL               ,
        currentSvg              : svgs.filter( f => f.dsc === showVersionByKey_PLURAL[ feIdx ] )[ 0 ] ,
        showVersionByKey        : showVersionByKey_PLURAL[ feIdx ]      ,
        patternOn               : patternOn_PLURAL[ feIdx ]             ,
        setPatternOn            : ( a , b ) => {
            console.log( a );
            console.log( b );
            handleSetPatternOn_PLURAL( a , b );
        } ,
        setExtraRotate         : val => {
            console.log( extraRotate_PLURAL );
            console.log( val );
            console.log( feIdx );
            let tempRotate = JSON.parse( JSON.stringify( extraRotate_PLURAL ) );
            tempRotate[ feIdx ] = val;
            setExtraRotate_PLURAL( tempRotate );
        } ,
        extraRotate             : extraRotate_PLURAL[ feIdx ] ,
        patternSvg              : svgPatternForFlyer_PLURAL[ parseInt( patternOn_PLURAL[ feIdx ] ) ] ,
    } ) );


    function handleSetMaskBackgroundColor_PLURAL(clr,imprintIndex){
        if (maskBackgroundColor_PLURAL&&typeof maskBackgroundColor_PLURAL!=='undefined'){
            let tempVers=JSON.parse(JSON.stringify(maskBackgroundColor_PLURAL));
            tempVers[imprintIndex]=clr;
            setMaskBackgroundColor_PLURAL(tempVers);
        };
        console.log(allMaskSvgs);
        if (Array.isArray(allMaskSvgs)&&allMaskSvgs.length!==0){
            let tempMasks=JSON.parse(JSON.stringify(allMaskSvgs));
            tempMasks[imprintIndex]={
                ...JSON.parse(JSON.stringify(allMaskSvgs[imprintIndex])),
                grps:JSON.parse(JSON.stringify(allMaskSvgs[imprintIndex])).grps.map(m=>({
                    ...m,fill:clr,paths:m.paths.map(p=>({...p,fill:clr}))}))
            };
            setAllMaskSvgs(tempMasks);
        };
    }
    

    return (
    <Col 
        className='VarigatabulsVorkBox'
        key={ 'svgContcfontCont' }
        >
  
        { 
        ( ( url_virt && svgs )
        || !url_virt )
        && 
        <Row
            id='firstRowInDaTool'
            style={ {
                zIndex : 99 ,
            } }
            >

            <Col >
               
                <Row
                    id={ 'svgsAndPicsAndToolBoxes' }
                    key={ 'rowSvg' + 'currSvgIndex' }
                    style={{
                        marginBottom : '1.6rem'  ,
                    } }
                    >
                    <Col 
                        style={ { 
                            marginLeft  : 'auto'    ,
                            marginRight : 'auto'    ,
                        } }
                        >
                        <Row 
                            id='rowSurroundingThe2Columns'
                            style={ {
                                verticalAlign   : 'top'     ,
                                backgroundColor : '#f9f9f9' ,
                            } }
                            className='align-items-stretch'
                            >

                            <DaTool
                                fullColorBitmapImageLoadedRef={fullColorBitmapImageLoadedRef}
                                setImigEleFullColorBitmap={setImigEleFullColorBitmap}
                                bitmapOnImprintArea={bitmapOnImprintArea}
                                setBitmapOnImprintArea={setBitmapOnImprintArea}
                                fullColorBitmaps={fullColorBitmaps}
                                // associatedItemsForCurrentProductNumber={ associatedItemsForCurrentProductNumber }
                                currentProductNumber={ currentProductNumber }
                                itemDataObject={ itemDataObject }
                                setCurrentProductNumber={ setCurrentProductNumber }
                                itemData={ itemData }
                                setSvgPatternBlobURL2={         setSvgPatternBlobURL2 }
                                setFlyerSvgStyle2={             setFlyerSvgStyle2 }
                                svgPatternForFlyer_PLURAL={     svgPatternForFlyer_PLURAL }
                                maskBackgroundColor_PLURAL={    maskBackgroundColor_PLURAL }
                                showVersionByKey_PLURAL={       showVersionByKey_PLURAL }
                                imprintObjects={                imprintObjects }
                                allMaskSvgs={                   allMaskSvgs }
                                allPenkirks={                   allPenkirks }
                                termsAccepted={                 termsAccepted }
                                svgPatternUnderForFlyer={       svgPatternUnderForFlyer }
                                imageElementsForFlyer={         imageElementsForFlyer }
                                setImageElementsForFlyer={      setImageElementsForFlyer }
                                setImigEleWhiteUnderlay={       setImigEleWhiteUnderlay }
                                setBlobURLS={                   setBlobURLS }
                                blobURLS={                      blobURLS }
                                includeWhiteUnderlay={          includeWhiteUnderlay }
                                svgWhiteUnderlay={              svgWhiteUnderlay }
                                rotationCurrentSvg={            rotationCurrentSvg }
                                setDesignOn={                   setDesignOn }
                                designOn={                      designOn }
                                setSvgPattern={                 setSvgPattern }
                                svgPattern={                    svgPattern }
                                svgPatternForFlyer={            svgPatternForFlyer }
                                showLogoOnProduct={             termsAccepted }
                                choosePadX={                    choosePadX }
                                choosePadY={                    choosePadY }
                                svgRotation2={                  svgRotation2 }
                                penkirksBucket={                penkirksBucket }
                                selectedPenIndex={              selectedPenIndex }
                                fromPage={                      fromPage }
                                giveArray={                     giveArray } 
                                handleBackOne={                 handleBackOne }
                                handleSetSvgs={                 handleSetSvgs }
                                his={                           his }
                                isArktuvUNDO={                  isArktuvUNDO } 
                                pbIsActive={                    pbIsActive }
                                setPbIsActive={                 setPbIsActive }
                                showVersionByKey={              showVersionByKey }
                                svgs={                          svgs }
                                tokstAline={                    'right' }
                                undoarrow={                     undoarrow }
                                wU ={                           wU }
                                svgRotation={                   svgRotation }
                                svgContBackgroundImage={        berkgroundsBucket[ selectedBgIndex ].file }
                                productImageLoadedPen={         penkirksBucket[ selectedPenIndex ].file }
                                overlayImageLoadedRef={         overlayImageLoadedRef }
                                productImageLoadedOverlay={     productImageLoadedOverlay }
                                productImageData={              penkirksBucket[ selectedPenIndex ] }
                                setShowCopy={                   setShowCopy }
                                showCopy={                      showCopy }
                                stacked={                       true }
                                detailSize={                    detailSize }
                                showDetailView={                showDetailView }
                                setSvgBlobURL={                 setSvgBlobURL }
                                setSvgBlobURL2={                setSvgBlobURL2 }
                                setSvgMaskBlobURL={             setSvgMaskBlobURL }
                                setSvgMaskBlobURL2={            setSvgMaskBlobURL2 }
                                setSvgPatternBlobURL={          setSvgPatternBlobURL }
                                bgImageLoadedRef={              bgImageLoadedRef }
                                svgImageLoadedRef={             svgImageLoadedRef }
                                productImageLoadedRef={         productImageLoadedRef }
                                svgBlobURL= {                   svgBlobURL }
                                svgBlobURL2= {                  svgBlobURL2 }
                                svgMaskBlobURL= {               svgMaskBlobURL }
                                svgMaskBlobURL2= {              svgMaskBlobURL2 }
                                setImigEleBg={                  setImigEleBg }
                                setImigEleProd={                setImigEleProd }
                                setImigEleSvg={                 setImigEleSvg }
                                setImigEleOverlay={             setImigEleOverlay }
                                imigEleBg ={                    imigEleBg   }
                                imigEleProd={                   imigEleProd }
                                imigEleSvg={                    imigEleSvg }
                                imigEleSvgMask={                imigEleSvgMask }
                                setFlyerSvgStyle={              setFlyerSvgStyle }
                                setFlyerSvgMaskStyle={          setFlyerSvgMaskStyle }
                                url_virt={                      url_virt }
                                url_item={                      url_item }
                                setCurrentResultId ={           setCurrentResultId }
                                currentResultId={               currentResultId }
                                blanks={                        blanks }   
                                bgChecked={                     bgChecked }
                                showVersionFilterExpressionFromAbove={ ( c , f ) => { let ff = new RegExp( f  , 'i' ); return !ff.test( c ) } }
                                currentCursorOut={              currentCursorOut }
                                currentCursorIn={               currentCursorIn }
                                selectedColor={                 selectedColor }
                                setSelectedColor={              setSelectedColor }
                                radioAllOrPath={                radioAllOrPath }
                                setRadioAllOrPath={             setRadioAllOrPath }
                                currentTool={                   currentTool } 
                                setCurrentTool={                setCurrentTool }
                                usingSvgs={                     usingSvgs }
                                svgContStyle2={                 svgContStyle2 }
                                column2Style={                  column2Style }
                                currentSvg={                    currentSvg }
                                currSvgIndex={                  currSvgIndex }
                                svgMaskForProductImage={        svgMaskForProductImage }
                                svgMaskForProductImage2={       svgMaskForProductImage2 }
                                svgPatternForProductImage={    svgPatternForProductImage }
                                maskBackgroundColor={           maskBackgroundColor }
                                setMaskBackgroundColor={        setMaskBackgroundColor }
                                leftArrow={                     leftArrow }
                                setSelectedPenIndex={           setSelectedPenIndex }
                                patternOn={                     patternOn }
                                setChoosePadX={                 setChoosePadX }
                                setChoosePadY={                 setChoosePadY }
                                customOneColor={                customOneColor }
                                >
                            </DaTool>

                            <Col
                                id='cajaSegunda0'
                                style={{position:'relative',minHeight:logoVersionsHaveEnlarged,minWidth:'240px'}}
                                className='align-items-top'
                                >


                        {steps[ 0 ] &&
                            <Row>
                                <Col>
                                    <Row style={{ marginTop : '.75rem'}}>
                                        <Col style={{fontSize:'.9rem',fontWeight:500}}>
                                            <Form className={(blinking===1?'blink':'')} style={{display:'inline-block'}}>
                                                <Form.Check
                                                    checked={termsAccepted}
                                                    type="switch"
                                                    id="custom-switch-termsUrksapted"
                                                    label=""
                                                    onChange={()=>{
                                                        setShowTerms(false);
                                                        setTermsAccepted(!termsAccepted);
                                                    }}
                                                />
                                            </Form>
                                        <span onClick={()=>{setShowTerms(!showTerms);}}>
                                            {'I agree to HPG\'s '}
                                            <span
                                                style={ {
                                                    fontWeight  : 600       ,
                                                    color       : '#4700b3' ,
                                                    cursor      : 'pointer' ,
                                                } }
                                                onClick={()=>{setShowTerms(!showTerms)}}
                                                >
                                                { ' terms and conditions' }
                                            </span>
                                        </span>
                                        </Col>
                                    </Row>


                                     
                                        <Nav 
                                            fill
                                            variant="tabs" 
                                            defaultActiveKey={ initialSearchOrUpload }
                                            onSelect={ selectedKey => { console.log( 'hey' ); setSearchOrUpload( selectedKey ) } }
                                            style={ {
                                                fontSize : '.8rem' ,
                                            } } 
                                            >
                                            <Nav.Item>
                                                <Nav.Link 
                                                    disabled={ !termsAccepted }
                                                    eventKey='search'
                                                    >
                                                    { 'Search' }
                                                </Nav.Link>
                                            </Nav.Item>

                                            <Nav.Item size={ 'sm' } >
                                                <Nav.Link size={ 'sm' }
                                                    disabled={ !termsAccepted }
                                                    eventKey="upload"
                                                    >
                                                    { 'Upload' }
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>

                                    { 
                                    searchOrUpload === 'search' 
                                    &&
                                    <Row
                                        style={ {
                                            color           : 'white' ,
                                            backgroundColor : 'black' ,
                                            marginTop       : '1rem' ,
                                        } }
                                        >
                                        <Searchy2
                                            containerStyleFromAbove={ { 
                                                fontFamily      : 'Open Sans'   ,
                                                ...column2Style( )              ,
                                                paddingBottom   : '.25rem'      ,
                                                backgroundColor : '#f9f9f9'     ,
                                            } }
                                            handleSelection={           setInput }
                                            imageSubset={               'imageys' }
                                            includeLoadingImage={       'true' }
                                            labelStyleFromAbove={       { fontSize : '1rem' , display : 'none' } }
                                            placeHolderFromAbove={      'Logo Search' }
                                            previewAllowedFromAbove={   false }
                                            setCurrentResultId={        setCurrentResultId }
                                            xsFromAbove={               10 }
                                            xsFromAbove={               12 }
                                        />
                                    </Row>
                                    }


                                    {details.imageys.length>0&&
                                        <Col>
                                            <CatInput 
                                                details={ details }
                                                subset={ 'imageys' }
                                                setInput={ setInput }
                                                predictions={ [ 'pred' ] }
                                                imageIsProcessing={ imageIsProcessing }
                                            />
                                        </Col> }



                                <Row>
                                    <Col
                                     style={{marginTop:'1rem'}}>
                                        {searchOrUpload === 'upload' &&
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Uploader
                                                        details={ details }
                                                        setImageIsProcessing={ setImageIsProcessing }
                                                        imageIsProcessing={ imageIsProcessing }
                                                        setTotalProcessingTime={ setTotalProcessingTime }
                                                        totalProcessingTime={ totalProcessingTime }
                                                        qBuk={qBuk}
                                                        termsAccepted={termsAccepted}
                                                        setCurrentResultId={setCurrentResultId}
                                                        handler={ ( a ) => { setInput( 'imageys' , a ) } }
                                                    />
                                                </Row>

                                                <Row>
                                                {imageIsProcessing && !totalProcessingTime &&
                                                    <Col>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            style={{margin:'auto',display:'block',shapeRendering:'auto',}}
                                                            width="200px" height="200px"
                                                            viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                                            <circle cx="84" cy="50" r="10" fill="#3be8b0">
                                                                <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                                                                <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#3be8b0;#ffb900;#4700b3;#1aafd0;#3be8b0" begin="0s"></animate>
                                                            </circle><circle cx="16" cy="50" r="10" fill="#3be8b0">
                                                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                                                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                                                            </circle><circle cx="50" cy="50" r="10" fill="#1aafd0">
                                                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                                                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                                                            </circle><circle cx="84" cy="50" r="10" fill="#4700b3">
                                                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                                                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                                                            </circle><circle cx="16" cy="50" r="10" fill="#ffb900">
                                                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                                                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                                                            </circle>
                                                        </svg>
                                                    </Col>}
                                                </Row>
                                            </Col>
                                        </Row>
                                        }
                                    </Col>
                                </Row>




                                    {svgs
                                        && typeof svgs !== 'undefined'
                                        && svgs[ 0 ]
                                        && typeof svgs[ 0 ] !== 'undefined'
                                        && typeof svgs[ 0 ].grps !== 'undefined'
                                        && typeof svgs[ 0 ].vb !== 'undefined'
                                        && Array.isArray( svgs[ 0 ].grps )
                                        &&
                                    <Row
                                        >
                                        <Col
                                            >
                                            <Row
                                                >
                                                <Col
                                                    >
                                                    <RenderSvgElement
                                                        currentSvg={ svgs[ 0 ] }
                                                        svgStyleFromAbove={ { 
                                                            width   : '80' , 
                                                            height  : '80' ,
                                                        } }
                                                    />
                                                </Col>
                                            </Row>

                                            <Row
                                                >
                                                <Col
                                                    style={ { 
                                                        fontSize    : '.8rem'   ,
                                                        fontWeight  : 600       ,
                                                        marginBottom : '70px'   ,
                                                    } }
                                                    >
                                                    { 'current logo' }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    }

                                
                                    </Col>
                                </Row>
                                }



                                { errorMessage &&  <Row><Col style={ { 
                                    color        : 'red'     ,
                                    fontWeight   : 600       ,
                                    fontSize     : '1rem'    ,  
                                        } } > { errorMessage }
                                    </Col> </Row>  }



                                { steps[ 1 ]  &&  <> 
                                <VirtScreenTwo
                                    fullColorBitmaps={fullColorBitmaps}
                                    bitmapOnImprintArea={bitmapOnImprintArea}
                                    setBitmapOnImprintArea={setBitmapOnImprintArea}
                                    downloadButton={ <DownloadFlyerButton
                                        steps={ steps }
                                        setSteps={ setSteps }
                                        renderDownload={ renderDownload }
                                        termsAccepted={ termsAccepted }
                                        setShowCanvas={ setShowCanvas }
                                        enableDownload={ enableDownload }
                                        svgs={ svgs }
                                        blinking={ blinking }
                                        setBlinking={ setBlinking }
                                    /> }
                                    itemData={                          itemData }
                                    svgContBackgroundImage={            berkgroundsBucket[ selectedBgIndex ].file }
                                    svgPatternForFlyer_PLURAL={         svgPatternForFlyer_PLURAL }
                                    setMaskBackgroundColor_PLURAL={     setMaskBackgroundColor_PLURAL }
                                    setShowVersionByKey_PLURAL={        setShowVersionByKey_PLURAL }
                                    imprintObjects={                    imprintObjects }
                                    allPenkirks={                       allPenkirks }
                                    designOn={                          designOn }
                                    includeWhiteUnderlay={              includeWhiteUnderlay }
                                    setIncludeWhiteUnderlay={           setIncludeWhiteUnderlay }
                                    setRotationCurrentSvg={             setRotationCurrentSvg }
                                    rotationCurrentSvg={                rotationCurrentSvg }
                                    setDesignOn={                       setDesignOn }
                                    designOn={                          designOn }
                                    designPatterns={                    designPatterns }
                                    setCustomOneColor={                 setCustomOneColor }
                                    customOneColor={                    customOneColor }
                                    showPatternPadding={
                                        steps[ 1 ]  
                                        && svgs 
                                        && typeof svgs !== 'undefined' 
                                        && svgs[ 0 ]
                                        && typeof svgs[ 0 ] !== 'undefined' 
                                        && svgMaskForProductImage
                                        && typeof   svgMaskForProductImage !== 'undefined'
                                        && typeof   svgMaskForProductImage[ 'nm' ] !== 'undefined'
                                    }
                                    patternAvailable={ 
                                        steps[ 1 ]  
                                        && svgs 
                                        && typeof svgs !== 'undefined' 
                                        && svgs[ 0 ]
                                        && typeof svgs[ 0 ] !== 'undefined' 
                                        && svgMaskForProductImage
                                        && typeof   svgMaskForProductImage !== 'undefined'
                                        && typeof   svgMaskForProductImage[ 'nm' ] !== 'undefined'
                                    }
                                    setChoosePadX={ setChoosePadX }
                                    setChoosePadY={ setChoosePadY }
                                    choosePadX={ choosePadX }
                                    choosePadY={ choosePadY }
                                    patternOn={ patternOn }
                                    setPatternOn={ setPatternOn }
                                    editOverlay={ editOverlay }
                                    svgs={ svgs }
                                    svgsPropsArray={ svgsPropsArray }
                                    berkgroundsBucket={ berkgroundsBucket }
                                    handleSetShowVersion={ handleSetShowVersion }
                                    imprintFilter={ imprintFilter }
                                    showVersion={ showVersion }
                                    showVersionByKey={ showVersionByKey }
                                    bgChecked={ bgChecked }
                                    handleBgSelection={ handleBgSelection }
                                    setSelectedPenIndex={ setSelectedPenIndex }
                                    selectedPenIndex={ selectedPenIndex }
                                    penkirksBucket={ penkirksBucket }
                                    maskBackgroundColor={ maskBackgroundColor }
                                    setMaskBackgroundColor={ setMaskBackgroundColor }
                                    svgMaskForProductImage={ svgMaskForProductImage }
                                    svgMaskForProductImage2={ svgMaskForProductImage2 }
                                    setSvgMaskForProductImage={ setSvgMaskForProductImage }
                                    setSvgMaskForProductImage2={ setSvgMaskForProductImage2 }
                                    setSvgPatternForProductImage={ setSvgPatternForProductImage }
                                    setSvgPatternForFlyer={ setSvgPatternForFlyer }
                                />

                                <Row
                                    style={ { 
                                        position : 'absolute' ,
                                        bottom : '80px' ,
                                        width : '100%' ,
                                    } }
                                    className={ 'justify-content-around' } 
                                    >
                                    <DownloadFlyerButton
                                        steps={ steps }
                                        setSteps={ setSteps }
                                        renderDownload={ renderDownload }
                                        termsAccepted={ termsAccepted }
                                        setShowCanvas={ setShowCanvas }
                                        enableDownload={ enableDownload }
                                        svgs={ svgs }
                                        blinking={ blinking }
                                        setBlinking={ setBlinking }
                                    />
                                </Row>
                                </> 
                                }



                            <Row
                                style={ {
                                    position    : 'absolute' ,
                                    width       : '100%' ,
                                    bottom      : '10px' ,
                                    fontSize    : '.9rem' ,
                                    alignSelf   : 'end' ,
                                    height      : '60px' ,
                                } }
                                >
                                <VirtsNav
                                    svgs={ svgs }
                                    steps={ steps }
                                    setSteps={ setSteps }
                                    rowsHeightForOptions={ rowsHeightForOptions }
                                    renderDownload={ renderDownload }
                                    termsAccepted={ termsAccepted }
                                    setShowCanvas={ setShowCanvas }
                                    enableDownload={ enableDownload }
                                    canvas={ canvasRef }
                                    blinking={ blinking }
                                    setBlinking={ setBlinking }
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>
    }
    <Row style={{paddingBottom : '1rem' ,paddingTop : '1rem'}} >
        <Col>
            <Sharer />
        </Col>
        <Col>
    
        </Col>
    </Row>
    </Col>
 );
};