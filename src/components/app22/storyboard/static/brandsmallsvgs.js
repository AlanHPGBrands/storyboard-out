import React from 'react';
import batchsvg from './brandsmallicons/BATCH.svg';
import bcgsvg from './brandsmallicons/BCG.svg';
import beaconsvg from './brandsmallicons/BEACON.svg';
import bestsvg from './brandsmallicons/BEST.svg';
import debcosvg from './brandsmallicons/DEBCO.svg';
import handstandssvg from './brandsmallicons/HANDSTANDS.svg';
import hubsvg from './brandsmallicons/HUB.svg';
import mixiesvg from './brandsmallicons/MIXIE.svg';
import origaudiosvg from './brandsmallicons/ORIGAUDIO.svg';


export default function brandsSmallSvgs(){
    return({
        bab:<img src={batchsvg} alt='abc' />,
        bcg:<img src={bcgsvg} alt='abc' />,
        beacon:<img src={beaconsvg} alt='abc' />,
        best:<img src={bestsvg} alt='abc' />,
        debco:<img src={debcosvg} alt='abc' />,
        handstands:<img src={handstandssvg} alt='abc' />,
        hub:<img src={hubsvg} alt='abc' />,
        mixie:<img src={mixiesvg} alt='abc' />,
        origaudio:<img src={origaudiosvg} alt='abc' />,
        });
};