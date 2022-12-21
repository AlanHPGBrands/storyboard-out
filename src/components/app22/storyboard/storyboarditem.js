import React,{useState,useEffect,useRef} from 'react';
import {ProductComposite} from './productComposite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import StoryTooltip from './tooltip';
import DescriptionIcon from '@mui/icons-material/Description';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Paper from '@mui/material/Paper';

const ChangeProductColorButton=({handleProductColorChange,disabled=false,htmly})=>(<StoryTooltip 
        icon={<DoubleArrowIcon 
                sx={{
                    fontSize:'3.5rem',
                    padding:'5px',
                    display:'inline',
                    cursor:disabled?'default':'pointer',
                    opacity:disabled?.5:1,
                }} /> }
        title={'Change Color'}
        onClick={disabled?()=>{console.log('noLogo');}:handleProductColorChange}
        html={typeof htmly!=='undefined'?<img src={htmly} width={80} /> :undefined}
    />);


const ProductDescriptionRender=({product_description})=>{
    const [showDescription,setShowDescription]=useState(false);
    return (<>
    {showDescription
        ?
        <Paper sx={{zIndex:99999,backgroundColor:'white',fontSize:'.7rem',}} onClick={()=>{setShowDescription(!showDescription)}} elevation={3} >
            {product_description}
        </Paper>
        :<LibraryBooksIcon onClick={()=>{setShowDescription(!showDescription)}} />}
    </>);
};


export default function StoryBoardItem({
    product_image,
    background_image,
    overlay_image,
    product_number,
    vertical_image,
    product_name,
    product_description,
    favorited,
    addToFavorites,
    addAllToFavorites,
    avatarImage,
    svgStyleFromAbove,
    lchRanges,
    logo,
    itemIdx,
    svgs,
    handleProductColorChange,
    MULTIsvgStyleFromAbove,
    LOOKBOOK,
    adjusting,
    loaded,
    iiddxx,
    returnNextImage,
    price,
    moq,
    code,
}){
    return(
    <div 
        className={'maxyPad miniPad'}
        style={{
            transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
            borderRadius: '4px',
            boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
            width:'100%',
        }}>
        <ProductComposite
        cn={'maxyPad'}
        style={{borderRadius:'10px 10px 0px 0px',overflow:'hidden',}}
        vertical_image={vertical_image}
        background_image={typeof background_image!=='undefined'?background_image:undefined}
        overlay_image={overlay_image}
        product_image={product_image}
        logo_svg={logo}
        svgStyleFromAbove={svgStyleFromAbove}
        MULTIsvgStyleFromAbove={MULTIsvgStyleFromAbove}
        adjusting={adjusting}
        loaded={loaded}
        kids={<div 
            style={{position:'absolute',bottom:'0px',left:'0px', lineHeight:1, width:'45px',height:'45px',zIndex:1500,opacity:.7,}}>
            <StoryTooltip
                icon={<AddCircleIcon style={{color:favorited?'green':'#4700b3',width:'35px',height:'35px',opacity:.9,}} />}
                onClick={LOOKBOOK?()=>{addAllToFavorites(product_number)}:()=>{addToFavorites(product_number)}}
                title={'Add Item to this Story'}
            /></div>
        }/>

    <div style={{position:'absolute',top:'6px',left:'12px',width:'30px',height:'30px'}}>
        {avatarImage}
    </div>



    <div style={{position:'relative',fontFamily:'Typo Grotesk Bold',textAlign:'left',marginTop:'.2rem',padding:'.5rem'}}>

        <div key={'prodname'+itemIdx} style={{textAlign:'left',padding:'5px',paddingRight:'21px',color:'black',fontSize:'.9rem',height:'40px'}}>
            {typeof product_name!=='undefined'?product_name.substring(0,50):''}
        </div>

        {product_number&&typeof product_number!=='undefined'&&
        <div key={'prodnum'+itemIdx}
            style={{
                padding:'5px',
                textAlign:'left',color:'gray',fontSize:'.8rem',
            }}>
            {typeof product_number!=='undefined'?product_number:''}
            {moq&&typeof moq!=='undefined'?' | MOQ '+moq:''}
        </div>}

        {/[0-9]/.test(price)
            ?<div key={'aslowas'+product_number} style={{padding:'5px',textAlign:'left',color:'gray',fontSize:'.8rem',}}>
                {!Number.isNaN(price)&&typeof price!=='undefined'?' AS LOW AS $'+parseFloat(price).toFixed(2):''}
                {typeof code!=='undefined'?' ('+code+')':''}
            </div>
            :<div key={'aslowas'+product_number} style={{padding:'5px',textAlign:'left',color:'gray',fontSize:'.8rem',}}>
                &nbsp;
            </div>}

        {(svgs&&typeof svgs!=='undefined'&&svgs[0]&&typeof svgs[0]!=='undefined')&&
        <div style={{position:'absolute',bottom:'0px',right:'0px'}}>
            {Array.isArray(lchRanges)&&lchRanges.length>1&&
            <ChangeProductColorButton
                handleProductColorChange={()=>{handleProductColorChange(product_number)}}
                htmly={loaded?returnNextImage():undefined}
            />}
        </div>}

        {product_description&&typeof product_description!=='undefined'&&
        <div style={{position:'absolute',top:'10px',right:'10px'}}>
            <ProductDescriptionRender product_description={product_description} />
        </div>}

    </div>
</div>
);
};