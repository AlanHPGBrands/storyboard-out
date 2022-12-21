import React,{useState,useEffect} from 'react';
import {getStoryById,getProductByItemNumber,getSvgDynamo} from './graphQlStuffs';
import brandsSmallSvgs from './static/brandsmallsvgs';
import {ResultsProductComposite} from './resultsproductcomposite';
import {getProductsDynamo} from './useProductsDynamo';
import RenderSvgElement from '../../rendersvgelement';
import SharerSpeedDial from './speeddialwrapper';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PrintIcon from '@mui/icons-material/Print';
import {lchRangesConst} from './cosnts';
const convert=require('color-convert');
const brandsLogos=brandsSmallSvgs();

const StoryCatalogItem=({
    product_image,
    background_image,
    overlay_image,
    product_number,
    product_name,
    svgStyleFromAbove,
    logo,
    itemIdx,
    divStyle,
    loaded,
    textStyle,
    MULTIsvgStyleFromAbove,
    printref,
    setPrintReady,
    price,moq,code,showPrices,showMoq,
    eqp_can,useCAD,
})=>(
    <div 
    style={{
        height:'100%',
        width:'100%',
        ...divStyle,
    }}>
    {<ResultsProductComposite
        borderRadius={'none'}
        style={{overflow:'hidden'}}
        background_image={typeof background_image!=='undefined'?background_image:undefined}
        overlay_image={overlay_image}
        product_image={product_image}
        logo_svg={logo}
        svgStyleFromAbove={svgStyleFromAbove}
        slashes={false}
        loaded={loaded}
        MULTIsvgStyleFromAbove={MULTIsvgStyleFromAbove}
        printref={printref}
        setPrintReady={setPrintReady}
    />}
    <div style={{
        fontFamily:'Typo Grotesk Bold',
        marginTop:'.2vw',
        padding:'1.2vw',
        ...textStyle,
        }}>
        {[product_name].map((field,idx)=>{
            let funSize=typeof field==='string'&&field.length>42
                    ?'min(1vw, 20px)'
                    :typeof field==='string'&&field.length>35
                        ?'min(1.1vw, 24px)'
                        :typeof field==='string'&&field.length>30
                            ?'min(1.3vw, 28px)':'min(1.5vw, 32px)';
            return(
            <div key={'desc'+idx+itemIdx}
                style={{fontSize:funSize,color:'#12011a',whiteSpace:'nowrap',}}>
                {typeof field!=='undefined'?field:''}
            </div>)})}
        {[product_number].map((field,idx)=>{
            return(
            <div key={'desc'+idx+itemIdx} style={{fontSize:'1.2em',padding:'5px 5px 5px 0px',color:'gray',}}>
                {typeof field!=='undefined'?field:''}
                {showPrices&&code&&/[0-9]/.test(price)&&
                <>
                    {' | AS LOW AS' 
                    + (useCAD&&typeof eqp_can!=='undefined'
                        ?' $CAD ' + parseFloat(eqp_can).toFixed(2)
                        :' $USD ' + parseFloat(price).toFixed(2)) 
                    + ' ('+code+')'}
                </>}
                {showMoq&&moq&&(' | MOQ ' + moq)}
            </div>)})}
    </div>
</div>
);















