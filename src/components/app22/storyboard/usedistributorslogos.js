import {useState,useEffect} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../../graphql/queries';

export function useDistributorLogos(email) {
    let [loos, setLoos]=useState(null);
    useEffect(()=>{
        async function getLoos(ema){
            try{
                let loosData=await API.graphql(graphqlOperation(queries.svgsByEmailSortLogoType,{email: ema,logotype:{eq:'distributor'}}));
                console.log(loosData);
                if (loosData.data&&typeof loosData.data!=='undefined'){
                    let answers =loosData.data.svgsByEmailSortLogoType.items; 
                    console.log(answers);
                    let sceansceurs = answers.sort((b,a)=>(a.createdAt.toString()<b.createdAt.toString()?-1:a.createdAt.toString()>b.createdAt.toString()?1:0))
                    let parsedOut=answers.map(a=>({id:a.result_id,logo:JSON.parse(a.data)}))
                    setLoos(parsedOut);
                };
            }catch(e){
                console.log(e);
            };
        };
        if (email&&typeof email!=='undefined'){ getLoos(email); };
    },[email]);
    return loos ? loos : null;
};