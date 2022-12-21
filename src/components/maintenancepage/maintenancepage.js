import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { benTodos } from './benTodos';
import { chapters } from './chapters';
import CardForMaintenancePage from './cardForMaintenancePage';

const ok=ob=>(typeof ob === 'string' ? ob
    :Array.isArray(ob)?ob.map(m=><span style={{backgroundColor:'yellow'}}>{ok(m)}<br /></span>)
    :Object.keys(ob).filter(f=>f!=='type').map(m=><span style={{backgroundColor:'antiquewhite',padding:'.5rem',}}>{m}<br/>{ok(ob[m])}</span>));

const procedures=[
    {
        title: 'Updating API Key for AppSync',
        steps: [
            'Required: AWS Amplify is setup and publishes/pushes working',
            'Open frontend code',
            'Navigate to amplify/backend/api/parameters.json',
            'add CreateAPIKey : 0 (this deletes current)',
            'run amplify publish -y',
            'once published, change previous line to CreateAPIKey : 1',
            'run amplify publish -y',
        ]
    },
    {
        title: '(NOTE) EMAIL NOTIFICATIONS (going to hpgcustomizers@gmail.com',
        steps:[
            'Ec2s started/stopped, on schedule',
            'Catalog sent (exact replica)',
            'Storyboard email sent (exact replica)',
            'Logo uploaded to Storyboard or Virtuals',
            'Storyboard created',
            'Daily Storyboard/Catalogs Data export',
        ],
    },
    {
        title: 'putting catalog production ec2s on a schedule' ,
        steps:[
            'instances current(03-06-2022) on a schedule: instances = ["i-058c0f58256a083a6"]',
            'create a cron pattern in AWS EventBridge',
            'add cron pattern as a trigger on the Lambda functions responsible for both starting and stopping the ec2s',
        ],
    },
    {
        title:'duplicating an ec2 instance, for catalog production scale-up',
        steps:[
            'login to AWS',
            'go to services > ec2 > instances',
            'checkbox the ec2 you want to duplicate',
            'select actions > Images and Templates > Create Image',
            'this will create an AMI which will be accessible from the left menu on ec2 service page',
            'once the image is made,',
            'go to Images > AMIs in the ec2 menu',
            'checkbox the image for which you want to launch an ec2',
            'click action button Launch Instance from Image',
            'historically, the majority of catalog production has utilized a c5.2xlarge ec2 family/generation/type',
            'in the Family dropdown filter, select c5',
            'checkbox the row containing Family:c5, Type:c5.2xlarge',
            'click Review and Launch action button',
            'on Review Instance launch page, ensure there is a 200 gb EBS volume attached',
            '(there will be if you use the image currently used to launch new catalog production instances - (ami-0b9957f88dd79f4db	ohYEA07302021) ',
            '(if ohYEA07302021 is not used, you will have to manually mount and name the EBS volume, once the instance has launched - be sure to place it in a folder with path "C:/_ROOT/vcc" , creating parent folders if necessary)',
            'click action button Launch',
        ],
    },
    {
        title:'adding (or updating a catalog) for catalogs+ production (frontend)',
        steps:[
            'open frontend code',
            'navigate to src/components/catalogs/coversImports.js',
            // 'duplicate an item in the "coversCatalogProduction" array, replacing appropriate values',
            'an item in this array has three elements itself, whose purposes are as follows:','"bab22_lb21" is the string value used to map to the actual catalog production on the backend.  the string in this example maps to /CONTENT/_BAB22/',
            'lbBab22 points to the image imported at the top of coversImports.js file',
            '"Batch & Bodega" is the exact label (visible to user) of the thumbnail on the catalogs main page',
            'for 2023 catalogs, we recommend not changing anything in this array, but rather to replace the content to which it points (i.e.- for Batch and Bodega, solely replace the thumbnail image ("../pics/covers/bab22_lb.webp"'
        ],
    },
    {
        title:'updating content on production machine for catalogs+ production (backend)',
        steps:[
            'in the new CONTENT folder, which was uploaded to the bucket, ensure the /CONTENT/v/*.txt filename has been incremented',
            'in your browser, navigate to https://hpgspectra.com/?INTHeJUNGLeTHeMIGHTYJUNGLe',
            '(recommendation: open devtools and watch the console to ensure the action worked)',
            'click "UPDATE" button',
            'this will update tell the backend to download the newly uploaded content',
        ],
    },
    {
        title:'adding a product to storyboard',
        steps:[
            'login to aws',
            'go to services > dynamodb',
            'go to table > storyboardProduct',
            'select index prodbyprodfile and set prodFileExists to string "true"',
            'run',
            'checkbox an item similar to the one being added',
            'select actions > duplicate item',
            'edit appropriate values',
        ],
    },
    {
        title:'add product image to storyboard',
        steps:[
            'name product file: a=SKU,b=W,c=W,j=SP1W,.png',
            'name overlay file: a=SKU,b=OVERLAY,.png',
            'name background file: c=BG,.png',
            'create VARS file named: a=SKU,d=200x120,e=20x0,f=0,j=SP1,.png',
            'd is imprint area width x height',
            'e is offset from center',
            'f is rotation',
            'j is logo version'
        ]
    }
]
const catalogproductionMaps={
    catalogs:{
        hashmap:['1','3','4','5',],
        workflow:[
            <>{'HPG Catalogs workflow starts with a session on the '}<a target='_blank' href='https://www.hpgspectra.com'>{'Catalogs+ home page.'}</a></>,
            'A user can submit one or multiple logos.',
            'For each upload (this session\'s set of logo or logos), the user selects one or multiple catalog types, and enters his email address and a name to address the catalog(s).',
            'Once submitted, each logo is processed individually with it\'s respective catalog(s) selection.',
            'He receives an email, one for each logo, within a few minutes, containing a link to a logo\'s "results page".',
            'A session where a user uploaded 3 logos and selected 8 catalog types would result in 3 emails and a total of 24 catalogs produced',
            'A results page has links to each of the catalog types selected, which are personalized with this logo.',
        ],
    },
    storyboard:{
        hashmap:['0','8'],
        workflow:[
            'HPG Storyboards uses event-based architecture to quickly process user\'s logos.',
            <>{'HPG Storyboards workflow starts with a session on the '}<a target='_blank' href='https://www.storyboard.plus'>{'Storyboard+ home page.'}</a></>,
            'A user submits one logo.',
            <>
                <>{'Then, two things happen, concurrently:'}</><br/>
                <>&nbsp;&nbsp;&nbsp;{'a) There is a subscription to entries created in this table on an EC2 and the logo starts processing immediately.'}</><br/>
                <>&nbsp;&nbsp;&nbsp;{'b) This logo is stored on S3 and an entry is created in a database table, and a subscription listening for updates to this entry begins in the user\'s browser.'}</><br/>
            </>,
            'Once the logo processing starts, the relevant table entry is updated ',
        ],
    },
    virtuals:{
        hashmap:['14','15',],
        workflow:[
            'HPG Virtuals+ is embedded in an iFrame, which is accessed via a product page on HPGBrands.com.',
        ],
    }
};
const jobDescription={
    requirements: [
        <>{'AWS (Amplify, EC2)'}
        <div style={{paddingLeft:'1rem'}}>
        {'Create, replicate, and manage multiple EC2 instances'}<br/>
        {'Familiarity with (AWS) selective permissions, user authentication, NoSql databases, GraphQl, caching, image optimization, web page optimization'}
        </div></>,
        <>{'Node (JS)'}<br />
        <div style={{paddingLeft:'1rem'}}>
            {'Running command line operations from Node, file system management from Node'}
        </div>
        </>,
        'React (JS)',
        'React-Bootstrap, MaterialUI, Webpack',
        'Canvas API',
        'Web accessibility standards',
        'Familiarity with command line tools',
        'CSS (in JS),HTML5,JS',
        'AWS-SDK',
    ],
    bonus: [
        'ImageMagick*',
        '*automating processes',
        'regex*',
        'Adobe Illustrator, Photoshop, Bridge*',
        'Python*',
        'Google Material / React Bootstrap*',
        'SMTP*',
        'WASM',
        'NextJS',
    ],
    next:[
        '7+ years experience in infrastructure architecture, database architecture and networking',
        'Professional experience architecting/deploying/operating solutions built on AWS',
        'Requirements: Modern Web Applications in AWS, React, Redux, Material UI, Typescript, Cypress, Axios, Kubernetes (ECS)',
        '3-5+ years\' Full-Stack Modern Web Application development',
        'Strive to build highly responsive, intuitive, and sleek experiences for customers',
        'One year of hands-on experience with AWS technology, including using compute, networking, storage, and database AWS services as well as AWS deployment and management services',
        'Experience deploying, managing, and operating workloads on AWS as well as implementing security controls and compliance requirements',
        'Familiarity with using both the AWS Management Console and the AWS Command Line Interface (CLI)',
        'Understanding of the AWS Well-Architected Framework, AWS networking, security services, and the AWS global infrastructure',
        'Ability to identify which AWS services meet a given technical requirement and to define technical requirements for an AWS-based application',
    ],
};
const apps=['catalogs','storyboard','virtuals',];
const todos=[
    'Job Description',
    'Schedule Meetings for App Instructions',
    'Documentation',
    'Create DynamoDb tabeles backups',
    'Transfer AWS account and all related over to an HPG AWS account',
    'Code Cleanup',
];
const fields=['Service','Name','Purpose','Action','Frequency',]
.slice(0,3);
const fieldSizes=[2,5,5];
const graybo='1px solid lightgray';
const colorPalette=[
    'b2cbb84f',
    'E5D1D04f',
    'F5E4D74f',
    'BDBBB64f',
    'BDBBB64f',
];

