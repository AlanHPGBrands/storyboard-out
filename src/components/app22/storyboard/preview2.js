import React , {useState} from 'react';
import {Row,Col} from 'react-bootstrap';
import FormDialog from './formdialog';
import Button from '@mui/material/Button';
import {nameStoryboard} from './graphQlStuffs';
import Alert from '@mui/material/Alert';
import CheckboxWithLabel from './checkboxwithlabel';
import BoxNaming from './textinputboxnaming';

export default function PreviewPage({storyMade,width}){
    const [namedItStory,setNamedItStory]=useState(null);
    const [storyUpdated,setStoryUpdated]=useState(false);
    const [optionsState,setOptionsState]=useState({
        showPrices: false,
        showMoq:    false,
        showEmail:  false,
        showName:   false,
        useCAD:     false,
    });

    async function handleNameStoryboard(storyBoardName){
        console.log(storyBoardName);
        let storyData={
            name:storyBoardName,
            id: storyMade.id,
        };
        let namedIt = await nameStoryboard(storyData);
        if (namedIt&&typeof namedIt!=='undefined'&&namedIt.name){
            setNamedItStory(namedIt.name);
        };
    };

    async function handleUpdateStoryOptions(storyboardOption){
        let previousOption=optionsState[storyboardOption];
        setOptionsState({...optionsState,[storyboardOption]:!previousOption});

        let storyData={
            [storyboardOption]:!previousOption,
            id: storyMade.id,
        };
        let makeUpdate = await nameStoryboard(storyData);
        console.log(makeUpdate);
        if (makeUpdate&&typeof makeUpdate!=='undefined'){setStoryUpdated(makeUpdate);};
    };

    const showNameDisabled=!(namedItStory&&typeof namedItStory==='string'&&namedItStory.length>0)?true:false;
    const showCanPricDisabled=!(storyUpdated&&typeof storyUpdated['showPrices']!=='undefined'&&storyUpdated['showPrices'])?true:false;

    const checkboxOptions= [
        {disabled:showNameDisabled,label:'Show Storyboard Name',  handler:()=>handleUpdateStoryOptions('showName'),   checked:optionsState['showName']    },
        {label:'Show Email',            handler:()=>handleUpdateStoryOptions('showEmail'),  checked:optionsState['showEmail']   },
        {label:'Show MOQ',              handler:()=>handleUpdateStoryOptions('showMoq'),    checked:optionsState['showMoq']     },
        {label:'Show Pricing',          handler:()=>handleUpdateStoryOptions('showPrices'), checked:optionsState['showPrices']  },
    ];
    // if (/ohcanada/i.test(window.location.search)) {
        checkboxOptions.push({
            disabled:showCanPricDisabled,
            label:'Use $CAD (*only products with fixed Canadian pricing will show)',
            handler:()=>handleUpdateStoryOptions('useCAD'),
            checked:optionsState['useCAD']
        })
    // };

    return(
    <div style={{minWidth:'350px',width:typeof width!=='undefined'?width:undefined,zIndex:1700,}}>

        <Row className={'justify-content-stretch'}>

            <Col xs={12}>
                <BoxNaming currentName={namedItStory} styleProps={{width:300}} handler={handleNameStoryboard} />
            </Col>

            <Col xs={12} >
                    {[
                   checkboxOptions.map(m=><CheckboxWithLabel key={'checkbox_'+m.label.substring(m.label.length-4)} {...m} />),
                    ].map((m,mIdx,ara)=><Row key={'prev'+mIdx} sm={Math.ceil(12/ara.length)} ><Col>{m}</Col></Row>)}
        
                <Row>
                    <Col xs={12} style={{paddingBottom:'1rem',}}>
                        <Button variant="outlined" sx={{color:'#4700b3',padding:'20px 35px',}}>
                            <a style={{color:'#4700b3'}} target={'_blank'} href={'./?story='+storyMade.id} >
                                VIEW STORYBOARD
                            </a>
                        </Button> 
                    </Col>
                </Row>
            </Col>
            
            {namedItStory&&<Alert xs={{position:'absolute',textAlign:'center'}} severity="success" >
                <div style={{maxWidth:'90vw',}} >
                    {'Name saved.'}
                </div>
            </Alert>}
            {storyUpdated&&<Alert xs={{position:'absolute',textAlign:'center'}} severity="success">
                <div style={{maxWidth:'90vw'}}>
                    {'Story Updated : '+(Object.keys(storyUpdated).filter(m=>(/pric|moq|showemail|name/i.test(m)&&storyUpdated[m])).map(m=>'Show ' + m.toUpperCase().replace('SHOW','')).join(', '))+'.'}
                </div>
            </Alert>}
        </Row>
    </div>
    );
};