import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
  simple?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeButtonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
}

export const Pagination = ({
  current,
  total,
  pageSize = 10,
  onChange,
  simple = false,
  containerStyle,
  buttonStyle,
  activeButtonStyle,
  textStyle,
  activeTextStyle
}: PaginationProps) => {
  const { theme } = useTheme();
  
  const totalPages = Math.ceil(total / pageSize);
  
  // Ensure current is within valid range
  const validCurrent = Math.min(Math.max(1, current), Math.max(1, totalPages));
  
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      // Show all pages if total pages is 7 or less
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show first, last, and current page
    // For pages around current, show 1 or 2 on each side
    const pages = [1];
    
    const leftSiblingIndex = Math.max(2, validCurrent - 1);
    const rightSiblingIndex = Math.min(totalPages - 1, validCurrent + 1);
    
    // Whether to show ellipses
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    if (shouldShowLeftDots) {
      pages.push(-1); // -1 represents left ellipsis
    }
    
    // Pages around current
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }
    
    if (shouldShowRightDots) {
      pages.push(-2); // -2 represents right ellipsis
    }
    
    pages.push(totalPages);
    
    return pages;
  };
  
  const renderSimplePagination = () => {
    return (
      <View style={styles.simpleContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: validCurrent === 1 ? theme.colors.neutral[5] : theme.colors.neutral[6],
              borderColor: theme.colors.neutral[4],
              borderWidth: 1,
              paddingVertical: theme.spacing(0.75),
              paddingHorizontal: theme.spacing(1),
            },
            buttonStyle
          ]}
          onPress={() => onChange(validCurrent - 1)}
          disabled={validCurrent === 1}
        >
          <Text
            style={[
              theme.typography.body2,
              { color: validCurrent === 1 ? theme.colors.neutral[3] : theme.colors.neutral[1] },
              textStyle
            ]}
          >
            {"<"}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.simpleTextContainer}>
          <Text
            style={[
              theme.typography.body2,
              { color: theme.colors.neutral[1], marginHorizontal: theme.spacing(1) }
            ]}
          >
            {validCurrent} / {totalPages}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: validCurrent === totalPages ? theme.colors.neutral[5] : theme.colors.neutral[6],
              borderColor: theme.colors.neutral[4],
              borderWidth: 1,
              paddingVertical: theme.spacing(0.75),
              paddingHorizontal: theme.spacing(1),
            },
            buttonStyle
          ]}
          onPress={() => onChange(validCurrent + 1)}
          disabled={validCurrent === totalPages}
        >
          <Text
            style={[
              theme.typography.body2,
              { color: validCurrent === totalPages ? theme.colors.neutral[3] : theme.colors.neutral[1] },
              textStyle
            ]}
          >
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderFullPagination = () => {
    const pageNumbers = getPageNumbers();
    
    return (
      <View style={styles.fullContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: validCurrent === 1 ? theme.colors.neutral[5] : theme.colors.neutral[6],
              borderColor: theme.colors.neutral[4],
              borderWidth: 1,
              paddingVertical: theme.spacing(0.75),
              paddingHorizontal: theme.spacing(1),
            },
            buttonStyle
          ]}
          onPress={() => onChange(validCurrent - 1)}
          disabled={validCurrent === 1}
        >
          <Text
            style={[
              theme.typography.body2,
              { color: validCurrent === 1 ? theme.colors.neutral[3] : theme.colors.neutral[1] },
              textStyle
            ]}
          >
            {"<"}
          </Text>
        </TouchableOpacity>
        
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber < 0) {
            // Render ellipsis
            return (
              <View
                key={`ellipsis-${pageNumber}`}
                style={styles.ellipsis}
              >
                <Text
                  style={[
                    theme.typography.body2,
                    { color: theme.colors.neutral[3] }
                  ]}
                >
                  •••
                </Text>
              </View>
            );
          }
          
          const isSelected = pageNumber === validCurrent;
          
          return (
            <TouchableOpacity
              key={`page-${pageNumber}`}
              style={[
                styles.pageButton,
                {
                  backgroundColor: isSelected ? theme.colors.primary[1] : theme.colors.neutral[6],
                  borderColor: isSelected ? theme.colors.primary[1] : theme.colors.neutral[4],
                  borderWidth: 1,
                  minWidth: 32,
                  height: 32,
                },
                buttonStyle,
                isSelected && activeButtonStyle
              ]}
              onPress={() => onChange(pageNumber)}
              disabled={isSelected}
            >
              <Text
                style={[
                  theme.typography.body2,
                  { color: isSelected ? theme.colors.neutral[6] : theme.colors.neutral[1] },
                  textStyle,
                  isSelected && activeTextStyle
                ]}
              >
                {pageNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
        
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: validCurrent === totalPages ? theme.colors.neutral[5] : theme.colors.neutral[6],
              borderColor: theme.colors.neutral[4],
              borderWidth: 1,
              paddingVertical: theme.spacing(0.75),
              paddingHorizontal: theme.spacing(1),
            },
            buttonStyle
          ]}
          onPress={() => onChange(validCurrent + 1)}
          disabled={validCurrent === totalPages}
        >
          <Text
            style={[
              theme.typography.body2,
              { color: validCurrent === totalPages ? theme.colors.neutral[3] : theme.colors.neutral[1] },
              textStyle
            ]}
          >
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {simple ? renderSimplePagination() : renderFullPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  simpleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 32,
    height: 32,
    borderRadius: 4,
  },
  pageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  ellipsis: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  simpleTextContainer: {
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
