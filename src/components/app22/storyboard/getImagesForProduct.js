import { Storage } from 'aws-amplify';



    export async function getBackgrounds({currProdNum,brand}){
        const imageDataMap={
            a:'itemNumber',
            b:'productColorHex',
            c:'lchColorRangeInd',
            d:'imprintWidthXHeightPx',
            e:'imprintOffsetXYPx',
            f:'imprintRotationDeg',
            g:'imprintOnecolor',
            h:'imprintMulticolor',
            i:'imprintLaser',
            j:'imprintLogoVersionDefault',
            l:'imprintTransform',
            n:'keywords',
            p:'imprintPatternPadding',
            r:'associatedItems',
            s:'stepAndRepeat'
        };
        let imgDataKeys=Object.keys(imageDataMap);
        let getNumber=currProdNum&&typeof currProdNum!=='undefined'?currProdNum+'/':'208/';
        let productNumberImageFolder='PORTAL/VIRTUALS/HUB/'+getNumber;
        let listFromProdNumImgFolder=await Storage.list(productNumberImageFolder);
        let verticalsForProduct=false;
        listFromProdNumImgFolder.forEach(s3Img=>{if(/\/VERTICALS\//.test(s3Img.key)){verticalsForProduct=true;}});
        listFromProdNumImgFolder=listFromProdNumImgFolder
            .filter(f=>(f.key.replace(productNumberImageFolder,'').length>0&&f.key.replace(productNumberImageFolder,'')[0].length>0));
        let folderVarsRegex=/VARS([0-9]{0,3})\[/i;
        let folderVarsFileArray=listFromProdNumImgFolder.filter(f=>folderVarsRegex.test(f.key));
        if (folderVarsFileArray.length<1){
            folderVarsFileArray=[{key:'one/twothree/VARS[everything=nothing,].txt'}]
        }
        let varsSortVersion=folderVarsFileArray
                                        .map(m=>{
                                            let numeroCero='0';
                                            try{
                                                let mexico=m.key.match(folderVarsRegex)[1];
                                                if(mexico!==''){numeroCero=m.key.match(folderVarsRegex)[1];};
                                            }catch(e){console.log('no version numero : '+m.key);};
                                            return ({...m ,version:numeroCero})
                                        } )
                                        .sort((s,t)=>(parseInt(s.version)>parseInt(t.version)?1:parseInt(s.version)<parseInt(t.version)?-1:0));

    let allVarsObjects=varsSortVersion.map(async(folderVarsFile,fIdx)=>{
        if(typeof folderVarsFile!=='undefined'){
            let prodRegs=/b=/i;
            let [productImages,whiteImage]=[prodRegs,/c=BG/i]
                .map(reg=>(
                    listFromProdNumImgFolder
                    .filter(f=>reg.test(f.key))
                    .filter(f=>{
                        if(reg===prodRegs&&/b=none/i.test(f.key)){
                            return false;
                        } else {
                            return true;
                        }
                    })
                    .map(async m=>{
                        let fl=fIdx===0?await Storage.get(m.key):{};
                        let tempObject={
                            version:folderVarsFile.version,
                            imprintAreaVersion:fIdx,
                            name: m.key.replace(productNumberImageFolder,'').substring(0,m.key.lastIndexOf('.')),
                            file:fl,
                        };
                        imgDataKeys.forEach(keyP=>{
                            let keyRegex = new RegExp(keyP+'=([0-9A-Za-z-_+.\(\)#]{1,45}),','i');
                            if (keyRegex.test(folderVarsFile.key)){
                                tempObject[imageDataMap[keyP]]=folderVarsFile.key.match(keyRegex)[1];
                            };
                            if (keyRegex.test(m.key)){
                                tempObject[imageDataMap[keyP]]=m.key.match(keyRegex)[1];
                            }
                        });

        /* NEW */
        /* IF DATA MISSING , AUTO-FILL */
        const defaultImprintProps={
            'itemNumber':currProdNum.toString(),
            'imprintWidthXHeightPx':'200x200',
            'imprintOffsetXYPx':'0x0',
            'imprintRotationDeg':'0',
            'imprintLogoVersionDefault':'SP1W',
        };
        [
            'itemNumber',
            'imprintWidthXHeightPx',
            'imprintOffsetXYPx',
            'imprintRotationDeg',
            'imprintLogoVersionDefault',
        ].forEach(imprintProp=>{
            if (!tempObject[imprintProp]||typeof tempObject[imprintProp]==='undefined'){
                tempObject[imprintProp]=defaultImprintProps[imprintProp];
            };
        });
        /* END OF NEW */



                        return tempObject;
                    })
                ));

            let gotBacks=await Promise.all(whiteImage);
            let gotPens=await Promise.all(productImages);

            gotPens.sort((x,y)=>(/w/i.test(x.colorName)?-1:/w/i.test(y.colorName)?1:0));
            let backgroundsFromBucket = [ ] , pensFromBucket = [ ];
            if (gotBacks&&gotBacks.length>0){backgroundsFromBucket=gotBacks;};
            if (gotPens&&gotPens.length>0){pensFromBucket=gotPens;};
            return { 
                backgroundsFromBucket   : backgroundsFromBucket ,
                pensFromBucket          : pensFromBucket ,
                verticals               : verticalsForProduct ,
            };
        };
    });
    let allDemBihs=await Promise.all(allVarsObjects);
    // console.log(allDemBihs);
    return allDemBihs;
};
