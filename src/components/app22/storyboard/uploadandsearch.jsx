import React,{useState} from 'react';
import {Row,Col,Nav,Form} from 'react-bootstrap';
import Searchy2 from '../../searchy2';
import Uploader from './uploaderSimple';
import CatInput from './catinput';
import RenderSvgElement from '../../rendersvgelement';

const initialSearchOrUpload = 'upload';

export default function UploadAndSearch(props){
    const {email,termsAccepted,setTermsAccepted,setCurrentResultId,svgs,qBuk,totalProcessingTime,setTotalProcessingTime,handleFileSelection,setShowCloseButton}=props;
    const [imageIsProcessing,setImageIsProcessing]=useState(false);
    const steps=[true,false];
    const [searchOrUpload,setSearchOrUpload]=useState(initialSearchOrUpload);
    const [details,setDetails]=useState({email:email,imageys:[]});
    function setInput(k,v){setDetails({...details,[k]:v})}
    const [showTerms,setShowTerms]=useState(false);
    function handleProcessed(a){
        setTotalProcessingTime(a);
        setCurrentResultId(a);
        if (typeof setShowCloseButton!=='undefined'){
            setShowCloseButton(true);
        };
    };

    return(<>
    {steps[0]&&
    <Row>
        <Col>
            <Row style={{ marginTop : '.75rem'}}>
                <Col style={{fontSize:'.9rem',fontWeight:500}}>
                    <Form 
                        style={{display:'inline-block'}}>
                        <Form.Check
                            checked={termsAccepted}
                            type="switch"
                            id="story-switch-termsUrksapted"
                            label=""
                            onChange={()=>{
                                setShowTerms(false);
                                setTermsAccepted(!termsAccepted);
                            }}
                        />
                    </Form>
                <span onClick={()=>{setShowTerms(!showTerms);}}>
                    {'I agree to HPG\'s '}
                    <span
                        style={{fontWeight:600,color:'#4700b3',cursor:'pointer'}}
                        onClick={()=>{setShowTerms(!showTerms)}}
                        >
                        {' terms and conditions'}
                    </span>
                </span>
                </Col>
            </Row>


                <Nav 
                    fill variant="tabs" defaultActiveKey={initialSearchOrUpload}
                    onSelect={selectedKey=>{setSearchOrUpload(selectedKey)}}
                    style={{fontSize:'.8rem'}}>
                    <Nav.Item>
                        <Nav.Link disabled={!termsAccepted} eventKey='search'>
                            {'Search'}
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item size={'sm'}>
                        <Nav.Link size={'sm'} disabled={!termsAccepted} eventKey="upload">
                            {'Upload'}
                        </Nav.Link>
                    </Nav.Item>
                    
                </Nav>




            { 
            searchOrUpload === 'search' 
            &&
            <Row
                style={ {
                    color           : 'white' ,
                    backgroundColor : 'black' ,
                    marginTop       : '1rem' ,
                } }
                >
                <Searchy2
                    containerStyleFromAbove={{fontFamily:'Open Sans',paddingBottom:'.25rem',backgroundColor:'#f9f9f9'}}
                    handleSelection={           setInput }
                    imageSubset={               'imageys' }
                    includeLoadingImage={       'true' }
                    labelStyleFromAbove={       { fontSize : '1rem' , display : 'none' } }
                    placeHolderFromAbove={      'Logo Search' }
                    previewAllowedFromAbove={   false }
                    setCurrentResultId={        setCurrentResultId }
                    xsFromAbove={               10 }
                    xsFromAbove={               12 }
                />
            </Row>
            }


            {details.imageys.length>0&&
                <Col>
                    <CatInput 
                        details={details}
                        subset={'imageys'}
                        setInput={setInput}
                        predictions={['pred']}
                        imageIsProcessing={imageIsProcessing}
                    />
                </Col> }



        <Row>
            <Col
             style={{marginTop:'1rem'}}>
                {searchOrUpload === 'upload' &&
                <Row>
                    <Col>
                        <Row>
                            <Uploader
                                details={details}
                                setImageIsProcessing={setImageIsProcessing }
                                imageIsProcessing={imageIsProcessing }
                                totalProcessingTime={totalProcessingTime}
                                setTotalProcessingTime={()=>{console.log('baba');}}
                                qBuk={qBuk}
                                termsAccepted={termsAccepted}
                                setCurrentResultId={handleProcessed}
                                handleFileSelection={handleFileSelection}
                                setInput={setInput}
                                extraHandler={(a)=>{setInput('imageys',a)}}
                            />
                        </Row>

                        <Row>
                        {imageIsProcessing && !totalProcessingTime &&
                            <Col>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{margin:'auto',display:'block',shapeRendering:'auto',}}
                                    width="80px" height="80px"
                                    viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx="84" cy="50" r="10" fill="#3be8b0">
                                        <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                                        <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#3be8b0;#ffb900;#4700b3;#1aafd0;#3be8b0" begin="0s"></animate>
                                    </circle><circle cx="16" cy="50" r="10" fill="#3be8b0">
                                    <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                                    </circle><circle cx="50" cy="50" r="10" fill="#1aafd0">
                                    <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                                    </circle><circle cx="84" cy="50" r="10" fill="#4700b3">
                                    <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                                    </circle><circle cx="16" cy="50" r="10" fill="#ffb900">
                                    <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                                    <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                                    </circle>
                                </svg>
                            </Col>}
                        </Row>
                    </Col>
                </Row>
                }
            </Col>
        </Row>




            {svgs
                && typeof svgs !== 'undefined'
                && svgs[ 0 ]
                && typeof svgs[ 0 ] !== 'undefined'
                && typeof svgs[ 0 ].grps !== 'undefined'
                && typeof svgs[ 0 ].vb !== 'undefined'
                && Array.isArray( svgs[ 0 ].grps )
                &&
            <Row
                >
                <Col
                    >
                    <Row
                        >
                        <Col
                            >
                            <RenderSvgElement
                                currentSvg={svgs[0]}
                                svgStyleFromAbove={{width:'80',height:'80'}}
                            />
                        </Col>
                    </Row>

                    <Row
                        >
                        <Col style={{fontSize:'.8rem',fontWeight:600,marginBottom:'70px'}}>
                            {'current logo'}
                        </Col>
                    </Row>
                </Col>
            </Row>
            }

        
            </Col>
        </Row>
        }
        </>)
    };