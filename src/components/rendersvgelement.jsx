import React , { useRef } from 'react';






export default function RenderSvgElement( props ) {

    const {
        currentSvg              ,
        currSvgIndex            ,
        svgStyleFromAbove       ,
        renderedSvgRef          ,
        cursorStyleFromAbove    ,
        handler             ,
        feel                ,
        fillPatternId       ,
        renderWithPattern   ,
        clippyLogoUrlId    ,
        patternLogoUrlId    ,
        renderWithClippy ,
    } = props;

    let eyedee = fillPatternId && typeof fillPatternId !== 'undefined' 
                    ? fillPatternId
                    : currentSvg && typeof currentSvg[ 'nm' ] !== 'undefined'
                        ? currentSvg[ 'nm' ]
                        : 'svgIdRendered';

    let smile = currentSvg && currentSvg.opacity && typeof currentSvg.opacity !== 'undefined' 
    ? { 
        ...svgStyleFromAbove ,
        opacity : currentSvg.opacity
    }
    : svgStyleFromAbove;

    const reckeredErsfVeGee = useRef( null );

        
    let clippy = (
        currentSvg 
        && renderWithClippy
        && typeof renderWithClippy !== 'undefined'
    )
    ? clippyLogoUrlId : undefined;

// console.log( 'smile' );
// console.log( smile );

    return (

        <svg
            crossOrigin={ 'anonymous' }
            ref={ typeof renderedSvgRef !== 'undefined' ? renderedSvgRef : reckeredErsfVeGee }
            className={ 'spectrasvg' + eyedee }
            id={ eyedee }
            key={ eyedee + 'key' }
            version='1.0' 
            xmlns='http://www.w3.org/2000/svg'
            viewBox={ currentSvg.vb.join( ' ' ) }
            style={ smile }
            onLoad={ ( ) => {
                if ( typeof handler !== 'undefined' ) {
                    handler( renderedSvgRef.current );
                }
            } }
            onClick={ ( ) => { console.log( eyedee ) } }
            // clipPath='url(#hardclip)'
            >

            {
            typeof currentSvg.circs !== 'undefined' && Array.isArray( currentSvg.circs ) && currentSvg.circs.length > 0 && Object.keys( currentSvg.circs[ 0 ] ).length > 0
            &&
            currentSvg.circs.map( ( circle , cInd ) => {
                return (
                    <circle 
                        key={   cInd + 'circKey' }
                        cx={    circle.cx }
                        cy={    circle.cy }
                        r={     circle.r }
                        fill={ typeof circle.fill !== 'undefined' ? circle.fill : undefined }
                        />
                )
            } )
            }



            
            {
            typeof currentSvg.rects !== 'undefined' 
            && Array.isArray( currentSvg.rects ) 
            && currentSvg.rects.length > 0 
            && Object.keys( currentSvg.rects[ 0 ] ).length > 0
            &&
            currentSvg.rects.map( ( rect , cInd ) => {

                return (
                    <rect 
                        key={ cInd + 'circKey' }
                        x={ rect.x }
                        y={ rect.y }
                        width={ rect.width }
                        height={ rect.height }
                        fill={ typeof rect.fill !== 'undefined' ? rect.fill : undefined }
                        />
                )
            } )
            }


            { feel && <>{ feel }</> }


            { 
            currentSvg.grps && Array.isArray( currentSvg.grps )
            &&
            <>
            {
            currentSvg.grps.map( ( currentGroup , currGrpIndex ) => {
if ( currGrpIndex === 0 ) {
    let identifyer = 

    {
        x : 100 ,
        y : 100 ,
        fontsize : '40px' ,
        color : 'green' ,
        characters : eyedee + ' - ' + currentSvg.nm ,
    }
};

    return (
                
        <g
            key={ 'svgGroup' + currGrpIndex }
            transform={ currentGroup.transform ? currentGroup.transform : undefined }
        >
        { currentGroup.text &&
        <text 
            x={ currentGroup.text.x } 
            y={ currentGroup.text.y }
            width={ '120px' }
            height={ '20px' }
            className={ 'small' }
            style={ {
            fontSize : currentGroup.text.fontsize ,
            fill : currentGroup.text.color ,
            } }
        >
        { currentGroup.text.characters }
        </text> 
        }


        {
        currentGroup.paths &&
        currentGroup.paths.map( ( currentPath , currPathIndex ) => {


            let filly = (
                    currentSvg 
                    && renderWithPattern
                )
                ? `url(#pattern-logo${ ( typeof patternLogoUrlId !== 'undefined' ? patternLogoUrlId : '' ) })` 
                : currentPath.fill === 'none' 
                    ? 'none' 
                    : currentPath.fill === 'red' 
                        ? 'red'
                        : currentPath.fill[ 0 ] === '#' 
                            ? currentPath.fill 
                            : '#' + currentPath.fill;


                    

          return (
        <a
            id={ [ 'currentGroup' , currSvgIndex , currGrpIndex , currPathIndex ].join( '-' ) }
            key={ 'svgPath' + currGrpIndex + '-' + currPathIndex }
            className='svgClickableA'
            style={ cursorStyleFromAbove }
            onClick={ ( ) => {
            } }
           
        >
        <path
            stroke={ typeof currentPath.stroke !== 'undefined' ? currentPath.stroke : '' }
            strokeWidth={ typeof currentPath.strokeWidth !== 'undefined' ? currentPath.strokeWidth : '' }
            d={ currentPath.d }
        // fill="url(#pattern-logo)"
            fill={ filly }
            // clipPath={ typeof clippy !== 'undefined' ? clippy : undefined }
            // style={ { 
            //     clipPath : typeof clippy !== 'undefined' ?  clippy : undefined ,
            //     WebkitClipPath : typeof clippy !== 'undefined' ? clippy : undefined ,
            // } }
              
            transform={ typeof currentPath.transform !== 'undefined' ? currentPath.transform : '' }
        />
        </a>
            
        ) } ) }
        </g>
        ) } ) }
        </>
}
    </svg>


    );
};