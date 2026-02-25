import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

const EmptyPlaceholder = ({ title }: { title: string }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.subtext}>Fase 2.0: Coming soon</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background, justifyContent: 'center', alignItems: 'center' },
    text: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    subtext: { color: Colors.dark.textMuted, fontSize: 16, marginTop: 8 }
});

// Categories and Search are now implemented
