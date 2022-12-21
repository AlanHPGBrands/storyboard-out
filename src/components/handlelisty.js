import { API                    ,
    graphqlOperation as gqlo    ,
}               from 'aws-amplify';
import * as qs  from '../graphql/queries';
  


export const preListy = async ( inny , queryGiven , fieldName ) => {

    const caseInsensitiveFieldName =    fieldName;

    console.log( inny );

    inny = typeof inny === 'string' && inny.length > 0 ? inny : '';
    
    let caseInsensitiveInny = inny.trim( ).toLowerCase( );

    console.log( inny );

    let tempy = [ ];

    let apiResults = [ ];

    let params = { 
        query       : qs[ queryGiven ] ,
        variables   : { 
                        filter : {
                                    [ caseInsensitiveFieldName ] : { 
                                                                    contains : caseInsensitiveInny
                                                                } 
                                } , 
                        limit : 6000
                    }
    }

    const { data } = await API.graphql( gqlo( params.query , params.variables ) );

    const key = Object
                    .keys( data )
                    .find( k => k.includes( 'list' ) );

    const res = data[ key ];

    res.items.forEach( item => {
        if ( !tempy.includes( item[ caseInsensitiveFieldName ] + item.created_at_flt ) ) {
            tempy.push( item[ caseInsensitiveFieldName ] + item.created_at_flt )
            apiResults.push( item );
        };
    } );


    let soridResults = apiResults.sort( ( a , b ) => { 
        var textA = a.misc_0.toUpperCase( );
        var textB = b.misc_0.toUpperCase( );
        return ( textA < textB ) ? -1 : ( textA > textB ) ? 1 : 0;
    } );
    
    return soridResults;

};















export const listyGsi = async ( queryNameGiven , expressSheOn ) => {

    let apiResults = [ ];

    let params = {
        query       : qs[ queryNameGiven ] ,
        variables   : {
                        ...expressSheOn ,
                        limit : 6000
                    }
    };

    const { data } = await API.graphql( gqlo( params.query , params.variables ) );

    const res = data[ queryNameGiven ];

    apiResults = res.items;


    // console.log( apiResults );

    let soridResults = apiResults;

    if ( apiResults[ 0 ] && apiResults[ 0 ].misc_0 && typeof apiResults[ 0 ].misc_0 !== 'undefined' ) {
        soridResults = apiResults.sort( ( a , b ) => { 
            var textA = a.misc_0.toUpperCase( );
            var textB = b.misc_0.toUpperCase( );
            return ( textA < textB ) ? -1 : ( textA > textB ) ? 1 : 0;
        } );
    }
        
    return soridResults;

};










    export const handleListy = async ( inny , namedLogosQuery , fieldName ) => {
      
        const caseInsensitiveFieldName =    fieldName;

        console.log( inny );

        inny = typeof inny === 'string' && inny.length > 0 ? inny : '';
       
        let caseInsensitiveInny = inny.trim( ).toLowerCase( );

        console.log( inny );

        let tempy = [ ];





        async function fetchItemsNextToken( { query , variables , items = [ ] } ) {
            const { data } = await API.graphql( gqlo( query , variables ) );
            console.log( data );
            const key = Object.keys( data )
                            .find( k => k.includes( 'list' ) );
            const res = data[ key ];
            res.items.forEach( item => {
                if ( !tempy.includes( item[ caseInsensitiveFieldName ] + item.created_at_flt ) ) {
                    tempy.push( item[ caseInsensitiveFieldName ] + item.created_at_flt )
                    items.push( item );
                };
            } );
            if ( !res.nextToken ) return items;
            // eslint-disable-next-line no-param-reassign
            variables.nextToken = res.nextToken;
            return fetchItemsNextToken( { 
                query       ,
                variables   ,
                items       ,
            } );
        };






        let abcd = await fetchItemsNextToken( { 
            query       : qs[ namedLogosQuery ] ,
            variables   : { 
                            filter : {
                                        [ caseInsensitiveFieldName ] : { 
                                                                        contains : caseInsensitiveInny
                                                                    } 
                                    } , 
                            limit : 6000
                        }
        } );            
        console.log( abcd );
        let baba = abcd.sort( ( a , b ) => { 
            var textA = a.misc_0.toUpperCase( );
            var textB = b.misc_0.toUpperCase( );
            return ( textA < textB ) ? -1 : ( textA > textB ) ? 1 : 0;
        } );
        return baba;
    }; 