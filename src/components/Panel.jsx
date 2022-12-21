import React,{useEffect,useState,useRef,Suspense} from 'react';
import Storage                  from '@aws-amplify/storage';
import { v4 as uuidv4 }         from 'uuid';
import Row                      from 'react-bootstrap/Row';
import Col                      from 'react-bootstrap/Col';
import {mkFilename,rando}       from './lib/helpers';
import {updateEarly2}           from '../config/constantes';
import searchin                 from './pics/comps/searching.gif';
import {coversCatalogProduction}        from './catalogs/coversImports';
import {storeEarlyImage,dbEarly}from '../utils/earlies';
import {createProIdEmail,createInkLogo} from './dynamoActionsMutations.js';
const ContentUpdatePage=React.lazy(() => import('./catalogs/updateContentPage'));
let VirtualsIframe =React.lazy(() => import('./_VIRTIFRAMEBINLEGACY'));
const Catalogs = React.lazy(() => import('./catalogs'));
const Ids = React.lazy(() => import('./ids'));
const App22 = React.lazy(() => import('./app22/app22'));
const MaintenancePage = React.lazy(() => import('./maintenancepage/maintenancepage'));
const TESTINGurl_virt='7501825724';
const TESTINGurl_item='310';
const TESTINGurl_rid='9337020397';
const TESTINGurl_storyBoard=true;
const TESTINGurl_storyMain=true;
const TASTYMCTESTERS = /testtesttest/i.test(window.location.search);



const queueBucket='STARTS/QUEUE/Q117/';
const currentTee=100;
const inkBucket='STARTS/QUEUE/T'+currentTee.toString()+'/';
// would be from 96 0 102
const listBuckets={'QUEUE/T':{range:[currentTee-4,currentTee+2]}};
const queryListForIds=[['inkLogoByResultId','result_id']];
const initDetails ={email:'',fullname:'',phone:'',imageys:[],businessLogos:[],imgInputs:[],imgPredictions:[],showy:1};
const regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const cobos=/privates/i.test(window.location.search)?[...coversCatalogProduction,]:coversCatalogProduction;
const allCobos4IdResultsPage=cobos;
const brandCoversObjectForIdResultsPage={},initAllBrands={};
allCobos4IdResultsPage.forEach(cc=>brandCoversObjectForIdResultsPage[cc[0]]=cc);
cobos.forEach(brandArray=>initAllBrands[brandArray[0]]=false);
const mutantStrings =['createProIdEmail','createInkTestLogo','createNamedLogo','createInkLogo',updateEarly2,'createNamed']

