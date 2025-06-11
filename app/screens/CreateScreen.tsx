import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Create Screen Component
 * 
 * Screen for creating new business items
 */
export default function CreateScreen() {
  // Define options with valid Ionicons names
  const createOptions = [
    { id: 'product', title: 'Product', icon: 'cube' as const, color: '#4F46E5', bgColor: '#EEF2FF' },
    { id: 'service', title: 'Service', icon: 'construct' as const, color: '#0891B2', bgColor: '#ECFEFF' },
    { id: 'invoice', title: 'Invoice', icon: 'document-text' as const, color: '#059669', bgColor: '#ECFDF5' },
    { id: 'customer', title: 'Customer', icon: 'person-add' as const, color: '#D97706', bgColor: '#FEF3C7' },
    { id: 'expense', title: 'Expense', icon: 'cash' as const, color: '#DC2626', bgColor: '#FEE2E2' },
    { id: 'event', title: 'Event', icon: 'calendar' as const, color: '#7C3AED', bgColor: '#F3E8FF' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.optionsContainer}>
        {createOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.optionCard}>
            <View style={[styles.iconContainer, { backgroundColor: option.bgColor }]}>
              <Ionicons name={option.icon} size={32} color={option.color} />
            </View>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>Create a new {option.title.toLowerCase()}</Text>
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  optionsContainer: {
    padding: 16,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
    position: 'relative',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -9,
  },
});
