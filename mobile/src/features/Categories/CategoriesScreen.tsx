import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategories } from '../../hooks/useHome';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/States';
import { CategoryItem } from '../../components/UIBlocks';
import { Colors } from '../../theme/colors';

/**
 * Premium Category List Screen
 */
const CategoriesScreen = () => {
    const navigation = useNavigation<any>();
    const { data: categories, isLoading, error, refetch } = useCategories();

    const handlePress = (slug: string, label: string) => {
        navigation.navigate('CategoryFeed', { slug, label });
    };

    if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorState message={error.message} onRetry={refetch} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CategoryItem
                        label={item.label}
                        onPress={() => handlePress(item.slug, item.label)}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={refetch}
                        tintColor={Colors.dark.primary}
                    />
                }
                ListEmptyComponent={<EmptyState message="Keine Kategorien gefunden" />}
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

export default CategoriesScreen;
