import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import { styled } from '@mui/material/styles';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
  } from "react-share";


const url=window.location.href;
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',

    '&.MuiFab-circular, &.MuiFab-root, &.MuiFab-primary, &.MuiSpeedDial-fab': {backgroundColor:'#4700b3'},
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));
const aciones=[
    {icon:<EmailShareButton    url={url} ><EmailIcon     size={ 32 } round={ true } /></EmailShareButton>   ,name:'E-mail'   },
    {icon:<FacebookShareButton url={url} ><FacebookIcon  size={ 32 } round={ true } /></FacebookShareButton>,name:'Facebook'},
    {icon:<LinkedinShareButton url={url} ><LinkedinIcon  size={ 32 } round={ true } /></LinkedinShareButton>,name:'LinkedIn'},
    {icon:<TwitterShareButton  url={url} ><TwitterIcon   size={ 32 } round={ true } /></TwitterShareButton> ,name:'Twitter' },
];
export default function StoryboardSpeedDial({acionesAddicionales}) {
    const pos={position:'absolute', bottom:0,right:0};

    let actions=Array.isArray(acionesAddicionales)&&typeof acionesAddicionales[0]!=='undefined'
      ?[
        ...aciones,
        ...acionesAddicionales,
      ]:aciones;


    return (
    <Box sx={{ width: 320, transform: 'translateZ(0px)', flexGrow: 1 ,marginLeft:'auto',}}>
        <StyledSpeedDial
            ariaLabel="SpeedDial Share Hybrid"
            icon={<ShareIcon className={'storyshareicon'} />}
            direction={'left'}
            sx={pos}
            FabProps={{sx:{'&:hover': {
              bgcolor: '#8f48fb',
            },backgroundColor:'#4700b3'}}}
        >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
     </StyledSpeedDial>
    </Box>
  );
}