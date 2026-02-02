import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { socialLinkSchema } from '@/lib/validation';
import { SocialLinkFormData, SocialPlatform } from '@/types';
import { useLinks } from '@/hooks/useLinks';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { getSocialIcon, getPlatformColor } from '@/lib/utils';
import { 
  Link as LinkIcon, 
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface LinkEditorProps {
  userId: string;
}

const platformOptions: { value: SocialPlatform; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'discord', label: 'Discord' },
  { value: 'upscrolled', label: 'UpScrolled' },
];

export const LinkEditor: React.FC<LinkEditorProps> = ({ userId }) => {
  const { links, addLink, updateLink, deleteLink } = useLinks(userId);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      is_active: true,
    },
  });

  const onSubmit = async (data: SocialLinkFormData) => {
    try {
      if (editingId) {
        const { error } = await updateLink(editingId, data);
        if (error) throw error;
        toast.success('Link updated!');
        setEditingId(null);
      } else {
        const { error } = await addLink(data);
        if (error) throw error;
        toast.success('Link added!');
      }
      reset({ platform: undefined, label: '', url: '', username: '', is_active: true });
    } catch (error) {
      toast.error('Failed to save link');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this link?')) return;
    
    try {
      const { error } = await deleteLink(id);
      if (error) throw error;
      toast.success('Link deleted!');
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const handleEdit = (link: any) => {
    setEditingId(link.id);
    reset({
      platform: link.platform,
      label: link.label,
      url: link.url,
      username: link.username || '',
      is_active: link.is_active,
    });
  };

  const toggleLinkVisibility = async (id: string, currentState: boolean) => {
    try {
      const { error } = await updateLink(id, { is_active: !currentState });
      if (error) throw error;
    } catch (error) {
      toast.error('Failed to update link visibility');
    }
  };

  return (
    <div className="space-y-8">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1B2B44',
            color: '#F8F9FA',
            border: '1px solid rgba(0, 217, 255, 0.2)',
          },
        }}
      />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-white text-4xl font-black tracking-tight">Social Links</h2>
        <p className="text-gray-cool text-base">
          Manage your social media links and online presence.
        </p>
      </motion.div>

      {/* Add/Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 rounded-xl"
      >
        <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-teal-accent" />
          {editingId ? 'Edit Link' : 'Add New Link'}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-cool text-sm font-medium">Platform</label>
              <select
                {...register('platform')}
                className="input-field h-12 md:h-14"
              >
                <option value="">Select platform</option>
                {platformOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.platform && (
                <p className="text-red-400 text-sm">{errors.platform.message}</p>
              )}
            </div>

            <Input
              label="Label"
              placeholder="Display name"
              {...register('label')}
              error={errors.label?.message}
            />
          </div>

          <Input
            label="URL"
            placeholder="https://..."
            {...register('url')}
            error={errors.url?.message}
          />

          <Input
            label="Username (optional)"
            placeholder="@username"
            {...register('username')}
            error={errors.username?.message}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
              {editingId ? 'Update Link' : 'Add Link'}
            </Button>
            
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  reset({ platform: undefined, label: '', url: '', username: '', is_active: true });
                }}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Links List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8 rounded-xl"
      >
        <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-6">
          <LinkIcon className="w-5 h-5 text-teal-accent" />
          Your Links ({links.length})
        </h3>

        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="text-center py-12">
              <LinkIcon className="w-12 h-12 text-gray-cool/30 mx-auto mb-4" />
              <p className="text-gray-cool">No links added yet</p>
              <p className="text-gray-cool/60 text-sm">Add your first social link above</p>
            </div>
          ) : (
            links.map((link) => {
              const Icon = getSocialIcon(link.platform);
              const platformColor = getPlatformColor(link.platform);
              
              return (
                <div
                  key={link.id}
                  className="bg-navy-mid/40 rounded-lg p-4 border border-white/10 flex items-center gap-4 group hover:border-teal-accent/30 transition-all"
                >
                  <GripVertical className="w-5 h-5 text-gray-cool/50 cursor-grab" />
                  
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${platformColor}20` }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: platformColor }} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-white">{link.label}</p>
                    <p className="text-sm text-gray-cool/70 capitalize">
                      {link.platform}
                      {link.username && ` • @${link.username}`}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => toggleLinkVisibility(link.id, link.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      link.is_active 
                        ? 'text-teal-accent hover:bg-teal-accent/10' 
                        : 'text-gray-cool hover:bg-white/5'
                    }`}
                  >
                    {link.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleEdit(link)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-cyan-glow" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};