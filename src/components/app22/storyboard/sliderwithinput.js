import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

function calculateValue(value) { return (2 ** value) * 5; };

export default function NonLinearSlider({onCloseProp}) {
  const [value, setValue] = React.useState(null);
  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };
  const handleCommit = (event, newValue) => {
    onCloseProp(newValue)
  }
  console.log(value);

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="non-linear-slider" gutterBottom>
        Max Price ${(2**value)*5}
      </Typography>
      <Slider
        value={value}
        min={Math.log2(1)}
        step={1}
        max={3}
        scale={calculateValue}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </Box>
  );
}