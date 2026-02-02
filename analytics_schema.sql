-- Analytics Schema for Supabase
-- Analytics table to store events
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    -- The owner of the profile being viewed
    event_type VARCHAR(50) NOT NULL,
    -- 'view', 'click'
    link_id UUID REFERENCES social_links(id) ON DELETE
    SET NULL,
        -- Nullable, only for click events
        visitor_id VARCHAR(100),
        -- Anonymous fingerprint/cookie ID
        metadata JSONB DEFAULT '{}'::jsonb,
        -- flexible for device info, country, etc
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Enable RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
-- Policy: Everyone (public) can insert events (track views/clicks)
CREATE POLICY "Public can insert analytics" ON analytics FOR
INSERT WITH CHECK (true);
-- Policy: Users can only read their OWN analytics
CREATE POLICY "Users can view own analytics" ON analytics FOR
SELECT USING (auth.uid() = user_id);
-- Indexes for performance
CREATE INDEX idx_analytics_user_id ON analytics(user_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);