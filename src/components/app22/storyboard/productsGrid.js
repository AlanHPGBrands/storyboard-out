import React from 'react';
import {Col,Row} from 'react-bootstrap'
import brandsSmallSvgs from './static/brandsmallsvgs';
import purpleBlock from './static/purpleblock.webp';
import StoryBoardItem from './storyboarditem';
import Button from '@mui/material/Button';
import {lchRangesConst,top20} from './cosnts';
import RangeSlider from './rangeslider';
import InputSlider from './sliderwithinput';
let initialUserScreenWidth=window.innerWidth;
let imageSizesFromCloudinary=initialUserScreenWidth<577?500:250;
const convert=require('color-convert');
const brandsLogos=brandsSmallSvgs();


const getLogoVersion=(defaulty,svgs,hexMatch)=>{
    let tempPick;
    switch (defaulty) {
        case 'SP1LUM':tempPick=svgs.filter(f=>f.nm==='SP1LUM')[0];break;
        case 'SP1':   tempPick=svgs.filter(f=>f.nm==='SP1')[0];break;
        case '1CW':   tempPick=svgs.filter(f=>f.nm==='1CW')[0];break;
        case '1CB':   tempPick=svgs.filter(f=>f.nm==='1CB')[0];break;
        case '1CV':
        case '1CP':   tempPick=svgs.filter(f=>f.nm==='1CPOP')[0];break;
        case 'SP1W':  tempPick=svgs.filter(f=>f.nm==='SP1W')[0];break;
        default:      tempPick=svgs.filter(f=>f.nm==='SP1W')[0];
    };
    if (/1CP|1CV|SP1W/i.test(defaulty)&&typeof hexMatch!=='undefined'){
        switch (defaulty) {
            case '1CV':
            case '1CP':
                let tempSvgs=svgs.filter(f=>!/SP1/i.test(f.nm)).filter(f=>f.nm!=='1CW'&&f.nm!=='1CB');
                tempPick=tempSvgs.filter(f=>f.mainColor===hexMatch).length>0
                    ?tempSvgs.filter(f=>f.mainColor===hexMatch)[0]:tempSvgs[0];break;
            case 'SP1W':
                let tempSvgs1= svgs.filter(f=>!/1C/i.test(f.nm)).filter(f=>f.nm!=='SP1');
                tempPick=tempSvgs1.filter(f=>f.mainColor===hexMatch).length>0
                    ?tempSvgs1.filter(f=>f.mainColor===hexMatch)[0]:tempSvgs1[2];break;
        };
    };
    return tempPick;
};




function penMatchOneInLogoColors(convertedColors,penSetCurrentItem,svgs,multiColor,varsDefaultyPoo,logoLums){
    let jReg=/,j=([0-9A-Za-z]{1,7})[,.]/;
    let logoVersionPerPen;
    let rangeConst=lchRangesConst[penSetCurrentItem.range];
    let range;
    let defaulty =jReg.test(penSetCurrentItem.key)
        ?penSetCurrentItem.key.match(jReg)[1]
        :typeof varsDefaultyPoo!=='undefined'
            ?varsDefaultyPoo
            :undefined;
    if(typeof rangeConst!=='undefined'){
        range={min:rangeConst[0],max:rangeConst[1]}
        // ITERATE THROUGH COLORS
        for (let cv=0;cv<convertedColors.length;cv++){
            let luminosityOk=Array.isArray(logoLums)&&typeof logoLums[cv]!=='undefined'&&parseInt(logoLums[cv])&&parseInt(logoLums[cv])>12&&parseInt(logoLums[cv])<90;
            if (luminosityOk&&convertedColors[cv]<range.max&&convertedColors[cv]>range.min){ // FOUND A MATCH !!!!!!!!!!!!
                logoVersionPerPen=getLogoVersion(defaulty,svgs,svgs[0].nitClrs[cv],);
                let retObj={
                    key: 'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSetCurrentItem.key,
                    logo: logoVersionPerPen,
                    default:jReg.test(penSetCurrentItem.key)?penSetCurrentItem.key.match(jReg)[1]:typeof varsDefaultyPoo!=='undefined'?'___'+varsDefaultyPoo:'default',
                    match:true,
                };
                return retObj;
            }
        };
        let tempDefarty=defaulty==='SP1W'?'SP1LUM':defaulty;
        logoVersionPerPen=getLogoVersion(tempDefarty,svgs);
        let retObj={
            key: 'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSetCurrentItem.key,
            logo: logoVersionPerPen,
            default:jReg.test(penSetCurrentItem.key)?penSetCurrentItem.key.match(jReg)[1]:typeof varsDefaultyPoo!=='undefined'?'___'+varsDefaultyPoo:'default',
            match:false,
        };
        return retObj;
    };
    // NO MATCH FOUND  AND/OR  NO RANGE DATA FOR THIS PEN
    let tempDeFalty=defaulty==='SP1W'?'SP1LUM':defaulty;
    logoVersionPerPen=getLogoVersion(tempDeFalty,svgs);
    let retObj={
        key: 'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSetCurrentItem.key,
        logo: logoVersionPerPen,
        default:jReg.test(penSetCurrentItem.key)?penSetCurrentItem.key.match(jReg)[1]:typeof varsDefaultyPoo!=='undefined'?'___'+varsDefaultyPoo:'default',
        match:false,
    };
    return retObj;
};



