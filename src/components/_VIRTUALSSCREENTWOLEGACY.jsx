import React,{useState,useRef} from 'react';
import {Row,Col,Form,Nav,Button} from 'react-bootstrap';
import RenderSvgElement from './rendersvgelement';
// import PeterPicker from './peterpicker';
const navButtonStyle = {fontSize:'.8rem',padding:'.15rem .25rem'};

const TitleRow = props => (
    <Row>
        <Col style={{marginTop:'.5rem',marginBottom:'.5rem',fontSize:'1rem',fontWeight:600}}>
            {props.title}
        </Col>
    </Row>
);


export default function VirtScreenTwo(props) {
    const {
        fullColorBitmaps                ,
        setBitmapOnImprintArea          ,
        bitmapOnImprintArea             ,
        svgs                            ,
        svgsPropsArray                  ,
        berkgroundsBucket               ,
        penkirksBucket                  ,
        handleSetShowVersion            ,
        bgChecked                       ,
        handleBgSelection               ,
        selectedPenIndex                ,
        setMaskBackgroundColor_PLURAL   ,
        maskBackgroundColor             ,
        svgMaskForProductImage          ,
        customOneColor                  ,
        setCustomOneColor               ,
        setDesignOn                     ,
        designOn                        ,
        imprintObjects                  ,
        svgPatternForFlyer_PLURAL       ,
        svgContBackgroundImage          ,
    } = props;
    const [showCustomOneColor,setShowCustomOneColor] = useState(false);
    let svgsObject = {};
    if (typeof svgs!=='undefined') {
        svgs.forEach(svg=>{svgsObject[svg.dsc] = svg;});
    };

    const renderedSvg = useRef( null );

    let logoVersionsMap = {
        'Multicolor Versions' : [
            'SP1'   ,
            'SP1W'  ,
            'SP1W2'  ,
        ] ,
        'One Color Versions' : [
            '1C'        ,
            '1CVIBE'    ,
            '1CPOP'     ,
            '1CB'       ,
            '1CW'       ,
        ] ,
    };

    if (typeof svgs!=='undefined'&&svgs.length>0){
        if (svgs.filter(f=>f.nm==='SP1W3').length>0 && svgs.filter( f=>f.nm==='1CU').length>0) {
            logoVersionsMap[ 'Multicolor Versions' ] = ['SP1','SP1W','SP1W2','SP1W3'];
            logoVersionsMap[ 'One Color Versions' ] = ['1C','1CVIBE','1CPOP','1CB','1CW','1CU'];
        } else if (svgs.filter(f=>f.nm==='SP1W3' ).length > 0 ) {
            logoVersionsMap[ 'Multicolor Versions' ] = ['SP1','SP1W','SP1W2','SP1W3'];
        } else if ( svgs.filter( f => f.nm === '1CU' ).length > 0 ) {
            logoVersionsMap[ 'One Color Versions' ] = ['1C','1CVIBE','1CPOP','1CB','1CW','1CU'];
        } else {
        }
    };
    let versionsArrays = Object.keys( logoVersionsMap )
                            .map( m => [ m , logoVersionsMap[ m ] ] );
    let usingMap;
    if ( 
        typeof penkirksBucket !== 'undefined' 
    &&  typeof selectedPenIndex !== 'undefined' 
    && penkirksBucket[ selectedPenIndex ] !== 'undefined'
    && penkirksBucket[ selectedPenIndex ][ 'imprintOnecolor' ] !== 'undefined'
    && penkirksBucket[ selectedPenIndex ][ 'imprintMulticolor' ] !== 'undefined'
    ) {
        usingMap = [ 
            penkirksBucket[ selectedPenIndex ].imprintMulticolor   === 'T' ? true : false ,
            penkirksBucket[ selectedPenIndex ].imprintOnecolor     === 'T' ? true : false ,
        ];
    };
    versionsArrays = versionsArrays.filter( ( f , idx ) => usingMap[ idx ] );

    const logoVersionStyle = {maxHeight : '30px' ,paddingBottom : '.75rem'};
    let colorsForMask = typeof svgs !== 'undefined'
        ? [ 'none' , '#ffffff' , '#000000' , ...(svgs[ 0 ].nitClrs) ]
        : [ '#ffffff' , '#000000' ,  '#55afff' , '#ff55eb' ];
    let colorCirclesHeight = 30;
    const [backgroundImprintOrLogo,setBackgroundImprintOrLogo] =useState('logo1');
    const patternsArray = svgPatternForFlyer_PLURAL
                            .map((m,hmn)=>({
                                name            : m.name ,
                                circleFill      : m.mainColor ,
                                textFill        : /fff/i.test( m.mainColor ) ? 'black' : 'white' ,
                                patternOnVal    : hmn.toString( ) ,
                            }));

        return (
            <Row style={{bottom:'0px'}} >
                <Col>
                    <Row id='nav'>
                        <Col>
                            <Nav 
                                fill
                                variant="tabs"
                                defaultActiveKey={ imprintObjects[ 0 ].name }
                                onSelect={ selectedKey => { 
                                    console.log( selectedKey ); 
                                    setBackgroundImprintOrLogo( selectedKey );
                                }}
                                style={{fontSize : '.8rem'}}>

                                {
                                imprintObjects
                                && typeof imprintObjects !== 'undefined'
                                &&
                                imprintObjects.map((iob,iobIdx)=>{
                                    return (
                                    <Nav.Item
                                        key={ iobIdx + 'imprintObjectOptionsArea' }
                                        size={ 'sm' }
                                        >
                                        <Nav.Link
                                            size={ 'sm' }
                                            eventKey={ iob.name }
                                            style={{
                                                fontWeight : 600 ,
                                                fontSize : '.95rem' ,
                                                letterSpacing : '.07rem' ,
                                            }}
                                            >
                                            { 'Logo' + ' ' + iob.name.replace( 'logo' , '' ) }
                                        </Nav.Link>
                                    </Nav.Item>)})}
      

                            { !/PORTAL\/VIRTUALS\/COMMO/i.test( svgContBackgroundImage ) &&
                                <Nav.Item >
                                    <Nav.Link 
                                        eventKey='background'
                                        style={{
                                            fontWeight : 600 ,
                                            fontSize : '.95rem' ,
                                            letterSpacing : '.07rem' ,
                                        }}
                                          >
                                        {'Background'}
                                    </Nav.Link>
                                </Nav.Item>}
                            </Nav>
                        </Col>
                    </Row>

                    {
                    backgroundImprintOrLogo === 'background'
                    &&
                    <Row
                        id='backgroundOptions'
                        className='justify-content-center'
                        style={{ 
                            alignItems      : 'center'  ,
                            justifyContent  : 'center'  ,
                        }}
                        >

                        <Col
                            xs={ 12 } 
                            md={ penkirksBucket && Array.isArray( penkirksBucket ) && penkirksBucket.length > 1 ? 6 : 12 }
                            id='backgroundOnOff'
                            style={{alignSelf : 'end'}}
                            >
                            <TitleRow title='Background' />
                            <Row
                                className='justify-content-center'
                                style={{ 
                                    alignItems      : 'center'  ,
                                    justifyContent  : 'center'  ,
                                }}
                                >
                                { [
                                    { title : 'Lifestyle' , label : 'Background Image' , checked : bgChecked , handler : handleBgSelection } , 
                                    ].map( ( frm , idx ) => (
                                <Col
                                    key={ frm.title + 'keyy' }
                                    >
                                    <Form>
                                        <Form.Check 
                                            style={{
                                                fontSize    : '1.1rem'  ,
                                                fontWeight  : 600       ,
                                            }}
                                            type="switch"
                                            id="custom-switch-background-on-off"
                                            label={     frm.title   }
                                            onChange={  frm.handler }
                                            checked={   frm.checked }
                                        />
                                    </Form>
                                </Col>
                                ) ) }
                            </Row>
                        </Col>
                    </Row>
                    }
















                    {
                    /logo/i.test( backgroundImprintOrLogo )
                    &&
                    <Row
                        style={{ 
                            paddingTop      : '1rem'    ,
                            alignItems      : 'center'  ,
                            justifyContent  : 'center'  ,
                        }}
                        id='logoVersions'
                        >
                        {
                            typeof svgs !== 'undefined' 
                        && Array.isArray( svgs ) 
                        && svgs.length > 0
                        && typeof svgs[ 0 ] !== 'undefined'

                        && typeof svgsPropsArray !== 'undefined' 
                        && Array.isArray( svgsPropsArray ) 
                        && svgsPropsArray.length > 0 
                        && typeof svgsPropsArray[ 0 ] !== 'undefined'
                        &&

                        imprintObjects
                        && typeof imprintObjects !== 'undefined'
                        &&
                        
                        imprintObjects.map((ib,ibIdx)=>{
                            if ( backgroundImprintOrLogo !== ib.name ) { return null; }
                            return (
                        <Col key={ib.name+'IMPRINTOPTIONSFOROBJECT'} >
                            <Row>
                                <Col xs={6} >
                                    <Button
                                        variant='outline-secondary btn-hpg'
                                        onClick={()=>{
                                            let erotat=ib.extraRotate&&typeof ib.extraRotate!=='undefined'&&/[0-9]{1,4}/.test(ib.extraRotate)
                                            ?parseInt(ib.extraRotate)+90>359?parseInt(ib.extraRotate ) + 90 - 360:parseInt(ib.extraRotate)+90:90;
                                            ib.setExtraRotate( erotat );    
                                        }}
                                        style={navButtonStyle}
                                        >
                                        {'Rotate Logo'}
                                    </Button>
                                </Col>
                        
                                <Col xs={6} >
                                    <Button
                                        variant='outline-secondary btn-hpg'
                                        onClick={()=>{ib.setIncludeWhiteUnderlay(!ib.includeWhiteUnderlay);}}
                                        style={navButtonStyle}
                                        disabled
                                        >
                                        {'White Underlay'}
                                    </Button>
                                </Col>
                            </Row>
                        


                            <Row style={{ alignItems : 'start'}}>
                                {
                                versionsArrays.map(va=>{
                                let versionsArray=va[1];
                                let title=va[0];
                                if(svgsPropsArray.filter(f=>versionsArray.includes(f.name)).length<1){return null;};
                                return (
                                <Col xs={6} key={va[0]+'key'} >
                                    <TitleRow title={title.replace(' Versions','') } />
                                    <Row>
                                        {svgsPropsArray
                                            .filter(f=>versionsArray.includes(f.name))
                                            .map(m=>m.description)
                                            .map((a,b)=>{
                                            let handler=(event,a)=>{
                                                setBitmapOnImprintArea(false);
                                                handleSetShowVersion(event,a);
                                                ib.handleSetShowVersion(a,ibIdx,JSON.parse(JSON.stringify(ib.showVersionByKey_PLURAL)));
                                            };
                                            let currentSvg=svgsObject[a];
                                            let currSvgIndex=b;
                                        return (
                                        <Col key={b+'UnClrLVs'} xs={12} id={'ONECOLORS'+b} >
                                            { berkgroundsBucket.length > 0 
                                            && svgsPropsArray 
                                            && svgs 
                                            && svgs.length > 0
                                            && currentSvg
                                            && currentSvg.grps
                                            && Array.isArray( currentSvg.grps )
                                            &&
                                            <Row style={{justifyContent : 'center'}} >
                                                <Col
                                                    style={{ 
                                                        fontSize    : '.9rem'   ,
                                                        maxHeight   : '45px'    ,
                                                        cursor      : 'pointer' ,
                                                    }}
                                                    key={b.toString()}
                                                    onClick={(e)=>{handler(e,a);}}
                                                    >
                                                        { currentSvg && typeof currentSvg !== 'undefined' &&
                                                    <RenderSvgElement
                                                        currentSvg={            currentSvg }
                                                        currSvgIndex={          currSvgIndex }
                                                        isZoomed={              false }
                                                        renderedSvgRef={        renderedSvg }
                                                        cursorStyleFromAbove={  { cursor : 'default' }}
                                                        pathOnClickFromAbove={  ( ) => { console.log( b ) }}
                                                        svgStyleFromAbove={     logoVersionStyle }
                                                    />
                                                }
                                                </Col>
                                            </Row> }
                                        </Col> )
                                        } ) }
                                    </Row>


                                    <Row>
                                        <Col>
                                            {/* { !showCustomOneColor &&
                                            title === 'One Color Versions'
                                            &&
                                            <div onClick={()=>{if (!customOneColor){setShowCustomOneColor(true);}}} >
                                                <br />
                                                { '+' }
                                                <br />
                                            </div>
                                            } */}
                                            {/* { showCustomOneColor
                                            &&
                                            title === 'One Color Versions'
                                            &&
                                            <PeterPicker
                                                selectedColor={customOneColor}
                                                handlePaintBrushClick={c=>{
                                                            console.log(c);
                                                            setCustomOneColor(c);
                                                            handleSetShowVersion('i','One Color Custom')
                                                            ib.setPatternOn( false );
                                                        }}
                                                selectedFromAbove={ !ib.patternOn && colorsForMask.filter( clr => clr === setMaskBackgroundColor_PLURAL[ ibIdx ] ).length === 0 }
                                            /> } */}
                                        </Col>
                                    </Row>
                                </Col>)})}
                            </Row>
                            <Row
                        id='imprintOptions'
                        >
                        {
                        svgMaskForProductImage
                        && typeof svgMaskForProductImage !== 'undefined'
                        &&
                        <Col xs={12} >
                            <TitleRow title='Imprint Area' />
                            <Row id='designsOptions'>
                                <Col>
                                </Col>
                            </Row>
                        </Col>
                        }







           {fullColorBitmaps && typeof fullColorBitmaps !== "undefined" &&
                          <Col id={"fullColorRow"} xs={12}>
                            <>
                              <h5>{"Full Color"}</h5>
                              {fullColorBitmaps && (
                                <img
                                  style={{cursor: "pointer"}}
                                  onClick={()=>{
                                    setBitmapOnImprintArea(true);
                                    ib.handleSetMaskBackgroundColor_PLURAL('#ffffff',ibIdx);
                                  }}
                                  src={fullColorBitmaps[0]}
                                  height={60}
                                />
                              )}
                              <br />
                              <br />
                              </>
                              </Col>}






                        {
                        svgMaskForProductImage 
                        && typeof svgMaskForProductImage !== 'undefined'
                        &&
                        <Col id={'colorsRow'} xs={12} >
                            <>
                            {fullColorBitmaps && typeof fullColorBitmaps !== "undefined" &&<h4>{"Vectorized"}</h4>}
                                {  penkirksBucket 
                                && Array.isArray(penkirksBucket) 
                                && penkirksBucket.length>0
                                &&
                                <div style={{height:colorCirclesHeight}} >
                                    {colorsForMask &&
                                    colorsForMask.map(clr=>{
                                        let slctd=clr===maskBackgroundColor;
                                        return(
                                    <svg
                                        style={{cursor : 'pointer'}}
                                        key={clr.toString( ) + 'keyClr' }
                                        onClick={()=>{
                                            if (bitmapOnImprintArea){setBitmapOnImprintArea(false);}
                                            if(designOn){setDesignOn(false);};
                                            if (ib.patternOn){ib.setPatternOn(false,ibIdx);};
                                            ib.handleSetMaskBackgroundColor_PLURAL(clr,ibIdx);
                                        }}
                                        height={ slctd ? '35' : '30' } 
                                        width= { slctd ? '35' : '30' }
                                        >
                                        <circle 
                                            cx={ slctd ? '18' : '15' }
                                            cy={ slctd ? '18' : '15' }
                                            r ={ slctd ? '15' : '13' }
                                            stroke={ clr === maskBackgroundColor ? clr : "black" } 
                                            strokeWidth={ clr === maskBackgroundColor ? '3' :'2' }
                                            fill={ clr }
                                        />
                                    </svg>)
                                    })}

                                    {svgs&&svgs[0] 
                                    &&  typeof svgs.filter( f => f.nm === 'SP1W' )[ 0 ] !== 'undefined'
                                    &&  typeof svgs.filter( f => f.nm === 'SP1W2' )[ 0 ] !== 'undefined'
                                    &&
                                        patternsArray
                                    .map(pat=>{
                                        return(
                                    <svg
                                        key={pat.patternOnVal+'keyClr'}
                                        onClick={()=>{
                                            setBitmapOnImprintArea(false);
                                            setDesignOn( false );
                                            ib.setPatternOn( pat.patternOnVal.toString( ) , ibIdx );
                                        }}
                                        height={ ib.patternOn ? '35' : '30' } 
                                        width= { ib.patternOn ? '35' : '30' }
                                        >
                                        <circle 
                                            cx={ ib.patternOn ? '18' : '15' }
                                            cy={ ib.patternOn ? '18' : '15' }
                                            r= { ib.patternOn ? '15' : '13' }
                                            stroke="black" 
                                            strokeWidth={ ib.patternOn ? '3' : '2' }
                                            fill={ pat.circleFill[ 0 ] === '#' ? pat.circleFill : '#' + pat.circleFill }
                                        />
                                        <text
                                            x={ '50%' }
                                            y={ '75%' }
                                            strokeWidth={ ib.patternOn ? '3px' : '2px' }
                                            textAnchor={ 'middle' }
                                            fill={ pat.textFill }
                                            stroke={ '#000' }
                                            >
                                            P
                                            </text>
                                    </svg>)})}

                                    {/* <PeterPicker
                                        selectedColor={maskBackgroundColor}
                                        handlePaintBrushClick={c=>{
                                            console.log(c);
                                            // setMaskBackgroundColor( c );
                                            ib.setMaskBackgroundColor_PLURAL(c,ibIdx);
                                            ib.setPatternOn(false);
                                            // setDesignOn( false );
                                        }}
                                        selectedFromAbove={!ib.patternOn && colorsForMask.filter( clr => clr === setMaskBackgroundColor_PLURAL[ ibIdx ] ).length === 0 }
                                    /> */}
                                </div>
                            }
                            </>
                        </Col>
                        }

                    </Row>







                        </Col>

                        ) } )

                        }

                    </Row> 
                    }
                    {/*     this is end of the row which comprises the theird 
                            tab (logos) of nav system for this subpage          */}



{/* 
                    <Row
                        style={{ 
                            position : 'absolute' ,
                            bottom : '0px' ,
                        }}
                        className={ 'justify-content-around' } 
                        >
                        <Col>
                            { downloadButton }
                        </Col>
                    </Row> */}



        </Col>
    </Row>
    )
};