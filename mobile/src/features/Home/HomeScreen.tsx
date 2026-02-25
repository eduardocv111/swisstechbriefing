import React, { useState, useCallback } from 'react';
import { View, FlatList, ScrollView, RefreshControl, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHome } from '../../hooks/useHome';
import { ArticleCard, FeaturedCard } from '../../components/ArticleCards';
import { LoadingSkeleton, ErrorState } from '../../components/States';
import { Colors } from '../../theme/colors';

/**
 * Premium Home Feed Screen
 * Connected to live API v1.1 via TanStack Query
 */
const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { data, isLoading, error, refetch, isRefetching } = useHome('de-CH');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const handlePress = (slug: string) => {
        navigation.navigate('ArticleDetail', { slug });
    };

    if (isLoading && !isRefetching) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorState message={error.message} onRetry={refetch} />;
    }

    const { featured, latest, categories } = data || { featured: null, latest: [], categories: [] };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={Colors.dark.primary}
                />
            }
        >
            {/* 1. Category Quick Filters */}
            <View style={styles.categoryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                    {categories.map((cat) => (
                        <TouchableOpacity key={cat.id} style={styles.chip}>
                            <Text style={styles.chipText}>{cat.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 2. Hero Component */}
            {featured && (
                <FeaturedCard article={featured} onPress={handlePress} />
            )}

            {/* 3. Latest News Vertical Feed */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Aktuelle Analysen</Text>
            </View>

            <View style={styles.feed}>
                {latest.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onPress={handlePress}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    categoryContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    categoryScroll: {
        paddingHorizontal: 16,
    },
    chip: {
        backgroundColor: Colors.dark.card,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    chipText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    feed: {
        paddingBottom: 32,
    }
});

export default HomeScreen;
