import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

const EmptyPlaceholder = ({ title }: { title: string }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.subtext}>Fase 1.2: Coming soon</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background, justifyContent: 'center', alignItems: 'center' },
    text: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    subtext: { color: Colors.dark.textMuted, fontSize: 16, marginTop: 8 }
});

export const CategoriesScreen = () => <EmptyPlaceholder title="Kategorien" />;
export const SearchScreen = () => <EmptyPlaceholder title="Suche" />;
export const SettingsScreen = () => <EmptyPlaceholder title="Mehr" />;
