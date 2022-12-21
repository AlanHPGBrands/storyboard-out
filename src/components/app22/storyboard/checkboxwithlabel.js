import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({theme})=>({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color:'#4700b3',
    '&:hover': {
      backgroundColor: alpha('#4700b3', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#4700b3',
  },
}));

export default function CheckboxWithLabel({label,handler,checked,disabled}) {
  return (<FormGroup>
      <FormControlLabel 
        control={
        <GreenSwitch
          checked={checked} 
          onChange={handler}
          disabled={disabled}
        /> }
      label={label}
      />
    </FormGroup>);
};