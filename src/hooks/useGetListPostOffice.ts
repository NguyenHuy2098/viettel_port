import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { ssoApi } from '../utils/request';

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
    ssoApi.post('Users/GetProfileByUsername', data).then(res => {
      setProfileUser(get(res, 'data', null));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return profileUser;
}

export default useGetListPostOffice;