export default function Panel(props) {
    const {
        CATS        ,
        CATSHIDDEN  ,
        svgy        ,
        url_item    ,
        url_rid     ,
        url_virt    ,
        url_storyBoard,
        url_storyMain,
    } = props.whereVars;
    const [ isThinking      , setIsThinking     ] = useState(false);
    const [ details         , setDetails        ] = useState(initDetails);
    const [ allSubmitted    , setAllSubmitted   ] = useState(false);
    const [ allBrands       , setAllBrands      ] = useState(initAllBrands);
    const [ catChecked      , setCatChecked     ] = useState(false);
    const [ qBuk            , setQBuk           ] = useState(queueBucket);
    const [ iQBuk           , setIQBuk          ] = useState(inkBucket);
    const [ linkIds         , setLinkIds        ] = useState([]);
    const [ tubMission      , setTubMission     ] = useState('');
    const submissions=useRef(0);

    useEffect(()=>{
        let aCatalogIsSelected = false;
        Object.keys(allBrands).forEach(a=>{if(allBrands[a]){aCatalogIsSelected = true;};});
        setCatChecked(aCatalogIsSelected);
    },[allBrands]);

    useEffect(()=>{
        /* FOR MANAGABLE BUCKET OPERATIONS, EACH FOLDER SHOULD CONTAIN NO MORE
        THAN 500 ITEMS */
        const maxItems = 200;
        function findFirstAvailable(bktPrefix){
            console.log('bktPrefix', bktPrefix)
            return new Promise(resolve=>{
                Storage.list(bktPrefix)
                .then(itemsArray=>{
                    console.log('itemsArray', itemsArray)
                    let nextNumBuk=bktPrefix.replace(/([0-9]+)/,parseInt(bktPrefix.match(/([0-9]+)/)[1])+1).toString();
                    console.log('nextNumBuk',nextNumBuk)
                    if (itemsArray.length<maxItems){return resolve( bktPrefix );
                    } else {
                        console.log(('CREATES NEW FILE!', 'old is: ' , bktPrefix))
                        /* INCREMENT FOLDER NAME AND RECURSE */
                        let nextNumBuk=bktPrefix.replace(/([0-9]+)/,parseInt(bktPrefix.match(/([0-9]+)/)[1])+1).toString();
                        return resolve(findFirstAvailable(nextNumBuk));
                    }})
                .catch(e=>console.log(e))});
        };
        async function updateBucketVersionAsyncQ( ) {
            let qFirstAvailable = await findFirstAvailable( queueBucket );
            console.log('qFirstAvailable', qFirstAvailable)
            setQBuk(qFirstAvailable);
        };
        async function updateBucketVersionAsyncT( ) {
            var iqFirstAvailable = await findFirstAvailable( inkBucket );
            console.log('iqFirstAvailable', iqFirstAvailable)
            setIQBuk(iqFirstAvailable);
        };
        if ((typeof window.location.search==='undefined'||window.location.search==='')&&!/id/i.test(window.location.search)){
            updateBucketVersionAsyncQ();
            updateBucketVersionAsyncT();
        };
    },[]);



    function setInput(key,val){
        if (key==='imageys'&&details.imageys.length!== 0){setDetails({...details,imageys:[]})};
        setDetails({...details,[key]:val});
    };


   
    const interimId = useRef();
    const [earlyStuffs,setEarlyStuffs]=useState([]);
    async function setEarlyImg(a,b){
        /* UPLOAD IMAGE TO S3 BUCKET AND CREATE A DATABASE ENTRY */
        let gs = b.map(c=>{
            if(typeof c.id==='undefined'){c['id']= rando();};
            if(typeof c.gqlId==='undefined'){c['gqlId']= uuidv4();};
            return c;
        });
        let imgsPre=gs.map(async c=>{
            let prpz={
                name        : 'a'       ,
                fullname    : 'abc'     ,
                resultid    : c.id      ,
                brand       : 'brnd'    ,
                image       : c.name    ,
                phone       : ''        ,
                gqlId       : c.gqlId   ,
            };
            let fnn =       mkFilename(prpz).filename;
            let berkUrl =   await storeEarlyImage(c,fnn,qBuk);
            return ({...c,bucket_url : berkUrl});});
        interimId.current = gs[0].id;
        let imgs =          await Promise.all(imgsPre);
        let islogtin =      'notLoggedIn';
        let dbImgs =        await Promise.all( imgs.map( async c => await dbEarly( c , islogtin ) ) );
        setEarlyStuffs(     dbImgs );
    };



    function handleSwitchClick(event){
        let bub =JSON.parse(JSON.stringify(allBrands));
        setAllBrands({...bub,[event.target.name]:!allBrands[event.target.name]})
    };

        
    async function addLogo(argumentes) {
        const {
            fromPage,
            imageObject,
            email,
            resultId,
            trueFalse,
            data,
            logoName,
            brandsString,
            iQBuk,
            qBuk,
        } = argumentes;
        let forNamingFile =     { 
                    ...data                         , 
                    brand       : fromPage          , 
                    image       : imageObject.name  , 
                    name        : imageObject.name  , 
                    resultid    : resultId          };
        const uid =             uuidv4( );
        const madeFn =          mkFilename( forNamingFile , trueFalse );
        const madeFnNameInput = madeFn.proppers.validFullname;
        const madeFnPhone =     madeFn.proppers.p;
        const madeFnOrigFn =    madeFn.proppers.validName;
        let whichBucket =       iQBuk;
        let gennyFromBlock =    whichBucket + madeFn.filename;
        let queueBucketKey =    qBuk        + madeFn.filename;
        let result ,            queue_res;   
        try { result =          await Storage.put( gennyFromBlock , imageObject ); console.log( result );   } catch ( e ) { console.log( e ); };
        try { queue_res =       await Storage.put( queueBucketKey , imageObject ); console.log( queue_res ) } catch ( e ) { console.log( e ); };
        let a = createProIdEmail(mutantStrings[0],email,resultId);
        let d = createInkLogo(              mutantStrings[3],
                                            uid             ,
                                            email           ,
                                            madeFnNameInput ,
                                            resultId        ,
                                            'fromPanel'     ,
                                            brandsString    ,
                                            madeFnPhone     ,
                                            madeFnOrigFn    ,
                                            result.key      ,
                                            logoName        ,
                                        );
        Promise.all([a,d])
        .then(response => {
            submissions.current = submissions.current + 1;
            let string0=typeof submissions.current!=='undefined'?submissions.current+' of ':'';
            let string1=typeof details.imageys!=='undefined'&&Array.isArray(details.imageys)?details.imageys.length:'';
            setTubMission(string0+string1+'  '+Math.random());
        })
        .catch(e=>console.log('shoot dummy, somethin rong'));
    };




    useEffect(()=>{
        if (typeof submissions!=='undefined'&&submissions.current){
            console.log( 'submissions.current : ' +submissions.current);
            if (submissions.current===details.imageys.length){
                setAllSubmitted(true);
                setIsThinking(false);
            };
        };
    },[tubMission]);



    function topSubmitAll(gTails) {
        setIsThinking( true );
        var idsForLinks =   [ ];
        var idsFLHelper =   [ ];
        window.scroll( {
            top     : 0         , 
            left    : 0         , 
            behavior: 'smooth'  ,
        } );
        gTails.imageys.forEach( ( imagey ,fig ) => {
            var currId =        rando( );
            var geeKyooEyeDee = typeof gTails.imageys[ fig ].gqlId !== 'undefined' 
                                    ? gTails.imageys[ fig ].gqlId: 'gqlId'; 
            if (typeof imagey.id==='undefined') { imagey.id = currId };
            var imagesInputCurrent = gTails.imgInputs[ fig ] && typeof gTails.imgInputs[ fig ] !== 'undefined' ? gTails.imgInputs[ fig ] : typeof imagey[ 'name' ] !== 'undefined' ? imagey[ 'name' ] : 'filler';
            if ( !idsFLHelper.includes( currId ) ) {
                let tempFExtn = imagey.name
                    .substring( imagey.name.lastIndexOf( '.' ) + 1 );
                let tempFName = imagey.name.substring( 0 , imagey.name.lastIndexOf( '.' ) )
                    .replace( /\./g , '' )
                    .replace( /\[/g , '' )
                    .replace( /\]/g , '' )
                    .replace( /,/g  , '' )
                    .replace( /\(/g , '' )
                    .replace( /\)/g , '' )
                    .replace( /\+/g , '' )
                    .replace( /=/g  , '' )
                    .replace( /@/g  , '' )
                    .replace( /-/g  , '' )
                    .replace( /_/g  , '' )
                    .slice( 0 , 11 )
                idsForLinks.push( {
                    id      : currId                                , 
                    orig    : tempFName                             , 
                    ext     : tempFExtn                             ,
                    img     : window.URL.createObjectURL( imagey )  ,
                    nmd     : imagesInputCurrent                    ,
                } );
                idsFLHelper.push( currId );
            };
            var brandsHeyRay=cobos.filter(c=>allBrands[c[0]]).map(c=>c[0]);
            var brandsStayRing=brandsHeyRay&&typeof brandsHeyRay!=='undefined'?JSON.stringify(brandsHeyRay):JSON.stringify(['bab','bcg','best']);
            let passAlong = {
                fromPage        : 'PANEL'               ,
                imageObject     : imagey                ,
                email           : gTails.email          ,
                resultId        : imagey.id             ,
                trueFalse       : false                 ,
                data            : gTails                ,
                logoName        : imagesInputCurrent    ,
                brandsString    : brandsStayRing        ,
                gqlId           : geeKyooEyeDee         ,
                INKY            : true                  ,
                svgy            : svgy                  ,
                iQBuk           : iQBuk                 ,
                qBuk            : qBuk                  ,
            };
            addLogo(passAlong);
        });
        setLinkIds(idsForLinks);
    };



    /* NAVIGATING TO <baseURL>/?testtesttest, in browser, will render this component, which in turn renders the main HPG customizers */
const TestAll=()=>(<>{[
    <Suspense key='test1' fallback={<div>Loading...</div>}>
        <ContentUpdatePage/>
    </Suspense>,
    
    <div key={'frag2'} style={{position:'fixed',top:'0px',left:'100vw',}}>{(TESTINGurl_virt||TESTINGurl_item||true) &&
            <Suspense  key='test2' fallback={<div>Loading...</div>}>
                <VirtualsIframe allBrands={allBrands} cobos={cobos} details={details} 
                handleSwitchClick={handleSwitchClick} qBuk={qBuk} 
                url_virt={typeof TESTINGurl_virt!=='undefined'?TESTINGurl_virt:false} 
                url_item={typeof TESTINGurl_item!=='undefined'?TESTINGurl_item:false} />
            </Suspense>
         }
        </div>,
    
    <div key={'frag3'} >{(TESTINGurl_rid ||true) && <Suspense key='test3' fallback={<div>Loading...</div>}>
            <Ids queryListForIds={queryListForIds} searchin={searchin} DEV={false} 
            listBuckets={listBuckets}
            idFromUrl={TESTINGurl_rid}  brandCoversOjet={brandCoversObjectForIdResultsPage}
            />
        </Suspense>}
        </div>,
    
    <div key={'frag4'} >
        {
            <Suspense  key='test4' fallback={<div>Loading...</div>}>
                <Catalogs setEarlyImg={setEarlyImg} setInput={setInput} allSubmitted={allSubmitted}  
                details={details} allBrands={allBrands} cobos={cobos} regEmail={regEmail}  
                handleSwitchClick={handleSwitchClick} catChecked={catChecked}  topSubmitAll={topSubmitAll} 
                linkIds={linkIds} tubMission={tubMission}
                />
            </Suspense>
        }</div>,
    
    <div key={'frag5'} >{(TESTINGurl_storyBoard||TESTINGurl_storyMain)||true &&
            <Suspense key='test5' fallback={<div>Loading...</div>}>
                <App22 iQBuk={iQBuk} qBuk={qBuk} />
            </Suspense>}
            </div>
    ].map((m,mIdx,mArray)=><div key={'testmap'+mIdx} style={{
        backgroundColor:`rgb(${mIdx*(360/(mArray.length+1))},100, 100`}}>{m}</div>)
}
</>);








    return (
        <Row className='panelClass' style={{backgroundColor:'inherit',minHeight:'1px',overflow:'hidden'}}>
            <Col>

            {/maintenancepage/i.test(window.location.search)&&
            <Suspense key='test5' fallback={<div>Loading...</div>}>
                <MaintenancePage />
            </Suspense>}

            {/INTHeJUNGLeTHeMIGHTYJUNGLe/.test(window.location.search)&&
             <Suspense fallback={<div>Loading...</div>}><ContentUpdatePage/></Suspense>}

            {/testtesttest/.test(window.location.search)&&
             <Suspense fallback={<div>Loading...</div>}><TestAll/></Suspense>}

                {
                ((url_virt||url_item)&&!TASTYMCTESTERS)
                &&
                <Row>
                    <Suspense fallback={<div>Loading...</div>}>
                        <VirtualsIframe
                            allBrands={allBrands}
                            cobos={cobos}
                            details={details}
                            handleSwitchClick={handleSwitchClick}
                            qBuk={qBuk}
                            url_virt={url_virt}
                            url_item={typeof url_item!=='undefined'?url_item:false}
                        />
                    </Suspense>
                </Row> }


                {url_rid
                &&
                <Suspense fallback={<div>Loading...</div>}>
                    <Ids 
                        queryListForIds={queryListForIds}
                        searchin={searchin}
                        DEV={false}
                        listBuckets={listBuckets}
                        idFromUrl={url_rid} 
                        brandCoversOjet={brandCoversObjectForIdResultsPage}
                    />
                </Suspense>}


                {(CATS||true)
                    && !CATSHIDDEN 
                    && !svgy  
                    && !url_virt
                    && (typeof window.location.search==='undefined'||window.location.search===''
                            || /privates/i.test(window.location.search)
                        )
                &&
                <Row>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Catalogs
                            setEarlyImg={setEarlyImg}
                            setInput={setInput}
                            allSubmitted={allSubmitted} 
                            details={details}
                            allBrands={allBrands} 
                            cobos={cobos}
                            regEmail={regEmail} 
                            handleSwitchClick={handleSwitchClick}
                            catChecked={catChecked} 
                            topSubmitAll={topSubmitAll}
                            linkIds={linkIds}
                            tubMission={tubMission}
                        />
                    </Suspense>
                </Row>}



                {(url_storyBoard||url_storyMain)&&
                    <Suspense fallback={<div>Loading...</div>}>
                        <App22 qBuk={qBuk} />
                    </Suspense>}

            </Col>
        </Row>
    );
};