const findNextKeyForItem=(itemNumber,allPenkirks,allPenkirksColorMatches)=>{
    let currentImage=allPenkirksColorMatches[itemNumber].key;
    let nextImagePair=allPenkirks[itemNumber].prod.lchRanges[0];
    allPenkirks[itemNumber].prod.lchRanges.forEach((pair,pairIdx)=>{
        let anotherImage=new RegExp(pair.key,'i');
        if (anotherImage.test(currentImage)){
            nextImagePair=pairIdx===allPenkirks[itemNumber].prod.lchRanges.length-1
                ?allPenkirks[itemNumber].prod.lchRanges[0]:allPenkirks[itemNumber].prod.lchRanges[pairIdx+1];
        };
    });
    let subbybub='public/PORTAL/VIRTUALS/HUB/';
    let ratrunny= 'https://webbart.mo.cloudinary.net/'+
            (nextImagePair.key.substring(nextImagePair.key.indexOf(subbybub)+subbybub.length))
                .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                .replace(/plodes-bucket20445-dev\.s3\.amazonaws\.com\/public\/PORTAL\/VIRTUALS\/HUB\//i,'https://webbart.mo.cloudinary.net/')
                .replace('.webp','.webp?tx=h_80,w_80').replace('.png', '.png?tx=h_80,w_80');
    return ratrunny;
};


const handleProductColorChange=(itemNumber,allPenkirks,svgs,setAllPenkirksColorMatches,allPenkirksColorMatches)=>{
    let tempColorMatchesState=JSON.parse(JSON.stringify(allPenkirksColorMatches));
    let nextImagePair;
    allPenkirks[itemNumber].prod.lchRanges.forEach((pair,pairIdx)=>{
        let anotherImage=new RegExp(pair.key,'i');
        if (anotherImage.test(allPenkirksColorMatches[itemNumber].key)){
            nextImagePair=pairIdx===allPenkirks[itemNumber].prod.lchRanges.length-1
                ?allPenkirks[itemNumber].prod.lchRanges[0]:allPenkirks[itemNumber].prod.lchRanges[pairIdx+1];
        };
    });

    let unoColoro;
    let oneColorHexx=allPenkirks[itemNumber.toString().toUpperCase()].prod.oneColorHex;
    if (oneColorHexx && typeof oneColorHexx!=='undefined') {
        let tempLogoVersion=JSON.parse(JSON.stringify(svgs[1]));
        unoColoro={
            ...tempLogoVersion,
            opacity:'.6',
            mainColor:'#'+oneColorHexx,grps:tempLogoVersion.grps.map(group=>({
                ...group,fill:oneColorHexx[0]==='#'?oneColorHexx.slice(1):oneColorHexx,
                paths:group.paths.map(path=>({...path,
                        fill:oneColorHexx[0]==='#'?oneColorHexx.slice(1):oneColorHexx
                    }))}))};
    };
    if (typeof unoColoro!=='undefined'){
        setAllPenkirksColorMatches({
            ...tempColorMatchesState,
            [itemNumber]:{key:'https://plodes-bucket20445-dev.s3.amazonaws.com/'+nextImagePair.key,logo:unoColoro,}
        });
        return true;
    };
    let logosColoros=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[2]);
    let logosColorosLUMINOSITY=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[0]);
    let logosColoroschroms=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[1]);
    let varsDefaulty=allPenkirks[itemNumber.toString().toUpperCase()].prod.imprintLogoVersionDefault;
    let mc=false;
    let newColorMatch= penMatchOneInLogoColors(logosColoros,nextImagePair,svgs,mc,varsDefaulty,logosColorosLUMINOSITY);
    setAllPenkirksColorMatches({
        ...tempColorMatchesState,
        [itemNumber]:{
            key:'https://plodes-bucket20445-dev.s3.amazonaws.com/'+nextImagePair.key,
            logo:newColorMatch.logo,
        }
    });
};



