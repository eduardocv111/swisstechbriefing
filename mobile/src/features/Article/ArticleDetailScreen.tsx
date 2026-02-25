import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, Share, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { Share2, Clock, User, ChevronLeft } from 'lucide-react-native';
import { useArticle, useRelated } from '../../hooks/useHome';
import { ArticleCard } from '../../components/ArticleCards';
import { LoadingSkeleton, ErrorState } from '../../components/States';
import { SupportCard } from '../../components/SupportCard';
import { MobileArticle } from '../../api/types';
import { Colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

/**
 * Premium Article Reader Screen (Fase 1)
 */
const ArticleDetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { slug } = route.params;

    const { data: article, isLoading, error, refetch } = useArticle(slug);
    const { data: related } = useRelated(slug);

    const onShare = async () => {
        if (!article) return;
        try {
            await Share.share({
                message: `${article.title}\n\nLies mehr: ${article.webUrl}`,
                url: article.webUrl,
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <LoadingSkeleton />;
    if (error || !article) return <ErrorState message={error?.message || 'Artikel nicht gefunden'} onRetry={refetch} />;

    return (
        <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
            {/* 1. Header with Share button */}
            <View style={styles.navHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.shareButton}>
                    <Share2 size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* 2. Content */}
            <View style={styles.body}>
                <Text style={styles.category}>{article.category.toUpperCase()}</Text>
                <Text style={styles.title}>{article.title}</Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <User size={12} color={Colors.dark.primary} />
                        <Text style={styles.metaText}>{typeof article.author === 'string' ? article.author : article.author.name}</Text>
                    </View>
                    <View style={[styles.metaItem, { marginLeft: 16 }]}>
                        <Clock size={12} color={Colors.dark.textMuted} />
                        <Text style={styles.metaText}>{new Date(article.publishedAt).toLocaleDateString()}</Text>
                    </View>
                </View>

                <Image source={{ uri: article.imageUrl }} style={styles.mainImage} />

                {/* Article Body HTML Render */}
                <View style={styles.articleContent}>
                    <RenderHtml
                        contentWidth={width - 32}
                        source={{ html: article.contentHtml || '' }}
                        baseStyle={styles.baseTextStyle}
                        tagsStyles={htmlTagsStyles}
                    />
                </View>

                {/* Newsletter & Support CTA */}
                <SupportCard />

                {/* 3. Related Articles Section */}
                {related && related.length > 0 && (
                    <View style={styles.relatedSection}>
                        <Text style={styles.relatedTitle}>Mehr zum Thema</Text>
                        <View style={styles.relatedList}>
                            {related.map((rel: MobileArticle) => (
                                <ArticleCard
                                    key={rel.id}
                                    article={rel}
                                    onPress={(slug: string) => navigation.push('ArticleDetail', { slug })}
                                />
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    navHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.dark.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    backButton: {
        padding: 4,
    },
    shareButton: {
        padding: 4,
    },
    body: {
        paddingTop: 16,
    },
    category: {
        color: Colors.dark.primary,
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 36,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    metaRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        color: Colors.dark.textMuted,
        fontSize: 12,
        marginLeft: 4,
    },
    mainImage: {
        width: width,
        height: 250,
        marginBottom: 24,
    },
    articleContent: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },
    baseTextStyle: {
        color: '#fff',
        fontSize: 18,
        lineHeight: 28,
    },
    relatedSection: {
        backgroundColor: Colors.dark.card,
        paddingTop: 32,
        paddingBottom: 48,
    },
    relatedTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    relatedList: {
        borderTopWidth: 1,
        borderTopColor: Colors.dark.border,
    }
});

const htmlTagsStyles = {
    p: {
        color: '#d4d4d4',
        marginBottom: 20,
        lineHeight: 26,
    },
    h2: {
        color: '#fff',
        fontSize: 22,
        marginTop: 24,
        marginBottom: 12,
        fontWeight: 'bold' as const,
    },
    li: {
        color: '#d4d4d4',
        marginBottom: 8,
    },
};

export default ArticleDetailScreen;
