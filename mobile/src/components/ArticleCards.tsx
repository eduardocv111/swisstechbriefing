import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MobileArticle } from '../api/types';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface Props {
    article: MobileArticle;
    onPress: (slug: string) => void;
}

/**
 * Premium Editorial Card for the vertical feed
 */
export const ArticleCard: React.FC<Props> = ({ article, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(article.slug)}
            style={styles.container}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: article.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{article.category.toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
                <Text style={styles.excerpt} numberOfLines={2}>{article.excerpt}</Text>
                <Text style={styles.author}>{typeof article.author === 'string' ? article.author : article.author.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

/**
 * Premium Hero Card for the featured highlight
 */
export const FeaturedCard: React.FC<Props> = ({ article, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress(article.slug)}
            style={styles.featuredContainer}
        >
            <Image
                source={{ uri: article.imageUrl }}
                style={styles.featuredImage}
                resizeMode="cover"
            />
            <View style={styles.featuredOverlay}>
                <Text style={styles.featuredCategory}>{article.category.toUpperCase()}</Text>
                <Text style={styles.featuredTitle}>{article.title}</Text>
                <Text style={styles.featuredMeta}>Heute • {typeof article.author === 'string' ? article.author : article.author.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        backgroundColor: Colors.dark.background,
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    categoryBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    categoryText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    title: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 22,
    },
    excerpt: {
        color: Colors.dark.textMuted,
        fontSize: 13,
        marginBottom: 8,
        lineHeight: 18,
    },
    author: {
        color: Colors.dark.primary,
        fontSize: 11,
        fontWeight: '600',
    },
    // Featured styles
    featuredContainer: {
        width: width - 32,
        height: 250,
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.dark.card,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    featuredCategory: {
        color: Colors.dark.primary,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    featuredTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 28,
        marginBottom: 8,
    },
    featuredMeta: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
    }
});
