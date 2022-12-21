import Storage                  from '@aws-amplify/storage'
import Amplify from "aws-amplify";
// console.log(Object.keys(Amplify.default))

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_appsync_graphqlEndpoint": "https://jcuwm2idkzhuphmxydh5bfazju.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-gy6upwlj7napjbfwwun3nzqzge",
    "aws_cognito_identity_pool_id": "us-east-1:9d09a8db-ec05-4cec-932c-3e330e3b225c",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_Atwqkuypa",
    "aws_user_pools_web_client_id": "4lh3cncdq0tlkv08r2bl49qpfn",
    "oauth": {},
    "aws_cognito_login_mechanisms": [
        "PREFERRED_USERNAME"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_user_files_s3_bucket": "plodes-bucket20445-dev",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "predictions": {
        "identify": {
            "identifyText": {
                "proxy": false,
                "region": "us-east-1",
                "defaults": {
                    "format": "PLAIN"
                }
            }
        }
    }
};

Amplify.default.configure(awsmobile);

/* FOR MANAGABLE BUCKET OPERATIONS, EACH FOLDER SHOULD CONTAIN NO MORE
        THAN 500 ITEMS */
        const maxItems = 500;
        function findFirstAvailable(bktPrefix){
            return new Promise(resolve=>{
                Storage.Storage.list(bktPrefix)
                .then(itemsArray=>{
                    console.log('itemsArray', itemsArray)
                    if (itemsArray.length<maxItems){return resolve( bktPrefix );
                    } else {
                        /* INCREMENT FOLDER NAME AND RECURSE */
                        let nextNumBuk=bktPrefix.replace(/([0-9]+)/,parseInt(bktPrefix.match(/([0-9]+)/)[1])+1).toString();
                        return resolve(findFirstAvailable(nextNumBuk));
                    }})
                .catch(e=>console.log(e))});
        };
        async function updateBucketVersionAsyncQ( ) {
            let qFirstAvailable = await findFirstAvailable( 'STARTS/QUEUE/Q117/' );
            // setQBuk(qFirstAvailable);
            console.log(qFirstAvailable, 'qFirstAvailable')
        };
        async function updateBucketVersionAsyncT( ) {
            var iqFirstAvailable = await findFirstAvailable( 'STARTS/QUEUE/T'+100+'/' );
            // setIQBuk(iqFirstAvailable);
            console.log(iqFirstAvailable, 'iqFirstAvailable')
        };
        // if ((typeof window.location.search==='undefined'||window.location.search==='')&&!/id/i.test(window.location.search)){
            updateBucketVersionAsyncQ();
            updateBucketVersionAsyncT();
        // };