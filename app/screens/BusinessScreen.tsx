import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Business Screen Component
 * 
 * Displays business information and tools
 */
export default function BusinessScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Business</Text>
      </View>
      
      <View style={styles.businessCard}>
        <View style={styles.businessInfo}>
          <View style={styles.businessLogo}>
            <Text style={styles.businessInitial}>Z</Text>
          </View>
          <View>
            <Text style={styles.businessName}>ZeleBiz Store</Text>
            <Text style={styles.businessType}>Retail Business</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil-outline" size={18} color="#4F46E5" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Tools</Text>
        <View style={styles.toolsGrid}>
          <TouchableOpacity style={styles.toolCard}>
            <View style={[styles.toolIcon, {backgroundColor: '#EEF2FF'}]}>
              <Ionicons name="stats-chart" size={24} color="#4F46E5" />
            </View>
            <Text style={styles.toolName}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolCard}>
            <View style={[styles.toolIcon, {backgroundColor: '#ECFDF5'}]}>
              <Ionicons name="cash-outline" size={24} color="#059669" />
            </View>
            <Text style={styles.toolName}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolCard}>
            <View style={[styles.toolIcon, {backgroundColor: '#FEF3C7'}]}>
              <Ionicons name="people-outline" size={24} color="#D97706" />
            </View>
            <Text style={styles.toolName}>Customers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolCard}>
            <View style={[styles.toolIcon, {backgroundColor: '#FFEDD5'}]}>
              <Ionicons name="settings-outline" size={24} color="#EA580C" />
            </View>
            <Text style={styles.toolName}>Settings</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  businessCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  businessInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  businessLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  businessInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  businessType: {
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F46E5',
    marginLeft: 4,
  },
  section: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  toolCard: {
    width: '50%',
    padding: 8,
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});
