// src/screens/VendorScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Shadow } from '../theme';

const TABS = ['Dashboard', 'Orders', 'Pricing', 'Register'];

const SERVICES_PRICING = [
  { id: 'p1', icon: '👔', name: 'Shirt Ironing', price: '25', unit: '/piece' },
  { id: 'p2', icon: '👖', name: 'Trouser Iron', price: '30', unit: '/piece' },
  { id: 'p3', icon: '🧥', name: 'Suit Dry Clean', price: '350', unit: '/set' },
  { id: 'p4', icon: '👗', name: 'Saree DC', price: '200', unit: '/piece' },
  { id: 'p5', icon: '🛏️', name: 'Bedsheet Wash', price: '80', unit: '/piece' },
  { id: 'p6', icon: '🎭', name: 'Curtain Wash', price: '120', unit: '/panel' },
];

const ORDERS = [
  { id: '#PC-8821', customer: 'Rahul S.', services: 'Suit DC, 3×Shirt', amt: '₹465', status: 'processing', statusLabel: 'Processing', statusColor: Colors.teal },
  { id: '#PC-8820', customer: 'Priya K.', services: 'Saree DC ×2', amt: '₹440', status: 'ready', statusLabel: 'Ready', statusColor: Colors.green },
  { id: '#PC-8819', customer: 'Amit V.', services: '5×Shirt, 3×Trouser', amt: '₹265', status: 'done', statusLabel: 'Delivered', statusColor: Colors.muted },
  { id: '#PC-8818', customer: 'Meena R.', services: 'Curtains ×4', amt: '₹520', status: 'pending', statusLabel: 'Pending', statusColor: Colors.gold },
  { id: '#PC-8817', customer: 'Suresh P.', services: 'Bedsheets ×3', amt: '₹280', status: 'processing', statusLabel: 'Processing', statusColor: Colors.teal },
];

