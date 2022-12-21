import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ResponsiveDialog from './responsiveDialog';
import InventoryIcon from '@mui/icons-material/Inventory';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './loadingringstyles.css';
// import GroupWorkIcon from '@mui/icons-material/GroupWork';


export default function StoryCartItems({itemsArray,handleClose,handleSelection}) {
    const items=Array.isArray(itemsArray)&&itemsArray;
    console.log(itemsArray);

  return (
      <ResponsiveDialog
        handleClose={handleClose}
        fullWidth={'sm'}
        wordseses={'Your Items'} // secondaryText={'Collections are items saved from Stories you\'ve created.'}
        >

            
    <DialogActions>
        <Button
            style={{color:'#4700b3'}}
            onClick={handleClose}
            >
            OK
        </Button>
    </DialogActions>


    <Box sx={{width:'100%',bgcolor:'background.paper'}}>
      <nav aria-label="main mailbox folders">
        <List>
        {Array.isArray(items)&&
        <>{
            items.map(({itemNumber:m,itemName},mIdx)=>{
              return(
            <ListItem sx={{fontSize:'.5rem',}} key={m} disablePadding>

                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>

                <ListItemText secondary={itemName} primary={m} />

                <ListItemButton
                    onClick={typeof handleSelection!=='undefined'
                    ?()=>{handleSelection(m);}
                    :()=>{console.log('noHandleSelectionProp')}}
                    sx={{textAlign:'right',justifyContent:'flex-end'}}
                    >
                    <ListItemIcon>
                        <RemoveCircleIcon color={'error'} />
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>)
            })}
          </>}
        </List>
      </nav>
    </Box>


    </ResponsiveDialog>
  );
}
