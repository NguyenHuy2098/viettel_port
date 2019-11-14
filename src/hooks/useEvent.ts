import { useEffect } from 'react';
import emitter from 'utils/emitter';

export default function useEvent(event: string, handleData: Function): void {
  useEffect(() => {
    const token = emitter.addListener(event, handleData);
    return (): void => token.remove();
  }, [event, handleData]);
}
