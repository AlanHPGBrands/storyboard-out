import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({highLow,onCloseProp}) {
    
    const [high,low]=highLow;

    console.log(high);
    console.log(low);

    const [value, setValue] = React.useState([low, high]);
console.log(value)
  const handleChange = (event, newValue) => {
      console.log(newValue)
    setValue(newValue);
  };


  const handleCommit = (event, newValue) => {
    onCloseProp(newValue)
  }
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={low}
        max={high}
        onChangeCommitted={handleCommit}
        />
    </Box>
  );
}