const DoCard=props=><div style={{marginTop:'1.3rem'}}><CardForMaintenancePage {...props} /></div>;

export default function HPGMaintenancePage(){

    return(
    <Col xs={12} style={{fontSize:'1.05rem',borderBottom:graybo,fontFamily:'Raleway',}}>


<Row>
<Col>
<DoCard title={'Procedures'}>
    {procedures.map(({title,steps},prodIdx)=>(
    <Row style={{borderBottom:'1px solid lightgray'}} key={title.substring(0,4)+prodIdx+'procedr'}>
        <Col style={{marginTop:'1.3rem',fontSize:'1.1rem',fontWeight:600}} xs={12}>
            {title.toUpperCase()}
        </Col>
        <Col  style={{marginBottom:'1.3rem',}} xs={12}>
            {steps.map((step,stepIdx)=>(
            <Row key={stepIdx+'step'}>
                <Col style={{textAlign:'left',}}>
                    {stepIdx+1}. {step}
                </Col>
            </Row>))}
        </Col>
    </Row>))}
</DoCard>
</Col>
</Row>



<Row>
    <Col>
        {apps.map((app,appIdx)=>{
            console.log(app);
            return (
        <DoCard key={'card'+app} title={app.toUpperCase()}>

            <Row style={{backgroundColor:'#'+colorPalette[appIdx]}}>
                
                <Col style={{padding:'.8rem',}}>

                    <Row style={{paddingBottom:'1.5rem',}}>
                        <Col>
                            <Row>
                                <Col>        
                                    {/* <h5 > */}
                                        {'Workflow'}
                                    {/* </h5> */}
                                </Col>
                            </Row>


                            <Row>
                                <Col>        
                                    { catalogproductionMaps
                                        [app]
                                        .workflow
                                        .map((text,tIdx)=><div key={tIdx+'text'} style={{textAlign:'left',}}>{tIdx+1}. {text}</div>)}
                                </Col>
                            </Row>
                        </Col>
                    </Row >

                    <Row style={{paddingBottom:'1rem',}}>
                        <Col>
                            <Row>
                                <Col>
                                    {/* <h5 > */}
                                        {'Resources'}
                                    {/* </h5> */}
                                </Col>
                            </Row>

                            {<Row style={{borderBottom:graybo,}}>
                                {fields
                                    .map(f=>f.toLowerCase())
                                    .map((field,fIdx)=>(
                                        <Col key={field+'field'} style={{textAlign:'left',fontWeight:400,fontSize:'.8rem',}} xs={fieldSizes[fIdx]}>
                                            {field.toUpperCase()}
                                        </Col>))
                                }
                            </Row>}

                            {chapters
                            .filter(({apps})=>apps.includes(app))
                            .map((m,mIdx)=>{
                                console.log(m);
                                return (
                            <Row key={m.hash+'row'} style={{borderBottom:graybo,}} >
                                {fields
                                    .map(f=>f.toLowerCase())
                                    .map((field,fIdx)=>(
                                    <Col key={field+'value'} xs={fieldSizes[fIdx]} style={{textAlign:'left',fontSize:'.8rem',borderRight:graybo}} >
                                        {typeof m[field]!=='undefined'?m[field].toString():''}
                                    </Col>))
                                }
                            </Row>)
                            })
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DoCard>)
        })}
    </Col>
</Row>


<DoCard title={'Frontend'}>
    <Col>
     <br />{'Frontend Files:'}
     <br />{'Routing: src/components/navergation'}
     <br />{'Global Logic: src/components/Panel'}
     <br />{'Catalogs: src/components/catalogs'}
     <br />{'Storyboard: src/components/app22/storyboard'}
     <br />{'Virtuals: src/components/_VIRTIFRAMEBINLEGACY'}
    </Col>
</DoCard>

<DoCard title={'Backend'}>
    <Col>
     <br /><br />{'Catalogs:'}
     <br />{'Email: email/autoEmail6.ps1'}
     <br />{'Script for Task Scheduler: WATCHY.bat'}
     <br /><br />{'Vectorizer:'}
     <br />{'Upload Listener: ampdat/index.js'}
     <br />{'Script for Task Scheduler: LISTEN.bat'}
    </Col>
</DoCard>




<Row>
    <Col xs={6}>
        <Row style={{marginTop:'1.4rem',textAlign:'left',}}><Col style={{fontSize:'1.2em',}}>{ 'Todos' }</Col></Row>
        <Row style={{textAlign:'left',}}><Col>        
        {todos.map((todo,todoIdx)=><div key={todo[0]+todo[todo.length-2]+'todo'}>{todoIdx+1}. {todo}</div>)}
        </Col></Row>
    </Col>

    <Col xs={6}>

        <Row style={{marginTop:'1.4rem',textAlign:'left',}}><Col style={{fontSize:'1.2em',}}>{ 'Job Description' }</Col></Row>
        <Row style={{textAlign:'left',}}><Col>        
        <Row style={{paddingLeft:'.8rem',textAlign:'left',}}><Col style={{fontSize:'1.2em'}}>{ 'Requirements' }</Col></Row>
        {jobDescription.requirements.map((todo,todoIdx)=><div style={{paddingLeft:'.8rem',}} key={typeof todo!=='string'?todoIdx+'req':todo[0]+todo[todo.length-2]+'req'}>{todoIdx+1}. {todo}</div>)}
        <Row style={{textAlign:'left',}}><Col style={{fontSize:'1.2em',}}>{ 'Bonus' }</Col></Row>
        {jobDescription.bonus.map((todo,todoIdx)=><div style={{paddingLeft:'.8rem',}} key={todo[0]+todo[todo.length-2]+'bns'}>{todoIdx+1}. {todo}</div>)}
        </Col></Row>

    </Col>
</Row>




<Row>
    <Col>
        {benTodos}
    </Col>
</Row>



    </Col>
)};
