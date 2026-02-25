import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Grid, Search, MoreHorizontal } from 'lucide-react-native';
import { Colors } from '../theme/colors';

// Screens
import HomeScreen from '../features/Home/HomeScreen';
import ArticleDetailScreen from '../features/Article/ArticleDetailScreen';
// Placeholder Screens
import { CategoriesScreen, SearchScreen, SettingsScreen } from '../features/Placeholders';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Common Header Option for Premium Feel
 */
const screenOptions = {
    headerStyle: {
        backgroundColor: Colors.dark.background,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold' as const,
        fontSize: 18,
    },
    cardStyle: { backgroundColor: Colors.dark.background },
};

/**
 * Main Content Stack (Home + Detail)
 */
function HomeStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ title: 'SwissTech Briefing' }}
            />
            <Stack.Screen
                name="ArticleDetail"
                component={ArticleDetailScreen}
                options={{ title: '' }}
            />
        </Stack.Navigator>
    );
}

/**
 * Bottom Tab Navigation (4 Tabs)
 */
export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Colors.dark.background,
                    borderTopColor: Colors.dark.border,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 60,
                },
                tabBarActiveTintColor: Colors.dark.primary,
                tabBarInactiveTintColor: Colors.dark.textMuted,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Kategorien"
                component={CategoriesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Grid color={color} size={size} />,
                    headerShown: true,
                    ...screenOptions,
                }}
            />
            <Tab.Screen
                name="Suche"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
                    headerShown: true,
                    ...screenOptions,
                }}
            />
            <Tab.Screen
                name="Mehr"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MoreHorizontal color={color} size={size} />,
                    headerShown: true,
                    ...screenOptions,
                }}
            />
        </Tab.Navigator>
    );
}
