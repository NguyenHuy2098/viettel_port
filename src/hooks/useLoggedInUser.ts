import { useSelector } from 'react-redux';
import { User } from 'oidc-client';
import { makeSelectorUser } from 'redux/auth/selectors';

interface HookLoggedInUserType {
  isLoggedIn: boolean;
  user: User | undefined;
}

const useLoggedInUser = (): HookLoggedInUserType => {
  const loggedInUser = useSelector(makeSelectorUser);
  return {
    isLoggedIn: !!loggedInUser,
    user: loggedInUser,
  };
};

export default useLoggedInUser;
