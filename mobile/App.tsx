import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import { useNotifications } from './src/hooks/useNotifications';
import { Colors } from './src/theme/colors';

// Initialize TanStack Query Client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

/**
 * Root Application Component
 */
export default function App() {
    useNotifications();
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <StatusBar style="light" />
                    <AppNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}