export default function VendorScreen() {
  const [tab, setTab] = useState('Dashboard');
  const [prices, setPrices] = useState(Object.fromEntries(SERVICES_PRICING.map(s => [s.id, s.price])));

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.shopRow}>
          <View style={s.shopAv}><Text style={{ fontSize: 24 }}>🧺</Text></View>
          <View>
            <Text style={s.shopName}>Prestige Dry Cleaners</Text>
            <Text style={s.shopBadge}>✅ Verified Partner · MP Nagar</Text>
          </View>
        </View>
        <View style={s.statsRow}>
          {[['4.9', 'Rating'], ['248', 'Reviews'], ['₹1.2L', 'Month'], ['89', 'Orders']].map(([n, l]) => (
            <View key={l} style={s.stat}><Text style={s.statN}>{n}</Text><Text style={s.statL}>{l}</Text></View>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabBar}>
        {TABS.map(t => (
          <TouchableOpacity key={t} style={[s.tabItem, tab === t && s.tabItemActive]} onPress={() => setTab(t)}>
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* DASHBOARD */}
        {tab === 'Dashboard' && (
          <View style={s.body}>
            <View style={s.statsGrid}>
              {[
                { label: "Today's Revenue", val: '₹4,280', change: '↑ 18%', up: true },
                { label: 'Active Orders', val: '12', change: '↑ 3 new', up: true },
                { label: 'Pending Pickup', val: '5', change: '→ Assign', up: null },
                { label: 'Avg Turnaround', val: '4.2h', change: '↑ Fast', up: true },
              ].map(sc => (
                <View key={sc.label} style={s.statCard}>
                  <Text style={s.scLabel}>{sc.label}</Text>
                  <Text style={s.scVal}>{sc.val}</Text>
                  <Text style={[s.scChange, sc.up === true && { color: Colors.green }, sc.up === false && { color: Colors.red }, sc.up === null && { color: Colors.gold }]}>
                    {sc.change}
                  </Text>
                </View>
              ))}
            </View>

            <View style={s.tableCard}>
              <Text style={s.tableTitle}>Recent Orders</Text>
              {ORDERS.slice(0, 4).map(o => (
                <View key={o.id} style={s.orderRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.orderId}>{o.id}</Text>
                    <Text style={s.orderCust}>{o.customer} · {o.services}</Text>
                  </View>
                  <Text style={s.orderAmt}>{o.amt}</Text>
                  <View style={[s.statusPill, { backgroundColor: o.statusColor + '22', borderColor: o.statusColor + '44' }]}>
                    <Text style={[s.statusPillText, { color: o.statusColor }]}>{o.statusLabel}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ORDERS */}
        {tab === 'Orders' && (
          <View style={s.body}>
            <View style={s.tableCard}>
              <Text style={s.tableTitle}>All Orders Today</Text>
              {ORDERS.map(o => (
                <TouchableOpacity key={o.id} style={s.orderRow} activeOpacity={0.7}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.orderId}>{o.id}</Text>
                    <Text style={s.orderCust}>{o.customer}</Text>
                    <Text style={[s.orderCust, { color: Colors.muted }]}>{o.services}</Text>
                  </View>
                  <View>
                    <Text style={[s.orderAmt, { textAlign: 'right' }]}>{o.amt}</Text>
                    <View style={[s.statusPill, { marginTop: 4, backgroundColor: o.statusColor + '22', borderColor: o.statusColor + '44' }]}>
                      <Text style={[s.statusPillText, { color: o.statusColor }]}>{o.statusLabel}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* PRICING */}
        {tab === 'Pricing' && (
          <View style={s.body}>
            <View style={[s.tableCard, { marginBottom: 0 }]}>
              <Text style={s.tableTitle}>💰 Your Service Pricing</Text>
              {SERVICES_PRICING.map(svc => (
                <View key={svc.id} style={s.priceRow}>
                  <Text style={s.priceName}>{svc.icon} {svc.name}</Text>
                  <View style={s.priceInputRow}>
                    <Text style={s.priceRs}>₹</Text>
                    <TextInput
                      style={s.priceInput}
                      value={prices[svc.id]}
                      onChangeText={v => setPrices(p => ({ ...p, [svc.id]: v }))}
                      keyboardType="number-pad"
                    />
                    <Text style={s.priceUnit}>{svc.unit}</Text>
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity style={s.saveBtn} onPress={() => Alert.alert('✅ Saved', 'Your prices are now live.')}>
              <Text style={s.saveBtnText}>Save Pricing</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* REGISTER */}
        {tab === 'Register' && (
          <View style={s.body}>
            <View style={s.regCard}>
              <Text style={s.regTitle}>🏪 Register Your Shop</Text>
              <Text style={s.regSub}>Join 48+ shops earning more with DCODHA</Text>
              {[
                { label: 'Shop Name', placeholder: 'Sharma Dry Cleaners' },
                { label: 'Owner Name', placeholder: 'Full name' },
                { label: 'Phone Number', placeholder: '+91 98765 43210', keyboard: 'phone-pad' },
                { label: 'Email', placeholder: 'shop@example.com', keyboard: 'email-address' },
                { label: 'Full Address', placeholder: 'Shop address with landmark' },
                { label: 'GST Number (Optional)', placeholder: '27XXXXX0000X1Z5' },
              ].map(f => (
                <View key={f.label} style={{ marginBottom: 12 }}>
                  <Text style={s.formLabel}>{f.label}</Text>
                  <TextInput
                    style={s.formInput}
                    placeholder={f.placeholder}
                    placeholderTextColor={Colors.muted}
                    keyboardType={(f as any).keyboard || 'default'}
                  />
                </View>
              ))}

              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={s.formLabel}>Opening Time</Text>
                  <TextInput style={s.formInput} placeholder="09:00" placeholderTextColor={Colors.muted} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.formLabel}>Closing Time</Text>
                  <TextInput style={s.formInput} placeholder="21:00" placeholderTextColor={Colors.muted} />
                </View>
              </View>

              <TouchableOpacity
                style={[s.saveBtn, { backgroundColor: Colors.gold }]}
                onPress={() => Alert.alert('🎉 Submitted!', 'We\'ll verify your shop within 24 hours.')}
              >
                <Text style={[s.saveBtnText, { color: Colors.ink }]}>🚀  Submit Registration</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: { backgroundColor: Colors.ink, padding: Spacing.xl, paddingBottom: 16 },
  shopRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  shopAv: { width: 52, height: 52, borderRadius: 14, backgroundColor: `${Colors.teal}44`, alignItems: 'center', justifyContent: 'center' },
  shopName: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  shopBadge: { color: Colors.gold, fontSize: 11, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 10, alignItems: 'center' },
  statN: { color: Colors.gold, fontFamily: 'Georgia', fontWeight: '700', fontSize: 18 },
  statL: { color: 'rgba(255,255,255,0.35)', fontSize: 10, marginTop: 2 },

  tabBar: { backgroundColor: Colors.ink, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  tabItem: { paddingVertical: 12, paddingHorizontal: 18, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabItemActive: { borderBottomColor: Colors.gold },
  tabText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '500' },
  tabTextActive: { color: Colors.gold },

  body: { padding: Spacing.lg },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  statCard: {
    width: '48%', backgroundColor: Colors.white, borderRadius: 14,
    padding: 12, borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft,
  },
  scLabel: { fontSize: 11, color: Colors.muted, fontWeight: '500', marginBottom: 6 },
  scVal: { fontSize: 24, fontFamily: 'Georgia', fontWeight: '700', color: Colors.ink },
  scChange: { fontSize: 11, marginTop: 4 },

  tableCard: { backgroundColor: Colors.white, borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft, marginBottom: 14 },
  tableTitle: { padding: 14, fontWeight: '700', fontSize: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  orderRow: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 10,
  },
  orderId: { fontFamily: 'Courier New', fontSize: 11, color: Colors.muted },
  orderCust: { fontWeight: '600', fontSize: 13, marginTop: 2 },
  orderAmt: { fontWeight: '700', color: Colors.teal, fontSize: 14, marginRight: 8 },
  statusPill: { borderRadius: 100, paddingVertical: 3, paddingHorizontal: 8, borderWidth: 1 },
  statusPillText: { fontSize: 10, fontWeight: '700' },

  // Pricing
  priceRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  priceName: { flex: 1, fontSize: 13, fontWeight: '500' },
  priceInputRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  priceRs: { color: Colors.muted, fontWeight: '600' },
  priceInput: { width: 65, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 8, fontSize: 14, textAlign: 'center' },
  priceUnit: { color: Colors.muted, fontSize: 11 },
  saveBtn: { backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },

  // Register
  regCard: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft },
  regTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  regSub: { color: Colors.muted, fontSize: 13, marginBottom: 16 },
  formLabel: { fontSize: 11, fontWeight: '600', color: Colors.muted, marginBottom: 5 },
  formInput: { backgroundColor: Colors.paper, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.border, paddingHorizontal: 12, paddingVertical: 11, fontSize: 14, color: Colors.ink },
});
