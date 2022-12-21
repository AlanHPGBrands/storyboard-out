import React,{useEffect,useCallback,useRef} from 'react';
import RenderSvgElement     from './rendersvgelement';
import RenderSvgPattern     from './rendersvgpattern.jsx';
import {imprintAreaStyle2 }from './virtualsCalculations';
import Button from 'react-bootstrap/Button';

const svgContBGImgStyle = {
        position        : 'absolute'    ,
        top             : '0px'         ,
        left            : '0px'         ,
        width           : '100%'        ,
        height          : '100%'        ,
        zIndex          : 1 ,
};
const imprintAreaRelativeFill2 = {
        backgroundColor : 'transparent' ,
        position        : 'relative'    ,
        width           : '100%'        ,
        height          : '100%'        ,
        padding         : '0px'         ,
        margin          : '0px'         ,
        zIndex          : 999999999     ,
    };
const svgStyle2 =(extraRotate,imprintAR)=>{
    let transformSvg = extraRotate&& typeof extraRotate !== 'undefined'
    let paddingAdjustment = 1;
    let howMuch = transformSvg ? 100 / imprintAR * paddingAdjustment : 0;
    let absoluteMuch = Math.abs( howMuch - 100 );
    let gotSmaller = imprintAR > 1;
    let adjustedMuch = absoluteMuch * paddingAdjustment;
    let halfMuch = adjustedMuch / 2;
    let topMuchLeftMuch = gotSmaller ? halfMuch : '-' + halfMuch;
    return ({
        position:'absolute',
        width:transformSvg?howMuch+'%':'100%',
        height:transformSvg?howMuch+'%':'100%',
        top:transformSvg?topMuchLeftMuch+'%':'0%',
        left:transformSvg?topMuchLeftMuch+'%':'0%'});
};

const productImageStyle2 = {
    position    : 'absolute'    ,
    top : '0px' , left : '0px'  ,
    display     : 'block'       ,
    width       : '100%'        ,
    height      : '100%'        ,
    zIndex      : 1             ,
};


