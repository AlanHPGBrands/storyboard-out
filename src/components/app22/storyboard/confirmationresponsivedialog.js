import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const defVal={email:'',phone:''};

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#4700b3',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4700b3',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4700b3',
    },
    '&:hover fieldset': {
      borderColor: '#4700b3',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4700b3',
    },
  },
});

export default function ConfirmationResponsiveDialog(props) {
    const {width,onClose,children,wordseses='Upload your client\s logo',open,styleProp,...other}=props;
    const [value,setValue]=useState(defVal);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let styley={textAlign:'center'};
    if (typeof width!=='undefined'){Object.assign(styley,{width:width})};
    if (typeof styleProp!=='undefined'){Object.assign(styley,styleProp)};

    const handleOk = () => {onClose(value); };

    const handleChange =ev=>{
      let [key,val]=[ev.target.id,ev.target.value];
      setValue({...value,[key]:val,});
    };


  return (
      <Dialog sx={styley} fullScreen={fullScreen} open={open} aria-labelledby="responsive-dialog-title" >
        {(typeof wordseses!=='undefined'||onClose)&&
        <DialogTitle id="responsive-dialog-title">
          {wordseses}
        </DialogTitle>}

        <DialogContent>
            {props.children&&props.children}
            <br/><br/>
            <DialogContentText sx={{color:'#484848',textAlign:'left',fontWeight:500,fontSize:'1.1rem',}} >
                Welcome to a brand new way to share promotional product ideas<br/><br />
                Distributors, please complete the form to get started<br /><br />
            </DialogContentText>

            {[
                {name:'email',label:'Email Address',},
                {name:'phone',label:'Phone Number (optional)',}
            ].map(({name,label})=>(
              
      <CssTextField 
      label="Custom CSS" id="custom-css-outlined-input" 
      // /> <TextField
                key={name+'taxfeld'}
                required={name==='email'}
                autoFocus
                margin="dense"
                id={name}
                label={label}
                type="email"
                fullWidth
                variant="standard"
                value={value[name]}
                onChange={handleChange}
                sx={{color:'#4700b3'}}
            />))}
        </DialogContent>

        <DialogActions>
            <Button style={{color:'#4700b3',opacity:typeof value.email==='string'&&value.email!==''?1:.3}} onClick={handleOk}>ENTER STORYBOARD</Button>
        </DialogActions>

      </Dialog>
  );
}
