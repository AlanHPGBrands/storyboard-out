import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton';

export default function ResponsiveDialog(props) {
  const {
    width,
    children,wordseses='Upload your client\s logo',
    secondaryText,
    oopsen=true,
    onCloseProp,
    handleCloseProp,
    showCloseProp,
    ...other
  }=props;

  const [open, setOpen] = React.useState(oopsen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose=()=>{
      if (typeof handleCloseProp!=='undefined'){handleCloseProp(false);};
      setOpen(false);
  };
  let styley={textAlign:'center',zIndex:1700};
  if (typeof width!=='undefined'){Object.assign(styley,{width:width})};
  const upder=props.maxWidth;

  return (
    <div>
      <Dialog
        keepMounted={true}
        maxWidth={upder}
        sx={styley}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
          {wordseses}

          {showCloseProp === 'true' ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{position:'absolute',right:8,top:8,color:(theme)=>theme.palette.grey[500],}}
              >
              <CloseIcon />
            </IconButton>
          ) : null}

        </DialogTitle>
        <DialogContent sx={styley}>
          {typeof secondaryText!=='undefined'&&
          <DialogContentText id="alert-dialog-description">
            {secondaryText}
          </DialogContentText>}

            {props.children&&props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
