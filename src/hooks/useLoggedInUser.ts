import { useSelector } from 'react-redux';
import { makeSelectUser } from 'redux/auth/selectors';
import { UserType } from 'redux/auth/types';

interface HookLoggedInUserType {
  isLoggedIn: boolean;
  user: UserType | null;
}

const useLoggedInUser = (): HookLoggedInUserType => {
  const loggedInUser = useSelector(makeSelectUser);
  return {
    isLoggedIn: !!loggedInUser,
    user: loggedInUser,
  };
};

export default useLoggedInUser;
