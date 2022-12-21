import React from 'react';
import UserStoriesList from './listOfUsersStories';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useUsersStories} from './useUsersStories';

export default function UserProfileThingy({storyUser,openProp=false,setOpenProp}){
    console.log(storyUser);
    const usersStories=useUsersStories(storyUser&&storyUser.email);
   return(
    <Row >
        <Col>
            {storyUser&&typeof storyUser!=='undefined'&&storyUser.email&&typeof storyUser.email!=='undefined'
                &&<Row>
                    <Col>
                    {usersStories&&typeof usersStories!=='undefined'&&openProp
                    &&<UserStoriesList handleClose={setOpenProp} setOpenProp={setOpenProp} usersStories={usersStories} />}
                    </Col>
                </Row>}
        </Col>
    </Row>
);
};