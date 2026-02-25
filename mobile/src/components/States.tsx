import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { RefreshCcw, AlertTriangle, Inbox } from 'lucide-react-native';

const { width } = Dimensions.get('window');

/**
 * Animated Shimmer Skeleton for premium loading states
 */
export const LoadingSkeleton = () => {
    const shimmerValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = shimmerValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={styles.skeletonContainer}>
            <Animated.View style={[styles.skeletonHero, { opacity }]} />
            {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.skeletonRow}>
                    <Animated.View style={[styles.skeletonThumb, { opacity }]} />
                    <View style={styles.skeletonTextCol}>
                        <Animated.View style={[styles.skeletonTextLine, { width: '80%', opacity }]} />
                        <Animated.View style={[styles.skeletonTextLine, { width: '60%', opacity }]} />
                        <Animated.View style={[styles.skeletonTextLine, { width: '40%', opacity }]} />
                    </View>
                </View>
            ))}
        </View>
    );
};

interface ErrorProps {
    message: string;
    onRetry: () => void;
}

/**
 * Standardized Error State with Retry
 */
export const ErrorState: React.FC<ErrorProps> = ({ message, onRetry }) => (
    <View style={styles.center}>
        <AlertTriangle size={48} color={Colors.dark.primary} strokeWidth={1.5} />
        <Text style={styles.errorTitle}>Verbindungsfehler</Text>
        <Text style={styles.errorText}>{message}</Text>
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
            <RefreshCcw size={16} color="#fff" />
            <Text style={styles.retryText}>Erneut versuchen</Text>
        </TouchableOpacity>
    </View>
);

/**
 * Standardized Empty State
 */
export const EmptyState = ({ message = 'Keine Artikel gefunden' }) => (
    <View style={styles.center}>
        <Inbox size={48} color={Colors.dark.textMuted} strokeWidth={1.5} />
        <Text style={styles.emptyText}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: Colors.dark.background,
    },
    skeletonContainer: {
        padding: 16,
        backgroundColor: Colors.dark.background,
    },
    skeletonHero: {
        width: width - 32,
        height: 250,
        backgroundColor: Colors.dark.border,
        borderRadius: 8,
        marginBottom: 24,
    },
    skeletonRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    skeletonThumb: {
        width: 110,
        height: 110,
        backgroundColor: Colors.dark.border,
        borderRadius: 8,
    },
    skeletonTextCol: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    skeletonTextLine: {
        height: 12,
        backgroundColor: Colors.dark.border,
        borderRadius: 4,
        marginBottom: 8,
    },
    errorTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    errorText: {
        color: Colors.dark.textMuted,
        textAlign: 'center',
        marginBottom: 24,
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
    },
    retryText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    emptyText: {
        color: Colors.dark.textMuted,
        fontSize: 16,
        marginTop: 16,
    }
});
