import AsyncStorage from '@react-native-community/async-storage';
import create from 'zustand';
import {persist} from 'zustand/middleware';
import {createAuthSlice} from './createAuthSlice';
import {createApplicationSlice} from './createApplicationSlice';

export const useStore = create(
  persist(
    (set, get, api) => ({
      ...createAuthSlice(set, get, api),
      ...createApplicationSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
