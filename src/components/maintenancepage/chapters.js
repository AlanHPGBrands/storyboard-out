export const chapters=[
    {
        hash:'0',
        service:'S3',
        name: 'plodes-bucket20445-dev/public/PORTAL/VIRTUALS/HUB/*',
        purpose:'stores storyboard content, i.e.- product images, background images...',
        apps:['catalogs'],
    },
    {
hash:'1',
        service:'S3',
        name: 'plodes-bucket20445-dev/public/STARTS/*',
        purpose:'all client logo submissions go here',
        apps:['catalogs'],
    },
    {
hash:'2',
        service:'S3',
        name: 'plodes-bucket20445-dev/public/LOGOS/*',
        purpose:'all bitmap logo versions for catalogs and vectorized logos for storyboard go here',
        apps:['catalogs'],
    },
    {
hash:'3',
        service:'S3',
        name: 'plodes-bucket20445-dev/public/CONTENT/*',
        purpose:'catalog page templates and product images go here',
        apps:['catalogs'],
    },
    {
hash:'4',
        service:'S3',
        name: 'plodes-bucket20445-dev/public/FINALS/*',
        purpose:'catalogs produced for clients go here',
        apps:['catalogs'],
},
    {
hash:'5',
        service:'Lambda',
        name:'catalogChecker',
        action:'email notification',
        purpose:'submit a test catalog.',
        frequency:{
            type:'schedule',
            data:'hourly',
        },
        apps:['catalogs'],
    },
    {
hash:'6',
        service:'Lambda',
        name:'storyboardDataExportDaily',
        action:'email notification',
        purpose:'send an email containing link to csv containing statistics for both catalogs and storyboards.',
        frequency:{
            type:'schedule',
            data:'daily',
        },
        apps:['catalogs','storyboard',],
    },
    {
hash:'7',
        service:'Lambda',
        name:'sendEmailOnEarlies2Creation',
        action:'email notification',
        purpose:'create entry .',
        resources: [
            {
                service:'DynamoDb',
                data:'earliesASDF123',
            }
        ],
        frequency:{
            type:'event',
            data:'on submission',
        },
        apps:['storyboard'],
    },
    {
hash:'8',
        service:'Lambda',
        name:'checks3VirtulasExistenceUpdateDynamo',
        action:'update table',
        purpose: 'update table with imprint data from filenames in respective products folder',
        resources: [
            {
                service:'DynamoDb',
                data:'StroyboardProduct-sdf123',
            },
            {
                service:'S3',
                data: 'public/PORTAL/VIRTUALS/HUB/*',
            },
        ],
        frequency:{
            type: 'event',
            data: 'manual'
        },
        apps:['storyboard'],
    },
    {
hash:'9',
        service:'Lambda',
        name: 'ec2STOPSesEmail',
        purpose: 'stop catalog production ec2 instance.',
        resources:[
            {
                service: 'EC2',
                data:[
                    'i-01f73aa0794bad7e4',
                    'i-058c0f58256a083a6',
                    'i-00c31028f8ad5a59b',
                ]
            }
        ],
        frequency:{
            type:'schedule',
            data:'daily'
        },
        apps:['catalogs'],
    },
    {
hash:'10',
        service:'Lambda',
        name: 'ec2StartStopSesEmail',
        purpose: 'start catalog production ec2 instance.',
        resources:[
            {
                service: 'EC2',
                data:[
                    'i-01f73aa0794bad7e4',
                    'i-058c0f58256a083a6',
                    'i-00c31028f8ad5a59b',
                ]
            }
        ],
        frequency:{
            type:'schedule',
            data:'daily'
        },
        apps:['catalogs'],
       },
    {
hash:'11',
        service:'Lambda',
        name:'sendEmailToRecipientStoryboard',
        purpose:'submit a test catalog, hourly.',
        apps:['storyboard'],
    },
    {
hash:'12',
        service:'Lambda',
        name:'sendEmailOnCreateStory',
        purpose:'submit a test catalog, hourly.',
        apps:['storyboard'],
    },
    {
hash:'13',
        service:'DynamoDb',
        name:'inkLogo-tjg6cx7htfd65h46armff7ptq4-dev',
        purpose:'catalogs page submissions queue',
        apps:['catalogs'],
    },
    {
hash:'14',
        service:'DynamoDb',
        name:'earlyStuffs2-tjg6cx7htfd65h46armff7ptq4-dev',
        purpose:'images to be vectorized queue',
        apps:['virtuals','storyboard'],
    },
    {
hash:'15',
        service:'DynamoDb',
        name:'named-tjg6cx7htfd65h46armff7ptq4-dev',
        purpose:'logo search',
        apps:['virtuals'],
    },
    {
hash:'16',
        service:'DynamoDb',
        name:'StoryboardProduct-tjg6cx7htfd65h46armff7ptq4-dev',
        purpose:'all storyboard products',
        apps:['storyboard'],
    },
    {
hash:'17',
        service:'StoryboardEmail-tjg6cx7htfd65h46armff7ptq4-dev',
        name:'sendEmailOnCreateStory',
        purpose:'when user sends email through hpgbrands on storyboard page (AWS SES)',
        apps:['storyboard'],
    },
    {
hash:'18',
        service:'Storyboard-tjg6cx7htfd65h46armff7ptq4-dev',
        name:'sendEmailOnCreateStory',
        purpose:'storyboard submissions',
        apps:['storyboard'],
    },
];