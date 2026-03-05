// src/navigation/AppNavigator.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ShopsScreen from '../screens/ShopsScreen';
import OrderScreen from '../screens/OrderScreen';
import TrackScreen from '../screens/TrackScreen';
import VendorScreen from '../screens/VendorScreen';
import AgentScreen from '../screens/AgentScreen';
import AuthScreen from '../screens/AuthScreen';

import { Colors } from '../theme';
import { useStore } from '../store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ── Custom Tab Bar ──────────────────────────────────────────
function CustomTabBar({ state, descriptors, navigation }: any) {
  const { cart } = useStore();

  const tabs = [
    { name: 'Home', icon: '🏠', label: 'Home' },
    { name: 'Shops', icon: '🗺️', label: 'Shops' },
    { name: 'Order', icon: '📦', label: 'Book', badge: cart.length > 0 ? cart.length : null },
    { name: 'Track', icon: '🚚', label: 'Track' },
    { name: 'Vendor', icon: '🏪', label: 'Vendor' },
    { name: 'Agent', icon: '🛵', label: 'Agent' },
    { name: 'Auth', icon: '👤', label: 'Sign In' },
  ];

  return (
    <View style={tb.container}>
      {tabs.map((tab, index) => {
        const focused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[tb.tab, focused && tb.tabActive]}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <View style={tb.iconWrap}>
              <Text style={[tb.icon, !focused && tb.iconInactive]}>{tab.icon}</Text>
              {tab.badge != null && (
                <View style={tb.badge}>
                  <Text style={tb.badgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[tb.label, focused && tb.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const tb = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.ink,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200,168,75,0.15)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 6,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 4, borderRadius: 10,
  },
  tabActive: { backgroundColor: 'rgba(200,168,75,0.1)' },
  iconWrap: { position: 'relative' },
  icon: { fontSize: 20 },
  iconInactive: { opacity: 0.35 },
  badge: {
    position: 'absolute', top: -4, right: -8,
    backgroundColor: Colors.red, borderRadius: 8,
    minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  label: { fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 3, fontWeight: '500' },
  labelActive: { color: Colors.gold },
});

// ── Tab Navigator ───────────────────────────────────────────
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shops" component={ShopsScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Vendor" component={VendorScreen} />
      <Tab.Screen name="Agent" component={AgentScreen} />
      <Tab.Screen name="Auth" component={AuthScreen} />
    </Tab.Navigator>
  );
}

// ── Root Stack ──────────────────────────────────────────────
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
