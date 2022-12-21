import React,{useEffect,Suspense} from 'react';
const Storyboard = React.lazy(() => import('./storyboard/storyboard'));

export default function App22(props){
    const {qBuk,}=props;

    useEffect(()=>{
        ["footer","NAVBOTTOM","sercandrownapp","firstrowinapp"]
        .forEach(elId=>{
            let deev=document.getElementById(elId);
            if (deev&&typeof deev!=='undefined'){
                deev.style.display="none";
            }
        });
    },[]);

    return (
        <>
        {/story/i.test(window.location.search)&&
        <Suspense fallback={<div>Loading...</div>}>
            <Storyboard
                qBuk={qBuk}
                />
        </Suspense>}
    </>
    );
};
