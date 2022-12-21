import React,{useState,useEffect} from 'react';
import {v4} from 'uuid';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {makeStoryBoard,getProdsDynamo,addCanadianEqps} from './graphQlStuffs';
import {cat22AppConfig} from './config';
import {getProductsDynamo} from './useProductsDynamo';
import {hubData} from './hubMasterFromBrandManagers'
import {svgDynamo} from './graphQlStuffs';
import {useUsersStories} from './useUsersStories';
import {useDistributorLogos} from './usedistributorslogos';
import {useCanadianExchangeRate} from './useCanadianExchangeRate';
import StoryBoardLogo from './storyboardlogo';
import VerticalSelect from './verticalSelectForStoryboardBrands';
import PreviewPage2 from './preview2';
import ResponsiveDialog from './responsiveDialog';
import ProductsGrid from './productsGrid';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RenderSvgElement from '../../rendersvgelement';
import UploadAndSearch from './uploadandsearch';
import UserStoriesList from './listOfUsersStories';
import CustomizedSnackbars from './snackbarinfo';
import UploadButton from './uploadbutton';
import UploadAvatar from './uploadavatar';
import StoryCart from './storycart';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StoryCartItems from './storycartitems';
import { lchRangesConst,top20,pride20 } from './cosnts';

const convert=require('color-convert');
const {constantes:{brands:brandsFromConfig}}=cat22AppConfig;

const BrandsFiltersRow=({handleSelect,titulo='Filter by Brand',wiffyes,twerdkurks,valueProp,})=>{
    const handleVerticalSelection=va=>{
        let val=va&&typeof va!=='undefined'&&va.label&&typeof va.label!=='undefined'
            ?va.label:undefined;
        handleSelect(val);
    };
    return(<VerticalSelect
            valueProp={valueProp[0]}
            titulo={titulo} 
            brands={twerdkurks} 
            handleSelect={handleVerticalSelection}
            optionBoxWidth={typeof wiffyes!=='undefined'?wiffyes:170}
        />
    );
};



const phil=ara=>{
    let tempArray=[];
    ara.forEach(fe=>{ if (!tempArray.includes(fe)){ tempArray.push(fe); }; });
    return tempArray.filter(f=>( !/\//.test(f) &&!/deep inventory/i.test(f) &&!/best sellers/i.test(f)
    ));
};

const addOrRemove=(itm,ara)=>(ara.includes(itm)?ara.filter(t=>itm!==t):[...ara,itm]);

const exchangeOne=(itm,ara)=>([itm]);

const getLogoVersion=(defaulty,svgs,hexMatch)=>{
    let tempPick;
    switch (defaulty) {
        case 'SP1LUM':tempPick=svgs.filter(f=>f.nm==='SP1LUM')[0];break;
        case 'SP1':tempPick=svgs.filter(f=>f.nm==='SP1')[0];break;
        case '1CW':tempPick=svgs.filter(f=>f.nm==='1CW')[0];break;
        case '1CB':tempPick=svgs.filter(f=>f.nm==='1CB')[0];break;
        case '1CV':
        case '1CP':tempPick=svgs.filter(f=>f.nm==='1CPOP')[0];break;
        case 'SP1W':tempPick=svgs.filter(f=>f.nm==='SP1W')[0];break;
        default: tempPick=svgs.filter(f=>f.nm==='SP1W')[0];
    };
    if (/1CP|1CV|SP1W/i.test(defaulty)&&typeof hexMatch!=='undefined'){
        switch (defaulty){
            case '1CV':
            case '1CP':
                let tempSvgs=svgs.filter(f=>!/SP1/i.test(f.nm)).filter(f=>f.nm!=='1CW'&&f.nm!=='1CB');
                tempPick=tempSvgs.filter(f=>f.mainColor===hexMatch).length>0
                    ?tempSvgs.filter(f=>f.mainColor===hexMatch)[0]:tempSvgs[0];break;
            case 'SP1W':
                let tempSvgs1= svgs.filter(f=>/SP1W/i.test(f.nm));
                tempPick=tempSvgs1.filter(f=>f.mainColor===hexMatch).length>0
                    ?tempSvgs1.filter(f=>f.mainColor===hexMatch)[0]
                    :svgs.filter(f=>f.nm==='SP1LUM');break;
        };
    };
    return tempPick;
};


