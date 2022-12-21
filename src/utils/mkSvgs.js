const convert = require( 'color-convert' );



function getViewBoxFromFull( svgCont ) {
    let try00 = /viewBox="([\s\-+.0-9]+?)"/i;
    if ( try00.test( svgCont ) ) {
    return svgCont.match( try00 )[ 1 ];
    } else if ( /width/i.test( svgCont ) && /height/i.test( svgCont ) ) {
    return `0 0 ${ svgCont.match( /width="([0-9].+?)"/ )[ 1 ] } ${ svgCont.match( /height="([0-9].+?)"/ )[ 1 ] } `
    } else {
    return false;
    };
};


function getViewBoxFromSvgTag( svgTagCont ) {
    // console.log( svgTagCont.slice( 0 , 100 ) );
    if ( 
        /x="([0-9.]{1,7})"/i.test( svgTagCont )
        &&  /y="([0-9.]{1,7})"/i.test( svgTagCont )
        &&  /height="([0-9.]{1,7})"/i.test( svgTagCont )
        &&  /width="([0-9.]{1,7})"/i.test( svgTagCont )
        ) {
        return [
        parseInt( svgTagCont.match( /x="([0-9.]{1,7})"/i )[ 1 ] )       ,
        parseInt( svgTagCont.match( /y="([0-9.]{1,7})"/i )[ 1 ] )       ,
        parseInt( svgTagCont.match( /width="([0-9.]{1,7})"/i )[ 1 ] )   ,
        parseInt( svgTagCont.match( /height="([0-9.]{1,7})"/i )[ 1 ] )  ,
        ]
    } else {
        console.log( 'no viewBox LIKE props gotten from xyhtwidth regex' );
        return false;
    }
};





