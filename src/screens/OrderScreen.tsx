// src/screens/OrderScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Alert, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Shadow } from '../theme';
import { SERVICES, SHOPS, AREAS } from '../utils/data';
import { useStore } from '../store';
import { placeOrder } from '../services/firebase';
import { format, addDays } from 'date-fns';

const STEPS = ['Services', 'Shop', 'Schedule', 'Address', 'Confirm'];
const TIMES = ['9–11 AM', '11 AM–1', '1–3 PM', '3–5 PM', '5–7 PM', '7–9 PM'];

export default function OrderScreen({ navigation, route }: any) {
  const [step, setStep] = useState(0);
  const [selSvcs, setSelSvcs] = useState<any[]>([]);
  const [selShop, setSelShop] = useState<any>(null);
  const [pickupDay, setPickupDay] = useState(1);
  const [pickupTime, setPickupTime] = useState('');
  const [delivDay, setDelivDay] = useState(2);
  const [delivTime, setDelivTime] = useState('');
  const [payMethod, setPayMethod] = useState('UPI');
  const [addr, setAddr] = useState({ name: '', phone: '', street: '', area: 'MP Nagar', landmark: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const { user, setActiveOrderId } = useStore();

  // Auto-select shop if passed from shops screen
  React.useEffect(() => {
    if (route.params?.shopId) {
      const shop = SHOPS.find(s => s.id === route.params.shopId);
      if (shop) setSelShop(shop);
    }
  }, [route.params]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(new Date(), i);
    return { day: format(d, 'EEE'), num: format(d, 'd'), full: format(d, 'yyyy-MM-dd') };
  });

  const toggleSvc = (svc: any) => {
    setSelSvcs(prev =>
      prev.find(s => s.id === svc.id)
        ? prev.filter(s => s.id !== svc.id)
        : [...prev, { ...svc, qty: 1 }]
    );
  };

  const total = selSvcs.reduce((sum, s) => sum + s.price * s.qty, 0) + 40;

  const handlePlaceOrder = async () => {
    if (!user) { navigation.navigate('Auth'); return; }
    if (selSvcs.length === 0) { Alert.alert('Select Services', 'Please select at least one service.'); return; }
    if (!selShop) { Alert.alert('Select Shop', 'Please choose a shop.'); return; }
    if (!pickupTime) { Alert.alert('Select Time', 'Please choose a pickup time slot.'); return; }
    if (!addr.name || !addr.phone || !addr.street) { Alert.alert('Complete Address', 'Please fill in your address.'); return; }

    setLoading(true);
    const orderId = await placeOrder({
      userId: user.uid,
      services: selSvcs,
      shop: selShop,
      pickupDate: days[pickupDay].full,
      pickupTime,
      delivDate: days[delivDay].full,
      delivTime,
      address: addr,
      payMethod,
      total,
    });
    setLoading(false);
    setActiveOrderId(orderId);
    navigation.navigate('Track', { orderId });
  };

  const goNext = () => {
    if (step === 0 && selSvcs.length === 0) { Alert.alert('Select at least one service'); return; }
    if (step === 1 && !selShop) { Alert.alert('Please select a shop'); return; }
    setStep(s => Math.min(s + 1, 4));
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />

      {/* Steps bar */}
      <View style={s.stepsBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <View style={[s.stepItem, step === i && s.stepActive, step > i && s.stepDone]}>
                <View style={[s.stepNum, step === i && s.stepNumActive, step > i && s.stepNumDone]}>
                  <Text style={[s.stepNumText, (step === i || step > i) && { color: Colors.white }]}>
                    {step > i ? '✓' : i + 1}
                  </Text>
                </View>
                <Text style={[s.stepLabel, step === i && s.stepLabelActive]}>{label}</Text>
              </View>
              {i < STEPS.length - 1 && <View style={s.stepDivider} />}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>

        {/* STEP 0: Services */}
        {step === 0 && (
          <View>
            <Text style={s.panelTitle}>🧺 Choose Services</Text>
            <View style={s.servicesGrid}>
              {SERVICES.map(svc => {
                const sel = !!selSvcs.find(s => s.id === svc.id);
                return (
                  <TouchableOpacity
                    key={svc.id}
                    style={[s.svcCard, { backgroundColor: svc.color }, sel && s.svcCardSel]}
                    onPress={() => toggleSvc(svc)}
                    activeOpacity={0.8}
                  >
                    {sel && <View style={s.svcCheck}><Text style={{ color: '#fff', fontSize: 10 }}>✓</Text></View>}
                    <Text style={s.svcIcon}>{svc.icon}</Text>
                    <Text style={s.svcName}>{svc.name}</Text>
                    <Text style={s.svcPrice}>₹{svc.price}{svc.unit}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {selSvcs.length > 0 && (
              <View style={s.selBanner}>
                <Text style={s.selBannerText}>{selSvcs.length} service(s) selected</Text>
              </View>
            )}
          </View>
        )}

        {/* STEP 1: Shop */}
        {step === 1 && (
          <View>
            <Text style={s.panelTitle}>🏪 Choose a Shop</Text>
            {SHOPS.filter(sh => sh.isOpen).map(sh => (
              <TouchableOpacity
                key={sh.id}
                style={[s.shopRow, selShop?.id === sh.id && s.shopRowSel]}
                onPress={() => setSelShop(sh)}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 28 }}>{sh.emoji}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={s.shopRowName}>{sh.name}</Text>
                  <Text style={s.shopRowMeta}>{sh.area} · {sh.distance} km · ★{sh.rating}</Text>
                  <Text style={s.shopRowPrices}>Shirt ₹{sh.prices['Shirt']} · Suit ₹{sh.prices['Suit DC']}</Text>
                </View>
                {selShop?.id === sh.id && <Text style={{ color: Colors.teal, fontSize: 20 }}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* STEP 2: Schedule */}
        {step === 2 && (
          <View>
            <Text style={s.panelTitle}>📅 Pickup Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dateStrip}>
              {days.map((d, i) => (
                <TouchableOpacity
                  key={d.full} style={[s.dateBtn, pickupDay === i && s.dateBtnSel]}
                  onPress={() => setPickupDay(i)}
                >
                  <Text style={[s.dateBtnDay, pickupDay === i && { color: Colors.teal }]}>{d.day}</Text>
                  <Text style={[s.dateBtnNum, pickupDay === i && { color: Colors.teal }]}>{d.num}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[s.panelTitle, { marginTop: 20 }]}>🕐 Pickup Time</Text>
            <View style={s.timeGrid}>
              {TIMES.map(t => (
                <TouchableOpacity
                  key={t} style={[s.timeBtn, pickupTime === t && s.timeBtnSel]}
                  onPress={() => setPickupTime(t)}
                >
                  <Text style={[s.timeBtnText, pickupTime === t && s.timeBtnTextSel]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[s.panelTitle, { marginTop: 20 }]}>🚚 Delivery Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dateStrip}>
              {days.map((d, i) => {
                const disabled = i <= pickupDay;
                return (
                  <TouchableOpacity
                    key={d.full} style={[s.dateBtn, delivDay === i && s.dateBtnSel, disabled && { opacity: 0.3 }]}
                    onPress={() => !disabled && setDelivDay(i)}
                  >
                    <Text style={[s.dateBtnDay, delivDay === i && { color: Colors.teal }]}>{d.day}</Text>
                    <Text style={[s.dateBtnNum, delivDay === i && { color: Colors.teal }]}>{d.num}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={[s.panelTitle, { marginTop: 20 }]}>🕐 Delivery Time</Text>
            <View style={s.timeGrid}>
              {TIMES.map(t => (
                <TouchableOpacity
                  key={t} style={[s.timeBtn, delivTime === t && s.timeBtnSel]}
                  onPress={() => setDelivTime(t)}
                >
                  <Text style={[s.timeBtnText, delivTime === t && s.timeBtnTextSel]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 3: Address */}
        {step === 3 && (
          <View>
            <Text style={s.panelTitle}>📍 Your Address</Text>
            {[
              { key: 'name', label: 'Full Name', placeholder: 'Rahul Sharma' },
              { key: 'phone', label: 'Phone', placeholder: '98765 43210', keyboard: 'phone-pad' },
              { key: 'street', label: 'Street / House No.', placeholder: 'House No., Street, Colony' },
              { key: 'landmark', label: 'Landmark', placeholder: 'Near temple, school...' },
              { key: 'notes', label: 'Delivery Notes (Optional)', placeholder: 'Ring bell, leave at door...' },
            ].map(f => (
              <View key={f.key} style={s.formGroup}>
                <Text style={s.formLabel}>{f.label}</Text>
                <TextInput
                  style={s.formInput}
                  placeholder={f.placeholder}
                  placeholderTextColor={Colors.muted}
                  value={(addr as any)[f.key]}
                  onChangeText={v => setAddr(a => ({ ...a, [f.key]: v }))}
                  keyboardType={(f as any).keyboard || 'default'}
                />
              </View>
            ))}
            <View style={s.formGroup}>
              <Text style={s.formLabel}>Area</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {AREAS.map(a => (
                  <TouchableOpacity
                    key={a}
                    style={[s.areaChip, addr.area === a && s.areaChipSel]}
                    onPress={() => setAddr(ad => ({ ...ad, area: a }))}
                  >
                    <Text style={[s.areaChipText, addr.area === a && { color: Colors.teal, fontWeight: '700' }]}>{a}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* STEP 4: Confirm */}
        {step === 4 && (
          <View>
            <Text style={s.panelTitle}>📋 Order Summary</Text>
            {selSvcs.map(svc => (
              <View key={svc.id} style={s.sumRow}>
                <Text style={s.sumLabel}>{svc.icon} {svc.name}</Text>
                <Text style={s.sumVal}>₹{svc.price}</Text>
              </View>
            ))}
            <View style={s.sumRow}>
              <Text style={[s.sumLabel, { color: Colors.muted }]}>🚚 Pickup & Delivery</Text>
              <Text style={s.sumVal}>₹40</Text>
            </View>
            <View style={s.sumTotal}>
              <Text style={s.sumTotalLabel}>Total</Text>
              <Text style={s.sumTotalAmt}>₹{total}</Text>
            </View>

            <Text style={[s.panelTitle, { marginTop: 20 }]}>💳 Payment</Text>
            <View style={s.payRow}>
              {['UPI', 'Card', 'Cash'].map(p => (
                <TouchableOpacity
                  key={p} style={[s.payOpt, payMethod === p && s.payOptSel]}
                  onPress={() => setPayMethod(p)}
                >
                  <Text style={s.payIcon}>{p === 'UPI' ? '📱' : p === 'Card' ? '💳' : '💵'}</Text>
                  <Text style={[s.payLabel, payMethod === p && { color: Colors.teal, fontWeight: '700' }]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[s.placeBtn, loading && { opacity: 0.6 }]}
              onPress={handlePlaceOrder}
              disabled={loading}
            >
              <Text style={s.placeBtnText}>{loading ? 'Placing Order...' : '🎉  Place Order & Schedule Pickup'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Next button */}
        {step < 4 && (
          <TouchableOpacity style={s.nextBtn} onPress={goNext}>
            <Text style={s.nextBtnText}>
              {step === 0 ? 'Next → Select Shop' :
               step === 1 ? 'Next → Schedule' :
               step === 2 ? 'Next → Address' : 'Next → Review'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  stepsBar: {
    backgroundColor: Colors.ink, paddingHorizontal: Spacing.lg,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  stepItem: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 100 },
  stepActive: { backgroundColor: 'rgba(200,168,75,0.12)' },
  stepDone: {},
  stepNum: { width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  stepNumActive: { backgroundColor: Colors.gold },
  stepNumDone: { backgroundColor: Colors.green },
  stepNumText: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '700' },
  stepLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: '500', whiteSpace: 'nowrap' } as any,
  stepLabelActive: { color: Colors.gold },
  stepDivider: { width: 16, height: 1, backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'center' },

  body: { padding: Spacing.lg },
  panelTitle: { fontSize: 15, fontWeight: '700', color: Colors.ink, marginBottom: 12 },

  // Services
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  svcCard: {
    width: '30%', borderRadius: 14, padding: 10,
    alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent', position: 'relative',
  },
  svcCardSel: { borderColor: Colors.teal },
  svcCheck: {
    position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: 9,
    backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center',
  },
  svcIcon: { fontSize: 24, marginBottom: 4 },
  svcName: { fontSize: 11, fontWeight: '600', textAlign: 'center', color: Colors.ink, lineHeight: 14 },
  svcPrice: { fontSize: 11, color: Colors.teal, fontWeight: '700', marginTop: 3 },
  selBanner: { backgroundColor: 'rgba(20,118,110,0.1)', borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(20,118,110,0.2)' },
  selBannerText: { color: Colors.teal, fontWeight: '600', fontSize: 13 },

  // Shop
  shopRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: 14, padding: 12, marginBottom: 10,
    borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft,
  },
  shopRowSel: { borderColor: Colors.teal, backgroundColor: 'rgba(20,118,110,0.04)' },
  shopRowName: { fontWeight: '700', fontSize: 14, color: Colors.ink },
  shopRowMeta: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  shopRowPrices: { fontSize: 11, color: Colors.teal, marginTop: 3, fontWeight: '600' },

  // Schedule
  dateStrip: { marginBottom: 4 },
  dateBtn: {
    width: 52, marginRight: 8, backgroundColor: Colors.paper,
    borderRadius: 12, borderWidth: 1.5, borderColor: Colors.border,
    paddingVertical: 8, alignItems: 'center',
  },
  dateBtnSel: { borderColor: Colors.teal, backgroundColor: 'rgba(20,118,110,0.07)' },
  dateBtnDay: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', color: Colors.muted },
  dateBtnNum: { fontSize: 18, fontWeight: '700', color: Colors.ink, marginTop: 2 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeBtn: {
    paddingVertical: 9, paddingHorizontal: 14, borderRadius: 10,
    backgroundColor: Colors.paper, borderWidth: 1.5, borderColor: Colors.border,
  },
  timeBtnSel: { borderColor: Colors.teal, backgroundColor: 'rgba(20,118,110,0.07)' },
  timeBtnText: { fontSize: 12, fontWeight: '500', color: Colors.ink },
  timeBtnTextSel: { color: Colors.teal, fontWeight: '700' },

  // Address
  formGroup: { marginBottom: 12 },
  formLabel: { fontSize: 11, fontWeight: '600', color: Colors.muted, marginBottom: 5, letterSpacing: 0.3 },
  formInput: {
    backgroundColor: Colors.white, borderRadius: 12, borderWidth: 1.5,
    borderColor: Colors.border, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: Colors.ink,
  },
  areaChip: {
    marginRight: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100,
    backgroundColor: Colors.paper, borderWidth: 1.5, borderColor: Colors.border,
  },
  areaChipSel: { borderColor: Colors.teal, backgroundColor: 'rgba(20,118,110,0.08)' },
  areaChipText: { fontSize: 12, color: Colors.muted, fontWeight: '500' },

  // Summary
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  sumLabel: { fontSize: 14, color: Colors.ink },
  sumVal: { fontWeight: '700', fontSize: 14, color: Colors.teal },
  sumTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12 },
  sumTotalLabel: { fontWeight: '700', fontSize: 16 },
  sumTotalAmt: { color: Colors.teal, fontWeight: '700', fontSize: 20 },

  payRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  payOpt: {
    flex: 1, backgroundColor: Colors.paper, borderRadius: 12,
    borderWidth: 1.5, borderColor: Colors.border,
    paddingVertical: 12, alignItems: 'center',
  },
  payOptSel: { borderColor: Colors.teal, backgroundColor: 'rgba(20,118,110,0.06)' },
  payIcon: { fontSize: 22, marginBottom: 4 },
  payLabel: { fontSize: 12, fontWeight: '500', color: Colors.ink },

  placeBtn: {
    backgroundColor: Colors.gold, borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginTop: 4,
  },
  placeBtnText: { color: Colors.ink, fontWeight: '700', fontSize: 15 },

  nextBtn: {
    backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 14,
    alignItems: 'center', marginTop: 16,
  },
  nextBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
});
