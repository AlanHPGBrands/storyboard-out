import React from 'react';

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
  } from "react-share";
export default function Sharer( props ) {
    const {
        item        ,
        resultid    ,
    } = props;

    let prod = typeof item      !== 'undefined' ? item      : '96004';
    let virt = typeof resultid  !== 'undefined' ? resultid  : '281256182';

    return (
        <div >
            <EmailShareButton           url={ 'https://www.hpgspectra.com/?virt=' + virt + '&item=' + prod } ><EmailIcon     size={ 32 } round={ true } /></EmailShareButton>
            <FacebookShareButton        url={ 'https://www.hpgspectra.com/?virt=' + virt + '&item=' + prod } ><FacebookIcon  size={ 32 } round={ true } /></FacebookShareButton>
            <LinkedinShareButton        url={ 'https://www.hpgspectra.com/?virt=' + virt + '&item=' + prod } ><LinkedinIcon  size={ 32 } round={ true } /></LinkedinShareButton>
            <TwitterShareButton         url={ 'https://www.hpgspectra.com/?virt=' + virt + '&item=' + prod } ><TwitterIcon   size={ 32 } round={ true } /></TwitterShareButton>
        </div>
    );
};