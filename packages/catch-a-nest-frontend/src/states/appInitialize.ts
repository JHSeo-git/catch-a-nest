import { MutableSnapshot } from 'recoil';
import userStorage from '../lib/storage/userStorage';
import { userState } from './authState';

export default function appInitialize({ set }: MutableSnapshot) {
  const user = userStorage.get();
  if (user) {
    set(userState, user);
  }
}