function penMatchOneInLogoColors({
        logoColors,
        penSetCurrentItem,
        svgs,
        varsDefaultyPoo,
        logoLums,
    }){
    let logging = /70006|CA9633/.test(penSetCurrentItem.key);
    let jReg=/,j=([0-9A-Za-z]{1,8})[,.]/;
    let logoVersionPerPen;
    let rangeConst=lchRangesConst[penSetCurrentItem.range];
    let range;
    let defaulty =jReg.test(penSetCurrentItem.key)
        ?penSetCurrentItem.key.match(jReg)[1]
        :typeof varsDefaultyPoo!=='undefined'
            ?varsDefaultyPoo
            :undefined;
            if (logging){console.log('DEFAULTY_______'+ penSetCurrentItem.key+' : ' + defaulty)}
    if(typeof rangeConst!=='undefined'){
        range={min:rangeConst[0],max:rangeConst[1]}
        // ITERATE THROUGH COLORS
        for (let cv=0;cv<logoColors.length;cv++){
            let luminosityOk=Array.isArray(logoLums)&&typeof logoLums[cv]!=='undefined'&&parseInt(logoLums[cv])&&parseInt(logoLums[cv])>12&&parseInt(logoLums[cv])<90;
            if (luminosityOk&&logoColors[cv]<range.max&&logoColors[cv]>range.min){ // FOUND A MATCH !!!!!!!!!!!!
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
    let tempDeCacky=defaulty==='SP1W'?'SP1LUM':defaulty;
    logoVersionPerPen=getLogoVersion(tempDeCacky,svgs);
    let retObj={
        key: 'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSetCurrentItem.key,
        logo: logoVersionPerPen,
        default:jReg.test(penSetCurrentItem.key)?penSetCurrentItem.key.match(jReg)[1]:typeof varsDefaultyPoo!=='undefined'?'___'+varsDefaultyPoo:'default',
        match:false,
    };
    return retObj;
};


const productRangeToLogoColorInterpreter=(convertedColors,penSet,svgs,multiColor,oneColorHex,num,varsDefault,logoLums)=>{
    if (oneColorHex&& typeof oneColorHex!=='undefined'){
        return ({
            key:'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSet[0].key,
            logo:{...JSON.parse(JSON.stringify(svgs[1])),opacity:'.6',mainColor:'#'+oneColorHex,grps:JSON.parse(JSON.stringify(svgs[1])).grps.map(group=>({
                ...group,fill:oneColorHex[0]==='#'?oneColorHex.slice(1):oneColorHex,paths:group.paths.map(path=>({...path,
                        fill:oneColorHex[0]==='#'?oneColorHex.slice(1):oneColorHex}))}))}});};
        let runPerPen=penSet.map(m=>penMatchOneInLogoColors({
            logoColors:convertedColors,
            penSetCurrentItem:m,
            svgs:svgs,
            multiColor:multiColor,
            varsDefaultyPoo:varsDefault,
            logoLums:logoLums,
        }));
    if(runPerPen.filter(f=>f.match).length>0){
        return runPerPen.filter(f=>f.match)[0];
    }else if(runPerPen.filter(f=>!f.match||typeof f.match==='undefined').length>0){
        let preNute=runPerPen.filter(f=>!f.match||typeof f.match==='undefined');
        let lookForNeutral=preNute
            .filter(f=>(f.key&&(/c=K/i.test(f.key)||/c=N/i.test(f.key)||/c=W/i.test(f.key))));
        return (lookForNeutral.length>0) ? lookForNeutral[0] : preNute[0]
    } else {
        return undefined;
    };
};


const erroros={
    noProducts:'No Products Selected',
    noUser:'No Contact Info',
};





export default function Products({
    qBuk,
    svgs,
    storyUser,
    currentResultId,
    RESULTS_PAGE,
    setCurrentResultId,
    showCreateStoryButton,
    distributorLogoId,
    setDistributorLogoId,
    setShowDistributorInputs,
    showDistributorInputs
}){
    const [filterWords,setFilterWords]=useState(['trending']);
    const [filterBrands,setFilterBrands]=useState([]);
    const [allPenkirks,setAllPenkirks]=useState(null);
    const [favs,setFavs]=useState(['']);
    const [storyMade,setStoryMade]=useState(false);
    const [allPenkirksColorMatches,setAllPenkirksColorMatches]=useState(null);
    const [showNewFav,setShowNewFav]=useState(false);
    const [beforeUserInteraction,setBeforeUserInteraction]=useState(!RESULTS_PAGE);
    const [erroro,setErroro]=useState(null);
    const [priceFilter,setPriceFilter]=useState(null);
const [lowPriceFilter,setLowPriceFilter]=useState(null);

    const [svgUploadError, setSvgUploadError] = useState(null);
    const [showCloseButton,setShowCloseButton]=useState(false);
    const [openCollectionsProp,setOpenCollectionsProp]=useState(false);
    const [showVerks,setShowVerks]=useState(false);
    const [showThemTheMoney,setShowThemTheMoney]=useState(false);
    const [showCartItemsList,setShowCartItemsList]=useState(false);

    const usersStories=useUsersStories(storyUser&&storyUser.email);
    const usersDistLogos=useDistributorLogos(storyUser&&storyUser.email);
    const exchangeRate=useCanadianExchangeRate();

    useEffect(()=>{
        async function getData(indexName){
            let allData;
            try {
                allData=await getProdsDynamo(indexName);
                if (!allData || typeof allData==='undefined') {return null};
                let gotProducts;
                    gotProducts = await getProductsDynamo(
                        allData,
                        [   
                            ...(top20.map(t=>({itemNumber:t,keyword:'Trending'})).filter(f=>f.itemNumber&&typeof f.itemNumber!=='undefined')),
                            // ...(pride20.map(t=>({itemNumber:t,keyword:'Prie'})).filter(f=>f.itemNumber&&typeof f.itemNumber!=='undefined')),
                            ...(hubData.map(m=>({
                                itemNumber:m.item_number,
                                keyword:m.brand+' 2022 LookBook',
                            })).filter(f=>f.itemNumber&&typeof f.itemNumber!=='undefined')),]
                    );
                    setAllPenkirks(gotProducts);
                if (gotProducts&&typeof gotProducts!=='undefined'&&svgs&&typeof svgs!=='undefined'&&typeof svgs[0]!=='undefined'){
                    let matchiz={};
                    let logosColoros=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[2]);
                    let logosColorosLUMINOSITY=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[0]);
                    let logosColoroschroms=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[1]);
                    Object.keys(gotProducts).forEach(num=>{
                        let penSet=gotProducts[num].prod.lchRanges;
                        let multiColor=/t/i.test(gotProducts[num].prod.imprintMulticolor);
                        let oneColorHex=gotProducts[num.toString().toUpperCase()].prod.oneColorHex;
                        let varsDefault=gotProducts[num.toString().toUpperCase()].prod.imprintLogoVersionDefault;
                        let matchesizes=productRangeToLogoColorInterpreter(logosColoros,penSet,svgs,multiColor,oneColorHex,num,varsDefault,logosColorosLUMINOSITY);
                        matchiz[num]=matchesizes;
                    });
                    setAllPenkirksColorMatches(matchiz);
                };
            } catch (e) {
                console.error(e);
                return null;
            };
        };
        getData('prodByProdFile');
    },[]);

    useEffect(()=>{if(showNewFav){setTimeout(()=>{setShowNewFav(false)},1500)};},[showNewFav])

    useEffect(()=>{
        if (allPenkirks&&typeof allPenkirks!=='undefined'&&svgs&&typeof svgs!=='undefined'&&typeof svgs[0]!=='undefined'){
            let matchiz={};
            let logosColoros=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[2]);
            let logosColorosLUMINOSITY=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[0]);
            Object.keys(allPenkirks).forEach(num=>{
                let penSet=allPenkirks[num].prod.lchRanges;
                let multiColor=/t/i.test(allPenkirks[num].prod.imprintMulticolor);
                let oneColorHex=allPenkirks[num.toString().toUpperCase()].prod.oneColorHex;
                let varsDefault=allPenkirks[num.toString().toUpperCase()].prod.imprintLogoVersionDefault;
                let matchesizes=productRangeToLogoColorInterpreter(logosColoros,penSet,svgs,multiColor,oneColorHex,num,varsDefault,logosColorosLUMINOSITY);
                matchiz[num]=matchesizes;
            });
            setAllPenkirksColorMatches(matchiz);
        };
    },[allPenkirks,svgs]);

     
    useEffect(()=>{
        if (Array.isArray(usersDistLogos)&&typeof usersDistLogos[0]!=='undefined'&&usersDistLogos[0].id&&usersDistLogos[0].logo){
            setDistributorLogoId(usersDistLogos[0].id);
        };
    },[usersDistLogos]);


    async function handleCreateStoryClick({storyUser,favs,currentResultId,imagesLogos,svGuys,distSvg,currentDistLogoId}){
        let svgsObjectsArrayId=v4();
        let svgsDistributorArrayId=v4();
        let entry={
            logotype:'client',
            id:svgsObjectsArrayId,
            data:JSON.stringify(svGuys),
            result_id:currentResultId,
            email:storyUser.email&&storyUser.email,
        };
        svgDynamo(entry)
        .then(res=>{if (res.storyError){setSvgUploadError(res.storyError.message);}})
        .catch(er=>{console.log(er);})
        let entryDist={
            logotype: 'distributor',
            id:svgsDistributorArrayId,
            data:JSON.stringify(distSvg),
            result_id:currentDistLogoId,
            email:storyUser.email&&storyUser.email,
        };
        svgDynamo(entryDist);
        if (!storyUser.email){ setErroro('Please complete email address.');return false; };
        let storyData={
            id:v4(),
            logoGqlId:svgsObjectsArrayId,
            distributorLogoGqlId:svgsDistributorArrayId,
            distributorID:/@/.test(storyUser.email)
                ?storyUser.email.split('@')[1].substring(0,storyUser.email.split('@')[1].lastIndexOf('.'))
                :storyUser.email,
            catalogData:JSON.stringify(imagesLogos),
            content:JSON.stringify({
                items:favs,
                user:storyUser,
                resultId:currentResultId,
            }),
            email:storyUser.email&&storyUser.email,
            storyUserID:v4(),
            phone_number:storyUser.phone&&storyUser.phone,
            created_at_flt:Math.round(Date.now()/1000),
        };
        let makeStory=await makeStoryBoard(storyData);
        console.log(makeStory);
        if(makeStory&&typeof makeStory!=='undefined'){
            setStoryMade(null);
            setStoryMade(makeStory);
        };
    };

    const handleFavClick=itemNumber=>{
        setShowNewFav(itemNumber);
        let newFavs=addOrRemove(itemNumber,favs);
        setFavs(newFavs);
    };

    const handleKeywordClick=keyword=>{
        console.log(keyword)
        console.log(filterWords)
        if (beforeUserInteraction){setBeforeUserInteraction(false);};
        if (keyword&&typeof keyword!=='undefined'&&typeof keyword==='string'){
            setFilterWords(exchangeOne(keyword,phil(filterWords)));};
            setFilterBrands(exchangeOne('',filterBrands));
            window.document.getElementById('topOPage').scrollIntoView();
    };

    const handleBrandClick=brand=>{
        if (beforeUserInteraction){ setBeforeUserInteraction(false); };
        setFilterWords(exchangeOne('Shop All',phil(filterWords)));
        setFilterBrands(exchangeOne(brand,filterBrands));
        window.document.getElementById('topOPage').scrollIntoView();
    };

    function addAllToFavorites(list){
        setShowNewFav(list.slice(0,6).join(',')+(list.length>5?'...':''));
        let tempList=[];
        list.forEach(m=>{if(!favs.includes(m)){tempList.push(m)} });
        setFavs(tempList);
    };

    let renderedFilterWords=[];
    let listForKeywordsFilter=allPenkirks&&typeof allPenkirks!=='undefined'&&allPenkirks;
    if(listForKeywordsFilter){
        Object.keys(allPenkirks)
            .filter(f=>allPenkirks[f].prod&&typeof allPenkirks[f].prod!=='undefined')
            .forEach(inu=>{
                let {prod:{keywords:kis}}=allPenkirks[inu];
            if (kis&&typeof kis!=='undefined'){
                kis.forEach(ke=>{
                    if(!renderedFilterWords.includes(ke)){
                        renderedFilterWords.push(ke); }; }); }; });
    };
    renderedFilterWords = [...renderedFilterWords,'Trending'];
    renderedFilterWords = phil(renderedFilterWords);

    const keywordsObjects=renderedFilterWords
        .filter(f=>!/lookbook/i.test(f))
        .map(text=>({label:text}))

    const MultipleFiltersRow=()=>{
        return (<>
            <Col xs={6} md={3} style={{fontSize:'.9rem',zIndex:1600}} >
                <BrandsFiltersRow
                    handleSelect={handleBrandClick}
                    titulo={'Filter by Brand'}
                    twerdkurks={brandsFromConfig}
                    valueProp={filterBrands}
                />
            </Col>

            <Col xs={6} md={3} style={{fontSize:'.9rem',zIndex:1600}} >
                <BrandsFiltersRow
                    valueProp={filterWords}
                    twerdkurks={keywordsObjects}
                    handleSelect={handleKeywordClick}
                    titulo={'Filter by Category'}
                    wiffyes={200}
                />
            </Col>
        </>);
    };
    const handleCommitNah=val=>{
        console.log(val);
        setPriceFilter(val[1]);
        setLowPriceFilter(val[0])
        setShowThemTheMoney(false);};

    let itemsArray=[];

    favs
        .filter(f=>f.length>0)
        .forEach(favy=>{if(!itemsArray.includes(favy)){itemsArray.push({
            itemNumber:favy,
            itemName:
                allPenkirks
                && typeof allPenkirks[favy.toUpperCase()]!=='undefined'
                && allPenkirks[favy.toUpperCase()].item_name
                    ?allPenkirks[favy.toUpperCase()].item_name
                    :'',
        })}});

    function handleStoryCartClick(){setShowCartItemsList(!showCartItemsList)};
    
    function removeItemFromFavorites(removeThese){
        let tempList=[];
        favs.forEach(m=>{if(!removeThese.includes(m)){tempList.push(m)}})
        setFavs(tempList);
    };




    return(
    <Row id={'productsCmpntRow'} >
        <Col id={'productsCmpntCol'} >

            <div style={{position:'absolute',top:'0px',width:'1px',height:'1px'}} id='topOPage' />

            <Row
                className={'productGrid'}
                style={{
                    paddingLeft: '15px',
                    paddingRight:'15px',
                    marginTop:'.5rem',
                    paddingBottom:'2rem',
                }}>
       
                <ProductsGrid
                    priceFilter={priceFilter}
                    lowPriceFilter={lowPriceFilter}
                    addAllToFavorites={addAllToFavorites}
                    allPenkirks={allPenkirks}
                    allPenkirksColorMatches={allPenkirksColorMatches}
                    setAllPenkirksColorMatches={setAllPenkirksColorMatches}
                    filterWords={filterWords}
                    filterBrands={filterBrands}
                    handleFavClick={handleFavClick}
                    favs={favs}
                    svgs={svgs}
                    handleCommitNah={handleCommitNah}
                    showThemTheMoney={showThemTheMoney}
                    filtersRow={ <MultipleFiltersRow />}
                    filtersRow2={<Col>
                            <Button  sx={{color:'#4700b3',whiteSpace:'nowrap'}}  onClick={()=>{setOpenCollectionsProp(!openCollectionsProp);}}>
                                MY COLLECTIONS
                            </Button>
                            {(storyUser&&typeof storyUser!=='undefined')&&openCollectionsProp
                            &&
                            <div id={'2ND CHILDREN FILTERS ROW'} >
                                <UserStoriesList
                                    handleSelection={addAllToFavorites} 
                                    handleClose={()=>{setOpenCollectionsProp(false);}}
                                    usersStories={usersStories} />
                            </div>}
                                </Col>}
                    filtersRow3={<Col>
                                    <Row >
                                        <Col style={{fontSize:'.8rem',display:!showThemTheMoney?'block':'none',cursor:'pointer',}}>
                                            <AttachMoneyIcon onClick={()=>{setShowThemTheMoney(true)}}/>
                                            {lowPriceFilter}-
                                            {priceFilter}
                                            {priceFilter&&
                                                <RemoveCircleOutlineIcon onClick={()=>{
                                                    setPriceFilter(null);
                                                    setLowPriceFilter(null);
                                                }} />
                                            }
                                        </Col>
                                    </Row>
                                </Col>}
               />

                <Col id={'fickstBarNav'}>
                    <Row style={{zIndex:1620,margin:'0px',position:'fixed',left:'0px',top:'0px',width:'100%',minHeight:'60px',backgroundColor:'#1a1a1a',color:'white',alignItems:'center',}}>

                                                            {storyUser&&<CustomizedSnackbars style={{position:'absolute',top:'60px'}} snack={'Click the avatar to uplaod distributor logo.'} />}
                                                            {showNewFav&&
                                                            <Col style={{position:'absolute',top:'20px',right:'20px',}} xs={12} sm={10}>
                                                                <Alert style={{position:'absolute',top:'50px',right:'10px'}} xs={{textAlign:'center'}} severity="success">
                                                                    <div style={{maxWidth:'90vw'}}>
                                                                        {'Added '+showNewFav+' to Story. Click Create Story to save and\/or send.'}
                                                                    </div>
                                                                </Alert>
                                                            </Col>}
                                                            {svgUploadError&& 
                                                            <Alert severity="error">
                                                                {/item size has exceeded/i.test(svgUploadError)
                                                                        ?'THE NUMBER OF PATHS IN CLIENT LOGO EXCEEDS MAXIMUM ALLOWED SIZE. '
                                                                        + 'Please send us an email to catalog@hpgbrands.com (ATTN: MAS-ERROR), '
                                                                        + 'with logo attached so we can process your request.'
                                                                        :svgUploadError}
                                                            </Alert>}


                        <Col>

                                <Row style={{alignItems:'center',height:'60px',width:'100%'}}>

                                    <Col id={'column1'} xs={7} sm={5} md={4} >
                                        <Row >
                                            <Col xs={6}>
                                                {svgs&&typeof svgs[0]!=='undefined'
                                                ?
                                                <UploadAvatar 
                                                    buttonChildren={
                                                        <Avatar style={{margin:'auto',cursor:'pointer',width:'40px',height:'40px',}} >
                                                            <RenderSvgElement currentSvg={svgs[0]} svgStyleFromAbove={{width:'90%',maxHeight:'100%',}}/>
                                                        </Avatar>}
                                                    >
                                                    <ResponsiveDialog showCloseProp={'true'}>
                                                        <UploadAndSearch
                                                            termsAccepted={true}
                                                            setTermsAccepted={()=>{console.log('setTermsAccepted')}}
                                                            qBuk={qBuk}
                                                            setCurrentResultId={setCurrentResultId}
                                                            setTotalProcessingTime={()=>{console.log('ga')}}
                                                            email={storyUser&&typeof storyUser!=='undefined'&&storyUser.email?storyUser.email:undefined}
                                                        />
                                                    </ResponsiveDialog>
                                                </UploadAvatar>

                                                :<UploadButton buttonText={svgs&&typeof svgs[1]!=='undefined'?'Change Client Logo':'UPLOAD'} >
                                                    <ResponsiveDialog>
                                                        <UploadAndSearch
                                                            termsAccepted={true}
                                                            setTermsAccepted={()=>{console.log('setTermsAccepted')}}
                                                            qBuk={qBuk}
                                                            setCurrentResultId={setCurrentResultId}
                                                            setTotalProcessingTime={()=>{console.log('ga')}}
                                                            email={storyUser&&typeof storyUser!=='undefined'&&storyUser.email?storyUser.email:undefined}
                                                        />
                                                    </ResponsiveDialog>
                                                </UploadButton> }
                                            </Col>

                                            <Col xs={6}>
                                                <Button
                                                    sx={{borderRadius:'0px',opacity:!(showCreateStoryButton&&svgs&&typeof svgs[0]!=='undefined')?.5:1,color:'white',backgroundColor:'#4700b3'}}
                                                    style={{borderRadius:'0px',opacity:!(showCreateStoryButton&&svgs&&typeof svgs[0]!=='undefined')?.5:1,width:'120px',}}
                                                    onClick={
                                                        !(showCreateStoryButton&&svgs&&typeof svgs[0]!=='undefined')
                                                        ?()=>{setErroro('No Client Logo')}
                                                        :!storyUser
                                                        ?()=>{setErroro('No Contact Info.');}
                                                        :favs.filter(f=>f&&typeof f!=='undefined'&&f!=='').length<1
                                                            ?()=>{setErroro(erroros.noProducts);}
                                                            :()=>{
                                                                let uniqueFavs=[];
                                                                favs.forEach(favy=>{if(!uniqueFavs.includes(favy)){uniqueFavs.push(favy)}});
                                                                handleCreateStoryClick({
                                                                    storyUser:storyUser,
                                                                    favs:favs.filter(f=>f!==''),
                                                                    currentResultId:currentResultId,
                                                                    imagesLogos:uniqueFavs.filter(f=>f!=='').map(fav=>({
                                                                        product:allPenkirksColorMatches[fav].key,
                                                                        logo:allPenkirksColorMatches[fav].logo.nm,
                                                                        overlay:allPenkirks[fav].prod.ovr,
                                                                        background:allPenkirks[fav].prod.bg,
                                                                    })),
                                                                    svGuys:svgs,
                                                                    distSvg:typeof storyUser!=='undefined'&&storyUser.distributor_svg?storyUser.distributor_svg:undefined,
                                                                    currentDistLogoId:distributorLogoId,
                                                            })}}
                                                        className='darkerPurple'
                                                    >
                                                    {'SAVE Story'.toUpperCase()}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col id={'column2'} className={'d-none d-sm-block'} sm={2} md={4} >
                                        <StoryBoardLogo />
                                    </Col>

                                    <Col id={'column3'} xs={5} sm={5} md={4}>
                                        <Row>
                                            <Col xs={8} style={{textAlign:'center'}}>

                                            <Avatar
                                                style={{margin:'auto',cursor:'pointer',width:'40px',height:'40px',}}
                                                onClick={()=>{setShowDistributorInputs(true);}}
                                                >
                                                {storyUser && typeof storyUser!=='undefined'&&storyUser.distributor_svg&&typeof storyUser.distributor_svg!=='undefined'
                                                    ?<RenderSvgElement currentSvg={storyUser.distributor_svg} svgStyleFromAbove={{width:'90%',}}/>
                                                    :<AddIcon />}
                                            </Avatar>
                                            {showDistributorInputs&&
                                        <ResponsiveDialog
                                            onClose={()=>{setShowDistributorInputs(false);}} 
                                            handleClose={()=>{setShowDistributorInputs(false);}} 
                                            wordseses={'Upload Your (Distributor) Logo'}
                                            >                                        
                                            <div key={'inputStoryGory'}  style={{paddingTop:'.8rem'}} >
                                                <div style={{textAlign:'center',marginLeft:'auto',marginRight:'auto',fontWeight:600,fontSize:'1.1rem',}}>
                                                    {'Distributor'}
                                                </div>
                                                <br />
                                                <UploadAndSearch
                                                    termsAccepted={true}
                                                    setTermsAccepted={()=>{console.log('hardAccepted')}}
                                                    qBuk={qBuk}
                                                    setCurrentResultId={setDistributorLogoId}
                                                    setTotalProcessingTime={()=>{setShowCloseButton(true);}}
                                                    setShowCloseButton={setShowCloseButton}
                                                    />
                                            </div>
                                        </ResponsiveDialog>}

                                    </Col>


                                    <Col xs={4}>

                                        <StoryCart numberOfItems={itemsArray.length} handleClick={handleStoryCartClick} />
                                            {showCartItemsList&&<StoryCartItems
                                            handleSelection={removeItemFromFavorites} 
                                            handleClose={()=>{setShowCartItemsList(false);}}
                                            itemsArray={itemsArray}
                                        /> }
                                    </Col>
                                </Row>
                            </Col>

                            {erroro&& <Alert severity="error" onClose={()=>{setErroro(null);}}>{erroro}</Alert> }

                        </Row>
                    </Col>

                    </Row>
                </Col>
            </Row>

            <Row>
                <Col>
                    {storyMade&&
                    <ResponsiveDialog wordseses={'Share Storyboard'} >
                        <PreviewPage2 storyMade={storyMade} />
                    </ResponsiveDialog> }
                </Col>
            </Row>
        </Col>
    </Row>);
};