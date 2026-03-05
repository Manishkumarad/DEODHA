// src/screens/AuthScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
  Alert, Animated, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '../theme';
import { sendOTP, verifyOTP, saveUserProfile } from '../services/firebase';
import { useStore } from '../store';

type Step = 'role' | 'phone' | 'otp' | 'profile';
type Role = 'customer' | 'vendor' | 'agent';

const ROLES = [
  { id: 'customer' as Role, icon: '👤', label: 'Customer', desc: 'Book pickup & delivery' },
  { id: 'vendor' as Role, icon: '🏪', label: 'Shop Owner', desc: 'Manage your laundry shop' },
  { id: 'agent' as Role, icon: '🛵', label: 'Delivery Agent', desc: 'Earn by delivering orders' },
];

export default function AuthScreen({ navigation }: any) {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<Role>('customer');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const otpRefs = useRef<TextInput[]>([]);
  const timerRef = useRef<any>(null);
  const { setUser } = useStore();

  // Clean up timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const animateStep = (fn: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
    setTimeout(fn, 150);
  };

  const startTimer = () => {
    setTimer(30);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Send OTP ──────────────────────────────────────────────
  const handleSendOTP = async () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    const fullNumber = `+91${cleaned}`;
    const result = await sendOTP(fullNumber);
    setLoading(false);

    if (result.success) {
      setConfirmation(result.confirmation);
      animateStep(() => setStep('otp'));
      startTimer();
    } else {
      Alert.alert(
        'Failed to Send OTP',
        result.error || 'Please check your number and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // ── Resend OTP ─────────────────────────────────────────────
  const handleResend = async () => {
    const cleaned = phone.replace(/\D/g, '');
    setLoading(true);
    const result = await sendOTP(`+91${cleaned}`);
    setLoading(false);
    if (result.success) {
      setConfirmation(result.confirmation);
      setOtp(['', '', '', '', '', '']);
      startTimer();
    } else {
      Alert.alert('Error', 'Could not resend OTP. Try again.');
    }
  };

  // ── OTP Input handlers ────────────────────────────────────
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-advance
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    // Auto-verify when all 6 filled
    if (value && index === 5 && newOtp.every(v => v !== '')) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // ── Verify OTP ────────────────────────────────────────────
  const handleVerifyOTP = async (code?: string) => {
    const otpCode = code || otp.join('');
    if (otpCode.length < 6) {
      Alert.alert('Incomplete OTP', 'Please enter all 6 digits.');
      return;
    }
    setLoading(true);
    const result = await verifyOTP(confirmation, otpCode);
    setLoading(false);

    if (result.success) {
      // Check if new user → profile step, else sign in
      animateStep(() => setStep('profile'));
    } else {
      Alert.alert('Wrong OTP', result.error || 'Invalid code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
  };

  // ── Complete Profile ──────────────────────────────────────
  const handleCompleteProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter your full name.');
      return;
    }
    setLoading(true);
    const uid = `usr_${phone.replace(/\D/g, '')}`;
    const userData = {
      uid, phone: `+91${phone.replace(/\D/g, '')}`,
      name: name.trim(), email: email.trim(), role,
      createdAt: new Date().toISOString(),
    };
    await saveUserProfile(uid, userData);
    setUser(userData as any);
    setLoading(false);
  };

  // ─── RENDER ───────────────────────────────────────────────
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <View style={s.logoRow}>
            <Text style={s.logo}>Pressed<Text style={s.logoWhite}>Clean</Text></Text>
            <Text style={s.tagline}>Bhopal's doorstep laundry service</Text>
          </View>

          <Animated.View style={[s.card, { opacity: fadeAnim }]}>

            {/* ── STEP: Role ── */}
            {step === 'role' && (
              <View>
                <Text style={s.stepLabel}>STEP 1 OF 3</Text>
                <Text style={s.stepTitle}>I am a...</Text>
                <Text style={s.stepSub}>Choose how you want to use DCODHA</Text>
                <View style={s.rolesGrid}>
                  {ROLES.map(r => (
                    <TouchableOpacity
                      key={r.id}
                      style={[s.roleCard, role === r.id && s.roleCardActive]}
                      onPress={() => setRole(r.id)}
                      activeOpacity={0.75}
                    >
                      <Text style={s.roleIcon}>{r.icon}</Text>
                      <Text style={[s.roleLabel, role === r.id && s.roleLabelActive]}>{r.label}</Text>
                      <Text style={s.roleDesc}>{r.desc}</Text>
                      {role === r.id && <View style={s.roleCheck}><Text style={{ color: '#fff', fontSize: 10 }}>✓</Text></View>}
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={s.mainBtn} onPress={() => animateStep(() => setStep('phone'))}>
                  <Text style={s.mainBtnText}>Continue →</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ── STEP: Phone ── */}
            {step === 'phone' && (
              <View>
                <Text style={s.stepLabel}>STEP 2 OF 3</Text>
                <Text style={s.stepTitle}>Enter your number</Text>
                <Text style={s.stepSub}>We'll send a 6-digit OTP via SMS to verify your identity</Text>

                <View style={s.phoneRow}>
                  <View style={s.countryCode}>
                    <Text style={s.flagText}>🇮🇳</Text>
                    <Text style={s.ccText}>+91</Text>
                  </View>
                  <TextInput
                    style={s.phoneInput}
                    placeholder="98765 43210"
                    placeholderTextColor="rgba(255,255,255,0.25)"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={t => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                    autoFocus
                    returnKeyType="send"
                    onSubmitEditing={handleSendOTP}
                  />
                </View>

                <TouchableOpacity
                  style={[s.mainBtn, loading && s.btnDisabled]}
                  onPress={handleSendOTP}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color={Colors.ink} />
                    : <Text style={s.mainBtnText}>Send OTP →</Text>}
                </TouchableOpacity>

                <Text style={s.legalText}>
                  By continuing, you agree to our{' '}
                  <Text style={{ color: Colors.teal2 }}>Terms of Service</Text> and{' '}
                  <Text style={{ color: Colors.teal2 }}>Privacy Policy</Text>
                </Text>

                <TouchableOpacity onPress={() => animateStep(() => setStep('role'))}>
                  <Text style={s.backLink}>← Change role</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ── STEP: OTP ── */}
            {step === 'otp' && (
              <View>
                <Text style={s.stepLabel}>STEP 2 OF 3</Text>
                <Text style={s.stepTitle}>Verify OTP</Text>
                <Text style={s.stepSub}>
                  OTP sent to{' '}
                  <Text style={{ color: Colors.gold, fontWeight: '700' }}>
                    +91 {phone.slice(0, 5)} {phone.slice(5)}
                  </Text>
                </Text>

                {/* 6-digit OTP Boxes */}
                <View style={s.otpRow}>
                  {otp.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={ref => { if (ref) otpRefs.current[i] = ref; }}
                      style={[s.otpBox, digit !== '' && s.otpBoxFilled]}
                      value={digit}
                      onChangeText={v => handleOtpChange(v.replace(/\D/g, '').slice(-1), i)}
                      onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      selectTextOnFocus
                    />
                  ))}
                </View>

                {/* Timer & Resend */}
                <View style={s.timerRow}>
                  {canResend ? (
                    <TouchableOpacity onPress={handleResend} disabled={loading}>
                      <Text style={s.resendBtn}>
                        {loading ? 'Sending...' : '🔄 Resend OTP'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={s.timerText}>
                      Resend in <Text style={{ color: Colors.gold, fontFamily: 'Courier New' }}>00:{String(timer).padStart(2, '0')}</Text>
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={[s.mainBtn, loading && s.btnDisabled]}
                  onPress={() => handleVerifyOTP()}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color={Colors.ink} />
                    : <Text style={s.mainBtnText}>Verify & Continue ✓</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { animateStep(() => setStep('phone')); setOtp(['', '', '', '', '', '']); }}>
                  <Text style={s.backLink}>← Change number</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ── STEP: Profile ── */}
            {step === 'profile' && (
              <View>
                <Text style={s.stepLabel}>STEP 3 OF 3</Text>
                <Text style={s.stepTitle}>Create your profile</Text>
                <Text style={s.stepSub}>Almost done! Tell us your name</Text>

                <TextInput
                  style={s.profileInput}
                  placeholder="Full name"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  value={name}
                  onChangeText={setName}
                  autoFocus
                  returnKeyType="next"
                />
                <TextInput
                  style={[s.profileInput, { marginTop: Spacing.sm }]}
                  placeholder="Email address (optional)"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  style={[s.mainBtn, loading && s.btnDisabled]}
                  onPress={handleCompleteProfile}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color={Colors.ink} />
                    : <Text style={s.mainBtnText}>🎉 Get Started</Text>}
                </TouchableOpacity>
              </View>
            )}

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.ink },
  scroll: { flexGrow: 1, padding: Spacing.xl, justifyContent: 'center' },

  logoRow: { alignItems: 'center', marginBottom: Spacing.xxl },
  logo: { fontSize: 32, fontFamily: 'Georgia', fontWeight: '700', color: Colors.gold },
  logoWhite: { color: Colors.white },
  tagline: { color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 4 },

  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 24, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    padding: Spacing.xl,
  },

  stepLabel: {
    fontSize: 10, fontWeight: '700', letterSpacing: 2,
    color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6,
  },
  stepTitle: {
    fontSize: 24, fontFamily: 'Georgia', fontWeight: '700',
    color: Colors.white, marginBottom: 6,
  },
  stepSub: { fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 20, marginBottom: 24 },

  // Roles
  rolesGrid: { gap: 10, marginBottom: 20 },
  roleCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 14, position: 'relative',
  },
  roleCardActive: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(200,168,75,0.1)',
  },
  roleIcon: { fontSize: 24, marginBottom: 6 },
  roleLabel: { fontSize: 15, fontWeight: '700', color: 'rgba(255,255,255,0.6)' },
  roleLabelActive: { color: Colors.gold },
  roleDesc: { fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 },
  roleCheck: {
    position: 'absolute', top: 12, right: 12,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },

  // Phone
  phoneRow: {
    flexDirection: 'row', gap: 10, marginBottom: 16,
  },
  countryCode: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12, paddingVertical: 14,
  },
  flagText: { fontSize: 18 },
  ccText: { color: Colors.white, fontWeight: '600', fontSize: 15 },
  phoneInput: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14, paddingVertical: 14,
    color: Colors.white, fontSize: 18,
    letterSpacing: 1.5, fontWeight: '600',
  },

  // OTP
  otpRow: {
    flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 20,
  },
  otpBox: {
    width: 46, height: 56, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)',
    color: Colors.white, fontSize: 22, fontWeight: '700',
    fontFamily: 'Courier New',
  },
  otpBoxFilled: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(200,168,75,0.12)',
  },
  timerRow: { alignItems: 'center', marginBottom: 20 },
  timerText: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
  resendBtn: { color: Colors.teal2, fontSize: 14, fontWeight: '600' },

  // Profile
  profileInput: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14, paddingVertical: 14,
    color: Colors.white, fontSize: 15,
  },

  // Buttons
  mainBtn: {
    backgroundColor: Colors.gold, borderRadius: 14,
    paddingVertical: 15, alignItems: 'center',
    marginTop: 6, marginBottom: 12,
  },
  btnDisabled: { opacity: 0.6 },
  mainBtnText: { color: Colors.ink, fontWeight: '700', fontSize: 15 },
  backLink: {
    color: Colors.teal2, textAlign: 'center',
    fontSize: 13, fontWeight: '500', marginTop: 4,
  },
  legalText: {
    color: 'rgba(255,255,255,0.3)', fontSize: 11,
    textAlign: 'center', lineHeight: 17, marginBottom: 8,
  },
});
