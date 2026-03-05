// src/screens/TrackScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  StatusBar, Linking, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Shadow } from '../theme';
import { ORDER_STATUSES } from '../utils/data';
import { listenToOrder } from '../services/firebase';
import { useStore } from '../store';

const MOCK_STEPS = [
  { key: 'pending', label: 'Order Placed', sub: 'Confirmed & agent being assigned', time: '10:15 AM', done: true },
  { key: 'assigned', label: 'Agent Assigned', sub: 'Rajesh Kumar is heading to your location', time: '10:22 AM', done: true },
  { key: 'picked_up', label: 'Clothes Picked Up', sub: 'Collected from your address', time: '11:05 AM', done: true },
  { key: 'processing', label: 'At Shop — Processing', sub: 'Prestige Cleaners is cleaning your garments', time: 'In progress', done: false, active: true },
  { key: 'ready', label: 'Ready for Delivery', sub: 'Packed and ready', time: '', done: false },
  { key: 'out_for_delivery', label: 'Out for Delivery', sub: 'Agent on the way', time: '', done: false },
  { key: 'delivered', label: 'Delivered ✨', sub: 'Fresh clothes at your door', time: '', done: false },
];

export default function TrackScreen({ route, navigation }: any) {
  const { activeOrderId } = useStore();
  const [order, setOrder] = useState<any>(null);
  const orderId = route.params?.orderId || activeOrderId || 'PC-8821-BPL';

  useEffect(() => {
    if (!activeOrderId) return;
    const unsub = listenToOrder(activeOrderId, (data) => setOrder(data));
    return unsub;
  }, [activeOrderId]);

  const callAgent = () => Linking.openURL('tel:+919876543210');
  const chatAgent = () => Alert.alert('Chat', 'Opening chat with Rajesh...');

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />

      {/* Hero */}
      <View style={s.hero}>
        <Text style={s.heroLabel}>LIVE TRACKING</Text>
        <Text style={s.heroId}>Order #{orderId}</Text>
        <View style={s.statusBadge}>
          <Text style={s.statusText}>● Processing at Shop</Text>
        </View>
        <Text style={s.eta}>Today, <Text style={s.etaTime}>5:30 PM</Text></Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        {/* Timeline card */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Order Timeline</Text>
          <View style={s.timeline}>
            {MOCK_STEPS.map((step, i) => (
              <View key={step.key} style={s.tlStep}>
                {/* Line */}
                {i < MOCK_STEPS.length - 1 && (
                  <View style={[s.tlLine, step.done && s.tlLineDone]} />
                )}
                {/* Dot */}
                <View style={[s.tlDot, step.done && s.tlDotDone, (step as any).active && s.tlDotActive]}>
                  {step.done && <Text style={{ color: '#fff', fontSize: 9, fontWeight: '700' }}>✓</Text>}
                  {(step as any).active && <View style={s.tlDotPulse} />}
                </View>
                {/* Content */}
                <View style={s.tlContent}>
                  <Text style={[s.tlTitle, !step.done && !(step as any).active && { color: Colors.muted }]}>
                    {step.label}
                  </Text>
                  <Text style={s.tlSub}>{step.sub}</Text>
                  {step.time !== '' && (
                    <Text style={[s.tlTime, (step as any).active && { color: Colors.gold }]}>
                      {step.time}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Agent card */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Your Delivery Agent</Text>
          <View style={s.agentRow}>
            <View style={s.agentAvatar}>
              <Text style={{ fontSize: 24 }}>👨</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.agentName}>Rajesh Kumar</Text>
              <Text style={s.agentMeta}>Delivery Agent · 3.2 km away</Text>
              <Text style={s.agentRating}>⭐ 4.8 (248 deliveries)</Text>
            </View>
            <View style={s.agentBtns}>
              <TouchableOpacity style={s.agentBtn} onPress={callAgent}>
                <Text style={{ fontSize: 16 }}>📞</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.agentBtn} onPress={chatAgent}>
                <Text style={{ fontSize: 16 }}>💬</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={s.etaBar}>
            <View>
              <Text style={s.etaBarLabel}>Estimated Delivery</Text>
              <Text style={s.etaBarVal}>Today, 5:30 PM</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.etaBarLabel}>Distance</Text>
              <Text style={s.etaBarVal2}>3.2 km</Text>
            </View>
          </View>
        </View>

        {/* Order items */}
        <View style={s.card}>
          <Text style={s.cardTitle}>📦 Order Items</Text>
          {[
            { icon: '👔', name: 'Shirt Ironing × 3', amt: '₹75' },
            { icon: '🧥', name: 'Suit Dry Clean × 1', amt: '₹350' },
            { icon: '🚚', name: 'Pickup & Delivery', amt: '₹40' },
          ].map(item => (
            <View key={item.name} style={s.itemRow}>
              <Text style={s.itemLabel}>{item.icon} {item.name}</Text>
              <Text style={s.itemAmt}>{item.amt}</Text>
            </View>
          ))}
          <View style={s.itemTotal}>
            <Text style={s.itemTotalLabel}>Total Paid</Text>
            <Text style={s.itemTotalAmt}>₹465</Text>
          </View>
        </View>

        {/* Help */}
        <View style={[s.card, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
          <Text style={{ fontSize: 28 }}>🆘</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', fontSize: 14 }}>Need help?</Text>
            <Text style={{ color: Colors.muted, fontSize: 12, marginTop: 2 }}>Contact support for any issues with your order</Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14 }}
            onPress={() => Linking.openURL('tel:+918001234567')}
          >
            <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 12 }}>Call</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },

  hero: { backgroundColor: Colors.ink, padding: Spacing.xl, paddingBottom: 28 },
  heroLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 4 },
  heroId: { fontFamily: 'Courier New', color: Colors.gold, fontSize: 14, marginBottom: 10 },
  statusBadge: {
    alignSelf: 'flex-start', borderRadius: 100,
    paddingVertical: 5, paddingHorizontal: 12, marginBottom: 12,
    backgroundColor: 'rgba(20,160,150,0.15)', borderWidth: 1, borderColor: 'rgba(20,160,150,0.3)',
  },
  statusText: { color: Colors.teal2, fontSize: 12, fontWeight: '600' },
  eta: { color: Colors.white, fontSize: 26, fontFamily: 'Georgia', fontWeight: '700' },
  etaTime: { color: Colors.gold },

  card: {
    backgroundColor: Colors.white, borderRadius: 18, padding: Spacing.lg,
    marginHorizontal: Spacing.lg, marginTop: Spacing.lg,
    borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft,
  },
  cardTitle: { fontWeight: '700', fontSize: 14, color: Colors.ink, marginBottom: 16 },

  // Timeline
  timeline: { paddingLeft: 36 },
  tlStep: { position: 'relative', paddingBottom: 20 },
  tlLine: {
    position: 'absolute', left: -22, top: 16, bottom: 0, width: 2,
    backgroundColor: Colors.border,
  },
  tlLineDone: { backgroundColor: Colors.green },
  tlDot: {
    position: 'absolute', left: -28, top: 2,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: Colors.border, borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  tlDotDone: { backgroundColor: Colors.green, borderColor: Colors.green },
  tlDotActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  tlDotPulse: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.ink,
  },
  tlContent: {},
  tlTitle: { fontWeight: '600', fontSize: 14, color: Colors.ink },
  tlSub: { color: Colors.muted, fontSize: 12, marginTop: 2 },
  tlTime: { color: Colors.teal, fontSize: 11, fontFamily: 'Courier New', marginTop: 2 },

  // Agent
  agentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.paper, borderRadius: 12, padding: 12, marginBottom: 12 },
  agentAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#1c2333', alignItems: 'center', justifyContent: 'center' },
  agentName: { fontWeight: '700', fontSize: 15 },
  agentMeta: { color: Colors.muted, fontSize: 12, marginTop: 2 },
  agentRating: { color: Colors.gold, fontSize: 12, fontWeight: '600', marginTop: 2 },
  agentBtns: { gap: 8 },
  agentBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  etaBar: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(200,168,75,0.08)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(200,168,75,0.2)' },
  etaBarLabel: { fontSize: 11, color: Colors.muted },
  etaBarVal: { color: Colors.gold, fontWeight: '700', fontSize: 16, marginTop: 3 },
  etaBarVal2: { fontWeight: '700', fontSize: 15, marginTop: 3 },

  // Items
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  itemLabel: { fontSize: 13, color: Colors.ink },
  itemAmt: { fontWeight: '700', color: Colors.teal },
  itemTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12 },
  itemTotalLabel: { fontWeight: '700', fontSize: 15 },
  itemTotalAmt: { color: Colors.teal, fontWeight: '700', fontSize: 20 },
});
