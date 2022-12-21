import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/Inbox';
import ResponsiveDialog from './responsiveDialog';
import './loadingringstyles.css';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
export default function UserStoriesList({usersStories,handleClose,handleSelection}) {
    const stories=Array.isArray(usersStories)&&
    usersStories
        .filter(f=>f.id&&f.createdAt)
        .sort((f,g)=>(g.createdAt-f.createdAt))
        .slice(0,15);
        console.log(usersStories);

  return (
      <ResponsiveDialog
        handleClose={handleClose}
        fullWidth={'sm'}
        wordseses={'Your Collections'}
        secondaryText={'Collections are items saved from Stories you\'ve created.'}
        >
    <Box sx={{width:'100%',bgcolor:'background.paper'}}>
      <nav aria-label="main mailbox folders">
        <List>
        {Array.isArray(stories)&&
        <>{
            stories.map((m,mIdx)=>{
              let itemsInCollection=JSON.parse(m.content).items;
              return(
            <ListItem sx={{fontSize:'.5rem',}} key={m.id} disablePadding>
              <ListItemButton
                onClick={typeof handleSelection!=='undefined'
                  ?()=>{handleSelection(itemsInCollection);handleClose(false);}
                  :()=>{console.log('noHandleSelectionProp')}}
                >
                <ListItemIcon>
                  <GroupWorkIcon />
                </ListItemIcon>
                <ListItemText secondary={itemsInCollection.join(',')}  primary={m.name&&typeof m.name!=='undefined'?m.name:m.createdAt.substring(0,10)} />
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