export const maker = ({ 
                            textySP1            , 
                            textyUNDER          , 
                            help                ,
                            recommendedColor    ,
                            isMask              ,
                            raw                 ,
                            single              ,
                        })=>{
    return new Promise((res,rej)=>{
    let viewBoxyBoy;
    function onceTextyIsSet(text,nam,desc){
        return new Promise((resolve)=>{
            let groupsTexts =           [ ...text.matchAll( /(<g[.\s"0-9\S]+?<\/g>)/g ) ]
                                            .map( g => ( g[ 1 ] ) );
            let transformsFromGroups =  groupsTexts
                                            .map( ( c , d ) => {
                                                if ( /transform="translate/i.test( c ) ) {
                                                    return c.match( /transform="(translate\(.*?)"/ )[ 1 ];
                                                } else {
                                                    return false;
                                                };
                                            });
            let fillsFromGroups =       groupsTexts
                                            .map( c => {
                                                if ( /fill="#([0-9a-zA-Z]{3,8})/.test( c ) ) {
                                                    return c.match( /fill="#([0-9a-zA-Z]{3,8})/ )[ 1 ];
                                                } else {
                                                    return false;
                                                };
                                            } );
            let dsFromGroupsTexts =     groupsTexts
                                            .map( ( g , j ) => (
                                                [ ...g.matchAll( /d="([-,.\s0-9a-zA-Z]+?)"/g ) ]
                                                    .map( m => ( m[ 1 ] ) )
                                            ) );                                //console.log( dsFromGroupsTexts );

            let groupsPolys =           [ ...text.matchAll( /<polygon(.+?)\/>/g ) ]
                                            .map( g => ( g[ 1 ] ) );

            let topPolys = groupsPolys.map( m => ( { 
                string      : m     ,
                points      : 0     ,
            } ) );

            groupsPolys
                .forEach( ( g , j ) => (
                    topPolys[ j ][ 'points' ] =
                    [ ...g.matchAll( /points="([-,.\s0-9a-zA-Z]+?)"/g ) ]
                        .map( m => ( m[ 1 ] ) )[ 0 ] 
                ) );





            let groupsRects =           [ ...text.matchAll( /<rect(.+?)\/>/g ) ]
                                            .map( g => ( g[ 1 ] ) );

            let topRects = groupsRects.map( m => ( { 
                string      : m     ,
                x           : 0     ,
                y           : 0     ,
                width       : 100   ,
                height      : 100   ,
            } ) );

            groupsRects
                .forEach( ( g , j ) => (
                    topRects[ j ][ 'x' ] =
                    [ ...g.matchAll( /x="([-,.\s0-9a-zA-Z]+?)"/g ) ]
                        .map( m => ( m[ 1 ] ) )[ 0 ] 
                ) );

            groupsRects
                .forEach( ( g , j ) => (
                    topRects[ j ][ 'y' ] =
                    [ ...g.matchAll( /y="([-,.\s0-9a-zA-Z]+?)"/g ) ]
                        .map( m => ( m[ 1 ] ) )[ 0 ]
                ) );

            groupsRects
                .forEach( ( g , j ) => (
                    topRects[ j ][ 'width' ] =
                    [ ...g.matchAll( /width="([-,.\s0-9a-zA-Z]+?)"/g ) ]
                        .map( m => ( m[ 1 ] ) )[ 0 ] 
                ) );

            groupsRects
                .forEach( ( g , j ) => (
                    topRects[ j ][ 'height' ] =
                    [ ...g.matchAll( /height="([-,.\s0-9a-zA-Z]+?)"/g ) ]
                        .map( m => ( m[ 1 ] ) )[ 0 ]
                ) );



            let circsFromGroupsTexts =  groupsTexts
                                            .map( ( c , j ) => ( {
                                                cx :    [ ...c.matchAll( /cx="([-,.\s0-9a-zA-Z]+?)"/g ) ].map( m => ( m[ 1 ] ) )[ 0 ] ,
                                                cy :    [ ...c.matchAll( /cy="([-,.\s0-9a-zA-Z]+?)"/g ) ].map( m => ( m[ 1 ] ) )[ 0 ] ,
                                                r :     [ ...c.matchAll( /r="([-,.\s0-9a-zA-Z]+?)"/g )  ].map( m => ( m[ 1 ] ) )[ 0 ] ,
                                            } ) );

            let topAssGroups =          dsFromGroupsTexts
                                            .map( ( a , b ) => {
                                                return ( {
                                                    type        : 'group' ,
                                                    fill        : fillsFromGroups[ b ] ,
                                                    transform   : transformsFromGroups[ b ] ,
                                                    paths       : dsFromGroupsTexts[ b ]
                                                                    .map( c => ( {
                                                                        type    : 'path' ,
                                                                        d       : c ,
                                                                        fill    : fillsFromGroups[ b ]
                                                                                    ? fillsFromGroups[ b ]
                                                                                    : false ,
                                                                    } ) ) ,
                                                    circles     : circsFromGroupsTexts ,
                                                } )
                                            } );

            let flatDsFromGroupsTexts = [ ];

            dsFromGroupsTexts.forEach( g => {
                g.forEach( ( i , j ) => {
                    flatDsFromGroupsTexts.push( i );
                } )
            } );
            let pathsTexts =        [ ...text.toString( ).matchAll( /<path(.|\n)*?>/g ) ]
                                        .map( m => ( m[ 0 ] ) );
            let dsFromPathsTexts =  pathsTexts
                                        .map( p => ( 
                                            /d="([-.\s0-9a-zA-Z]+?)"/.test( p )
                                                ? p.match( /d="([-.\s0-9a-zA-Z]+?)"/ )[ 1 ]
                                                : 'blank'
                                        ) );
            let filteredDsFromPathsTexts =  dsFromPathsTexts
                                                .filter( p => (
                                                    !flatDsFromGroupsTexts.includes( p )
                                                ) );
            let viewboxer =         getViewBoxFromFull( text )
                                        ? getViewBoxFromFull( text )
                                            .split( ' ' )
                                        : getViewBoxFromSvgTag( text )
                                            ? getViewBoxFromSvgTag( text )
                                            : [ ];
            let aspectRatio =       viewboxer[ 2 ] / viewboxer[ 3 ];
            let colors =            fillsFromGroups
                                        .map( fill => fill[ 0 ] === '#'
                                                    ? fill : '#' + fill )
                                        .reduce( ( unique , item ) =>
                                            unique.includes( item ) 
                                                ? unique
                                                : [ ...unique , item ] , [ ] 
                                        );
            let colorsCopyForLumSort = JSON.parse( JSON.stringify( colors ) );
            colors.push( '#ffffff' );
            colors.push( '#000000' );

            // console.log( colors );
            let colorsSortedByLuminence = colorsCopyForLumSort.sort( ( a , b ) => {
                let hslOfA = convert.hex.hsl( a );
                let hslOfB = convert.hex.hsl( b );
                return hslOfA[ 2 ] > hslOfB[ 2 ] ? -1 : hslOfA[ 2 ] < hslOfB[ 2 ] ? 1 : 0;
            } );

            let whitey =    colorsSortedByLuminence.length > 2
                            && convert.hex.hsl( colorsSortedByLuminence[ 0 ] )[ 2 ] > .95
                                ? colorsSortedByLuminence[ 1 ]
                                : typeof colorsSortedByLuminence[ 0 ] !== 'undefined'
                                    ? colorsSortedByLuminence[ 0 ]
                                    : '#f7f5f5';
            let blackey =   colorsSortedByLuminence.length > 3
                            && convert.hex.hsl( colorsSortedByLuminence[ 0 ] )[ 2 ] > .95
                            ? colorsSortedByLuminence[ colorsSortedByLuminence.length - 2 ]
                            : typeof colorsSortedByLuminence[ colorsSortedByLuminence.length - 1 ] !== 'undefined'
                                ? colorsSortedByLuminence[ colorsSortedByLuminence.length - 1 ]
                                : '#040404';
            colors =        colorsCopyForLumSort;
            topAssGroups =  topAssGroups.filter( f => ( f.paths.length > 0 ) );

            let name = typeof nam !== 'undefined' ? nam : 'generic';

            let retObj = {
                nm          : name                          ,
                dsc         : typeof desc !== 'undefined' ? desc : 'generic' ,
                vb          : viewboxer                     ,
                grps        : topAssGroups                  ,
                circs       : typeof circsFromGroupsTexts !== 'undefined' ? circsFromGroupsTexts : false ,
                pths        : filteredDsFromPathsTexts      ,
                clrs        : colors                        ,
                nitClrs     : colors                        ,
                initClr     : colors[ 0 ]                   ,
                whitest     : whitey                        ,
                blackest    : blackey                       ,
                aRatio      : aspectRatio                   ,
                rects       : typeof topRects !== 'undefined' ? topRects : false ,
                polys       : typeof topPolys !== 'undefined' ? topPolys : false ,
            };
            resolve( retObj );
        } );
    };



    function transformFullColorToOneColor(ojt,theOneColor){
        let tempOjt=JSON.parse(JSON.stringify(ojt));
        tempOjt.grps=tempOjt.grps.map((a,b)=>({
            ...a ,fill:theOneColor,paths:tempOjt.grps[b].paths.map((c,d)=>({...tempOjt.grps[b].paths[d],fill:theOneColor}))}));
            return tempOjt;
    };




    function switchOneColorWithWhite(ojt,colorVrom){
        let colorFrom=typeof colorVrom !== 'undefined'?colorVrom:'#d8d8d8';
        let tempOjt=JSON.parse( JSON.stringify(ojt));
        let sliceReggie=new RegExp(colorFrom.toString().slice(1),'i');
        tempOjt.grps=tempOjt.grps.map((a,b)=>({
            ...a,fill:sliceReggie.test( a.fill)?'ffffff':a.fill,
            paths : tempOjt.grps[ b ].paths.map((c,d)=>({...tempOjt.grps[b].paths[d],fill:sliceReggie.test(a.fill)?'ffffff':a.fill}))}));
        return tempOjt;
    };


    let svgsPropsArray2 = [
        { svgContent : textySP1        , name : 'SP1'       , description : 'Multicolor on Light'       , helpContent : typeof help !== 'undefined' && typeof help.multlight!== 'undefined' ? help.multlight: 'genurik' } ,
        { svgContent : textySP1        , name : 'SP1W'      , description : 'Multicolor on Dark'        , helpContent : typeof help !== 'undefined' && typeof help.multdark !== 'undefined' ? help.multdark : 'genurik'  } ,
        { svgContent : textySP1        , name : 'SP1W2'     , description : 'Multicolor on Dark 2'      , helpContent : typeof help !== 'undefined' && typeof help.multdark !== 'undefined' ? help.multdark : 'genurik'  } ,
        { svgContent : textySP1        , name : '1CPOP'     , description : 'One Color on Light'        , helpContent : typeof help !== 'undefined' && typeof help.onelight !== 'undefined' ? help.onelight : 'genurik'  } ,
        { svgContent : textySP1        , name : '1CVIBE'    , description : 'One Color on Dark'         , helpContent : typeof help !== 'undefined' && typeof help.onedark  !== 'undefined' ? help.onedark  : 'genurik'   } ,
        { svgContent : textySP1        , name : '1CW'       , description : 'One Color White'           , helpContent : typeof help !== 'undefined' && typeof help.onedark  !== 'undefined' ? help.onedark : 'genurik'   } ,
        { svgContent : textySP1        , name : '1CB'       , description : 'One Color Black'           , helpContent : typeof help !== 'undefined' && typeof help.onedark  !== 'undefined' ? help.onedark : 'genurik'   } ,
        { svgContent : textySP1        , name : '1CREC1'    , description : 'Top One Color Recommended' , helpContent : typeof help !== 'undefined' && typeof help.onedark  !== 'undefined' ? help.onedark : 'genurik'   } ,
        { svgContent : textyUNDER      , name : 'UNDER'     , description : 'White Underlay'            , helpContent : typeof help !== 'undefined' && typeof help.onedark  !== 'undefined' ? help.onedark : 'genurik'   }
    ];
    const svgPM={};
    svgsPropsArray2.forEach( ( s , t ) => { svgPM[ s.name ] = t } )
    if (textySP1&&textyUNDER){
        let processedSvgTexts=svgsPropsArray2.map(x=>(onceTextyIsSet(x.svgContent,x.name,x.description)));
        Promise.all(processedSvgTexts)
        .then(resultyWulties=>{
                if (isMask==='isMask'){
                    resultyWulties=resultyWulties.map(m=>transformFullColorToOneColor(m,'#ffffff'))
                };
                if (Array.isArray(resultyWulties)&&resultyWulties.length>0){
                    if (
                        typeof resultyWulties[ svgPM[ 'SP1W'  ] ] !== 'undefined'
                        && resultyWulties[ svgPM[ 'SP1W'  ] ].blackest
                        && typeof resultyWulties[ svgPM[ 'SP1W'  ] ].blackest !== 'undefined'
                        ) {
                        resultyWulties[ svgPM[ 'SP1W'  ] ] =        switchOneColorWithWhite(        resultyWulties[ svgPM[ 'SP1W'   ] ] , resultyWulties[ svgPM[ 'SP1W'  ] ].blackest );
                    };
                    if ( 
                        typeof resultyWulties[ svgPM[ 'SP1W2'  ] ] !== 'undefined'
                        && resultyWulties[ svgPM[ 'SP1W2'  ] ].whitest
                        && typeof resultyWulties[ svgPM[ 'SP1W2'  ] ].whitest !== 'undefined'
                    ) {
                        resultyWulties[ svgPM[ 'SP1W2'  ] ] =       switchOneColorWithWhite(        resultyWulties[ svgPM[ 'SP1W2'   ] ], resultyWulties[ svgPM[ 'SP1W2'  ] ].whitest );
                    };
                        
                    if ( typeof resultyWulties[ svgPM[ 'SP1'  ] ] !== 'undefined' ) {
                        resultyWulties[ svgPM[ '1CPOP'  ] ] =       transformFullColorToOneColor(   resultyWulties[ svgPM[ '1CPOP'  ] ] , resultyWulties[ svgPM[ '1CPOP'  ] ].blackest );
                    };

                    if ( 
                        typeof resultyWulties[ svgPM[ 'SP1W'  ] ] !== 'undefined'
                        && resultyWulties[ svgPM[ 'SP1W'  ] ].whitest
                        && typeof resultyWulties[ svgPM[ 'SP1W'  ] ].whitest !== 'undefined'
                    ) {
                        resultyWulties[ svgPM[ '1CVIBE' ] ] =       transformFullColorToOneColor(   resultyWulties[ svgPM[ '1CVIBE' ] ] , resultyWulties[ svgPM[ '1CVIBE' ] ].whitest );
                        resultyWulties[ svgPM[ '1CW'    ] ] =       transformFullColorToOneColor(   resultyWulties[ svgPM[ '1CW'    ] ] , '#ffffff' );
                        resultyWulties[ svgPM[ '1CB'    ] ] =       transformFullColorToOneColor(   resultyWulties[ svgPM[ '1CB'    ] ] , '#000000' );
                        resultyWulties[ svgPM[ '1CREC1' ] ] =       transformFullColorToOneColor(   resultyWulties[ svgPM[ '1CREC1' ] ] , typeof recommendedColor !== 'undefined' ? recommendedColor : '#43ffd4' );
                        resultyWulties[ svgPM[ 'SP1'    ] ].mainColor = resultyWulties[ svgPM[ 'SP1W'  ] ].blackest;
                        resultyWulties[ svgPM[ 'SP1W'   ] ].mainColor = resultyWulties[ svgPM[ 'SP1W'  ] ].blackest;
                        resultyWulties[ svgPM[ 'SP1W2'  ] ].mainColor = resultyWulties[ svgPM[ 'SP1W2'  ] ].whitest;
                        
                        let nextColor = resultyWulties[ 0 ].nitClrs.filter( f => 
                                                f !== '#ffffff'
                                            &&  f !== '#000000'
                                            &&  f !== resultyWulties[ svgPM[ 'SP1W'   ] ].blackest
                                            &&  f !== resultyWulties[ svgPM[ 'SP1W2'  ] ].whitest
                                        );
                        if ( nextColor.length > 0 ) {
                            resultyWulties.push( {
                                ...( switchOneColorWithWhite( resultyWulties[ svgPM[ 'SP1' ] ] , nextColor[ 0 ] ) ) ,
                                nm          : 'SP1W3' ,
                                dsc         : 'Multicolor on Dark 3' ,
                                mainColor   : nextColor[ 0 ]
                            } );

                            svgsPropsArray2.push( {
                                ...( svgsPropsArray2.filter( f => f.name === 'SP1W2' )[ 0 ] ) ,
                                description : 'Multicolor on Dark 3' ,
                                name        : 'SP1W3' ,

                            } )
                        };
                        resultyWulties[ svgPM[ '1CPOP'  ] ].mainColor = resultyWulties[ svgPM[ '1CPOP'  ] ].blackest;
                        resultyWulties[ svgPM[ '1CVIBE' ] ].mainColor = resultyWulties[ svgPM[ '1CVIBE' ] ].whitest;
                        resultyWulties[ svgPM[ '1CREC1' ] ].mainColor = typeof recommendedColor !== 'undefined' ? recommendedColor : '#43ffd4';
                        resultyWulties[ svgPM[ '1CW'    ] ].mainColor = '#ffffff';
                        resultyWulties[ svgPM[ '1CB'    ] ].mainColor = '#000000';

                        viewBoxyBoy =  [
                            resultyWulties[ 2 ].vb[ 2 ] ,
                            resultyWulties[ 2 ].vb[ 3 ] ,
                        ];

                        let resObj = {
                            svgs            : resultyWulties.filter( ( g , h ) => h !== svgPM[ 'UNDER' ] ) ,
                            svgsPropsArray  : svgsPropsArray2       ,
                            viewBoxy        : viewBoxyBoy           ,
                            whiteUnderlay   : resultyWulties.filter( ( g , h ) => h === svgPM[ 'UNDER' ] )
                        };
                        res( resObj );
                    }
                };
        } )
        .catch( reo => {
            console.log( reo );
            rej( reo );
        } )
    };

    } );
};