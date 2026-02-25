import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Heart, Mail, ExternalLink } from 'lucide-react-native';
import { Colors } from '../theme/colors';

/**
 * Premium Support & Newsletter CTA Card (Fase 2.0)
 * Optimized for Reader Conversion
 */
export const SupportCard: React.FC = () => {
    const handleNewsletter = () => {
        WebBrowser.openBrowserAsync('https://swisstechbriefing.ch/newsletter');
    };

    const handleSupport = () => {
        WebBrowser.openBrowserAsync('https://swisstechbriefing.ch/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <Heart size={20} color={Colors.dark.primary} fill={Colors.dark.primary} />
                <Text style={styles.title}>Analysen kosten Zeit.</Text>
            </View>
            <Text style={styles.description}>
                SwissTech Briefing ist unabhängig. Wenn dir unsere Inhalte gefallen,
                unterstütze uns oder abonniere den Newsletter.
            </Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    onPress={handleNewsletter}
                    style={[styles.button, styles.newsletterButton]}
                >
                    <Mail size={16} color="#fff" />
                    <Text style={styles.buttonText}>Newsletter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSupport}
                    style={[styles.button, styles.supportButton]}
                >
                    <ExternalLink size={16} color="#fff" />
                    <Text style={styles.buttonText}>Support</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark.card,
        padding: 24,
        marginVertical: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    description: {
        color: Colors.dark.textMuted,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    newsletterButton: {
        backgroundColor: Colors.dark.primary,
    },
    supportButton: {
        backgroundColor: '#262626',
        borderWidth: 1,
        borderColor: '#404040',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