export default function Results({svgs,storyUser,setStoryUser,RESULTS_PAGE}){
    const [allPenkirks,setAllPenkirks]= useState(null);
    const [allPenkirksColorMatches,setAllPenkirksColorMatches]=useState(null);
    const [catalogData,setCatalogData]=useState(null);
    console.log(RESULTS_PAGE)
    useEffect(()=>{
        const productRangeToLogoColorInterpreter=(convertedColors,penSet,svgs,multiColor,oneColorHex)=>{
            let logoVersion;
            if (oneColorHex&& typeof oneColorHex!=='undefined'){
                let tempLogoVersion=svgs[1];
                return ({
                    key:'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSet[0].key,
                    logo:{...tempLogoVersion,
                        opacity:'.6',
                        mainColor:'#'+oneColorHex,
                        grps:tempLogoVersion.grps.map(group=>({
                            ...group,
                            fill:oneColorHex[0]==='#'?oneColorHex.slice(1):oneColorHex,
                            paths:group.paths.map(path=>({
                                ...path,
                                fill:oneColorHex[0]==='#'?oneColorHex.slice(1):oneColorHex,
                            }))
                        }))
                    },
                });
            };
             for (let pn=0;pn<penSet.length;pn++){
                let rangeConst=lchRangesConst[penSet[pn].range];
                let range;
                if(typeof rangeConst!=='undefined'){
                    range={min:rangeConst[0],max:rangeConst[1]}
                    for (let cv=0;cv<convertedColors.length;cv++){
                        if (convertedColors[cv]<range.max&&convertedColors[cv]>range.min){
                            if (!multiColor){
                                logoVersion=
                                   svgs.filter(fff=>fff.mainColor===svgs[0].nitClrs[cv]&&/cw/i.test(fff.nm)).length>0
                                        ?svgs.filter(f=>f.mainColor===svgs[0].nitClrs[cv]&& /cw/i.test(f.nm))[0]
                                        :svgs.filter(f=>/cw/i.test(f.nm))[0];
                            } else {
                                logoVersion=
                                    svgs.filter(f=>f.mainColor===svgs[0].nitClrs[cv]).length>0
                                        ?svgs.filter(f=>f.mainColor===svgs[0].nitClrs[cv])[0]
                                        :svgs[1]
                            };
                            let retObj={
                                key: 'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSet[pn].key,
                                logo: logoVersion,
                            };
                            return retObj; };  };  };
            };
           
            return ({
                key:'https://plodes-bucket20445-dev.s3.amazonaws.com/'+penSet[0].key,
                logo:svgs[1],
            });
        };
        if (allPenkirks&&typeof allPenkirks!=='undefined'&&svgs&&typeof svgs!=='undefined'&&typeof svgs[0]!=='undefined'){
            let matchiz={};
            let logosColoros=svgs[0].nitClrs.map((m) => convert.hex.lch(m)[2]);
            Object.keys(allPenkirks).forEach(num=>{
                let penSet=allPenkirks[num].prod.lchRanges;
                let multiColor=/t/i.test(allPenkirks[num].prod.imprintMulticolor);
                let oneColorHex=allPenkirks[num.toString().toUpperCase()].prod.oneColorHex;
                let matchesizes=productRangeToLogoColorInterpreter(logosColoros,penSet,svgs,multiColor,oneColorHex);
                matchiz[num]=matchesizes;
            });
            setAllPenkirksColorMatches(matchiz);
        };
    },[allPenkirks,svgs]);

    const [svJeezy,setSvJeezy]=useState(null);
    const [svJeezies,setSvJeezies]=useState(null);
    const [distJeezies,setDistJeezies]=useState(null);
    const [cdObject,setCdObject]=useState(null);
    const [savedStoryName,setSavedStoryName]=useState(null);
    const [storyGotten,setStoryGotten]=useState(null);

    useEffect(()=>{
        async function getData(){
                let getStory=await getStoryById(RESULTS_PAGE);
                setStoryGotten(getStory);
                console.log(getStory)
                if (!getStory){return false;}
                let content=JSON.parse(getStory.content);
                try {
                    let getSvgs=await getSvgDynamo(getStory.logoGqlId);
                    console.log(getSvgs);
                    if(getSvgs.data&&JSON.parse(getSvgs.data)){
                        setSvJeezies(JSON.parse(getSvgs.data));
                    };
                }catch(e){
                    console.log(e);
                };
                try {
                    let getSvgs3=await getSvgDynamo(getStory.distributorLogoGqlId);
                    if (getSvgs3){
                        if(getSvgs3.data&&JSON.parse(getSvgs3.data)){
                            setDistJeezies(JSON.parse(getSvgs3.data));
                        };
                    };
                }catch(e){
                    console.log(e);
                };
                let {items,user,logo}=content;
                let cd=JSON.parse(getStory.catalogData);
                let cData=cd;
                let cdObj={};
                let cdReg=/UALS\/HUB\/(.+)\//;
                cData.forEach(({product,logo})=>{
                    if (cdReg.test(product)){
                        let ittyNo=product.match(cdReg)[1];
                        cdObj[ittyNo]={product:product,logo:logo};
                    };
                });
                setCatalogData(cData);
                setStoryUser({...user,phone_number:getStory.phone_number});
                setSvJeezy(logo);
                let itemNumbersToGet=items.filter(f=>f&&typeof f!=='undefined'&&f.length>0);
                let itemsData=itemNumbersToGet.map(async (itemNo)=>(await getProductByItemNumber(itemNo)));
                let gotProducts=await Promise.all(itemsData);
                let doProducts=await getProductsDynamo(
                    gotProducts,
                    undefined,         
                );
                setAllPenkirks(doProducts);
                setCdObject(cdObj);
                if (getStory.name&&typeof getStory.name!=='undefined'){ setSavedStoryName(getStory.name);};
        };
        getData();
    },[]);


    const filterItemsArray=(array,checkImgs)=>(array.filter(({item_number,item_name})=>{
        if(!(typeof item_name!=='undefined'&&typeof item_name[0]!=='undefined')){return false};
        if(checkImgs&&typeof allPenkirks[item_number]==='undefined'){return false};
        return true;
    }));


    const calculateSvgStyling=({
        imprintWidthXHeightPx,
        imprintOffsetXYPx,
        imprintRotationDeg,
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
        if (imprintRotationDeg.toString()!=='0'){styling.transform='rotate('+imprintRotationDeg+'deg)';};
        return styling;
    };


    let renderProducts=allPenkirks&&typeof allPenkirks!=='undefined'
        && filterItemsArray(Object.keys(allPenkirks).map(key=>allPenkirks[key]),'checkForDemImgsToo');


    let finalRenderedListIs=renderProducts&&typeof renderProducts!=='undefined'
        ?renderProducts
        .map(({item_number,item_name,item_description,brand,prod,prodARRAYS,price,moq,code,useCAD,eqp_can},itemIdx)=>({
            item_number:item_number,
            background_image:allPenkirks[item_number].prod&&allPenkirks[item_number].prod.bg&&typeof allPenkirks[item_number].prod.bg!=='undefined'
                ?allPenkirks[item_number].prod.bg
                .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                .replace('.webp','.webp?tx=h_500,w_500')
                .replace('.png', '.png?tx=h_500,w_500' )
                :undefined,
            overlay_image:allPenkirks[item_number].prod&&allPenkirks[item_number].prod.ovr&&typeof allPenkirks[item_number].prod.ovr!=='undefined'
                ?allPenkirks[item_number].prod.ovr
                .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                .replace('.webp','.webp?tx=h_500,w_500')
                .replace('.png','.png?tx=h_500,w_500')
                :undefined,
            product_number:item_number,
            product_name:item_name,
            product_description:item_description,
            avatarImage:typeof brandsLogos[brand.toLowerCase()]!=='undefined'
                ?brandsLogos[brand.toLowerCase()]:brand[0].toUpperCase(),
            svgStyleFromAbove:typeof prod!=='undefined'
                ?calculateSvgStyling(prod):undefined,
            MULTIsvgStyleFromAbove:typeof prodARRAYS!=='undefined'
                ?prodARRAYS.map(m=>(calculateSvgStyling(m))):undefined,
            lchRanges:allPenkirks[item_number].prod.lchRanges,
            loaded:true,
            price:price,
            moq:moq,
            code:code,
            useCAD:useCAD,
            eqp_can:eqp_can,
        })) : null;

        if (finalRenderedListIs&&storyGotten&&typeof storyGotten!=='undefined'&&storyGotten.useCAD&&storyGotten.useCAD==='true'){
            console.log('__FILTERING FOR CCCCCCCCCCAAAAAANAADAAAAA')
            finalRenderedListIs=finalRenderedListIs
            .filter(f=>{
                console.log(f.eqp_can)
                console.log(typeof f.eqp_can)
                return (f.eqp_can&&typeof f.eqp_can!=='undefined'&&typeof f.eqp_can==='string');
            })
        }
        
        const [borderOn, setBorderOn]=useState(false);
        const redBorder=borderOn?'1px dashed red':undefined;


        const Nav=()=>(
        <Col style={{width:'100vw'}}>
            <Row>
                {storyGotten.showName==='true'&&
                storyGotten.showName!=='false'&&
                storyGotten.name&&
                <Col xs={12} style={{fontSize:'1.3rem',}}>
                    {storyGotten.name}    
                </Col>}
                    <Col style={{border:'inherit',}} xs={6} >
                        {svJeezies&&typeof svJeezies[0]!=='undefined'
                        ?<RenderSvgElement currentSvg={svJeezies[0]} svgStyleFromAbove={{width:'10vw',height:'10vw',maxHeight:'100px',minHeight:'65px',minWidth:'80px',}} />
                        :<></>}
                    </Col>
                    <Col style={{border:redBorder,}} xs={6}>
                        {distJeezies&&typeof distJeezies!=='undefined'
                        ?<RenderSvgElement currentSvg={distJeezies} svgStyleFromAbove={{margins:'auto',width:'10vw',height:'10vw',maxHeight:'100px',minHeight:'65px',minWidth:'80px',}} />
                        :<></>}
                    </Col>
                    {storyGotten.showEmail==='true'&&storyGotten.email&&
                    <Col xs={12} style={{textAlign:'right',paddingRight:'7.5vw',}}>
                        {storyGotten.email}
                    </Col>}
                    {/* {storyGotten.useCAD==='true'&&
                    <Col xs={12} style={{textAlign:'right',paddingRight:'7.5vw',}}>
                        {'Showing Prices in CAD'}
                        <br />
                        {'**Prices are subject to daily fluctuations.'}
                    </Col>} */}
                </Row>
            </Col>
        );

  


    const WebPageVersion =(props)=>(
        <Col>
            {storyUser&&
            <Row style={{
                    alignItems:'center',
                    zIndex:1800,
                    fontSize:'.9rem',
                    fontWeight:600,
                    padding:'1.2rem',
                    paddingTop:'.5rem',
                    border:redBorder,
                }}
                className={'justify-content-around fixed-nav'}
                >
                <Nav />
            </Row>}
            {props.children&&props.children}
            </Col>
    );



const SubsequentPages=({pageList,zinfindex,last})=>(
    <Row className={'mapperWrapper pdf-page'} style={{alignItems:'center',}} >
        {catalogData&&svJeezies&&finalRenderedListIs&&cdObject&&
        pageList
        .map((prap,itemIdx)=>{
            if (
                !cdObject[prap.product_number]
                ||typeof cdObject[prap.product_number]==='undefined'
            ) {
                console.log(prap)
                return null;
            };
            let loogoo=
                allPenkirks&&allPenkirks[prap.product_number]&&allPenkirks[prap.product_number].prod&&allPenkirks[prap.product_number].prod.oneColorHex&&typeof allPenkirks[prap.product_number].prod.oneColorHex==='string'&&allPenkirks[prap.product_number].prod.oneColorHex.length>2
                ?{...JSON.parse(JSON.stringify(svJeezies[1])),opacity:'.6',mainColor:'#'+allPenkirks[prap.product_number].prod.oneColorHex,grps:JSON.parse(JSON.stringify(svJeezies[1])).grps.map(group=>({
                    ...group,
                    fill:
                    typeof allPenkirks[prap.product_number].prod.oneColorHex!=='undefined'
                    ?allPenkirks[prap.product_number].prod.oneColorHex[0]==='#'?allPenkirks[prap.product_number].prod.oneColorHex.slice(1):allPenkirks[prap.product_number].prod.oneColorHex
                    :'fefefe',
                    paths:group.paths.map(path=>({...path,
                            fill:
                    typeof allPenkirks[prap.product_number].prod.oneColorHex!=='undefined'
                    ?allPenkirks[prap.product_number].prod.oneColorHex[0]==='#'?allPenkirks[prap.product_number].prod.oneColorHex.slice(1):allPenkirks[prap.product_number].prod.oneColorHex
                    :'fefefe'
                }))}))}
                :
                svJeezies.filter(f=>(
                    f&&
                    f.nm&&
                    typeof f.nm!=='undefined'&&
                    cdObject&&
                    cdObject[prap.product_number]&&
                    typeof cdObject[prap.product_number]!=='undefined'&&
                    cdObject[prap.product_number].logo&&
                    typeof cdObject[prap.product_number].logo!=='undefined'&&
                    f.nm.toLowerCase()===cdObject[prap.product_number].logo.toLowerCase()
                )).length>0
                    ?svJeezies.filter(f=>(
                        f&&
                        f.nm&&
                        typeof f.nm!=='undefined'&&
                        cdObject&&
                        cdObject[prap.product_number]&&
                        typeof cdObject[prap.product_number]!=='undefined'&&
                        cdObject[prap.product_number].logo&&
                        typeof cdObject[prap.product_number].logo!=='undefined'&&
                        f.nm.toLowerCase()===cdObject[prap.product_number].logo.toLowerCase())
                    )[0]
                    : svJeezies[1];
        return(
        <Col key={'k'+prap.product_number} xs={4} >
            <StoryCatalogItem
                                {...prap}
                                useCAD={storyGotten&&storyGotten.useCAD==='true'}
                                showPrices={storyGotten&&storyGotten.showPrices==='true'}
                                showMoq={storyGotten&&storyGotten.showMoq==='true'}

                logo={loogoo}
                product_image={cdObject[prap.product_number].product
                    .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                    .replace('.webp','.webp?tx=h_500,w_500')
                    .replace('.png','.png?tx=h_500,w_500')}
                itemIdx={itemIdx} svgs={svgs} divStyle={{}} textStyle={{textAlign:'left',fontSize:'.8vw',}}
            />
        </Col>
        )})}
    </Row>);







const ProductsRow=({renderList})=>{
    let firstPage=renderList.slice(0,9);
    let nextPagesArrays=[];
    for(let indy=0;indy<renderList.slice(9).length;indy+=9){
        nextPagesArrays.push(<SubsequentPages last={indy>=renderList.length-18?true:false} key={'ain'+indy} zinfindex={indy/9} pageList={renderList.slice(9).slice(indy,indy+9)} />);
      };
    return (
        <Row
            className={'productGrid justify-content-center' }
            style={{
                paddingBottom:'2rem',
                maxWidth:'1500px',
                marginLeft:'auto',
                marginRight:'auto',
            }}>
            <Col id={'svgsNOTNOTTOTOOTUTUdefined'}>
                <Row className={'firstPage'} style={{alignItems:'center',}}>
                    {catalogData&&svJeezies&&finalRenderedListIs&&cdObject&&
                    firstPage
                    .map((prap,itemIdx)=>{
                        return(
                    <Col key={'k'+itemIdx} xs={4} >
                        <StoryCatalogItem
                            {...prap}
                            useCAD={storyGotten&&storyGotten.useCAD==='true'}
                            showPrices={storyGotten&&storyGotten.showPrices==='true'}
                            showMoq={storyGotten&&storyGotten.showMoq==='true'}
                            logo={allPenkirks&&allPenkirks[prap.product_number]&&allPenkirks[prap.product_number].prod&&allPenkirks[prap.product_number].prod.oneColorHex&&typeof allPenkirks[prap.product_number].prod.oneColorHex==='string'&&allPenkirks[prap.product_number].prod.oneColorHex.length>2
                                ?{...JSON.parse(JSON.stringify(svJeezies[1])),opacity:'.6',mainColor:'#'+allPenkirks[prap.product_number].prod.oneColorHex,grps:JSON.parse(JSON.stringify(svJeezies[1])).grps.map(group=>({
                                    ...group,fill:allPenkirks[prap.product_number].prod.oneColorHex[0]==='#'?allPenkirks[prap.product_number].prod.oneColorHex.slice(1):allPenkirks[prap.product_number].prod.oneColorHex,paths:group.paths.map(path=>({...path,
                                            fill:allPenkirks[prap.product_number].prod.oneColorHex[0]==='#'?allPenkirks[prap.product_number].prod.oneColorHex.slice(1):allPenkirks[prap.product_number].prod.oneColorHex}))}))}
                                            :svJeezies.filter(f=>f.nm.toLowerCase()===cdObject[prap.product_number].logo.toLowerCase())[0]}
                            product_image={cdObject[prap.product_number].product
                                .replace('https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/HUB/','https://webbart.mo.cloudinary.net/')
                                .replace('.webp','.webp?tx=h_500,w_500')
                                .replace('.png','.png?tx=h_500,w_500')}
                            itemIdx={itemIdx} svgs={svgs} divStyle={{}} textStyle={{textAlign:'left',fontSize:'.8vw',}}
                        />
                    </Col>
                    )})}
                </Row>
        {nextPagesArrays.length>0&&nextPagesArrays}
    </Col></Row>);};



    function handlePrintPage(){window.print();};



    return(
    <Row>
        <div className={'fixed-speeddial'} style={{position:'fixed',bottom:'0px',right:'20px',width:'100vw',height:'65px',left:'0px',zIndex:9999999,paddingRight:'30px',}} >
            <div style={{position:'relative',width:'100%',height:'100%'}}>
                <SharerSpeedDial acionesAddicionales={[{icon:<PrintIcon onClick={handlePrintPage} size={ 32 } /> ,name:'Print To Pdf'}]} />
            </div>
        </div>
        {catalogData &&
        finalRenderedListIs&&
        <WebPageVersion>
            <ProductsRow renderList={finalRenderedListIs} />
        </WebPageVersion> }
    </Row>);
};