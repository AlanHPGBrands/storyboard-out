import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const proper=wird=>wird[0].toUpperCase()+wird.slice(1);

export default function VerticalSelect({
  handleSelect,
  brands,
  titulo='Choose A...',
  optionBoxWidth=200,
  styleProp,
  valueProp,
}){
  let daShtyle={zIndex:1600,marginLeft:'auto',marginRight:'auto',width:optionBoxWidth,fontFamily:'Raleway'};
  if (typeof styleProp!=='undefined'){ Object.assign(daShtyle,styleProp); };
    return (
    <Autocomplete
      onChange={(ev,va)=>{
          console.log(ev);
          console.log(va);
          handleSelect(va);
      }}
      value={valueProp}
      fontFamily={'Raleway'}
      sx={daShtyle}
      options={brands}
      autoHighlight
      disablePortal
      renderOption={(props, option) => (
        <Box component="li" sx={{zIndex:1600,fontFamily:'Raleway', '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
           {/\s/.test(option.label)?option.label.split(' ').map(proper):option.label}
        </Box>
      )}
      renderInput={(params)=>(
        <TextField
          style={{zIndex:1600,fontFamily:'Raleway'}}
          sx={{ zIndex:1600,fontFamily : 'Raleway'}}
          {...params}
          label={titulo}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};