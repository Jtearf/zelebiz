import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Home Screen Component
 * 
 * Main dashboard screen for the app
 */
export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi there,</Text>
          <Text style={styles.username}>Welcome to ZeleBiz</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="notifications-outline" size={24} color="#374151" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryCards}>
        <View style={[styles.summaryCard, styles.primaryCard]}>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Today's Revenue</Text>
            <Text style={styles.cardValue}>R 0.00</Text>
            <Text style={styles.cardChange}>+0% from yesterday</Text>
          </View>
          <View style={styles.cardIcon}>
            <Ionicons name="trending-up" size={24} color="#FFFFFF" />
          </View>
        </View>
        
        <View style={styles.summaryCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Pending Tasks</Text>
            <Text style={styles.cardValue}>0</Text>
            <Text style={styles.cardChange}>No pending tasks</Text>
          </View>
          <View style={[styles.cardIcon, {backgroundColor: '#F59E0B'}]}>
            <Ionicons name="checkbox-outline" size={24} color="#FFFFFF" />
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, {backgroundColor: '#EEF2FF'}]}>
              <Ionicons name="add-circle-outline" size={24} color="#4F46E5" />
            </View>
            <Text style={styles.actionText}>New Product</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, {backgroundColor: '#ECFDF5'}]}>
              <Ionicons name="people-outline" size={24} color="#059669" />
            </View>
            <Text style={styles.actionText}>Customers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, {backgroundColor: '#FEF3C7'}]}>
              <Ionicons name="document-text-outline" size={24} color="#D97706" />
            </View>
            <Text style={styles.actionText}>Invoices</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, {backgroundColor: '#FFE4E6'}]}>
              <Ionicons name="stats-chart-outline" size={24} color="#E11D48" />
            </View>
            <Text style={styles.actionText}>Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyState}>
          <View style={styles.emptyStateIcon}>
            <Ionicons name="calendar-outline" size={40} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyStateTitle}>No recent activity</Text>
          <Text style={styles.emptyStateText}>
            Your recent business activities will appear here
          </Text>
          <TouchableOpacity style={styles.emptyStateButton}>
            <Text style={styles.emptyStateButtonText}>Get Started</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  summaryCards: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryCard: {
    backgroundColor: '#4F46E5',
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 4,
  },
  cardChange: {
    fontSize: 12,
    color: '#059669',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4F46E5',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  actionButton: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4F46E5',
    borderRadius: 6,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