const filterFromPrice=(array,doOrDontDo,filter)=>{
    if (!doOrDontDo||typeof doOrDontDo==='undefined'){return array};
    if (!filter||typeof filter==='undefined'){console.log('noFlter');return array;}
    let disShit=array.filter((f)=>{
        if (!f.price||typeof f.price==='undefined'){return false};
        return f.price<filter;
    });
    return disShit;
};

const filterLowPrice=(array,doOrDontDo,filter)=>{
    if (!doOrDontDo||typeof doOrDontDo==='undefined'){return array};
    if (!filter||typeof filter==='undefined'){console.log('noFlter');return array;}
    let disShit=array.filter((f)=>{
        if (!f.price||typeof f.price==='undefined'){return false};
        return f.price>filter;
    });
    return disShit;
};



const filterFromKeywords=(array,doOrDontDo,filterSet)=>{
    if (!doOrDontDo||typeof doOrDontDo==='undefined'){return array};
    if (!filterSet||typeof filterSet==='undefined'||!filterSet[0]||typeof filterSet[0]==='undefined'){console.log('noFlter');return array;}
    let disShit=array.filter(({prod:f})=>{
        if (!f.keywords||typeof f.keywords==='undefined'){return false};
        return (f.keywords.filter(f=>
            (filterSet.map(m=>m.replace(/&amp;/,'&').toLowerCase()).includes(f.toLowerCase()))).length)
    })
    return disShit;
};

const filterFromBrands=(array,filterKeyArray)=>{
    let filterKey=filterKeyArray[0];
    if (!filterKey||typeof filterKey==='undefined'){return array};
    filterKey=/batch/i.test(filterKey)?'bab':filterKey;
    return array.filter(f=>{
        if (!f.brand||typeof f.brand==='undefined'){return false;};
        return (f.brand.toLowerCase()===filterKey.toLowerCase());
    });
};

const filterItemsArray=(array,checkImgs,allPenkirks)=>(array.filter(({item_number,item_name})=>{
    if(!(typeof item_name!=='undefined'&&typeof item_name[0]!=='undefined')){return false};
    if(checkImgs&&typeof allPenkirks[item_number]==='undefined'){return false};
    return true;
}));


const calculateSvgStyling=({
    imprintWidthXHeightPx,
    imprintOffsetXYPx,
    imprintRotationDeg,
    imprintSkewXYDeg,
})=>{
    let styling={position:'absolute'};
    let width=(parseInt(imprintWidthXHeightPx.split('x')[0])/10)+'%';
    styling.width=width;
    let height=  (parseInt(imprintWidthXHeightPx.split('x')[1])/10)+'%';
    styling.height=height;
    styling.left= ((500 + (parseInt(imprintOffsetXYPx.split('x')[0])) 
                        - (parseInt(imprintWidthXHeightPx.split('x')[0])/2))/10)
                        + '%';
    styling.top=((500   - (parseInt(imprintOffsetXYPx.split('x')[1]))
                        - (parseInt(imprintWidthXHeightPx.split('x')[1])/2))/10)
                        + '%';
    let transformInit = '';
    if (imprintRotationDeg&&imprintRotationDeg.toString()!=='0'){transformInit='rotate('+imprintRotationDeg+'deg)';};
    if (imprintSkewXYDeg&&typeof imprintSkewXYDeg!=='undefined'&&imprintSkewXYDeg.toString()!=='0'){
        let skewX=parseInt(imprintSkewXYDeg.split('x')[0]);
        let skewY=parseInt(imprintSkewXYDeg.split('x')[1]);
        transformInit+=' skew('+skewX + 'deg, '+skewY+'deg)';
    };
    styling.transform=transformInit;
    return styling;
};



