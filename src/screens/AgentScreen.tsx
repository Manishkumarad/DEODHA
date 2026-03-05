// src/screens/AgentScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, Alert, Switch, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Shadow } from '../theme';

export default function AgentScreen() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />

      {/* Hero */}
      <View style={s.hero}>
        <View style={s.heroTop}>
          <View>
            <Text style={s.heroLabel}>DELIVERY AGENT</Text>
            <Text style={s.heroName}>Welcome, Rajesh 👋</Text>
          </View>
          <TouchableOpacity
            style={[s.onlineToggle, { backgroundColor: isOnline ? 'rgba(40,118,74,0.2)' : 'rgba(201,64,64,0.2)' }]}
            onPress={() => setIsOnline(v => !v)}
          >
            <View style={[s.onlineDot, { backgroundColor: isOnline ? Colors.green : Colors.red }]} />
            <Text style={[s.onlineLabel, { color: isOnline ? '#7ef7a0' : '#ffb0b0' }]}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: Colors.red, true: Colors.green }}
              thumbColor={Colors.white}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </TouchableOpacity>
        </View>
        <View style={s.statsRow}>
          {[['7', 'Deliveries\nToday'], ['₹840', 'Earned\nToday'], ['4.9★', 'Your\nRating']].map(([n, l]) => (
            <View key={l} style={s.stat}>
              <Text style={s.statN}>{n}</Text>
              <Text style={s.statL}>{l}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={s.body}>

          {/* New assignment */}
          <Text style={s.sectionLabel}>🔔 New Assignment</Text>
          <View style={s.assignCard}>
            <View style={s.assignTop}>
              <View>
                <Text style={s.assignId}>#PC-8824-BPL</Text>
                <Text style={s.assignTitle}>Pickup from Customer</Text>
              </View>
              <View style={s.urgentBadge}><Text style={s.urgentText}>⚡ Express</Text></View>
            </View>

            <Text style={s.assignItems}>👗 Saree ×2  ·  👔 Shirts ×5  ·  💰 ₹540</Text>

            <View style={s.routeBox}>
              <View style={{ flex: 1 }}>
                <Text style={s.routeLabel}>PICKUP</Text>
                <Text style={s.routeAddr}>42, MP Nagar Zone 1</Text>
              </View>
              <Text style={s.routeArrow}>→</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={s.routeLabel}>DROP AT SHOP</Text>
                <Text style={[s.routeAddr, { textAlign: 'right' }]}>Prestige Cleaners</Text>
              </View>
            </View>

            <Text style={s.assignInfo}>📍 3.2 km · ~12 min · Pickup by 2:00 PM</Text>

            <View style={s.assignBtns}>
              <TouchableOpacity
                style={s.acceptBtn}
                onPress={() => Alert.alert('✅ Accepted', 'Navigate to customer location.')}
              >
                <Text style={s.acceptBtnText}>✅  Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.declineBtn}
                onPress={() => Alert.alert('Declined', 'Assignment declined.')}
              >
                <Text style={s.declineBtnText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Active delivery */}
          <Text style={[s.sectionLabel, { marginTop: 16 }]}>🚗 Active Delivery</Text>
          <View style={[s.assignCard, { borderColor: Colors.teal + '60' }]}>
            <View style={s.assignTop}>
              <View>
                <Text style={s.assignId}>#PC-8820-BPL</Text>
                <Text style={s.assignTitle}>Deliver to Customer</Text>
              </View>
              <View style={[s.urgentBadge, { backgroundColor: `${Colors.green}22`, borderColor: `${Colors.green}44` }]}>
                <Text style={[s.urgentText, { color: Colors.green }]}>Ready ✓</Text>
              </View>
            </View>

            <View style={s.routeBox}>
              <View style={{ flex: 1 }}>
                <Text style={s.routeLabel}>FROM SHOP</Text>
                <Text style={s.routeAddr}>Prestige Cleaners</Text>
              </View>
              <Text style={s.routeArrow}>→</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={s.routeLabel}>DELIVER TO</Text>
                <Text style={[s.routeAddr, { textAlign: 'right' }]}>Priya K., Arera Colony</Text>
              </View>
            </View>

            <Text style={s.assignInfo}>📍 4.1 km · ~18 min · Deliver by 5:30 PM</Text>

            <View style={s.assignBtns}>
              <TouchableOpacity
                style={[s.acceptBtn, { flex: 1 }]}
                onPress={() => Linking.openURL('https://maps.google.com/?q=Arera+Colony+Bhopal')}
              >
                <Text style={s.acceptBtnText}>🗺  Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.acceptBtn, { backgroundColor: Colors.gold, flex: 1 }]}
                onPress={() => Alert.alert('✅ Delivered', 'Order marked as delivered!')}
              >
                <Text style={[s.acceptBtnText, { color: Colors.ink }]}>Mark Done</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Earnings */}
          <View style={s.earnCard}>
            <Text style={[s.sectionLabel, { color: Colors.white, marginBottom: 14, marginTop: 0 }]}>💰 Your Earnings</Text>
            <View style={s.earnGrid}>
              {[['₹840', 'Today'], ['₹18,400', 'This Month'], ['248', 'Total Rides'], ['4.9★', 'Rating']].map(([n, l]) => (
                <View key={l} style={s.earnStat}>
                  <Text style={s.earnN}>{n}</Text>
                  <Text style={s.earnL}>{l}</Text>
                </View>
              ))}
            </View>
            <View style={s.earnNote}>
              <Text style={s.earnNoteText}>Base ₹80/delivery · Express bonus ₹20 · Fuel ₹5/km</Text>
            </View>
          </View>

          {/* Today's deliveries log */}
          <View style={s.logCard}>
            <Text style={s.logTitle}>Today's Completed</Text>
            {[
              { id: '#PC-8816', cust: 'Anjali M.', time: '9:30 AM', earn: '₹80' },
              { id: '#PC-8814', cust: 'Ravi S.', time: '11:15 AM', earn: '₹100' },
              { id: '#PC-8812', cust: 'Geeta P.', time: '1:40 PM', earn: '₹80' },
            ].map(d => (
              <View key={d.id} style={s.logRow}>
                <View style={s.logDot} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={s.logId}>{d.id} · {d.cust}</Text>
                  <Text style={s.logTime}>{d.time}</Text>
                </View>
                <Text style={s.logEarn}>{d.earn}</Text>
              </View>
            ))}
          </View>

        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  hero: { backgroundColor: Colors.ink, padding: Spacing.xl, paddingBottom: 20 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  heroLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' },
  heroName: { color: Colors.white, fontSize: 22, fontFamily: 'Georgia', fontWeight: '700', marginTop: 4 },
  onlineToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 100, paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  onlineDot: { width: 8, height: 8, borderRadius: 4 },
  onlineLabel: { fontSize: 12, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  statN: { color: Colors.gold, fontFamily: 'Georgia', fontWeight: '700', fontSize: 20 },
  statL: { color: 'rgba(255,255,255,0.35)', fontSize: 10, marginTop: 2, textAlign: 'center' },

  body: { padding: Spacing.lg },
  sectionLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, color: Colors.muted, marginBottom: 8 },

  assignCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 14, marginBottom: 4,
    borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft,
  },
  assignTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  assignId: { fontFamily: 'Courier New', fontSize: 11, color: Colors.muted },
  assignTitle: { fontWeight: '700', fontSize: 15, marginTop: 2 },
  urgentBadge: { backgroundColor: `${Colors.red}22`, borderWidth: 1, borderColor: `${Colors.red}44`, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 },
  urgentText: { fontSize: 11, fontWeight: '700', color: Colors.red },
  assignItems: { fontSize: 12, color: Colors.muted, marginBottom: 10 },
  routeBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.paper, borderRadius: 12, padding: 12, marginBottom: 8,
  },
  routeLabel: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, color: Colors.muted },
  routeAddr: { fontWeight: '600', fontSize: 13, marginTop: 3 },
  routeArrow: { color: Colors.teal, fontSize: 18, marginHorizontal: 8 },
  assignInfo: { fontSize: 12, color: Colors.muted, marginBottom: 10 },
  assignBtns: { flexDirection: 'row', gap: 8 },
  acceptBtn: { flex: 2, backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 11, alignItems: 'center' },
  acceptBtnText: { color: Colors.white, fontWeight: '700', fontSize: 13 },
  declineBtn: { borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingVertical: 11, paddingHorizontal: 16, alignItems: 'center' },
  declineBtnText: { color: Colors.muted, fontWeight: '500', fontSize: 13 },

  earnCard: { backgroundColor: Colors.ink, borderRadius: 16, padding: 14, marginTop: 16, marginBottom: 14 },
  earnGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  earnStat: { width: '47%', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 12, alignItems: 'center' },
  earnN: { color: Colors.gold, fontFamily: 'Georgia', fontWeight: '700', fontSize: 22 },
  earnL: { color: 'rgba(255,255,255,0.35)', fontSize: 10, marginTop: 2 },
  earnNote: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 10 },
  earnNoteText: { color: 'rgba(255,255,255,0.3)', fontSize: 11, textAlign: 'center' },

  logCard: { backgroundColor: Colors.white, borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft },
  logTitle: { padding: 12, fontWeight: '700', fontSize: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  logRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  logDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.green },
  logId: { fontWeight: '600', fontSize: 12 },
  logTime: { color: Colors.muted, fontSize: 11, marginTop: 2 },
  logEarn: { color: Colors.gold, fontWeight: '700', fontSize: 14 },
});
