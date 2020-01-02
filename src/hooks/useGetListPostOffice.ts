import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import axios from 'axios';

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

interface DataType {
  Username: string;
  BPOrg: string;
}

function useGetListPostOffice(data: DataType): { profileUser: ProfileUserType | null } {
  const [profileUser, setProfileUser] = useState(null);
  const userLogin = useSelector(state => get(state, 'auth.user', null));

  useEffect(() => {
    axios
      .request({
        url: 'https://prigw.viettelpost.vn/api/Users/GetProfileByUsername',
        headers: {
          Authorization: 'Bearer ' + get(userLogin, 'user.access_token', ''),
        },
        method: 'post',
        data,
      })
      .then(res => {
        setProfileUser(get(res, 'data', null));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return { profileUser };
}

export default useGetListPostOffice;