export default function ProductsGrid({
    favs,svgs,addAllToFavorites,
    allPenkirks,allPenkirksColorMatches,
    setAllPenkirksColorMatches,filterWords,
    filterBrands,handleFavClick,filtersRow,filtersRow2,filtersRow3,priceFilter,lowPriceFilter,
    showThemTheMoney,handleCommitNah,
}){
    const isFavorited=itemNumber=>(favs.includes(itemNumber));

    let placeHolder=top20.map(itemNumber=>({
        product_number:itemNumber.toUpperCase(),
        lchRanges:[{range:'XXX'}],
        product_description:'fake_desc',
        product_name:'Javalina Classic Pen',
        product_image:purpleBlock,
        background_image:undefined,
        addToFavorites:()=>{console.log('Product Images Loading...')},
        svgStyleFromAbove:undefined,
    }));

    let renderProducts=
        allPenkirks&&typeof allPenkirks!=='undefined'
            &&filterFromBrands(
                filterFromKeywords(
                    filterLowPrice(
                    filterFromPrice(
                        filterItemsArray(
                            Object.keys(allPenkirks).map(key=>allPenkirks[key]),
                            'checkForDemImgsToo',
                            allPenkirks,),
                        priceFilter&&typeof priceFilter!=='undefined',
                        priceFilter),
                        lowPriceFilter&&typeof lowPriceFilter!=='undefined',
                        lowPriceFilter),
                filterWords.length>0,
                filterWords),
            filterBrands);

    const listForHighLow=allPenkirks&&typeof allPenkirks!=='undefined'
            ?filterFromBrands(
                filterFromKeywords(
                        filterItemsArray(
                            Object.keys(allPenkirks).map(key=>allPenkirks[key]),
                            'checkForDemImgsToo',
                            allPenkirks,),
                filterWords.length>0,
                filterWords),
            filterBrands)
            :[0,100];
        
    

    let finalRenderedListIs=renderProducts&&typeof renderProducts!=='undefined'
        ?renderProducts
        .map(({eqp_can,item_number,item_name,item_description,brand,prod,prodARRAYS,price,moq,code,},itemIdx)=>({
            eqp_can:typeof eqp_can!=='undefined'?eqp_can:null,
            item_number:item_number,
            price:price,
            moq:moq,
            code:code,
            background_image:
            typeof allPenkirks[item_number].prod&&allPenkirks[item_number].prod.bg&&allPenkirks[item_number].prod.bg!=='undefined'
                ?allPenkirks[item_number].prod.bg
                    .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                    .replace('.webp',`.webp?tx=h_${imageSizesFromCloudinary},w_${imageSizesFromCloudinary}` )
                    .replace('.png',  `.png?tx=h_${imageSizesFromCloudinary},w_${imageSizesFromCloudinary}` )
                :undefined,
            overlay_image:allPenkirks[item_number].prod&& allPenkirks[item_number].prod.ovr&&typeof allPenkirks[item_number].prod.ovr!=='undefined'
                ?allPenkirks[item_number].prod.ovr
                    .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                    .replace('.webp',`.webp?tx=h_${imageSizesFromCloudinary},w_${imageSizesFromCloudinary}` )
                    .replace('.png',  `.png?tx=h_${imageSizesFromCloudinary},w_${imageSizesFromCloudinary}` )
                :undefined,
            product_number:item_number,
            product_name:item_name,
            product_description:item_description,
            favorited:isFavorited(item_number),
            addToFavorites:handleFavClick,
            product_image:allPenkirksColorMatches&&typeof allPenkirksColorMatches[item_number]!=='undefined'
                ?allPenkirksColorMatches[item_number].key
                    .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                    .replace('.webp',`.webp?tx=h_${imageSizesFromCloudinary},w_${imageSizesFromCloudinary}` )
                    .replace('.png',  `.png?tx=h_${imageSizesFromCloudinary},w_${imageSizesFromCloudinary}` )
                :allPenkirks[item_number].prod.file,
            logo:allPenkirksColorMatches&&typeof allPenkirksColorMatches[item_number]!=='undefined'
                ?allPenkirksColorMatches[item_number].logo:undefined,
            avatarImage:typeof brandsLogos[brand.toLowerCase()]!=='undefined'
                ?brandsLogos[brand.toLowerCase()]:brand[0].toUpperCase(),
            svgStyleFromAbove:typeof prod!=='undefined'
                ?calculateSvgStyling(prod):undefined,
            MULTIsvgStyleFromAbove:typeof prodARRAYS!=='undefined'
                ?prodARRAYS.map(m=>(calculateSvgStyling(m))):undefined,
            lchRanges:allPenkirks[item_number].prod.lchRanges,
            loaded:true,
        }))
        : placeHolder;

    if (filterWords.map(m=>m.toLowerCase()).includes('trending')){
        finalRenderedListIs=finalRenderedListIs.sort((a,b)=>(/BB/i.test(b.item_number)?1:true?0:-1));
        const first=a=>/BB4/i.test(a);
        finalRenderedListIs.sort(function(x,y){return first(x.item_number)?-1:first(y.item_number)?1:0;});       
    };

    let highLowPrices=listForHighLow.filter(f=>f.price).sort((a,b)=>(b.price>a.price?1:a.price>b.price?-1:0)).map(m=>m.price)
    console.log(highLowPrices);
    console.log(renderProducts&&renderProducts.map(m=>m.prod))

    return(<>
    <Col xs={12} >
        <Row style={{marginTop:'60px',zIndex:1600}}>

            {typeof filtersRow!=='undefined'&&filtersRow}
            {typeof filtersRow2!=='undefined'&&filtersRow2}

            <Col xs={6} md={3} >
                {finalRenderedListIs&&typeof finalRenderedListIs!=='undefined'&&
                <Button sx={{color:'#4700b3'}} onClick={()=>{addAllToFavorites(finalRenderedListIs.map(m=>m.product_number))}} >
                    SELECT ALL
                </Button>}
                &nbsp;
                <span style={{fontSize:'.875rem'}} >
                    {finalRenderedListIs&&typeof finalRenderedListIs!=='undefined'&&finalRenderedListIs.length}
                </span>
            </Col>
            <Col style={{display:showThemTheMoney?'block':'none'}}>
                                            {/* <InputSlider onCloseProp={handleCommitNah} /> */}
                                            {Array.isArray(highLowPrices)&&highLowPrices.length>0&&<RangeSlider 
                                                highLow={[highLowPrices[0],highLowPrices[highLowPrices.length-1]]} 
                                                onCloseProp={handleCommitNah} />}
                                        </Col>
            {typeof filtersRow3!=='undefined'&&filtersRow3}

        </Row>
    </Col>

    <Col xs={12}>
        <Row
            className={'productGrid'}
            style={{paddingLeft:'15px',paddingRight:'15px',marginTop:'2rem',paddingBottom:'2rem'}}>

            {finalRenderedListIs&&typeof finalRenderedListIs!=='undefined'&&
            finalRenderedListIs
            .map(({
                product_image,background_image,overlay_image,product_number,
                vertical_image,product_name,product_description,favorited,
                addToFavorites,avatarImage,svgStyleFromAbove,MULTIsvgStyleFromAbove,
                lchRanges,logo,loaded,price,moq,code,},itemIdx)=>(
            <Col
                key={'k'+product_number}
                className={'storyboardcontainer'}
                xs={12} sm={6} md={4} lg={3} xl={2}
                style={{padding:'8px'}}
                >
                <StoryBoardItem
                    moq={moq}
                    code={code}
                    price={price}
                    addAllToFavorites={()=>{console.log('filler')}}
                    product_image={product_image}
                    background_image={background_image}
                    overlay_image={overlay_image}
                    product_number={product_number}
                    vertical_image={vertical_image}
                    product_name={product_name}
                    product_description={product_description}
                    favorited={favorited}
                    addToFavorites={addToFavorites}
                    avatarImage={avatarImage}
                    svgStyleFromAbove={svgStyleFromAbove}
                    MULTIsvgStyleFromAbove={MULTIsvgStyleFromAbove}
                    lchRanges={lchRanges}
                    logo={logo}
                    itemIdx={itemIdx}
                    svgs={svgs}
                    handleProductColorChange={(a)=>{handleProductColorChange(a,allPenkirks,svgs,setAllPenkirksColorMatches,allPenkirksColorMatches,)}}
                    returnNextImage={allPenkirksColorMatches?()=>(findNextKeyForItem(product_number,allPenkirks,allPenkirksColorMatches,)):()=>{/*console.log('nan')*/}}
                    loaded={loaded}
                    iiddxx={itemIdx<finalRenderedListIs.length/2}
                />
            </Col>))
            }
        </Row>
    </Col>
    </>)
};