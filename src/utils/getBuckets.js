import Storage from '@aws-amplify/storage';


export const getDesignPatterns = async ( ) => {
    let designsFolder = 'PORTAL/VIRTUALS/PATTERNS/';
    let gettingDesigns , allDesigns;
    try {
        gettingDesigns = await Storage.list( designsFolder );
    } catch ( e ) {
        console.log( e );
    };
    let dlDesigns = gettingDesigns.map( async ( a ) => await Storage.get( a.key ) );
    try {
        allDesigns = await Promise.all( dlDesigns );
    } catch ( e ) {
        console.log( e );
    };
    return allDesigns;
};


export async function getWars({folderPrefix}) {
    const imageDataMap = {
        a : 'itemNumber'            ,
        g : 'itemBrand'             ,
        c : 'itemName'              ,
        d : 'associatedItems'       ,
        h : 'productDescription'    ,
        i : 'price'                 ,
        j : 'quantity'              ,
        k : 'keywords'              ,
    };
    let imgDataKeys =               Object.keys( imageDataMap );
    let listFromBucket =            await listFromProductFolder( { folderPrefix : folderPrefix } );
    let productNumberImageFolder =  'PORTAL/VIRTUALS/ALL/PRODUCTDATA/';
    let listFromProdNumImgFolder =  listFromBucket
                                        .filter(f=>f.key.replace(productNumberImageFolder,'').length>0 && f.key.replace(productNumberImageFolder,'')[0].length>0);
    let folderVarsRegex =           /WARS([0-9]{0,3})\[/i;
    let folderVarsFileArray =       listFromProdNumImgFolder
                                        .filter( f => folderVarsRegex.test( f.key ) );
    let warsFiles = folderVarsFileArray;
    let returningAllProducts = warsFiles.map( ( warsFile , wIdx ) => {
        let tempObject;
        if ( typeof warsFile !== 'undefined' ) {
            tempObject = {
                            name  : warsFile.key
                                .replace(productNumberImageFolder,'')
                                .substring(0,warsFile.key.lastIndexOf('.')),
            };
            imgDataKeys.forEach( keyP => {
                let keyRegex = new RegExp( keyP + '=([0-9A-Za-z-_+.\(\)#]{1,45}),' , 'i' );
                if (keyRegex.test(warsFile.key)) {
                    tempObject[imageDataMap[keyP]] = warsFile.key.match(keyRegex)[1].replace(/__/g,',').replace(/_/g,' ');
                };
            } );
            if (tempObject['associatedItems' ] && /,/.test(tempObject['associatedItems'])) {
                tempObject['associatedItems'] = tempObject['associatedItems'].split( ',' );
            };
            return tempObject;
        };
    } );
    return returningAllProducts;
    };



    async function listFromProductFolder({folderPrefix}) {
        let givDat = [{key:''}];
        let productNumberImageFolders = 'PORTAL/VIRTUALS/ALL/PRODUCTDATA/';
        let multipleFools = folderPrefix.map( m => Storage.list( productNumberImageFolders + m ) );
        let demAll = await Promise.all(multipleFools);
        console.log(demAll);
        demAll.forEach(da=> {givDat = [...givDat,...da];});
        console.log( 'givDat' )
        console.log( givDat )
        let listFromProdNumImgFolder =  givDat;
        return listFromProdNumImgFolder;
    };





    export async function getBackgrounds( { currProdNum , brand } ) {

    const imageDataMap = {
        a   : 'itemNumber'                  ,
        b   : 'productColorHex'             ,
        c   : 'lchColorRangeInd'            ,

        d   : 'imprintWidthXHeightPx'       ,
        e   : 'imprintOffsetXYPx'           ,
        f   : 'imprintRotationDeg'          ,
        g   : 'imprintOnecolor'             ,
        h   : 'imprintMulticolor'           ,
        i   : 'imprintLaser'                ,
        j   : 'imprintLogoVersionDefault'   ,

        l   : 'imprintTransform'            ,

        p   : 'imprintPatternPadding'       ,
        n   : 'keywords'                    ,
        r   : 'associatedItems'             ,
        

    };

    let imgDataKeys =               Object.keys( imageDataMap );
    let getNumber =                 currProdNum && typeof currProdNum !== 'undefined' ? currProdNum + '/' : '208/';
    let beeRand =                   typeof brand !== 'undefined' ? brand : 'hub';
    if ( currProdNum === 'all'      || currProdNum === 'ALL' ) { getNumber = '' };
    beeRand =                       beeRand.toUpperCase( );
    let plainWhiteBackground =      'PORTAL/VIRTUALS/COMMON/a=none,b=None,c=BG.png';
    let listWhiteBackground =       await Storage.list( plainWhiteBackground );
    let productNumberImageFolder =  'PORTAL/VIRTUALS/' + beeRand + '/' + getNumber;
    let listFromProdNumImgFolder =  await Storage.list( productNumberImageFolder );
    listFromProdNumImgFolder =      [ ...listFromProdNumImgFolder , ...listWhiteBackground ];
    listFromProdNumImgFolder =      listFromProdNumImgFolder
                                        .filter( f => ( 
                                                    f.key.replace( productNumberImageFolder , '' ).length > 0
                                                &&  f.key.replace( productNumberImageFolder , '' )[ 0 ] ).length > 0
                                            );

    let folderVarsRegex =           /VARS([0-9]{0,3})\[/i;
    let folderVarsFileArray =       listFromProdNumImgFolder
                                        .filter( f => folderVarsRegex.test( f.key ) );
    let varsSortVersion =           folderVarsFileArray
                                        .map( m => {
                                            let numeroCero = '0';
                                            // let numeroDos = 0;
                                            try {
                                                let mexico = m.key.match( folderVarsRegex )[ 1 ];
                                                if ( mexico !== '' ) {
                                                    numeroCero = m.key.match( folderVarsRegex )[ 1 ];
                                                };
                                            } catch ( e ) {
                                                console.log( 'no version numero : ' + m.key );
                                            };
                                            return ( {
                                                ...m ,
                                                version : numeroCero ,
                                             } )
                                        } )
                                        .sort( ( s , t ) => ( 
                                            parseInt( s.version ) > parseInt( t.version ) 
                                            ? 1 : parseInt( s.version ) < parseInt( t.version ) 
                                            ? -1 : 0 ) );

                                            console.log( 'varsSortVersion' );
                                            console.log( varsSortVersion );

    let allVarsObjects = varsSortVersion.map( async ( folderVarsFile , fIdx ) => {
        if ( typeof folderVarsFile !== 'undefined' ) {
            let prodRegs = /b=/i;
            
            let [ productImages , whiteImage ] = [ 
                prodRegs , /c=BG/i
            ]
                .map( reg => (
                    listFromProdNumImgFolder
                    .filter( f => reg.test( f.key ) )
                    .filter( f => {
                        if ( reg === prodRegs && /b=none/i.test( f.key ) ) {
                            return false;
                        } else {
                            return true;
                        }
                    } )
                    .map( async m => {
                        let fl = fIdx === 0 ? await Storage.get( m.key ) : { };
                        let tempObject = {
                            version : folderVarsFile.version ,
                            imprintAreaVersion : fIdx ,
                            name : m.key
                                    .replace( productNumberImageFolder , '' )
                                    .substring( 0 , m.key.lastIndexOf( '.' ) ) ,
                            file : fl ,
                        };
                        imgDataKeys.forEach( keyP => {
                            let keyRegex = new RegExp( keyP + '=([0-9A-Za-z-_+.\(\)#]{1,45}),' , 'i' );

                            if ( keyRegex.test( folderVarsFile.key ) ) {
                                tempObject[ imageDataMap[ keyP ] ] = folderVarsFile.key.match( keyRegex )[ 1 ];
                            };

                            if ( keyRegex.test( m.key ) ) {
                                tempObject[ imageDataMap[ keyP ] ] = m.key.match( keyRegex )[ 1 ];
                            }
                        } );
                        return tempObject;
                    } )
                ) );

            let gotBacks =  await Promise.all( whiteImage );
            let gotPens =   await Promise.all( productImages );

            gotPens.sort( ( x , y ) => ( /w/i.test( x.colorName ) ? -1 : /w/i.test( y.colorName ) ? 1 : 0 ) );
            let backgroundsFromBucket = [ ] , pensFromBucket = [ ];
            if ( gotBacks &&    gotBacks.length > 0 ) {
                backgroundsFromBucket = gotBacks;
            };
            if ( gotPens && gotPens.length > 0 ) {
                pensFromBucket = gotPens;
            };
            return { 
                backgroundsFromBucket   : backgroundsFromBucket ,
                pensFromBucket          : pensFromBucket
            };
        };

    } );

    let allDemBihs = await Promise.all( allVarsObjects );
    console.log( 'allDemBihs' );
    console.log( allDemBihs );
    return allDemBihs;
};






export const getSvgTextFromIdVersion = ( {
        id              ,              
        squarePrefix    ,
        svgVersion      ,
    } ) => {

    // console.log( 'cajaPuto' , id , squarePrefix , svgVersion )

    return new Promise((res,rej)=>{

        // console.log( id , squarePrefix , svgVersion )
    

        function mapIdToVersionsAndFetch( iddyLizzerd , squarePrefix , verzun ) {
            let doodoo = [ 
                'public/LOGOS/svgapp/svgs/' + iddyLizzerd + '/' + squarePrefix + 'newSvgSP1' + verzun + '.svg' ,
                'public/LOGOS/svgapp/svgs/' + iddyLizzerd + '/' + squarePrefix + 'newSvgUNDER.svg'  ,           
            ];
            
            // console.log( doodoo );
            let googoo = doodoo.map( d => (
                fetch( 'https://plodes-bucket20445-dev.s3.amazonaws.com/' + d )
                .then( rr => rr.text( ) )
            ) );
            
            Promise.all( googoo )
            .then( coocoo => {
                // console.log( 'coocoo' );
                // console.log( coocoo );
                res( coocoo );
            } )
            .catch( ero => {
                rej( console.log( ero ) );
            } );
        };


        let ver = typeof svgVersion !== 'undefined' && svgVersion !== '' ? '_v' + svgVersion : '';

        // console.log( 'cajaDeCaca' , id , squarePrefix , ver )
        if ( 
            id 
            && typeof id !== 'undefined' 
            && squarePrefix 
            && typeof squarePrefix !== 'undefined'
        ) {
            // console.log( 'id' );
            // console.log( id );
            // console.log( squarePrefix );
            // console.log( ver );
            // console.log( 'ver' );
            mapIdToVersionsAndFetch( id , squarePrefix , ver );
        }
    } );
};





export const getSvgTextFromId = ( {
        id              , 
        squarePrefix    ,
    } ) => {
    return new Promise( ( res , rej ) => {

        function mapIdToVersionsAndFetch( iddyLizzerd , squarePrefix) {
            let doodoo = 
            [
                [ 'public/LOGOS/svgapp/svgs/' + iddyLizzerd + '/' + squarePrefix + 'newSvgSP1.svg'      ] ,
                [ 'public/LOGOS/svgapp/svgs/' + iddyLizzerd + '/' + squarePrefix + 'newSvgUNDER.svg'    ] ,
            ];
                
            let googoo = doodoo.map( d => (
                fetch( 'https://plodes-bucket20445-dev.s3.amazonaws.com/' + d )
                .then( rr => rr.text( ) )
            ) );
            
            Promise.all( googoo )
            .then( coocoo => {
                // console.log( coocoo );
                res( coocoo );
            } )
            .catch( ero => {
                rej( console.log( ero ) )
            } );
        };
        if ( id ) mapIdToVersionsAndFetch( id , squarePrefix );
    } );
};





export function getAnySvgTextFromBucketUrl( { id } ) {
    // console.log( id );
    return new Promise( ( res , rej ) => {

            let bucketUrl = [ 'public/PORTAL/VIRTUALS/COMMON/blankreddot.svg' ];

            // console.log( bucketUrl );
            let googoo = bucketUrl.map( d => (
                fetch( 'https://plodes-bucket20445-dev.s3.amazonaws.com/' + d )
                .then( rr => rr.text( ) )
            ) );
            Promise.all( googoo )
            .then( coocoo => {
                // console.log( coocoo );
                res( coocoo );
            } )
            .catch( ero => {
                rej( console.log( ero ) )
            } );
    } );
};





export function getSvgMaskTextFromBucketUrl( { itemNo , optionalKey } ) {
    // console.log( id );
    return new Promise( ( res , rej ) => {

        let bucketUrl = [ 'public/PORTAL/VIRTUALS/COMMON/blankreddot.svg' ];
        
        if ( typeof itemNo !== 'undefined' ) { bucketUrl = [ 'public/PORTAL/VIRTUALS/HUB/' + itemNo + '/MASK.svg' ] };
        if ( typeof optionalKey !== 'undefined' ) { 
            bucketUrl = [ 'public/' + optionalKey ]
        };
        console.log( bucketUrl );
        console.log( 'bucketUrl' );

        // console.log( bucketUrl );
        let googoo = bucketUrl.map( d => (
            fetch( 'https://plodes-bucket20445-dev.s3.amazonaws.com/' + d )
            .then( rr => rr.text( ) )
        ) );
        Promise.all( googoo )
        .then( coocoo => {
            console.log( coocoo );
            res( coocoo );
        } )
        .catch( ero => {
            rej( console.log( ero ) )
        } );
    } );
};
