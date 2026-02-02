import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { UAParser } from 'ua-parser-js';

export const useAnalytics = () => {
    const getVisitorId = () => {
        let visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem('visitor_id', visitorId);
        }
        return visitorId;
    };

    const getMetadata = () => {
        const parser = new UAParser();
        const device = parser.getDevice();
        const os = parser.getOS();
        const browser = parser.getBrowser();

        return {
            device_type: device.type || 'desktop',
            os_name: os.name,
            browser_name: browser.name,
            screen_width: window.innerWidth,
            referrer: document.referrer,
            path: window.location.pathname
        };
    };

    const trackView = useCallback(async (userId: string) => {
        try {
            if (!userId || userId === 'demo') return;

            const visitorId = getVisitorId();
            await supabase.from('analytics').insert({
                user_id: userId,
                event_type: 'view',
                visitor_id: visitorId,
                metadata: getMetadata()
            });
        } catch (error) {
            console.error('Failed to track view:', error);
        }
    }, []);

    const trackClick = useCallback(async (userId: string, linkId: string, metadata: any = {}) => {
        try {
            if (!userId || userId === 'demo') return;

            const visitorId = getVisitorId();
            await supabase.from('analytics').insert({
                user_id: userId,
                event_type: 'click',
                link_id: linkId,
                visitor_id: visitorId,
                metadata: { ...getMetadata(), ...metadata }
            });
        } catch (error) {
            console.error('Failed to track click:', error);
        }
    }, []);

    return { trackView, trackClick };
};
