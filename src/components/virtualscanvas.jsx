import React , { useEffect } from 'react'

const Canvas = props => {

    const { 
        draw        ,
        width       ,
        height      ,
        canvasRef   ,
        images      ,
        textContent ,
        display     ,
        svgs ,
        currentResultId ,
        setCanvasSaved ,
        setFlyerUrl ,

        clippaNigga,

    } =             props;
    // console.log(        images );
    // console.log(        canvasRef.current );

    useEffect( ( ) => {
        if ( images ) {
            const canvas =      canvasRef.current;
            const context =     canvas.getContext( '2d' , { alpha : false } );
            let sendingImages = images;
            draw( {
                context         : context , 
                images          : sendingImages , 
                width           : width , 
                height          : height , 
                productText     : textContent , 
                canvas          : canvas ,
                svgs            : svgs ,
                currentResultId : currentResultId ,
                setCanvasSaved  : setCanvasSaved ,
                setFlyerUrl     : setFlyerUrl ,
                clippyNigga     : clippaNigga ,
             } );
    
        };
    } , [ draw ] );

    
    return (
        <canvas
            id='booty' 
            width={ width } 
            height={ height } 
            ref={ canvasRef }
            style={ {
                display : display ,
            } }
        /> );
};

export default Canvas;