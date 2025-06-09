import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants for storage keys
const STORAGE_KEYS = {
  USER_DATA: 'zelebiz_user',
  APP_SETTINGS: 'zelebiz_settings',
  INVENTORY: 'zelebiz_inventory',
  SALES: 'zelebiz_sales',
  CUSTOMERS: 'zelebiz_customers',
  SYNC_QUEUE: 'zelebiz_sync_queue',
};

// Generic function to store data
export const storeData = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};

// Generic function to retrieve data
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Function to add items to sync queue
export const addToSyncQueue = async <T>(
  entity: string, 
  action: 'create' | 'update' | 'delete', 
  data: T
): Promise<boolean> => {
  try {
    // Get current queue or initialize if empty
    const queue = await getData<Array<any>>(STORAGE_KEYS.SYNC_QUEUE) || [];
    
    // Add new item with timestamp
    queue.push({
      id: Date.now().toString(),
      entity,
      action,
      data,
      timestamp: new Date().toISOString(),
      synced: false,
    });
    
    // Store updated queue
    await storeData(STORAGE_KEYS.SYNC_QUEUE, queue);
    return true;
  } catch (error) {
    console.error('Error adding to sync queue:', error);
    return false;
  }
};

// Function to mark items as synced
export const markAsSynced = async (ids: string[]): Promise<boolean> => {
  try {
    const queue = await getData<Array<any>>(STORAGE_KEYS.SYNC_QUEUE) || [];
    const updatedQueue = queue.map(item => 
      ids.includes(item.id) ? { ...item, synced: true } : item
    );
    
    await storeData(STORAGE_KEYS.SYNC_QUEUE, updatedQueue);
    return true;
  } catch (error) {
    console.error('Error marking items as synced:', error);
    return false;
  }
};

// Function to clear synced items
export const clearSyncedItems = async (): Promise<boolean> => {
  try {
    const queue = await getData<Array<any>>(STORAGE_KEYS.SYNC_QUEUE) || [];
    const updatedQueue = queue.filter(item => !item.synced);
    
    await storeData(STORAGE_KEYS.SYNC_QUEUE, updatedQueue);
    return true;
  } catch (error) {
    console.error('Error clearing synced items:', error);
    return false;
  }
};

export { STORAGE_KEYS };
