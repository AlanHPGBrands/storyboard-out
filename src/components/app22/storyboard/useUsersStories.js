import { useState, useEffect } from 'react';
import API , { graphqlOperation } from '@aws-amplify/api-graphql';
import * as queries from '../../../graphql/queries';

export function useUsersStories(email) {
  const [usersStories, setUsersStories] = useState(null);
  useEffect(() => {
    function handleStoriesGrabbed(stories) { setUsersStories(stories); };
    async function doQuery(emarley){
      API.graphql(graphqlOperation(queries.storyByEmail,{email:emarley,sortDirection:'DESC'}))
      .then(res=>{
        console.log(res);
        handleStoriesGrabbed(res.data.storyByEmail.items);
      })
      .catch(e=>{console.log(e)});
    };
    if (email) { doQuery(email); };
  },[email]);
  if (usersStories === null) { return 'Loading...'; }
  return usersStories;
};