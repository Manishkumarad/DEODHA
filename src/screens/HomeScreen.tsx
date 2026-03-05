// src/screens/HomeScreen.tsx
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  FlatList, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { SHOPS, SERVICES } from '../utils/data';
import { useStore } from '../store';

const { width } = Dimensions.get('window');

const QUICK = SERVICES.slice(0, 8);

export default function HomeScreen({ navigation }: any) {
  const { user, cart } = useStore();

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── HERO ── */}
        <View style={s.hero}>
          <View style={s.heroTop}>
            <View>
              <Text style={s.greeting}>Good morning 🌅</Text>
              <Text style={s.heroName}>{user?.name || 'Bhopal'}</Text>
            </View>
            <TouchableOpacity style={s.locBadge}>
              <Text style={s.locDot}>●</Text>
              <Text style={s.locText}>MP Nagar</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.heroHeadline}>
            Premium laundry,{'\n'}<Text style={s.heroAccent}>at your door.</Text>
          </Text>
          <Text style={s.heroSub}>
            Dry cleaning & ironing picked up and delivered in Bhopal
          </Text>

          <View style={s.heroBtns}>
            <TouchableOpacity
              style={s.btnGold}
              onPress={() => navigation.navigate('Order')}
              activeOpacity={0.85}
            >
              <Text style={s.btnGoldText}>📦  Book Pickup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.btnGhost}
              onPress={() => navigation.navigate('Shops')}
              activeOpacity={0.85}
            >
              <Text style={s.btnGhostText}>🗺  Browse Shops</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={s.statsRow}>
            {[['48+', 'Shops'], ['12K', 'Customers'], ['4.9★', 'Rating'], ['2hr', 'Express']].map(([n, l]) => (
              <View key={l} style={s.stat}>
                <Text style={s.statN}>{n}</Text>
                <Text style={s.statL}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── QUICK SERVICES ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Quick Services</Text>
          <View style={s.quickGrid}>
            {QUICK.map(svc => (
              <TouchableOpacity
                key={svc.id}
                style={[s.quickItem, { backgroundColor: svc.color }]}
                onPress={() => navigation.navigate('Order')}
                activeOpacity={0.8}
              >
                <Text style={s.quickIcon}>{svc.icon}</Text>
                <Text style={s.quickName}>{svc.name}</Text>
                <Text style={s.quickPrice}>₹{svc.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── NEARBY SHOPS ── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Nearby Shops</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Shops')}>
            <Text style={s.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={SHOPS.filter(s => s.isOpen).slice(0, 5)}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.shopStrip}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.shopMini}
              onPress={() => navigation.navigate('Order', { shopId: item.id })}
              activeOpacity={0.85}
            >
              <View style={[s.shopMiniImg, { backgroundColor: item.bgColor }]}>
                <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
                <View style={[s.openBadge, { backgroundColor: item.isOpen ? '#1a4a2a' : '#4a1a1a' }]}>
                  <Text style={[s.openText, { color: item.isOpen ? '#7ef7a0' : '#ffc0c0' }]}>
                    {item.isOpen ? '● Open' : '● Closed'}
                  </Text>
                </View>
              </View>
              <View style={s.shopMiniBody}>
                <Text style={s.shopMiniName} numberOfLines={1}>{item.name}</Text>
                <Text style={s.shopMiniMeta}>⏰ {item.openTime}–{item.closeTime}</Text>
                <View style={s.distBadge}>
                  <Text style={s.distText}>📍 {item.distance} km</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* ── HOW IT WORKS ── */}
        <View style={s.howSection}>
          <Text style={[s.sectionTitle, { color: Colors.white, marginBottom: 16 }]}>How it works</Text>
          {[
            { n: '1', icon: '📱', title: 'Choose & Book', desc: 'Select services, pick a shop, schedule slot' },
            { n: '2', icon: '🚗', title: 'We Pick Up', desc: 'Agent collects clothes from your doorstep' },
            { n: '3', icon: '🧺', title: 'Expert Care', desc: 'Your chosen shop cleans and presses' },
            { n: '4', icon: '✨', title: 'Delivered Fresh', desc: 'Clothes returned spotless to your door' },
          ].map(step => (
            <View key={step.n} style={s.howStep}>
              <View style={s.howNum}><Text style={s.howNumText}>{step.n}</Text></View>
              <Text style={s.howIcon}>{step.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.howTitle}>{step.title}</Text>
                <Text style={s.howDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },

  // Hero
  hero: { backgroundColor: Colors.ink, padding: Spacing.xl, paddingBottom: 28 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: 0.5 },
  heroName: { color: Colors.white, fontSize: 18, fontWeight: '700', marginTop: 2 },
  locBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  locDot: { color: Colors.gold, fontSize: 8 },
  locText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },

  heroHeadline: { color: Colors.white, fontSize: 28, fontFamily: 'Georgia', fontWeight: '700', lineHeight: 34, marginBottom: 8 },
  heroAccent: { color: Colors.gold },
  heroSub: { color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 19, marginBottom: 20 },

  heroBtns: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  btnGold: { flex: 1, backgroundColor: Colors.gold, borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  btnGoldText: { color: Colors.ink, fontWeight: '700', fontSize: 14 },
  btnGhost: {
    flex: 1, borderRadius: 12, paddingVertical: 13,
    alignItems: 'center', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  btnGhostText: { color: 'rgba(255,255,255,0.75)', fontWeight: '500', fontSize: 14 },

  statsRow: {
    flexDirection: 'row', borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 16, gap: 8,
  },
  stat: { flex: 1, alignItems: 'center' },
  statN: { color: Colors.gold, fontSize: 18, fontFamily: 'Georgia', fontWeight: '700' },
  statL: { color: 'rgba(255,255,255,0.35)', fontSize: 10, marginTop: 2 },

  // Sections
  section: { padding: Spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, marginTop: Spacing.md },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.ink },
  seeAll: { color: Colors.teal, fontSize: 13, fontWeight: '600' },

  // Quick grid
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  quickItem: {
    width: (width - Spacing.xl * 2 - 30) / 4,
    borderRadius: 14, padding: 10, alignItems: 'center',
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.06)',
  },
  quickIcon: { fontSize: 22, marginBottom: 4 },
  quickName: { fontSize: 10, fontWeight: '600', color: Colors.ink, textAlign: 'center', lineHeight: 13 },
  quickPrice: { fontSize: 10, color: Colors.teal, fontWeight: '700', marginTop: 2 },

  // Shop strip
  shopStrip: { paddingHorizontal: Spacing.xl, paddingVertical: 12, gap: 12 },
  shopMini: {
    width: 170, backgroundColor: Colors.white,
    borderRadius: 16, overflow: 'hidden',
    borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft,
  },
  shopMiniImg: {
    height: 90, alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  openBadge: {
    position: 'absolute', top: 6, right: 6,
    borderRadius: 100, paddingVertical: 2, paddingHorizontal: 7,
  },
  openText: { fontSize: 9, fontWeight: '700' },
  shopMiniBody: { padding: 10 },
  shopMiniName: { fontSize: 12, fontWeight: '700', color: Colors.ink, marginBottom: 3 },
  shopMiniMeta: { fontSize: 10, color: Colors.muted },
  distBadge: {
    backgroundColor: 'rgba(200,168,75,0.12)', borderRadius: 6,
    paddingVertical: 3, paddingHorizontal: 7, marginTop: 6, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: 'rgba(200,168,75,0.25)',
  },
  distText: { fontSize: 10, color: '#7a5e10', fontWeight: '600' },

  // How it works
  howSection: { backgroundColor: Colors.ink, padding: Spacing.xl, margin: Spacing.xl, borderRadius: 20 },
  howStep: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    marginBottom: 16, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  howNum: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(200,168,75,0.15)',
    borderWidth: 1.5, borderColor: 'rgba(200,168,75,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  howNumText: { color: Colors.gold, fontFamily: 'Georgia', fontWeight: '700', fontSize: 14 },
  howIcon: { fontSize: 20, marginTop: 4 },
  howTitle: { color: Colors.white, fontWeight: '600', fontSize: 14 },
  howDesc: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 3, lineHeight: 17 },
});
