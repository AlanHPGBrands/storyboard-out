import {API,graphqlOperation,Storage} from 'aws-amplify';
import {
    createSvgObjectsArray,
    createStoryboard,
    createStoryboardEmail,
    updateStoryboard,
} from '../../../graphql/mutations.js';
import {
    prodByTop20,
    prodByProdFile,
    prodByNumberSortName,
    getStoryboard,
    storyByEmail,
    svgsByResultId,
    getSvgObjectsArray,
} from '../../../graphql/queries.js';

const queries={
    trending:prodByProdFile,
    top20:prodByTop20,
    itemNumbers:prodByNumberSortName,
    storyboard:getStoryboard,
    storyByEmail:storyByEmail,
    svgsByResultId:svgsByResultId,
    getSvg:getSvgObjectsArray,
};


export async function s3grabSingle(key){
    try{
    let theDownload = await Storage.get(key);
    return theDownload;
    }catch(e){
        return e;
    };
};



export async function getSvgDynamo(id){
    try {
        let svgLookedFur=await API.graphql(graphqlOperation(
            queries.getSvg,
            {id:id}
        ));
        return svgLookedFur.data.getSvgObjectsArray;
    }catch(e){ console.log(e); };
};



export async function svgDynamo(inpy){
    try {
        let svgEntered = await API.graphql(graphqlOperation(createSvgObjectsArray,{input:inpy}));
        if (svgEntered.data.createSvgObjectsArray){
            return svgEntered.data.createSvgObjectsArray;
        };
    } catch (e) {
        console.log(e);
        const msg = e.errors[0].message;
        return {
            storyError : {
                message : msg.substring(0,msg.indexOf('('))
            }
        };
    };
};


export async function getStories(email){
    try {
        let inpy={email: email};
        let stories = await API.graphql(graphqlOperation(queries['storyByEmail'],{...inpy,sortDirection:'DESC'}));
        if (stories.data.storyByEmail.items){
            return stories.data.storyByEmail.items;
        };
    } catch (e) {
        return e;
    };
};


export async function getStoryById(id){
    let story = await API.graphql(graphqlOperation(queries.storyboard,{id:id}));
    let data = story.data.getStoryboard;
    return data;
};




export async function getProductByItemNumber(itemNumber){
    let product = await API.graphql(graphqlOperation(queries.itemNumbers,{item_number:itemNumber}));
    let data = product.data.prodByNumberSortName.items[0];
    return data;
};

export async function makeStoryBoard(entry){
    try{
        let toDb=await API.graphql(graphqlOperation(createStoryboard,{input:entry}));
        if(
            toDb
            &&typeof toDb!=='undefined'
            &&toDb.data
            &&typeof toDb.data!=='undefined'
            &&toDb.data.createStoryboard
            &&typeof toDb.data.createStoryboard!=='undefined'
        ){
            return toDb.data.createStoryboard;
        }
    }catch(e){
        console.log(e);
    };
};


export async function nameStoryboard(entry){
    try{
        let mutant='updateStoryboard';
        let toDb=await API.graphql(graphqlOperation(updateStoryboard,{input:entry}));
        if(
            toDb
            &&typeof toDb!=='undefined'
            &&toDb.data
            &&typeof toDb.data!=='undefined'
            &&toDb.data[mutant]
            &&typeof toDb.data[mutant]!=='undefined'
        ){
            return toDb.data[mutant];
        }
    }catch(e){
        console.log(e);
    };
};





export async function makeStoryBoardEmail(entry){
    try{
        let mutant='createStoryboardEmail';
        let toDb=await API.graphql(graphqlOperation(createStoryboardEmail,{input:entry}));
        if(
            toDb
            &&typeof toDb!=='undefined'
            &&toDb.data
            &&typeof toDb.data!=='undefined'
            &&toDb.data[mutant]
            &&typeof toDb.data[mutant]!=='undefined'
        ){
            return toDb.data[mutant];
        }
    }catch(e){
        console.log(e);
    };
};


export async function getProdsDynamo(indexName=prodByProdFile,optionalVars){
    try{
        let assTit=await API.graphql(graphqlOperation(queries.trending,{prodFileExists:'true',limit:6000,...optionalVars}));
        let darts=assTit.data.prodByProdFile.items;
        console.log(darts.length)
        let carxTeet=darts;
        if (assTit.data.prodByProdFile.nextToken){
            let secondGo = await API.graphql(graphqlOperation(queries.trending,{prodFileExists:'true',limit:1100,nextToken:assTit.data.prodByProdFile.nextToken,...optionalVars}));
            console.log(secondGo)
            console.log(secondGo.data.prodByProdFile.items.length)
            carxTeet = [
                ...darts,
                ...(secondGo.data.prodByProdFile.items),
            ];
        if (secondGo.data.prodByProdFile.nextToken){
            console.log('SHEEEEIT');
        }
        };
        return carxTeet;
    }catch(e){
        console.log(e);
    }
}



export async function getProdsDynamoTop20(indexName='prodByTop20',optionalVars){
    try{
        let assTit=await API.graphql(graphqlOperation(indexName,{top20:'true',limit:1100,...optionalVars}));
        let darts=assTit.data[indexName].items;
        let carxTeet=darts;
        if (assTit.data.prodByTop20.nextToken){
            let secondGo = await API.graphql(graphqlOperation(indexName,{top20:'true',limit:1100,nextToken:assTit.data.prodByTop20.nextToken,...optionalVars}));
            carxTeet = [
                ...darts,
                ...(secondGo.data.prodByTop20.items),
            ];
        };
        return carxTeet;
    }catch(e){
        console.log(e);
    }
}
