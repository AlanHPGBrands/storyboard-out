import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Storage} from 'aws-amplify';

export default function UpdateContent(){
    const [success,setSuccess]=useState(false);

    return(
        <>
            <>
                {success&&<>
                    {'SUCCESSFULLY UPDATED CONTENT/v from "' + success.orig + '" to "' + success.updated + '"'}
                </>}
            </>
            <Button 
                onClick={async function(){
                    try {
                        let vFolderContent=await Storage.list('CONTENT/v/');
                        let latest=parseInt(vFolderContent.map(m=>m.key).filter(f=>/([0-9]{1,19})/.test(f))[0].match(/([0-9]{1,19})/)[1])+1;
                        console.log(latest);
                        let erpdat=await Storage.put('CONTENT/v/'+latest+'.txt','hi');
                        console.log(erpdat);
                        let objectName=vFolderContent[0].key.substring(0,vFolderContent[0].key.lastIndexOf('.txt'))+'.txt';
                        console.log(objectName);
                        try {
                            let ermove=await Storage.remove(objectName);
                            console.log(ermove);
                        }catch(e){
                            console.log(e);
                        };
                        setSuccess({orig:vFolderContent[0].key,updated:'CONTENT/v/'+latest+'.txt'})
                    } catch (e) {
                        console.log(e);
                    };
                }}
                >
                UPDATE
            </Button>
        </>
    )
};