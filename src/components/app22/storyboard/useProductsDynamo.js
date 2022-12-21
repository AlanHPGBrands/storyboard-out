export async function getProductsDynamo(sparseIndexDynamo,topList){
    if (typeof sparseIndexDynamo==='undefined'){return null;}
    let productFiles=       sparseIndexDynamo.map(({prodFileKey})=> prodFileKey&&'https://plodes-bucket20445-dev.s3.amazonaws.com/'+prodFileKey);
    let bckgrndFiles=       sparseIndexDynamo.map(({bgFileKey})=>   bgFileKey&&'https://plodes-bucket20445-dev.s3.amazonaws.com/'+bgFileKey);
    let overlayFiles=       sparseIndexDynamo.map(({ovrFileKey})=>  ovrFileKey&&'https://plodes-bucket20445-dev.s3.amazonaws.com/'+ovrFileKey);
    let colorses=           sparseIndexDynamo.map(({colors})=>      (colors?JSON.parse(colors):false)).filter(f=>f&&typeof f!=='undefined');
    let rangeses=           sparseIndexDynamo.map(({lchRanges})=>   (lchRanges?JSON.parse(lchRanges):false)).filter(f=>f&&typeof f!=='undefined');
    let imprintDataas=      sparseIndexDynamo.map(({imprintData,keywords,})=>({...(JSON.parse(imprintData)),...({keywords:JSON.parse(keywords)})}));
    let imprintDataARRAYS=  sparseIndexDynamo.map(({imprintDataArray,keywords,})=>{
        let parsed=JSON.parse(imprintDataArray);
        return parsed&&typeof parsed!=='undefined'?(parsed.map(m=>({...m,...({keywords:JSON.parse(keywords)})}))):false
    });
    let finalPenkirks={};
    sparseIndexDynamo.forEach(({item_number,item_name,brand,price,item_description,moq,code,eqp_can})=>{
        finalPenkirks[item_number.toUpperCase()]={
            item_number:item_number.toUpperCase(),
            brand:brand.toLowerCase(),
            item_name:item_name,
            price:parseFloat(price),
            prod:{},
            item_description:item_description,
            moq:moq,
            code:code,
            eqp_can:typeof eqp_can!=='undefined'?eqp_can:null
        };
    });
    imprintDataas.forEach(imp=>{
        if (imp&&typeof imp!=='undefined'&&imp.itemNumber&&typeof imp.itemNumber!=='undefined') {
            finalPenkirks[imp.itemNumber.toUpperCase()].prod=imp;
        };
    });
    imprintDataARRAYS.forEach(imp=>{
        if (imp[0]&&typeof imp[0]!=='undefined'&&imp[0].itemNumber&&typeof imp[0].itemNumber!=='undefined') {
            finalPenkirks[imp[0].itemNumber.toUpperCase()]['prodARRAYS']=imp;
        };
    });

    productFiles.forEach((file,idx)=>{
        if (
            file&&typeof file!=='undefined'
            &&sparseIndexDynamo[idx]&&typeof sparseIndexDynamo[idx].item_number!=='undefined'
            &&finalPenkirks[sparseIndexDynamo[idx].item_number.toUpperCase()]&&typeof finalPenkirks[sparseIndexDynamo[idx].item_number.toUpperCase()]!=='undefined'
            &&finalPenkirks[sparseIndexDynamo[idx].item_number.toUpperCase()].prod&&typeof finalPenkirks[sparseIndexDynamo[idx].item_number.toUpperCase()].prod!=='undefined'
        ){
            let originalKeyWords=finalPenkirks[sparseIndexDynamo[idx].item_number.toUpperCase()].prod.keywords.filter(f=>!/deep inventory/i.test(f)&&!/best sellers/i.test(f));
            let itemsKeywords=originalKeyWords;
            if (
                sparseIndexDynamo[idx].brand
                &&typeof sparseIndexDynamo[idx].brand!=='undefined'
                &&
                ( sparseIndexDynamo[idx].brand.toLowerCase()!=='bab'
                ||sparseIndexDynamo[idx].brand.toLowerCase()!=='mixie')
                ) {
                    itemsKeywords.push('available in canada')
                };
            
            if (Array.isArray(topList)&&topList.length>1){
                topList.forEach(fe=>{
                    if (typeof sparseIndexDynamo[idx]!=='undefined'
                        &&sparseIndexDynamo[idx].item_number
                        &&typeof sparseIndexDynamo[idx].item_number!=='undefined'
                        &&fe.itemNumber.toLowerCase()===sparseIndexDynamo[idx].item_number.toLowerCase()
                    ){
                        itemsKeywords.push(fe.keyword);
                    }
                });
            };
            Object.assign(
                finalPenkirks[sparseIndexDynamo[idx].item_number.toUpperCase()].prod,
                {   file:file,
                    bg:bckgrndFiles[idx],
                    ovr:overlayFiles[idx],
                    colors:colorses[idx].map(m=>m.color),
                    lchRanges:rangeses[idx],
                    keywords:itemsKeywords,
                }
            );
        };
    });
    return finalPenkirks;
};