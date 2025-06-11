import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../lib/hooks/useAuth';

/**
 * Profile Screen Component
 * 
 * User profile and account settings
 */
export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    const { success } = await logout();
    if (!success) {
      // Handle logout error
      console.error('Failed to log out');
    }
  };
  
  // Define menu items with typed Ionicons names
  const menuItems = [
    { 
      id: 'account', 
      title: 'Account Settings', 
      icon: 'person' as const, 
      color: '#4F46E5',
      items: [
        { id: 'profile', title: 'Edit Profile', icon: 'create' as const },
        { id: 'password', title: 'Change Password', icon: 'lock-closed' as const },
        { id: 'notifications', title: 'Notification Settings', icon: 'notifications' as const }
      ]
    },
    {
      id: 'business',
      title: 'Business Settings',
      icon: 'business' as const,
      color: '#0891B2',
      items: [
        { id: 'details', title: 'Business Details', icon: 'briefcase' as const },
        { id: 'payment', title: 'Payment Methods', icon: 'card' as const },
        { id: 'subscription', title: 'Subscription Plan', icon: 'pricetags' as const }
      ]
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle' as const,
      color: '#059669',
      items: [
        { id: 'support', title: 'Contact Support', icon: 'chatbubble-ellipses' as const },
        { id: 'faq', title: 'FAQs', icon: 'information-circle' as const },
        { id: 'feedback', title: 'Send Feedback', icon: 'star' as const }
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarText}>{user?.email?.charAt(0).toUpperCase() || 'U'}</Text>
        </View>
        
        <Text style={styles.profileName}>{user?.user_metadata?.full_name || 'ZeleBiz User'}</Text>
        <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      {menuItems.map((section) => (
        <View key={section.id} style={styles.menuSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name={section.icon} size={18} color={section.color} />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          
          {section.items.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <Ionicons name={item.icon} size={20} color="#6B7280" />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      ))}
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>ZeleBiz v1.0.0</Text>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F46E5',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FEF2F2',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DC2626',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
