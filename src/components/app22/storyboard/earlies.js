import API,{graphqlOperation} from '@aws-amplify/api';
import Storage from '@aws-amplify/storage';
import {createEarlyStuffs2} from '../../../graphql/mutations';

const early2 = 'createEarlyStuffs2';

function findFirstAvailable(bktPrefix){
    return new Promise(resolve=>{
        Storage.list(bktPrefix)
        .then(akb=>{
            console.log( 'BUCKET ' + bktPrefix + ' . lENGTH : ' + akb.length );
            if (akb.length<900){
                return resolve(bktPrefix);
            } else {
                let nextNumBuk=bktPrefix.replace(/([0-9]+)/,parseInt(bktPrefix.match(/([0-9]+)/)[1])+1).toString();
                return resolve(findFirstAvailable(nextNumBuk))
            }
        })
        .catch(e=>console.log('_suck it',e))
    });
};

export const findFirst=findFirstAvailable;





export const dbEarly = async(fil,islogtin,ermul)=>{
    console.log(fil);
    return new Promise((res,rej)=>{
        const forEarlyImg =     {
            id                  : fil.gqlId                             ,
            created_at_flt      : Math.round( Date.now( ) / 1000 )      ,
            processing_file     : 'false'                               ,
            processed_file      : 'false'                               ,
            proc_at             : 'String'                              ,
            proc_by             : 'String'                              ,
            result_id           : fil.id                                ,
            user_name           : islogtin                              ,
            img_orig_filename   : 'blank'                               ,
            img_cloud_url_o     : typeof fil.bucket_url!=='undefined'?fil.bucket_url:'blank',
            email               : ermul                                 ,
        };
        let thisQueryRightHere=early2;
        API.graphql(graphqlOperation(createEarlyStuffs2,{input:forEarlyImg}))
        .then(bb=>{
            console.log('early : ',bb.data[thisQueryRightHere]);
            res(bb.data[thisQueryRightHere])
        })
        .catch(cc=>{
            console.log(cc);
            rej(cc);
        });
    })
};


export const storeEarlyImage=async(img,filename,qBukk)=>{
    console.log('STOREEARLYIMAGE STORYBOARD+');
    return new Promise(async(res,rej)=>{
        var queueBucketKey=qBukk+filename;
        try {
            const queue_res=await Storage.put(queueBucketKey,img,{cacheControl:'no-cache'});
            console.log(queue_res);
            res(queue_res.key);
        } catch(e) {
            console.log(e);
            rej(e);
        };
    } );
};