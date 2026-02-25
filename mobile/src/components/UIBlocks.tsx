import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Search, X, ChevronRight } from 'lucide-react-native';
import { Colors } from '../theme/colors';

/**
 * Premium Search Input with debounce/clear support
 */
export const SearchInput: React.FC<{
    value: string,
    onChange: (text: string) => void,
    placeholder?: string,
    loading?: boolean
}> = ({ value, onChange, placeholder = 'Suchen...', loading }) => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
                <Search size={20} color={Colors.dark.textMuted} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.dark.textMuted}
                    autoFocus
                />
                {loading ? (
                    <ActivityIndicator size="small" color={Colors.dark.primary} style={styles.icon} />
                ) : value.length > 0 ? (
                    <TouchableOpacity onPress={() => onChange('')}>
                        <X size={20} color={Colors.dark.textMuted} style={styles.icon} />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

/**
 * Premium Category List Item
 */
export const CategoryItem: React.FC<{
    label: string,
    onPress: () => void
}> = ({ label, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.categoryItem}>
        <Text style={styles.categoryLabel}>{label}</Text>
        <ChevronRight size={20} color={Colors.dark.textMuted} />
    </TouchableOpacity>
);

/**
 * Infinite Scroll Pagination Indicator
 */
export const LoadMoreFooter: React.FC<{ hasNextPage: boolean, isFetchingNextPage: boolean }> = ({
    hasNextPage,
    isFetchingNextPage
}) => {
    if (!hasNextPage) return <View style={styles.footerSpacer} />;
    return (
        <View style={styles.footerContainer}>
            {isFetchingNextPage ? (
                <ActivityIndicator color={Colors.dark.primary} size="small" />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.dark.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.card,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    icon: {
        marginHorizontal: 8,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        backgroundColor: Colors.dark.background,
    },
    categoryLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    footerContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerSpacer: {
        height: 40,
    }
});
