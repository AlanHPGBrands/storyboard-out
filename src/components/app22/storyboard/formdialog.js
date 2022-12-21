import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function FormDialog(props) {
    const {
      handler,
      buttonText,
      dialogContentText,
      dialogTitle,
      textfieldLabel,
      errorFeature=true,
      actionText='SEND',
      extraSxProp,
  }=props;

  let extraSx={color:'#4700b3'};
  if (typeof extraSxProp!=='undefined'){Object.assign(extraSx,extraSxProp)}
  console.log(extraSx)
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState(false);

  const handleClickOpen=()=>{setOpen(true);};
  const handleClose=()=>{
      handler(address);
      setOpen(false);
    };
    const handleEmailInput=ev=>{setAddress(ev.target.value);};
    const checkValidationError=n=>{
        if (!errorFeature){return false};
        let tempError=false;
        let cases = [
            {caseTest:(!regEmail.test(n)),errorText:'Invalid Email Address'},
            {caseTest:(!/@/.test(n)),errorText:'Invalid Email "@"'},
        ];
        cases.forEach(({caseTest,errorText})=>{
            if (caseTest) {tempError=errorText;};
        });
        return tempError;
    };
    const validationError=checkValidationError(address)&&true;
    const validationErrorText=checkValidationError(address);

  return (
    <div style={{zIndex:1700}} >
      <Button variant="outlined" sx={extraSx} onClick={handleClickOpen} >
        {buttonText}
      </Button>

      <Dialog sx={{zIndex:1700}} open={open} onClose={handleClose}>

        <DialogTitle>{dialogTitle}</DialogTitle>

        <DialogContent>

            {dialogContentText&&
              <DialogContentText>
                {Array.isArray(dialogContentText)
                  ?dialogContentText.map(m=><span key={/\s/.test(m)?m.split(' ')[0]:m}>{m}<br/><br/></span>)
                  :dialogContentText}
              </DialogContentText>}

          <TextField
            helperText={validationErrorText}
            error={validationError}
            onChange={handleEmailInput}
            autoFocus
            margin="dense"
            id="name"
            label={textfieldLabel}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>{typeof actionText!=='undefined'&&actionText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
