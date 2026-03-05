import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🧺 DCODHA</Text>
        <Text style={styles.subtitle}>Bhopal's Doorstep Laundry Service</Text>
        
        <View style={styles.features}>
          <Text style={styles.feature}>✅ Phone Authentication</Text>
          <Text style={styles.feature}>🏪 Shop Registration</Text>
          <Text style={styles.feature}>📱 Order Tracking</Text>
          <Text style={styles.feature}>🚚 Delivery Service</Text>
        </View>

        <Button 
          title="Get Started" 
          onPress={() => alert('DCODHA App Ready!')}
          color="#007AFF"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  features: {
    marginBottom: 40,
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 300,
  },
  feature: {
    fontSize: 16,
    marginVertical: 5,
    color: '#444',
  },
});
