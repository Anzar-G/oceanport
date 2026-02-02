import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { QRCodeGenerator } from '@/components/ui/QRCodeGenerator';
import { 
  Palette, 
  Globe, 
  Shield, 
  Bell,
  Download,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsProps {
  userId: string;
}

export const Settings: React.FC<SettingsProps> = ({ userId }) => {
  const { profile } = useProfile(userId);
  const [customDomain, setCustomDomain] = useState('');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const profileUrl = `https://linkhub.me/${profile?.full_name?.toLowerCase().replace(/\s+/g, '') || 'user'}`;

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleExportData = () => {
    // Mock export functionality
    const data = {
      profile,
      settings: {
        customDomain,
        analyticsEnabled,
        publicProfile,
        emailNotifications,
      },
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linkhub-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion is not implemented in this demo.');
    }
  };

  const SettingSection = ({ icon: Icon, title, children }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-5 h-5 text-cyan-glow" />
        <h3 className="text-white text-lg font-bold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }: any) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-white font-medium">{label}</p>
        {description && (
          <p className="text-gray-cool text-sm">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-cyan-glow' : 'bg-gray-cool/30'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-white text-4xl font-black tracking-tight">Settings</h2>
        <p className="text-gray-cool text-base">
          Customize your link hub experience and preferences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Appearance Settings */}
          <SettingSection icon={Palette} title="Appearance">
            <div className="space-y-4">
              <div>
                <label className="text-gray-cool text-sm font-medium mb-2 block">
                  Theme
                </label>
                <select className="input-field h-12 w-full">
                  <option value="navy-mysterious">Mysterious Navy (Current)</option>
                  <option value="dark-minimal">Dark Minimal</option>
                  <option value="ocean-depths">Ocean Depths</option>
                </select>
              </div>
              
              <ToggleSwitch
                enabled={publicProfile}
                onChange={setPublicProfile}
                label="Public Profile"
                description="Allow your profile to be discovered publicly"
              />
            </div>
          </SettingSection>

          {/* Domain Settings */}
          <SettingSection icon={Globe} title="Domain & URL">
            <div className="space-y-4">
              <div>
                <label className="text-gray-cool text-sm font-medium mb-2 block">
                  Current URL
                </label>
                <div className="flex gap-2">
                  <Input
                    value={profileUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(profileUrl);
                      toast.success('URL copied!');
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-gray-cool text-sm font-medium mb-2 block">
                  Custom Domain (Pro Feature)
                </label>
                <Input
                  placeholder="yourdomain.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  disabled
                />
                <p className="text-gray-cool/60 text-xs mt-1">
                  Upgrade to Pro to use your own domain
                </p>
              </div>
            </div>
          </SettingSection>

          {/* Privacy & Security */}
          <SettingSection icon={Shield} title="Privacy & Security">
            <div className="space-y-4">
              <ToggleSwitch
                enabled={analyticsEnabled}
                onChange={setAnalyticsEnabled}
                label="Analytics Tracking"
                description="Collect visitor statistics and insights"
              />
              
              <ToggleSwitch
                enabled={emailNotifications}
                onChange={setEmailNotifications}
                label="Email Notifications"
                description="Receive updates about your link performance"
              />
              
              <div className="pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  className="w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  Export My Data
                </Button>
              </div>
            </div>
          </SettingSection>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* QR Code */}
          <QRCodeGenerator
            url={profileUrl}
            size={200}
          />

          {/* Notifications */}
          <SettingSection icon={Bell} title="Notifications">
            <div className="space-y-4">
              <ToggleSwitch
                enabled={true}
                onChange={() => {}}
                label="New Visitor Alerts"
                description="Get notified when someone visits your profile"
              />
              
              <ToggleSwitch
                enabled={false}
                onChange={() => {}}
                label="Weekly Reports"
                description="Receive weekly analytics summaries"
              />
              
              <ToggleSwitch
                enabled={true}
                onChange={() => {}}
                label="Security Alerts"
                description="Important security and account updates"
              />
            </div>
          </SettingSection>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6 border border-red-500/20"
          >
            <div className="flex items-center gap-2 mb-6">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h3 className="text-red-400 text-lg font-bold">Danger Zone</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-white font-medium mb-2">Delete Account</p>
                <p className="text-gray-cool text-sm mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button
                  variant="outline"
                  onClick={handleDeleteAccount}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          Save All Settings
        </Button>
      </div>
    </div>
  );
};