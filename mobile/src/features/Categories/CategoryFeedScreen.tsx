import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCategoryArticles } from '../../hooks/useHome';
import { ArticleCard } from '../../components/ArticleCards';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/States';
import { LoadMoreFooter } from '../../components/UIBlocks';
import { Colors } from '../../theme/colors';

/**
 * Paginated Feed for a specific category
 */
const CategoryFeedScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { slug } = route.params;

    const {
        data,
        isLoading,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isRefetching
    } = useCategoryArticles(slug);

    const handlePress = (slug: string) => {
        navigation.navigate('ArticleDetailFromCategory', { slug });
    };

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    if (isLoading && !isRefetching) return <LoadingSkeleton />;
    if (error) return <ErrorState message={error.message} onRetry={refetch} />;

    // Flatten pages articles
    const articles = data?.pages.flatMap(page => page.data) || [];

    return (
        <View style={styles.container}>
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
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        tintColor={Colors.dark.primary}
                    />
                }
                ListEmptyComponent={<EmptyState message="In dieser Kategorie sind noch keine Artikel verfügbar." />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
});

export default CategoryFeedScreen;
