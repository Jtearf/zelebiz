import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface Column<T> {
  title: string;
  dataIndex: keyof T;
  key: string;
  width?: number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  rowKey: keyof T | ((record: T) => string);
  loading?: boolean;
  emptyText?: string;
  onRowPress?: (record: T) => void;
  headerStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  cellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Table<T extends Record<string, any>>({
  columns,
  dataSource,
  rowKey,
  loading = false,
  emptyText = 'No data',
  onRowPress,
  headerStyle,
  headerTextStyle,
  rowStyle,
  cellStyle,
  cellTextStyle,
  containerStyle,
}: TableProps<T>) {
  const { theme } = useTheme();
  
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey]?.toString() || index.toString();
  };
  
  const renderHeader = () => (
    <View style={[
      styles.headerRow,
      { backgroundColor: theme.colors.neutral[5] },
      headerStyle
    ]}>
      {columns.map((column, index) => (
        <View
          key={column.key}
          style={[
            styles.headerCell,
            column.width ? { width: column.width } : { flex: 1 },
            index === 0 && { paddingLeft: theme.spacing(2) },
            index === columns.length - 1 && { paddingRight: theme.spacing(2) },
          ]}
        >
          <Text style={[
            theme.typography.button,
            { color: theme.colors.neutral[1] },
            headerTextStyle
          ]}>
            {column.title}
          </Text>
        </View>
      ))}
    </View>
  );
  
  const renderRow = (record: T, rowIndex: number) => {
    const rowComponent = (
      <View style={[
        styles.row,
        {
          borderBottomColor: theme.colors.neutral[5],
          borderBottomWidth: rowIndex < dataSource.length - 1 ? 1 : 0,
        },
        rowStyle
      ]}>
        {columns.map((column, colIndex) => {
          const value = record[column.dataIndex];
          return (
            <View
              key={column.key}
              style={[
                styles.cell,
                column.width ? { width: column.width } : { flex: 1 },
                colIndex === 0 && { paddingLeft: theme.spacing(2) },
                colIndex === columns.length - 1 && { paddingRight: theme.spacing(2) },
                cellStyle
              ]}
            >
              {column.render ? (
                column.render(value, record, rowIndex)
              ) : (
                <Text style={[
                  theme.typography.body2,
                  { color: theme.colors.neutral[1] },
                  cellTextStyle
                ]}>
                  {value?.toString() || ''}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
    
    if (onRowPress) {
      return (
        <TouchableOpacity
          key={getRowKey(record, rowIndex)}
          onPress={() => onRowPress(record)}
          activeOpacity={0.7}
        >
          {rowComponent}
        </TouchableOpacity>
      );
    }
    
    return (
      <View key={getRowKey(record, rowIndex)}>
        {rowComponent}
      </View>
    );
  };
  
  const renderEmptyState = () => (
    <View style={[
      styles.emptyContainer,
      { backgroundColor: theme.colors.neutral[6] }
    ]}>
      <Text style={[
        theme.typography.body1,
        { color: theme.colors.neutral[3] }
      ]}>
        {loading ? 'Loading...' : emptyText}
      </Text>
    </View>
  );
  
  return (
    <View style={[
      styles.container, 
      { borderColor: theme.colors.neutral[5] },
      containerStyle
    ]}>
      {renderHeader()}
      <ScrollView 
        horizontal={columns.some(col => col.width !== undefined)}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.tableBody}>
          {dataSource.length > 0 ? (
            dataSource.map(renderRow)
          ) : (
            renderEmptyState()
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  headerCell: {
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tableBody: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  cell: {
    justifyContent: 'center',
    paddingVertical: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