export default function DaTool(props){
    const {
        // associatedItemsForCurrentProductNumber ,
        setCurrentProductNumber ,
        showVersionByKey_PLURAL     ,
        imprintObjects              ,
        allMaskSvgs                 ,
        allPenkirks                 ,
        bgChecked                   ,
        bgImageLoadedRef            ,
        blobURLS                    ,
        currentSvg                  ,
        currSvgIndex                ,
        includeWhiteUnderlay        ,
        leftArrow                   ,
        penkirksBucket              ,
        productImageLoadedOverlay   ,
        productImageLoadedPen       ,
        productImageLoadedRef       ,
        overlayImageLoadedRef       ,
        patternOn                   ,
        setBlobURLS                 ,
        setFlyerSvgStyle            ,
        setFlyerSvgStyle2           ,
        setFlyerSvgMaskStyle        ,
        setImigEleOverlay           ,
        setSvgBlobURL               ,
        setSvgBlobURL2              ,
        setSvgMaskBlobURL           ,
        setSvgMaskBlobURL2          ,
        setSvgPatternBlobURL        ,
        setSvgPatternBlobURL2       ,
        setImigEleBg                ,
        setImigEleProd              ,
        setSelectedPenIndex         ,
        selectedPenIndex            ,
        svgs                        ,
        svgWhiteUnderlay            ,
        svgContBackgroundImage      ,
        svgRotation                 ,
        svgContStyle2               ,
        svgMaskForProductImage      ,
        svgMaskForProductImage2     ,
        svgPatternForFlyer          ,
        termsAccepted               ,
        fullColorBitmapImageLoadedRef,
        bitmapOnImprintArea         ,
        fullColorBitmaps            ,
        setImigEleFullColorBitmap   ,
        }=props;
    const imprintAR=useRef(3);
    const pctMultiplier=useRef(19);
    const imprintOffsetPct=useRef([0,0]);
    const imprintTransform=useRef('');
    let dependencyArrayLogo=imprintObjects[0].currentSvg&&typeof imprintObjects[0].currentSvg!=='undefined'?imprintObjects[0].currentSvg:1;

    function useHookWithRefCallback(){
        const ref =       useRef( null);
        const setRef =    useCallback( node => {
                if ( node ) {
                    const svgElement =      node;
                    let clonedSvgElement =  svgElement.cloneNode( true );                       //console.log( clonedSvgElement );
                    let outerHTML =         clonedSvgElement.outerHTML;
                    let blob =              new Blob( [ outerHTML ] , { type : 'image/svg+xml' } );
                    let URL =               window.URL || window.webkitURL || window;           //console.log( blob );
                    let blobURL =           URL.createObjectURL( blob );                        //console.log( blobURL );
                    setSvgBlobURL( blobURL );
                };
                ref.current = node;
        }, [ dependencyArrayLogo ] )
        return [ setRef ]
    };

    let dependencyArrayLogo2=imprintObjects.length>1&&imprintObjects[1].currentSvg&&typeof imprintObjects[1].currentSvg!=='undefined'?imprintObjects[1].currentSvg:1; 
    function useHookWithRefCallback2(){
        const ref2=useRef(null);
        const setRef=useCallback(node=>{
            if(node){
                const svgElement =      node;
                let clonedSvgElement =  svgElement.cloneNode( true );                       //console.log( clonedSvgElement );
                let outerHTML =         clonedSvgElement.outerHTML;
                let blob =              new Blob( [ outerHTML ] , { type : 'image/svg+xml' } );
                let URL =               window.URL || window.webkitURL || window;           //console.log( blob );
                let blobURL =           URL.createObjectURL( blob );                        //console.log( blobURL );
                setSvgBlobURL2( blobURL );
            };
            ref2.current = node;
        }, [ dependencyArrayLogo2 ] )
        return [ setRef ]
    };

    let dependencyArrayMask = 
    imprintObjects[ 0 ].svgMaskForProductImage 
    && typeof imprintObjects[ 0 ].svgMaskForProductImage !== 'undefined'
    ? imprintObjects[ 0 ].svgMaskForProductImage
    : 1; 
    function useHookWithRefCallbackMask( ) {
        const refMask =     useRef( null );
        const setRef =      useCallback( node => {
            if ( refMask.current ) {
                }
                if ( node ) {
                    const svgElement =      node;
                    let clonedSvgElement =  svgElement.cloneNode( true );                       //console.log( clonedSvgElement );
                    let outerHTML =         clonedSvgElement.outerHTML;
                    let blob =              new Blob( [ outerHTML ] , { type : 'image/svg+xml' } );
                    let URL =               window.URL || window.webkitURL || window;           //console.log( blob );
                    let blobURL =           URL.createObjectURL( blob );                        //console.log( blobURL );
                    setSvgMaskBlobURL( blobURL )
                };
                refMask.current = node;
        }, [ dependencyArrayMask ] )
        return [ setRef ]
    };


    let dependencyArrayMask2 = 
    imprintObjects.length > 1
    && imprintObjects[1].svgMaskForProductImage 
    && typeof imprintObjects[ 1 ].svgMaskForProductImage !== 'undefined'
    ? imprintObjects[ 1 ].svgMaskForProductImage
    : 1; 
    function useHookWithRefCallbackMask2( ) {
        const refMask2 =     useRef( null );
        const setRef =      useCallback( node => {
            if ( refMask2.current ) {
                }
                if ( node ) {
                    const svgElement =      node;
                    let clonedSvgElement =  svgElement.cloneNode( true );                       //console.log( clonedSvgElement );
                    let outerHTML =         clonedSvgElement.outerHTML;
                    let blob =              new Blob( [ outerHTML ] , { type : 'image/svg+xml' } );
                    let URL =               window.URL || window.webkitURL || window;           //console.log( blob );
                    let blobURL =           URL.createObjectURL( blob );                        //console.log( blobURL );
                    setSvgMaskBlobURL2( blobURL )
                };
                refMask2.current = node;
        }, [ dependencyArrayMask2 ] )
        return [ setRef ]
    };

    let dependencyArrayPattern=typeof imprintObjects[0].patternOn!=='undefined'?imprintObjects[0].patternOn.toString():1;
    function useHookWithRefCallbackPattern(){
        const refPattern =useRef(null);
        const setRef =useCallback( node => {
                if ( node ) {
                    const svgElement =      node;
                    let clonedSvgElement =  svgElement.cloneNode( true );               //console.log( clonedSvgElement );
                    let outerHTML =         clonedSvgElement.outerHTML;
                    let blob =              new Blob( [ outerHTML ] , { type : 'image/svg+xml' } );
                    let URL =               window.URL || window.webkitURL || window;   //console.log( blob );
                    let blobURL =           URL.createObjectURL( blob );                //console.log( blobURL );
                    setSvgPatternBlobURL( blobURL );
                    console.log( '___ PAT PAT 1 : ' );
                    console.log( node );
                };
                refPattern.current = node;
        }, [ dependencyArrayPattern ] )
        return [ setRef ]
    };


    let dependencyArrayPattern2 = 
    imprintObjects.length > 1
&&
    typeof   imprintObjects[ 1 ].patternOn !== 'undefined'
    ?           imprintObjects[ 1 ].patternOn.toString( )
    : 1; 
    function useHookWithRefCallbackPattern2( ) {
        const refPattern2 =       useRef( null );
        const setRef =    useCallback( node => {
            if ( refPattern2.current ) {
                }
                if ( node ) {
                    const svgElement =      node;
                    let clonedSvgElement =  svgElement.cloneNode( true );               //console.log( clonedSvgElement );
                    let outerHTML =         clonedSvgElement.outerHTML;
                    let blob =              new Blob( [ outerHTML ] , { type : 'image/svg+xml' } );
                    let URL =               window.URL || window.webkitURL || window;   //console.log( blob );
                    let blobURL =           URL.createObjectURL( blob );                //console.log( blobURL );
                    setSvgPatternBlobURL2( blobURL );
                    console.log( '___ PAT pat 222 : ' );
                    console.log( node );
                };
                refPattern2.current = node;
        }, [ dependencyArrayPattern2 ] )
        return [ setRef ]
    };

    function useHookWithRefCallbackExtra0( ) {
        const refExtra0 =       useRef( null );
        const setRef =    useCallback( node => {
            if ( refExtra0.current && includeWhiteUnderlay ) {
                }
                if ( node ) {
                    const svgElement =      node;
                    let clonedSvgElement =  svgElement.cloneNode( true );
                    let outerHTML =         clonedSvgElement.outerHTML;
                    let blob =              new Blob( [ outerHTML ] , { type : 'image/svg+xml' } );
                    let URL =               window.URL || window.webkitURL || window;
                    let blobURL =           URL.createObjectURL(blob);
                    setBlobURLS(  blobURLS.length > 0 ? [ ...blobURLS , blobURL ]: [blobURL]);
                };
                refExtra0.current = node;
        }, [ includeWhiteUnderlay ] );
        return [ setRef ]
    };

    function useHookWithRefCallbackExtra1(){
        const refExtra1 =useRef(null);
        const setRef =useCallback(node=>{
                if (node){
                    const svgElement =      node;
                    let clonedSvgElement =  svgElement.cloneNode(true);
                    let outerHTML =         clonedSvgElement.outerHTML;
                    let blob =              new Blob([outerHTML],{type:'image/svg+xml'});
                    let URL =               window.URL||window.webkitURL||window;
                    let blobURL =           URL.createObjectURL(blob);
                    setBlobURLS(blobURLS.length>0?[...blobURLS,blobURL]:[blobURL]);
                };
                refExtra1.current = node;
        }, [ includeWhiteUnderlay ] );
        return [ setRef ]
    };

    const [ renderedExtra0 ] =      useHookWithRefCallbackExtra0( );
    const [ renderedExtra1 ] =      useHookWithRefCallbackExtra1( );
    const [ renderedSvg ] =         useHookWithRefCallback( );
    const [ renderedSvg2 ] =        useHookWithRefCallback2( );
    const [ renderedSvgMask ] =     useHookWithRefCallbackMask( );
    const [ renderedSvgMask2 ] =    useHookWithRefCallbackMask2( );
    const [ renderedSvgPattern ] =  useHookWithRefCallbackPattern( );
    const [ renderedSvgPattern2 ] = useHookWithRefCallbackPattern2( );


    useEffect(()=>{
        if (typeof svgs!=='undefined'&&typeof svgs[0]!=='undefined'){
            let tempStyle ={};
            let cloneImprintStyle = JSON.parse(JSON.stringify(imprintAreaStyle2(imprintObjects[0])));
            let tempStyle2={};
            if (imprintObjects.length>1){
                let turkeyStyle2 = JSON.parse(JSON.stringify( imprintAreaStyle2( imprintObjects[ 1 ] ) ) );
                tempStyle2[ 'left' ] =       parseInt( turkeyStyle2.left.replace( /%/g , '' )   );
                tempStyle2[ 'top' ] =        parseInt( turkeyStyle2.top.replace( /%/g , '' )    );
                tempStyle2[ 'width' ] =      parseInt( turkeyStyle2.width.replace( /%/g , '' )  );
                tempStyle2[ 'height' ] =     parseInt( turkeyStyle2.height.replace( /%/g , '' ) );
                tempStyle2[ 'rotation' ] =   parseInt(turkeyStyle2['flyerRotation']);
            };
            tempStyle[ 'left' ] =       parseInt( cloneImprintStyle.left.replace( /%/g , '' )   );
            tempStyle[ 'top' ] =        parseInt( cloneImprintStyle.top.replace( /%/g , '' )    );
            tempStyle[ 'width' ] =      parseInt( cloneImprintStyle.width.replace( /%/g , '' )  );
            tempStyle[ 'height' ] =     parseInt( cloneImprintStyle.height.replace( /%/g , '' ) );
            tempStyle[ 'rotation' ] =   parseInt(
                                            cloneImprintStyle[ 'flyerRotation' ]
                                                // .replace( 'rotate(' , '' )
                                                // .replace( 'deg)' , '' )
                                        );
            if (
                ( tempStyle[ 'rotation' ] || tempStyle[ 'rotation' ].toString( ) === '0' )
                && typeof tempStyle[ 'rotation' ] !== 'undefined'
            ) {
                if ( imprintObjects[ 0 ].extraRotate 
                    && typeof  imprintObjects[ 0 ].extraRotate !== 'undefined'
                    && imprintAR && typeof imprintAR !== 'undefined'
                ) {
                    tempStyle.width =     tempStyle.width     / imprintAR;
                    tempStyle.height =    tempStyle.height    / imprintAR;
                    tempStyle.left =      tempStyle.left     + ( imprintAR > 1 ) / imprintAR / 2;
                    tempStyle.top =       tempStyle.top      + ( imprintAR > 1 ) / imprintAR / 2;
                    tempStyle[ 'rotation' ] = parseInt( tempStyle[ 'rotation' ] ) + parseInt(  imprintObjects[ 0 ].extraRotate );
                };
            };
            setFlyerSvgStyle( tempStyle );
            setFlyerSvgStyle2( tempStyle2 );
            setFlyerSvgMaskStyle( tempStyle );
        }
    } , [
        pctMultiplier           ,
        imprintAR               ,
        svgRotation             ,
        imprintOffsetPct        ,
        currentSvg              ,
        svgMaskForProductImage  ,
    ] )

    let svgLogos , patternWiff;

    if (allPenkirks.length>0){
        svgLogos = allPenkirks
            .map((km,mmm)=>{
                let m=km[0];
                let currenltyCurrentSvg=svgs.filter(f=>f.dsc===showVersionByKey_PLURAL[mmm]).length>0
                    ?svgs.filter(f=>f.dsc===showVersionByKey_PLURAL[mmm])[0]:svgs[0];
                return({
                    ...imprintObjects[ mmm ] ,
                    currentSvg  : currenltyCurrentSvg ,
                    show        : true ,
                    imprintSy   : {...imprintAreaStyle2(m)},
                })});
        patternWiff = svgLogos && typeof svgLogos !== 'undefined' ? parseInt( svgLogos[ 0 ].imprintSy.width.replace( '%' , '' ) ) * 10 : 200;
    };

    const svgContainerStyle = {
        ...svgContStyle2(),
        backgroundColor:bgChecked&&typeof svgs!=='undefined' 
            &&svgs.length>0&&typeof svgs[0]!=='undefined' ?svgs[0].nitClrs[0]:'#ffffff'
    };

    const clipWidth = parseInt( svgContainerStyle.width.replace( 'px' , '' ) ) / 1000;
    
    const zIndices = {
        overlay : 88 ,
        imprintArea : thisImprintIndex => {
            const startZ = 30;
            let imprintGroupZRange = startZ + ( thisImprintIndex * 10 ); // 30 - 39 , 40 -49 for second...
            let zIndexReturn = {
                container       : imprintGroupZRange + 0 ,
                productImage    : imprintGroupZRange + 2 ,
                mask            : imprintGroupZRange + 4 ,
                underlay        : imprintGroupZRange + 6 ,
                logo            : imprintGroupZRange + 8 ,
                overlay         : imprintGroupZRange + 10,
            };
            return(zIndexReturn);
        }
    };

    const fullColorBitmapWidth='90%';

    let logImprintStyle = 
    
    JSON.parse(JSON.stringify(imprintAreaStyle2(imprintObjects[0])));
    // console.log(logImprintStyle)
    // console.log(imprintAreaRelativeFill2);
    // console.log(logImprintStyle);
    

    return (
        <div 
            id='PIC_BOX_SVG_CONTAINER'
            style={ svgContainerStyle }
            >
            { productImageLoadedOverlay && typeof productImageLoadedOverlay !== 'undefined' &&
            <img
                crossOrigin='Anonymous'
                ref={ overlayImageLoadedRef }
                style={ {
                    width       : '100%'            ,
                    height      : '100%'            ,
                    position    : 'absolute'        ,
                    top         : '0px'             ,
                    left        : '0px'             ,
                    zIndex      : zIndices.overlay  ,
                } }
                src={ productImageLoadedOverlay }
                alt='overlayIMg'
                id='OVERLAY'
                onLoad={ ( ) => { setImigEleOverlay( overlayImageLoadedRef.current ) } }
            /> }

            {
            svgMaskForProductImage2
            &&
            typeof svgMaskForProductImage2 !== 'undefined'
            &&
            <svg
                viewBox='0 0 1000 1000'
                >
                <defs>
                    <clipPath 
                        id='hardclip'
                        >
                        <path
                            d={ svgMaskForProductImage2.grps[ 0 ].paths[ 0 ].d }
                            transform={ `scale(${ clipWidth }, ${ clipWidth })` }
                        />
                    </clipPath>
                </defs>
            </svg>
            }



        {
            termsAccepted &&
        typeof svgLogos !== 'undefined' &&
        svgLogos
            .filter(f=>(f.show))
            .map((logo,logoIdx)=>{
                let laClippers;
                let renderWCleepMap = false;
                if (logoIdx === 1) {
                    laClippers = `url(#hardclip)`;
                    renderWCleepMap = true;
                };
            return (
                <div 
                    key={ logoIdx + 'fullSizePicBoxPerImprintArea' }
                    style={ {
                        position            : 'absolute'    ,
                        top                 : '0px'         ,
                        left                : '0px'         ,
                        width               : '100%'        ,
                        height              : '100%'        ,
                        clipPath            : renderWCleepMap ? laClippers : undefined ,
                        backgroundColor     : 'transparent' ,
                        zIndex              : 9             ,
                    } }
                    >



                                    {/* {
                                    associatedItemsForCurrentProductNumber
                                    && typeof associatedItemsForCurrentProductNumber !== 'undefined' 
                                    &&
                                    <div
                                        style={{
                                            position  : 'absolute' ,
                                            top : '0px' , 
                                            right : '0px' ,
                                            width : '30%' ,
                                            height : '15%' ,
                                            zIndex : 99999999 ,
                                            color : 'white' ,
                                        }}
                                        >
                                        {   associatedItemsForCurrentProductNumber
                                            .map(m=>(<Button
                                                        className={ 'btn-tranny' } 
                                                        key={m.product_number + 'k' }
                                                        onClick={()=>{setCurrentProductNumber(m.product_number.toUpperCase());}}
                                                        style={{fontSize : '.75rem' ,padding : '.2rem'}} >
                                                        { m.product_name }
                                                        { ' ' }
                                                        { m.misc_2 }
                                                    </Button> )) }
                                        </div> } */}


                    {!logo.patternOn
                    &&
                    <>
                        <div
                            key={logoIdx+'logoSvg'+imprintTransform}
                            id={'IMPRINT_AREA'+imprintTransform}
                            style={{...logo.imprintSy,zIndex:zIndices.imprintArea(logoIdx).container}}
                            >
                            <div id='IMPRINT_RELATIVE_FILL' style={{...imprintAreaRelativeFill2,zIndex:zIndices.imprintArea(logoIdx).container}}>

                            {!bitmapOnImprintArea &&
                                <RenderSvgElement
                                    currentSvg={logo.currentSvg}
                                    svgStyleFromAbove={{width:'100%',height:'100%',zIndex:zIndices.imprintArea(logoIdx).logo,
                                        transform:'rotate('+logo.extraRotate+'deg )'}}
                                    currSvgIndex={currSvgIndex}
                                    renderedSvgRef={[ renderedSvg,renderedSvg2][logoIdx]}
                                    fillPatternId={'renderdDANG:'+logoIdx}
                                    renderWithClippy={false}
                                    clippyLogoUrlId={undefined}
                                />}
                            </div>
                        </div> 



                        { allMaskSvgs[ logoIdx ] 
                        && typeof allMaskSvgs[ logoIdx ] !== 'undefined'
                        &&
                        <RenderSvgElement
                            renderedSvgRef={        [renderedSvgMask,renderedSvgMask2][logoIdx]}
                            hasMaskFillPattern={    true}
                            key={                   'maskNotPattern'}
                            svgStyleFromAbove=      {{
                                                        width       : '100%'        ,
                                                        height      : '100%'        ,
                                                        position    : 'absolute'    ,
                                                        top         : '0px'         ,
                                                        left        : '0px'         ,
                                                        zIndex      : 6 + ( logoIdx * 2 ) , 
                                                    }}
                            currentSvg={            logo.svgMaskForProductImage}
                            currSvgIndex={          currSvgIndex}
                            fillPatternId={         'productMaskOnly'}
                            renderWithPattern={     false}
                        />
                        }
                    </>
                    }

                    {svgs 
                    && typeof   svgs !== 'undefined' 
                    &&          svgs[ 0 ]
                    && typeof   svgs[ 0 ] !== 'undefined' 
                    &&          svgMaskForProductImage
                    && typeof   svgMaskForProductImage !== 'undefined'
                    && typeof   svgMaskForProductImage[ 'nm' ] !== 'undefined'
                    &&
                    <>
                        {logo.patternOn && !bitmapOnImprintArea
                         &&<>
                        {svgPatternForFlyer 
                            && svgPatternForFlyer[ 0 ] 
                            && typeof svgPatternForFlyer[ 0 ] !== 'undefined' 
                            && typeof svgPatternForFlyer[ 0 ].nm 
                            && typeof svgPatternForFlyer[ 0 ].nm !== 'undefined' 
                            && svgPatternForFlyer[ 0 ]
                            && typeof svgMaskForProductImage !== 'undefined' 
                            && typeof svgMaskForProductImage.nm !== 'undefined' 
                            && svgMaskForProductImage
                            &&
                                <RenderSvgElement
                                    patternLogoUrlId={'1'+logoIdx}
                                    renderedSvgRef={[renderedSvgPattern,renderedSvgPattern2][logoIdx]}
                                    hasMaskFillPattern={true}
                                    key={'keffyBish'}
                                    svgStyleFromAbove={{position:'absolute',top:'0px',left:'0px'}}
                                    currentSvg={logo.svgMaskForProductImage}
                                    currSvgIndex={currSvgIndex }
                                    fillPatternId={'productMaskWithPattern'+logoIdx}
                                    feel={logo.patternOn
                                        ?<RenderSvgPattern
                                            key={'blaaaala'}
                                            alt= 'svgRendereds'
                                            currentSvg={logo.patternSvg }
                                            fillPatternId={'patternForFlyer' + logoIdx }
                                            patternLogoUrlId={'1' + logoIdx }
                                            patternWidthFromAbove={patternWiff }
                                        />:'' }
                                    renderWithPattern={true}
                                />}


                            {includeWhiteUnderlay
                            &&
                            <RenderSvgElement
                                patternLogoUrlId={      '2' + logoIdx }
                                renderedSvgRef={        renderedSvgPattern }
                                hasMaskFillPattern={    true }
                                key={                   'keffyBish' }
                                svgStyleFromAbove={{position:'absolute',top:'0px',left:'0px'}}
                                currentSvg={logo.svgMaskForProductImage}
                                currSvgIndex={currSvgIndex}
                                fillPatternId={'productMask'}
                                feel={patternOn ? <RenderSvgPattern
                                        key={ 'blaaaala' }
                                        alt='svgRendereds'
                                        currentSvg={ logo.patternSvg }
                                        fillPatternId={ 'patternUNUNUNUNDERRRRRRRForFlyer' }
                                        patternLogoUrlId={ '2' + logoIdx }
                                        patternWidthFromAbove={ patternWiff }
                                    /> : '' }
                                renderWithPattern={ true }
                            />
                            }
                        </>
                    }
                    </>
                    }


{fullColorBitmaps&& typeof fullColorBitmaps !== "undefined" &&
  bitmapOnImprintArea && (
                <div
                  key={logoIdx + "logoSvg" + imprintTransform}
                  id={"IMPRINT_AREA" + imprintTransform}
                  style={{
                    ...logo.imprintSy,
                    zIndex: zIndices.imprintArea(logoIdx).container,
                  }}
                >
                  <div
                    id="IMPRINT_RELATIVE_FILL"
                    style={{
                      ...imprintAreaRelativeFill2,
                      zIndex: zIndices.imprintArea(logoIdx).container,
                    }}
                  >
                          <img
                            crossOrigin="Anonymous"
                            ref={fullColorBitmapImageLoadedRef}
                            onLoad={()=>{setImigEleFullColorBitmap(fullColorBitmapImageLoadedRef.current);}}
                            src={fullColorBitmaps[0]}
                            style={{...(()=>{
                                let initSt={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"};
                                    if (logo.currentSvg.vb[2]/parseInt(logo.imprintSy.width.replace('%',''))
                                    >logo.currentSvg.vb[3]/parseInt(logo.imprintSy.height.replace('%',''))){
                                        Object.assign(initSt,{width:'100%'})
                                    }else{ Object.assign(initSt,{height:'100%'})};
                                console.log(initSt);
                                return initSt;
                            })()}}
                          />
                  </div>
                </div> )}
                </div>
        )})}

        {bgChecked
        && svgContBackgroundImage 
        && typeof svgContBackgroundImage !== 'undefined'
        && !/\/COMMON\//.test(svgContBackgroundImage)
        && 
        <img
            crossOrigin='Anonymous'
            ref={bgImageLoadedRef }
            style={svgContBGImgStyle }
            src={svgContBackgroundImage }
            alt='bgIMg'
            onLoad={()=>{setImigEleBg(bgImageLoadedRef.current)}}
        /> }






        { productImageLoadedPen && typeof productImageLoadedPen !== 'undefined' &&
        <img
            crossOrigin='Anonymous'
            ref={productImageLoadedRef}
            style={productImageStyle2}
            src={productImageLoadedPen}
            alt='pridIMg'
            onLoad={()=>{setImigEleProd(productImageLoadedRef.current)}}
        /> }






















            <div
                style={ {
                    position    : 'absolute'    ,
                    bottom      : '0px'         ,
                } }
                >
                { props.children }
            </div>






                { typeof penkirksBucket !== 'undefined' && penkirksBucket.length > 1 &&
                <>
                    <div 
                        style={ {
                            position    : 'absolute'    ,
                            left        : '0px'         ,
                            top         : '50%'         ,
                            zIndex      : 2147413647 ,
                        } }
                        onClick={ ( ) => {
                            if ( selectedPenIndex === 0 ) {
                                setSelectedPenIndex( penkirksBucket.length - 1 )
                            } else {
                                setSelectedPenIndex( selectedPenIndex - 1 )
                            }
                        } }
                        >
                        { <img src={ leftArrow } alt='left' width='50' /> }
                    </div>

                    <div 
                        style={ {
                            position : 'absolute' ,
                            right : '0px' ,
                            top : '50%' ,
                            transform : 'rotate(180deg)' ,
                            zIndex      : 2147413647 ,
                        } }
                        onClick={ ( ) => {
                            if ( selectedPenIndex < penkirksBucket.length - 1 ) {
                                setSelectedPenIndex( selectedPenIndex + 1 );
                            } else {
                                setSelectedPenIndex( 0 );
                            }                
                        } }
                        >
                        { <img src={ leftArrow } alt='left' width='50'  /> }
                    </div>
                </>
                }






    </div>

    )
}