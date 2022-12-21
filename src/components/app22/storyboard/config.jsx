import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import React from 'react';

export const cat22AppConfig={
    urlParamilios :{
        gqlid:{
            reg:/tt/,
        },
        logoid:{
            reg:/dicc/,
        },
        catbrand:{
            reg:/cc/,
        },
        catcategories:{
            reg:/&ct=([A-Za-z]{1,25})/i
        },
        catvertical:{
            reg:/vin/,
        }
    },
    constantes :{
        
        hasVerticals : ["98250", "OR2308","9805","9811","96001","96004"],
        
        betaMap:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'],

        alphaMap:{a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9,k:10,l:11,m:12,n:13,o:14,},
        
        industries:[
            {label:'Agricultural',            icon:<TwoWheelerIcon />},
            {label:'Auto',                    icon:<LocalHospitalIcon />},
            {label:'Beauty',                  icon:<SportsBasketballIcon />},
            {label:'Beverage',                icon:<SportsKabaddiIcon />},
            {label:'Business',                icon:<LocalHospitalIcon />},
            {label:'Cleaning',                icon:<WaterfallChartIcon />},
            {label:'Construction',            icon:<LocalHospitalIcon />},
            {label:'Dental',                  icon:<SportsKabaddiIcon />},
            {label:'Dining',                  icon:<TwoWheelerIcon />},
            {label:'Education',               icon:<HotelIcon />},
            {label:'Entertainment',           icon:<AttachMoneyIcon />},
            {label:'Finance',                 icon:<SportsBasketballIcon />},
            {label:'Fitness',                 icon:<WaterfallChartIcon />},
            {label:'Government',              icon:<SportsKabaddiIcon />},
            {label:'Grocery',                 icon:<TwoWheelerIcon />},
            {label:'Healthcare',              icon:<LocalHospitalIcon />},
            {label:'Hobby',                   icon:<SportsBasketballIcon />},
            {label:'Hospitality',             icon:<SportsKabaddiIcon />},
            {label:'Insurance',               icon:<LocalHospitalIcon />},
            {label:'Kids',                    icon:<WaterfallChartIcon />},
            {label:'Legal',                   icon:<LocalHospitalIcon />},
            {label:'Marketing',               icon:<SportsKabaddiIcon />},
            {label:'Mobile',                  icon:<SportsKabaddiIcon />},
            {label:'Music',                   icon:<TwoWheelerIcon />},
            {label:'Nightlife',               icon:<HotelIcon />},
            {label:'Office',                  icon:<AttachMoneyIcon />},
            {label:'Orthopedic',              icon:<SportsBasketballIcon />},
            {label:'Outdoor',                 icon:<WaterfallChartIcon />},
            {label:'Real Estate',             icon:<SportsKabaddiIcon />},
            {label:'Retail',                  icon:<SportsKabaddiIcon />},
            {label:'Shipping',                icon:<SportsKabaddiIcon />},
            {label:'Sports',                  icon:<SportsKabaddiIcon />},
            {label:'Technology',              icon:<SportsKabaddiIcon />},
            {label:'Tourism',                 icon:<SportsKabaddiIcon />},
        ],
        brands:[
            {label:'Hub',               icon:<TwoWheelerIcon />,         
        },          
            {label:'Origaudio',         icon:<LocalHospitalIcon />,      
        },           
            {label:'HandStands',        icon:<SportsBasketballIcon />,   
        },            
            {label:'Mixie',             icon:<SportsKabaddiIcon />,      
        },           
            {label:'Best',              icon:<LocalHospitalIcon />,      
        },           
            {label:'Debco',             icon:<WaterfallChartIcon />,     
        },          
            {label:'Beacon',            icon:<SportsKabaddiIcon />,      
        },          
            {label:'BCG',               icon:<LocalHospitalIcon />,      
        },            
            {label:'Batch & Bodega',    icon:<WaterfallChartIcon />,     
        },          
        ],

        distributors:[
            {label:'4Imprint',              icon:<WaterfallChartIcon />,   logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/4imprint.webp',       id:'fourimprint'},
            {label:'AIA Community',         icon:<WaterfallChartIcon />,   logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/aiacommunity.png',    id:'aia'},
            {label:'American Bus',          icon:<WaterfallChartIcon />,   logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/americanbus.jpeg',    id:'american'},
            {label:'BDA Inc.',              icon:<TwoWheelerIcon />,       logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/bdainc.webp',         id:'bda'},
            {label:'E-promo Products',      icon:<LocalHospitalIcon />,    logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/epromoproducts.jpeg', id:'epromo'},
            {label:'Facilis Group',         icon:<SportsBasketballIcon />, logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/facilisgroup.jpeg',   id:'facilis'},
            {label:'Boundless Network',     icon:<SportsKabaddiIcon />,    logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/boundlessnetwork.png',id:'boundless'},
            {label:'Brandfuel',             icon:<LocalHospitalIcon />,    logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/brandfuel.webp',      id:'brandfuel'},
            {label:'Common SKU',            icon:<WaterfallChartIcon />,   logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/commonsku.png',       id:'commonsku'},
            {label:'Geiger',                icon:<SportsKabaddiIcon />,    logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/geiger.png',          id:'geiger'},
            {label:'Halo',                  icon:<LocalHospitalIcon />,    logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/halo.jpeg',           id:'halo'},
            {label:'INWK',                  icon:<WaterfallChartIcon />,   logo:'https://plodes-bucket20445-dev.s3.amazonaws.com/public/PORTAL/VIRTUALS/DISTRIBUTORLOGOS/inwk.jpeg',           id:'inwk'},
        ],} };