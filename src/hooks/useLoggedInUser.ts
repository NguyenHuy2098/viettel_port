import { useSelector } from 'react-redux';
import { User } from 'oidc-client';
import { makeSelectUser } from 'redux/auth/selectors';

interface HookLoggedInUserType {
  isLoggedIn: boolean;
  user: User | undefined;
}

const useLoggedInUser = (): HookLoggedInUserType => {
  const loggedInUser = useSelector(makeSelectUser);
  return {
    isLoggedIn: !!loggedInUser,
    user: loggedInUser,
  };
};

export default useLoggedInUser;
