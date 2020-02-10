import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { get } from 'lodash';
import url from 'url';
import { REACT_APP_SSO_API_URL } from 'utils/env';

interface PostOfficeType {
  PostOfficeCode: string;
  PostOfficeName: string;
}

interface ProfileUserType {
  BPCode: string;
  BPOrg: string;
  Roles: string[];
  PostOffices: PostOfficeType[];
}

function useGetListPostOffice(): ProfileUserType | null {
  const [profileUser, setProfileUser] = useState(null);
  const userLogin = useSelector(state => get(state, 'auth.user', null));
  const data = {
    Username: get(userLogin, 'profile.preferred_username', ''),
    BPOrg: get(userLogin, 'profile.bporg', ''),
  };

  useEffect(() => {
    axios
      .request({
        url: url.resolve(REACT_APP_SSO_API_URL, 'Users/GetProfileByUsername'),
        headers: {
          Authorization: 'Bearer ' + get(userLogin, 'access_token', ''),
        },
        method: 'post',
        data,
      })
      .then(res => {
        setProfileUser(get(res, 'data', null));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return profileUser;
}

export default useGetListPostOffice;
