// App.tsx
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { onAuthStateChanged, getUserProfile } from './src/services/firebase';
import { useStore } from './src/store';

export default function App() {
  const { setUser } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser(profile as any);
        } else {
          setUser({
            uid: firebaseUser.uid,
            phone: firebaseUser.phoneNumber || '',
            role: 'customer',
          });
        }
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
