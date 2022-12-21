export const def = ( thing ) => typeof thing !== 'undefined';

export const rando = ( ) => ( Math.random( ) * 9999999999 ).toFixed( 0 ).toString( );

const mkValid = st => st.replace( /[<>:"/\\|&'%?*]/g , '-' ).replace( /,/g , '-' ).replace( /\s/g , '-' );

const makeFileName = ( curObj , businessLogo ) => {
    var { name , email , fullname , resultid , brand , image , phone } = curObj;
    console.log( name , image );
    var nm =    name        ? mkValid( name ).replace( /\[/g , '' ).replace( /\]/g , '' ).replace( /\(/g , '' ).replace( /\)/g , '' ).replace( /=/g  , '' ).replace( /@/g  , '' ).replace( /,/g  , '' ).replace( /\./g  , '' ).substring( 0 , 11 ).toLowerCase( ) : 'xname';
    var em =    email       ? mkValid( email ).toLowerCase( ) : 'xe@ma.il';
    var fl =    fullname    ? mkValid( fullname ).replace( '[' , '' ).replace( ']' , '' ).replace( '(' , '' ).replace( ')' , '' ).replace( /=/g  , '' ).toLowerCase( ) : 'xfullname';
    var br =    brand       ? mkValid( brand ).toLowerCase( ) : 'xbrand';
    var id =    resultid    ? resultid : rando( );
    var ex =    image       ? image.substring( image.lastIndexOf( '.' ) ).toLowerCase( ) : 'xext';
    var ph =    phone       ? mkValid( phone ).replace( /[^0-9]/g , '' ) : '';
    return {
        filename : `[a=${businessLogo?'biz':'a'},b=${em},c=${businessLogo?'':fl},d=${br},p=${ph},z=${id}]${ex}` ,
        proppers : { i : id , e : ex , validFullname : fl , validName : nm , p : ph }
    };
};

export const mkFilename = makeFileName;
