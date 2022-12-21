import { Storage }         from 'aws-amplify';




    function dataURItoBlob( dataURI ) {
        var binary =    atob( dataURI.split( ',' )[ 1 ] );
        // var binary = Buffer.from( dataURI.split( ',' )[ 1 ] , 'base64' );
        var array =     [ ];
        for ( var i = 0; i < binary.length; i++ ) {
            array.push( binary.charCodeAt( i ) );
        };
        return new Blob( [ new Uint8Array( array ) ] , { type : 'image/png' } );
    }
    












export const doNewSave = ( {
                                canvasRef        ,
                                width            ,
                                height           ,
                                draw             ,
                                images           ,
                                textContent      ,
                                display          ,
                                svgs             ,
                                currentResultId  ,
                                setCanvasSaved   ,
                                setFlyerUrl      ,
                                canvas           ,
                                context ,
                                clippyNigga ,
                            } ) => {
                                let imgObjectArray = images;
                                // let context = canvasRef;
                                let productText = undefined;


    // function doNewSave( context , imgObjectArray , width , height , productText , canvas , resid , patternOn ) {
        console.log( 'HI FROM ::DONEWSAVE::' );
        console.log( imgObjectArray );
        // imgObjectArray
        //     .sort( ( a , b ) => ( a.name && typeof a.name !== 'undefined' && a.name === 'backgroundImage'   ? 1 : -1 ) )
        //     .sort( ( a , b ) => ( a.name && typeof a.name !== 'undefined' && a.name === 'productImage'      ? 1 : -1 ) )
        //     .sort( ( a , b ) => ( a.name && typeof a.name !== 'undefined' && a.name === 'svgMask2'          ? 1 : -1 ) )
        //     .sort( ( a , b ) => ( a.name && typeof a.name !== 'undefined' && a.name === 'svgLogo2'          ? 1 : -1 ) )
        //     .sort( ( a , b ) => ( a.name && typeof a.name !== 'undefined' && a.name === 'svgMask'           ? 1 : -1 ) )
        //     .sort( ( a , b ) => ( a.name && typeof a.name !== 'undefined' && a.name === 'svgLogo'           ? 1 : -1 ) )
        console.log( imgObjectArray );
            context.fillStyle = 'white';
        context.fillRect( 0 , 0 , width , height );
        if ( 
            typeof imgObjectArray !== 'undefined' 
            && Array.isArray( imgObjectArray ) 
            && imgObjectArray.length > 0 
        ) {
            let invalid = false;
            imgObjectArray.forEach( ( i , iIdx ) => { 
                // console.log( 'IIIIII:::::' );
                // console.log( iIdx );
                // console.log( i );
                // console.log( i.element );
                if ( typeof i.element === 'undefined' ) {
                    console.log( 'BADBADBADDDD!!1' )
                    invalid = true;
                } else {
                    if (
                        i.element
                        && typeof i.element !== 'undefind'
                    ) {
                        // console.log( i.element.crossOrigin )
                    };
                }
            } );
            if ( invalid ) { 
               console.log( 'MISSING IMAGE ELEMENT IN DPCY ARRAY.' ); 
                return false; 
            };

            imgObjectArray
                // .slice( 0 , 1 )
                .forEach( i => {
            // console.log( i );
            const { element , placement } = i;

            if ( 
                typeof placement !== 'undefined' 
                && ( Array.isArray( placement ) || typeof placement[ 'top' ] !== 'undefined' )
            ) {
                if (
                    typeof placement[ 'top' ] !== 'undefined' 
                    && i[ 'element' ]
                    && typeof i[ 'element' ] !== 'undefined'
                    && 'null' !== i[ 'element' ]
                ) {
                    if (
                                    i[ 'name' ] && typeof i[ 'name' ] !== 'undefined' 
                        && (        
                               i[ 'name' ] === 'svgMask' 
                            || i[ 'name' ] === 'svgMask2' 
                            || i[ 'name' ] === 'svgPattern' 
                            || i[ 'name' ] === 'svgPattern2' 
                            
                            )
                        &&          i[ 'element' ]
                        && typeof   i[ 'element' ] !== 'undefined'
                        && 'null'!==i[ 'element' ]
                    ) {

                        console.log( '11111111111111111111111' + i.name )
                
                        context.globalAlpha = i[ 'name' ] === 'svgPattern' ? 1 : .9;
                        context.drawImage( element , 0 , 0 , width , height );
                        context.globalAlpha = 1;

                        // if ( i[ 'name' ] === 'svgMask2' ) {
                        //     let region = new Path2D( );
                        //     region.path( 'M186.51,589.49c0,0,127.84-430.93,130.93-443.3c3.09-12.37,10.31-5.15,10.31-5.15L691.66,346.2\r\n\tc0,0,12.37,4.12,5.15,19.07c-7.59,21.68-155.67,444.85-155.67,444.85L186.51,589.49z' )
                            
                        // };
                    } else {
                        console.log( '333333333333333333333333333333' + i.name )
                        context.save( );
                        if ( i.name === 'svgLogo2' && typeof clippyNigga !== 'undefined' ) {

                        context.scale( 1/1.1 , 1/1.1 )
                        let region = new Path2D( 
            clippyNigga
                        // );
                        // region.path( 
                            // "M850.42,262.69L474.94,63.86c0,0-7.22-7.22-10.31,5.15c-0.93,3.72-15.13,43.25-36.91,103.23l290.74,164.67\r\n\tc0,0,21.65,12.37,13.4,32.99c-8.53,21.32-92.7,263.49-121.48,345.3l60.65,33.05c0,0,176.95-444.82,184.54-466.49\r\n\tC862.79,266.81,850.42,262.69,850.42,262.69z"
                            // 'M186.51,589.49c0,0,127.84-430.93,130.93-443.3c3.09-12.37,10.31-5.15,10.31-5.15L691.66,346.2\r\n\tc0,0,12.37,4.12,5.15,19.07c-7.59,21.68-155.67,444.85-155.67,444.85L186.51,589.49z' 
                            )
                        context.clip( region );
                        context.scale( 1.1 , 1.1 )
                        //     context.fillStyle = 'blue';
                        // context.fillRect( 0,0,width,width);
                        // context.drawImage( imgObjectArray[3].element , 0 , 0 , width , height );
                        }
                 
                        let az = placement.left + ( placement.width / 2 );
                        let bz = placement.top + ( placement.height / 2 );
                        context.translate( az , bz );
                        context.rotate( placement.rotation * Math.PI / 180 );
                        context.translate( 0 - az , 0 - bz );
                        let logoOrigW = svgs[ 0 ].vb[ 2 ];
                        let logoOrigH = svgs[ 0 ].vb[ 3 ];
                        let logoMltplr =    placement.width / svgs[ 0 ].vb[ 2 ] 
                                                <
                                                placement.height / svgs[ 0 ].vb[ 3 ] 
                                                    ? placement.width / svgs[ 0 ].vb[ 2 ] 
                                                    : placement.height / svgs[ 0 ].vb[ 3 ]

                        let adjustedWidth =     logoOrigW * logoMltplr;
                        let adjustedHeight =    logoOrigH * logoMltplr;
                        let logoOffsetX =       ( placement.width - adjustedWidth ) / 2;
                        let adjustedLeft =      placement.left + logoOffsetX;
                        let logoOffsetY =       ( placement.height - adjustedHeight ) / 2;
                        let adjustedTop =       placement.top + logoOffsetY;

                        context.drawImage( 
                            element             ,
                            adjustedLeft        ,
                            adjustedTop         ,
                            adjustedWidth       ,
                            adjustedHeight      ,
                        );
                        context.fillStyle = 'red';
                        context.fill( );
                        context.restore( );
                    }
                } else {
                    if ( Array.isArray( placement ) ) {
                        // console.log( element );
                        // console.log( placement );
                        context.drawImage( element , ...placement );
                    };
                }
            } else {
                context.drawImage( element , 0 , 0 , width , height );
            };
            } );
        };
    if ( 
            typeof productText !== 'undefined' 
            &&  typeof productText.product_name !== 'undefined' 
        ) {
            context.font =      '16px sans-serif';
            context.fillStyle = 'black';
            context.fillText(   productText.product_name , 20   , height - ( height / 6 ) );
            context.font =      '10px sans-serif';
            context.fillText(   'Item No. ' + productText.product_number , 20   , height - ( height / 6 ) + 18 );
            context.fillText(   productText.product_description.slice( 0 , 43 ) , 20     , height - ( height / 6 ) + 34 );
            context.fillText(   productText.product_description.slice( 43 , 80 ) , 20    , height - ( height / 6 ) + 44 );
            context.fillText(   productText.product_description.slice( 81 , 120 ) , 20   , height - ( height / 6 ) + 54 );
        };



        
        // if ( i[ 'name' ] === 'svgMask2' ) {
            // context.scale( 1/1.1 , 1/1.1 )
            // let region = new Path2D( 

            // // );
            // // region.path( 
            //     'M186.51,589.49c0,0,127.84-430.93,130.93-443.3c3.09-12.37,10.31-5.15,10.31-5.15L691.66,346.2\r\n\tc0,0,12.37,4.12,5.15,19.07c-7.59,21.68-155.67,444.85-155.67,444.85L186.51,589.49z' )
            // context.clip( region );
            // context.scale( 1.1 , 1.1 )
            //     context.fillStyle = 'blue';
            // context.fillRect( 0,0,width,width);
            // context.drawImage( imgObjectArray[3].element , 0 , 0 , width , height );

        // };


        let dataUrl =   canvas.toDataURL( 'image/png' );
        let blobData =  dataURItoBlob( dataUrl );
        let flyerUrl;
        let timeStamp = new Date( ).toLocaleString( ).split( ' ' ).filter( f => /[0-9]{1,}/.test( f ) ).map( ( m => m.replace( /\//g , '_' ).replace( '2021' , '21' ).replace( /:/g , '_' ) ) ).join('_' ).replace( /,/g , '' );
        if ( typeof timeStamp !== 'undefined' ) {
            flyerUrl =  'PORTAL/VIRTUALS/FLYERS/' + ( typeof currentResultId !== 'undefined' ? currentResultId : '0101011' ) + '_Flyer.png';
        };
        Storage.put( flyerUrl , blobData )
        .then( res => {
            // console.log( '____________________________________' )
            console.log( 'res' );
            console.log( res );
            // console.log( 'res' );
            setCanvasSaved( true );
            setFlyerUrl( 'https://plodes-bucket20445-dev.s3.amazonaws.com/public/' + flyerUrl )
        } )
        .catch( e => console.log( e ) );
    };
