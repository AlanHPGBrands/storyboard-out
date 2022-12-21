import React,{useState,useEffect,Suspense} from 'react';
import './static/storyboard.css';
import Splash from './splash';
import {getAndMakeInitial} from './svgFetchMake';
const StoryboardResultsPage=React.lazy(()=>import('./results'));
const Products = React.lazy(()=>import('./products2'));

const RESULTS_PAGE=/story=([a-zA-Z0-9-]{20,40})/.test(window.location.search)?window.location.search.match(/story=([a-zA-Z0-9-]{20,40})/)[1]:false;
const logoIdFromUrl=/lg=([0-9]{7,14})/.test(window.location.search)?window.location.search.match(/lg=([0-9]{7,14})/)[1]:false;
let appStyle={fontFamily:'Poppins'};

const Home=props=>(<div style={appStyle}>{props.children}</div>);

export default function Storyboard(props){
    const {qBuk}=props;
    const [storyUser,setStoryUser]=useState(null);
    const [currentResultId,setCurrentResultId]=useState(null);
    const [showCreateStoryButton,setShowCreateStoryButton]=useState(false);
    const [svgs,setSvgs]=useState(null);
    const [distributorLogoId,setDistributorLogoId]=useState(false);
    const [showDistributorInputs,setShowDistributorInputs]=useState(false);

    useEffect(()=>{
        console.log('distribrLGOO change');
        async function makeDistributorSvg(logo_id){
            let forGetAndMake = {
                id: logo_id,
                setErrorMessage:(a)=>{console.log(a);},
                setCurrentResultId:(a)=>{console.log(a);},
                setSvgPatternForFlyer_PLURAL:(a)=>{console.log(a);},
                setSvgs:(a)=>{console.log(a);},
                setSvgsPropsArray:(a)=>{console.log(a);},
            };
            let {svgs} = await getAndMakeInitial(forGetAndMake);
            let setterObject=JSON.parse(JSON.stringify(storyUser));
            setterObject['distributor_svg']=svgs[0];
            setStoryUser(setterObject);
            setShowDistributorInputs(false);
        };
        if (distributorLogoId&&typeof distributorLogoId!=='undefined'){
            makeDistributorSvg(distributorLogoId);
        };
    },[distributorLogoId]);


    useEffect(()=>{if(logoIdFromUrl&&typeof logoIdFromUrl!=='undefined'){setCurrentResultId(logoIdFromUrl);}},[]);
    useEffect(()=>{window.document.title='STORYBOARD+';},[]);
    
    useEffect(()=>{
        async function abc(logo_id){
            let forGetAndMake = {
                id: logo_id,
                setErrorMessage:(a)=>{console.log(a);},
                setCurrentResultId:(a)=>{console.log(a);},
                setSvgPatternForFlyer_PLURAL:(a)=>{console.log(a);},
                setSvgs:(a)=>{console.log(a);},
                setSvgsPropsArray:(a)=>{console.log(a);},
            };
            let {svgs} = await getAndMakeInitial(forGetAndMake);
            setSvgs(svgs);
            setShowCreateStoryButton(true);
        };
        if (currentResultId&&typeof currentResultId!=='undefined'){
            abc(currentResultId);
        };
    },[currentResultId]);

    return(<Home>
        {RESULTS_PAGE
        ?
        <Suspense fallback={<div>Loading...</div>}>
            <StoryboardResultsPage
                RESULTS_PAGE={RESULTS_PAGE}
                setStoryUser={setStoryUser} 
                storyUser={storyUser} 
                svgs={svgs} 
                setCurrentResultId={setCurrentResultId}
                currentResultId={currentResultId}
                distributorLogoId={distributorLogoId}
                setDistributorLogoId={setDistributorLogoId}
                showDistributorInputs={showDistributorInputs}
                setShowDistributorInputs={setShowDistributorInputs}
            />
        </Suspense>
        :
        <Suspense fallback={<div>Loading...</div>}>
            <Splash setStoryUser={setStoryUser} >
                <Products
                    qBuk={qBuk}
                    setStoryUser={setStoryUser}
                    storyUser={storyUser}
                    svgs={svgs}
                    setCurrentResultId={setCurrentResultId}
                    currentResultId={currentResultId}
                    showCreateStoryButton={showCreateStoryButton}
                    distributorLogoId={distributorLogoId}
                    showDistributorInputs={showDistributorInputs}
                    setShowDistributorInputs={setShowDistributorInputs}
                    setDistributorLogoId={setDistributorLogoId}   />
            </Splash >
        </Suspense>}
    </Home>);
};
