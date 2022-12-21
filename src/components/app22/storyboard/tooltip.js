import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));


const justTheTips={
    change : {
        title : 'Change',
        icon : <DeleteIcon />
    },
    info : {
        title : 'Info',
        icon : <InfoIcon />
    },
};


export default function StoryTooltip({typo,title,icon,onClick,html}) {

    let renderObject = justTheTips[typo]&&typeof justTheTips[typo]!=='undefined'
        ? justTheTips[typo] : justTheTips['change'];

    if (typeof title!==     'undefined') {Object.assign(renderObject,{title:title})};
    if (typeof icon!==      'undefined') {Object.assign(renderObject,{icon: icon })};
    if (typeof onClick!==   'undefined') {Object.assign(renderObject,{onClick:onClick})};
    if (typeof html!==      'undefined') {Object.assign(renderObject,{html:html})};



  return ( typeof html !== 'undefined'
      ?
        <HtmlTooltip title={html} >
            <IconButton
                onClick={renderObject.onClick}>
                {renderObject.icon}
            </IconButton>
        </HtmlTooltip>
      :

        <Tooltip title={renderObject.title}>
        <IconButton
            onClick={renderObject.onClick}>
            {renderObject.icon}
        </IconButton>
        </Tooltip>
  );
}