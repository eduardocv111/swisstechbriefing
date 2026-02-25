import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSearch } from '../../hooks/useHome';
import { ArticleCard } from '../../components/ArticleCards';
import { SearchInput, LoadMoreFooter } from '../../components/UIBlocks';
import { ErrorState, EmptyState } from '../../components/States';
import { Colors } from '../../theme/colors';

/**
 * Global Search Screen for Mobile Phase 1.2
 */
const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useSearch(debouncedQuery);

    const handlePress = (slug: string) => {
        navigation.navigate('ArticleDetailFromSearch', { slug });
    };

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    // Flatten articles
    const articles = data?.pages.flatMap(page => page.data) || [];

    const renderHeader = () => (
        <SearchInput
            value={query}
            onChange={setQuery}
            loading={isFetching && !isFetchingNextPage}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}

            {debouncedQuery.trim().length < 2 ? (
                <View style={styles.centered}>
                    <Text style={styles.initialText}>Suche nach Themen wie "KI", "Quanten" oder "Energie"</Text>
                </View>
            ) : error ? (
                <ErrorState message={error.message} onRetry={refetch} />
            ) : (
                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ArticleCard article={item} onPress={handlePress} />
                    )}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        <LoadMoreFooter
                            hasNextPage={!!hasNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    }
                    ListEmptyComponent={
                        !isFetching ? <EmptyState message={`Keine Ergebnisse für "${debouncedQuery}" gefunden.`} /> : null
                    }
                    contentContainerStyle={articles.length === 0 ? { flex: 1 } : null}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    initialText: {
        color: Colors.dark.textMuted,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
    }
});

export default SearchScreen;
