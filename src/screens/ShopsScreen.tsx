// src/screens/ShopsScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, Shadow } from '../theme';
import { SHOPS } from '../utils/data';

const FILTERS = ['All', 'Open Now', 'Express', 'Top Rated', 'Nearest'];

export default function ShopsScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    let list = [...SHOPS];
    if (search) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.area.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter === 'Open Now') list = list.filter(s => s.isOpen);
    else if (filter === 'Express') list = list.filter(s => s.isExpress);
    else if (filter === 'Top Rated') list = list.sort((a, b) => b.rating - a.rating);
    else if (filter === 'Nearest') list = list.sort((a, b) => a.distance - b.distance);
    return list;
  }, [search, filter]);

  const renderShop = ({ item: s }: any) => (
    <TouchableOpacity
      style={st.card}
      onPress={() => navigation.navigate('Order', { shopId: s.id })}
      activeOpacity={0.85}
    >
      {/* Image header */}
      <View style={[st.cardImg, { backgroundColor: s.bgColor }]}>
        <Text style={{ fontSize: 44 }}>{s.emoji}</Text>
        <View style={[st.openBadge, { backgroundColor: s.isOpen ? '#1a4a2a' : '#4a1a1a' }]}>
          <Text style={[st.openText, { color: s.isOpen ? '#7ef7a0' : '#ffc0c0' }]}>
            {s.isOpen ? '● Open' : '● Closed'}
          </Text>
        </View>
        {s.isExpress && (
          <View style={st.expressBadge}>
            <Text style={st.expressText}>⚡ Express</Text>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={st.cardBody}>
        <View style={st.row1}>
          <Text style={st.shopName} numberOfLines={1}>{s.name}</Text>
          <View style={st.distBadge}>
            <Text style={st.distText}>📍 {s.distance} km</Text>
          </View>
        </View>
        <Text style={st.area}>📍 {s.area}</Text>

        <View style={st.metaRow}>
          <Text style={st.meta}>⏰ {s.openTime}–{s.closeTime}</Text>
          <View style={st.ratingRow}>
            <Text style={st.stars}>★</Text>
            <Text style={st.rating}>{s.rating}</Text>
            <Text style={st.reviews}>({s.reviews})</Text>
          </View>
        </View>

        {/* Price chips */}
        <View style={st.priceRow}>
          {Object.entries(s.prices).slice(0, 3).map(([k, v]) => (
            <View key={k} style={st.priceChip}>
              <Text style={st.priceChipText}>{k}: <Text style={{ color: Colors.teal, fontWeight: '700' }}>₹{v as number}</Text></Text>
            </View>
          ))}
        </View>

        {/* Tags */}
        <View style={st.tagsRow}>
          {s.tags.map(tag => (
            <View key={tag} style={st.tag}>
              <Text style={st.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={st.bookBtn}
          onPress={() => navigation.navigate('Order', { shopId: s.id })}
          activeOpacity={0.85}
        >
          <Text style={st.bookBtnText}>📦  Book Pickup</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={st.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ink} />

      {/* Header */}
      <View style={st.header}>
        <Text style={st.headerLabel}>BHOPAL PARTNERS</Text>
        <Text style={st.headerTitle}>Dry Cleaning Shops</Text>
        <Text style={st.headerSub}>📍 Distances from MP Nagar · Bhopal</Text>

        <View style={st.searchBar}>
          <Text style={st.searchIcon}>🔍</Text>
          <TextInput
            style={st.searchInput}
            placeholder="Search by name, area..."
            placeholderTextColor="rgba(255,255,255,0.25)"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={st.filterScroll}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[st.filterChip, filter === f && st.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[st.filterText, filter === f && st.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Shop list */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={renderShop}
        contentContainerStyle={st.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ fontSize: 40 }}>🔍</Text>
            <Text style={{ color: Colors.muted, marginTop: 12 }}>No shops found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: { backgroundColor: Colors.ink, padding: Spacing.xl, paddingBottom: 0 },
  headerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: 'rgba(200,168,75,0.7)', marginBottom: 4 },
  headerTitle: { fontSize: 24, fontFamily: 'Georgia', fontWeight: '700', color: Colors.white },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, marginBottom: 14 },

  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14, paddingVertical: 11, marginBottom: 12,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, color: Colors.white, fontSize: 14 },

  filterScroll: { marginBottom: 0 },
  filterChip: {
    marginRight: 8, marginBottom: 12, paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 100, borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(200,168,75,0.15)', borderColor: 'rgba(200,168,75,0.4)',
  },
  filterText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '500' },
  filterTextActive: { color: Colors.gold },

  list: { padding: Spacing.lg, gap: 14 },
  card: {
    backgroundColor: Colors.white, borderRadius: 20,
    overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.border, ...Shadow.soft,
  },
  cardImg: { height: 130, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  openBadge: { position: 'absolute', top: 10, right: 10, borderRadius: 100, paddingVertical: 3, paddingHorizontal: 8 },
  openText: { fontSize: 10, fontWeight: '700' },
  expressBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(200,168,75,0.9)', borderRadius: 100, paddingVertical: 3, paddingHorizontal: 8 },
  expressText: { fontSize: 10, fontWeight: '700', color: Colors.ink },

  cardBody: { padding: 14 },
  row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  shopName: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 8 },
  distBadge: { backgroundColor: 'rgba(200,168,75,0.12)', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8, borderWidth: 1, borderColor: 'rgba(200,168,75,0.25)' },
  distText: { fontSize: 11, color: '#7a5e10', fontWeight: '600' },
  area: { fontSize: 12, color: Colors.muted, marginBottom: 8 },

  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  meta: { fontSize: 12, color: Colors.muted },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  stars: { color: Colors.gold, fontSize: 13 },
  rating: { fontWeight: '700', fontSize: 13 },
  reviews: { color: Colors.muted, fontSize: 12 },

  priceRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 8 },
  priceChip: { backgroundColor: Colors.paper, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 },
  priceChipText: { fontSize: 11, color: Colors.ink },

  tagsRow: { flexDirection: 'row', gap: 6, marginBottom: 10, flexWrap: 'wrap' },
  tag: { backgroundColor: 'rgba(20,118,110,0.08)', borderRadius: 6, paddingVertical: 3, paddingHorizontal: 8 },
  tagText: { fontSize: 10, color: Colors.teal, fontWeight: '600' },

  bookBtn: { backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  bookBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
});
