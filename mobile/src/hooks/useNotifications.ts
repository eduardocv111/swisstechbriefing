import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

/**
 * Configure Global Notification Behavior
 */
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

/**
 * Professional Hook for Mobile Push Notifications (Fase 2.0)
 */
export function useNotifications() {
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('[PUSH] Notification clicked:', response.notification.request.content.data);
            // Deep link handling logic would go here: e.g. navigate to ArticleDetail
        });

        return () => {
            if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
            if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return { expoPushToken, notification };
}

/**
 * Logic to register device for push notifications
 */
async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Breaking News',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#e11d48',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.warn('[PUSH] Permission to get push token was denied!');
            return;
        }

        // Experience project ID is required for Expo Push Token
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId || Constants?.easConfig?.projectId;
        if (!projectId) {
            console.warn('[PUSH] EAS Project ID missing in app.json. Cannot fetch push token.');
            return;
        }

        try {
            token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
            console.log('[PUSH] Token registered:', token);
        } catch (e) {
            console.error('[PUSH] Failed to get push token:', e);
        }
    } else {
        console.log('[PUSH] Must use physical device for Push Notifications');
    }

    return token;
}
