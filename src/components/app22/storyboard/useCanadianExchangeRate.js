import React,{useState,useEffect} from 'react';

export function useCanadianExchangeRate(){
    const [usd2Can,setUsd2Can]=useState(null);
    useEffect(()=>{
        async function fetchLast5Rates(){
            let {body}=await fetch('https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=5');
            const reader = body.getReader();
            let {value}=await reader.read();
            let stringInterp=new TextDecoder().decode(value);
            let {observations}=JSON.parse(stringInterp);
            let standinNum=0;
            observations.forEach(({FXUSDCAD})=>{
                standinNum+=parseFloat(FXUSDCAD.v)
            });
            setUsd2Can(standinNum/5);
        }
        fetchLast5Rates();
    },[]);
    return usd2Can;
};