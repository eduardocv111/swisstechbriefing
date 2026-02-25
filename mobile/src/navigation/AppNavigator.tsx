import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Grid, Search, MoreHorizontal } from 'lucide-react-native';
import { Colors } from '../theme/colors';

// Screens
import HomeScreen from '../features/Home/HomeScreen';
import ArticleDetailScreen from '../features/Article/ArticleDetailScreen';
import CategoriesScreen from '../features/Categories/CategoriesScreen';
import CategoryFeedScreen from '../features/Categories/CategoryFeedScreen';
import SearchScreen from '../features/Search/SearchScreen';
import SettingsScreen from '../features/Settings/SettingsScreen';

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
 * Category Stack (Browsing + Feed + Detail)
 */
function CategoryStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="CategoriesMain"
                component={CategoriesScreen}
                options={{ title: 'Kategorien' }}
            />
            <Stack.Screen
                name="CategoryFeed"
                component={CategoryFeedScreen}
                options={({ route }: any) => ({ title: route.params.label || 'Kategorie' })}
            />
            <Stack.Screen
                name="ArticleDetailFromCategory"
                component={ArticleDetailScreen}
                options={{ title: '' }}
            />
        </Stack.Navigator>
    );
}

/**
 * Search Stack (Search + Details)
 */
function SearchStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="SearchMain"
                component={SearchScreen}
                options={{ title: 'Suche' }}
            />
            <Stack.Screen
                name="ArticleDetailFromSearch"
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
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="KategorienTab"
                component={CategoryStack}
                options={{
                    tabBarLabel: 'Rubriken',
                    tabBarIcon: ({ color, size }) => <Grid color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="SucheTab"
                component={SearchStack}
                options={{
                    tabBarLabel: 'Suchen',
                    tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="MehrTab"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Mehr',
                    tabBarIcon: ({ color, size }) => <MoreHorizontal color={color} size={size} />,
                    headerShown: true,
                    ...screenOptions,
                }}
            />
        </Tab.Navigator>
    );
}
