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

export default function Sharer(props) {
    const {
        styleFromAbove,
        url='https://www.storyboard.plus/?story',
        noEmail,noFacebook,noLinkedIn,noTwitter,
    } = props;

    let steely = typeof styleFromAbove!=='undefined'?styleFromAbove:undefined;

    return (
        <div style={steely}>
            {!noEmail&&     <EmailShareButton    url={url} ><EmailIcon     size={ 32 } round={ true } /></EmailShareButton>}
            {!noFacebook&&  <FacebookShareButton url={url} ><FacebookIcon  size={ 32 } round={ true } /></FacebookShareButton>}
            {!noLinkedIn&&  <LinkedinShareButton url={url} ><LinkedinIcon  size={ 32 } round={ true } /></LinkedinShareButton>}
            {!noTwitter&&   <TwitterShareButton  url={url} ><TwitterIcon   size={ 32 } round={ true } /></TwitterShareButton>}
        </div>
    );
};