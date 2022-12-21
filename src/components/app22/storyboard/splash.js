import React from 'react';
import ConfirmationResponsiveDialog from './confirmationresponsivedialog';
import hpgLogoTextBF from './static/storyboardlogotextonly_blackfill.svg';
import storyboardLogoBF from './static/storyboardlogobracketsonly_blackfill.svg';

import blue from './static/SPLASH/penblue.png';
import './static/SPLASH/anime.css';

const SplashAnime=()=>{
    return(<div style={{position:'fixed',width:'100vw',height:'100vh',top:'0px',left:'0px',overflow:'hidden',}}>
        <div className={'pee'}>
            <div style={{backgroundColor:'#4700b3',width:'100%',heigth:'100%',fontSize:'1rem',}} >
                <img src={blue} alt='bluepen' width={200} />
            </div>
        </div>
    </div>);
};


export default function Splash(props){
    const {setStoryUser}=props;
    const [open, setOpen]=React.useState(true);
    const handleClose =newValue=>{
        setOpen(false);
        if (newValue) {
            console.log(newValue);
            setStoryUser(newValue);
        };
    };
    return(<>
        <>{props.children}</>
            <ConfirmationResponsiveDialog styleProp={{zIndex:99999}} onClose={handleClose} open={open} wordseses={false} keepMounted >
                <div style={{padding:'.5rem',}}>
                    <span style={{padding:'.5rem',}}>
                        <img src={storyboardLogoBF} alt='brackets' width={40} />
                    </span>
                    <span style={{padding:'.5rem',}}>
                        <img src={hpgLogoTextBF} alt='hpglogotext' width={185} />
                    </span>
                </div>
                {/* <SplashAnime /> */}
            </ConfirmationResponsiveDialog>
    </>);
};