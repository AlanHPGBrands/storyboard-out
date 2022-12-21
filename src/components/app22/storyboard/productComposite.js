import React from 'react';
import RenderSvgElement from '../../rendersvgelement';
import purpleBlock from './static/purpleblock.webp';

const ProductCompositeContent = ({
        background_image,
        overlay_image,
        product_image,
        logo_svg,
        svgStyleFromAbove,
        MULTIsvgStyleFromAbove,
        cn='',
        borderRadius='10px 10px 0px 0px',
        adjusting=false,
        loaded,
        kids,
    }) => {

        
    return(
    <div
        className={cn}
        style={{
            position:'relative',
            width:'100%',
            height:'100%',
            overflow:'hidden',
            borderRadius:borderRadius,
            backgroundImage:background_image&&typeof background_image!=='undefined'?'url('+background_image+')':undefined,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor:typeof logo_svg!=='undefined'?logo_svg.mainColor&&typeof logo_svg.mainColor!=='undefined'
            ?logo_svg.mainColor:logo_svg.nitClrs&&logo_svg.nitClrs !=='undefined'?logo_svg.nitClrs[0]:undefined:undefined,
        }}>
            <img 
                src={purpleBlock} 
                alt={'purple placeholder image to address layout shift'}
                style={{position:'absolute',zIndex:-1}}
            />
        
        {product_image&&typeof product_image!=='undefined'&&
            <div style={{width:'100%',height:'100%',overflow:'hidden',}}>  
                <img 
                    src={product_image}
                    width={'100%'}
                    alt='prod_image'
                />
            </div>}
            <div style={{
                    position:'absolute',
                    top:'0px',
                    left:'0px',
                    width:'100%',
                    height:'100%',
                    zIndex:1200,
                }}>
                {typeof logo_svg!=='undefined'&&typeof svgStyleFromAbove!=='undefined'&&
                <div id={'svgContainer'}
                    style={{
                        position:'relative',
                        width:'100%',
                        height:'100%',
                    }}>
                {typeof logo_svg!=='undefined'&&typeof MULTIsvgStyleFromAbove!=='undefined'&&Array.isArray(MULTIsvgStyleFromAbove)&&MULTIsvgStyleFromAbove.length>0&&
                MULTIsvgStyleFromAbove.map((svgSty,ssIdx)=>(
                     <RenderSvgElement
                        key={'svg'+ssIdx}
                        currentSvg={logo_svg} 
                        svgStyleFromAbove={{
                            ...svgSty,
                            boxSizing:'content-box',
                            border:adjusting?'1px solid red':'none',
                        }}
                    />
                ))}
                </div>}
            </div>
            {overlay_image&&typeof overlay_image!=='undefined'&&
            <img src={overlay_image}
                style={{position:'absolute',top:'0px',left:'0px',zIndex:1220}}
                width={'100%'}
                alt='ovr_image'
            />}
            {kids&&kids}
    </div>
    );
};



export function ProductComposite(props){ return(<ProductCompositeContent {...props} />); };

