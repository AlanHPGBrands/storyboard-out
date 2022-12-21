export const imprintAreaStyle2 =    productImageData => {
            const calculateShit =   productImageData => {
                let [tempW,tempH]=/x/i.test(productImageData.imprintWidthXHeightPx)
                    ?productImageData.imprintWidthXHeightPx.split('x').map(m=>parseInt(m)):[200,200];
                let tempOffset=/x/i.test(productImageData.imprintOffsetXYPx)
                    ?productImageData.imprintOffsetXYPx.split('x').map(m=>parseInt(m)/10):[20,20];
                return ({
                    ...productImageData ,
                    pctMultiplier       : tempW > tempH ? tempW / 10 : tempH / 10 ,
                    imprintAR           : tempW / tempH ,
                    imprintOffsetPct    : tempOffset ,
                    imprintTransform    : productImageData.imprintTransform && typeof productImageData.imprintTransform !== 'undefined' 
                                            ? productImageData.imprintTransform.replace( /--/g , ',' ).replace( /_/g , ' ' ) : '' ,
                });
            };
        let {pctMultiplier,imprintAR,imprintOffsetPct,imprintTransform,imprintRotationDeg}=calculateShit(productImageData);
        let wid=imprintAR>1?pctMultiplier:pctMultiplier*imprintAR;
        let hit=imprintAR>1?pctMultiplier/imprintAR:pctMultiplier;
        let tip =       typeof imprintOffsetPct !== 'undefined' && Array.isArray( imprintOffsetPct ) && imprintOffsetPct.length === 2
                            ? ( ( 100 - hit ) / 2 ) - imprintOffsetPct[ 1 ]
                            : ( ( 100 - hit ) / 2 );
        let felt =      typeof imprintOffsetPct !== 'undefined' && Array.isArray( imprintOffsetPct ) && imprintOffsetPct.length === 2
                            ? Math.floor( ( 100 - wid ) / 2 ) + imprintOffsetPct[ 0 ]
                            : Math.floor( ( 100 - wid ) / 2 );
        let flyerRotationFromTransform=imprintTransform&&typeof imprintTransform!=='undefined'&&/rotate\(([0-9]{1,3})deg\)/i.test(imprintTransform)?parseInt( imprintTransform.match( /rotate\(([0-9]{1,3})deg\)/)[1]):0;
        let flyerRotationFromRatationParameter=imprintRotationDeg&&typeof imprintRotationDeg!=='undefined'?parseInt(imprintRotationDeg):0;
        let retObj = {
            position        : 'absolute'    ,
            transform       : typeof imprintTransform !== 'undefined' && imprintTransform.length > 0 
                                ? imprintTransform+' '+(typeof imprintRotationDeg !== 'undefined' ? ` rotate(${ parseInt( imprintRotationDeg ) }deg) ` : '' )
                            : typeof imprintRotationDeg!=='undefined'?' rotate(' + imprintRotationDeg + 'deg) ':'',
            width           : wid + '%'     ,
            height          : hit + '%'     ,
            top             : tip + '%'     ,      
            left            : felt + '%'    ,      
            zIndex          : 9999          ,
            flyerRotation   : flyerRotationFromRatationParameter + flyerRotationFromTransform ,
        };
    return(retObj);
};