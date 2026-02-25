import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Linking, Platform } from 'react-native';
import { Bell, Shield, Info, ExternalLink, Heart, Globe, Mail, ChevronRight } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import { Colors } from '../../theme/colors';

/**
 * Premium Settings & About Screen (Mehr)
 * Includes Push Notification Management and Legal Links
 */
const SettingsScreen: React.FC = () => {
    const [newsEnabled, setNewsEnabled] = useState(true);
    const [digestEnabled, setDigestEnabled] = useState(false);

    const openLink = (url: string) => {
        WebBrowser.openBrowserAsync(url);
    };

    const SettingItem = ({ icon: Icon, label, value, onValueChange, type = 'toggle', onPress }: any) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={onPress}
            disabled={type === 'toggle'}
        >
            <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: Colors.dark.card }]}>
                    <Icon size={20} color={Colors.dark.primary} />
                </View>
                <Text style={styles.itemLabel}>{label}</Text>
            </View>
            {type === 'toggle' ? (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#3f3f46', true: Colors.dark.primary }}
                    thumbColor="#fff"
                />
            ) : (
                <ChevronRight size={18} color={Colors.dark.textMuted} />
            )}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header / Brand */}
            <View style={styles.brandBox}>
                <View style={styles.logoCircle}>
                    <Text style={styles.logoText}>STB</Text>
                </View>
                <Text style={styles.brandName}>SwissTech Briefing</Text>
                <Text style={styles.version}>Version 1.0.0 (Beta)</Text>
            </View>

            {/* Notifications Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Benachrichtigungen</Text>
                <View style={styles.card}>
                    <SettingItem
                        icon={Bell}
                        label="Eilmeldungen"
                        value={newsEnabled}
                        onValueChange={setNewsEnabled}
                    />
                    <View style={styles.divider} />
                    <SettingItem
                        icon={Mail}
                        label="Daily Digest"
                        value={digestEnabled}
                        onValueChange={setDigestEnabled}
                    />
                </View>
            </View>

            {/* Support Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Community & Support</Text>
                <View style={styles.card}>
                    <SettingItem
                        icon={Heart}
                        label="Unterstütze STB"
                        type="link"
                        onPress={() => openLink('https://swisstechbriefing.ch')}
                    />
                    <View style={styles.divider} />
                    <SettingItem
                        icon={Globe}
                        label="Besuche Website"
                        type="link"
                        onPress={() => openLink('https://swisstechbriefing.ch')}
                    />
                </View>
            </View>

            {/* Legal Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Rechtliches</Text>
                <View style={styles.card}>
                    <SettingItem
                        icon={Shield}
                        label="Datenschutz"
                        type="link"
                        onPress={() => openLink('https://swisstechbriefing.ch/privacy')}
                    />
                    <View style={styles.divider} />
                    <SettingItem
                        icon={Info}
                        label="Impressum"
                        type="link"
                        onPress={() => openLink('https://swisstechbriefing.ch/impressum')}
                    />
                </View>
            </View>

            <Text style={styles.footerText}>Made with Precision in Switzerland</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    brandBox: {
        alignItems: 'center',
        marginVertical: 32,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.dark.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    logoText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    brandName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    version: {
        color: Colors.dark.textMuted,
        fontSize: 14,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: Colors.dark.textMuted,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 8,
        marginLeft: 4,
    },
    card: {
        backgroundColor: Colors.dark.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        overflow: 'hidden',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.dark.border,
        marginHorizontal: 16,
    },
    footerText: {
        textAlign: 'center',
        color: Colors.dark.textMuted,
        fontSize: 12,
        marginTop: 16,
        opacity: 0.5,
    },
});

export default SettingsScreen;
