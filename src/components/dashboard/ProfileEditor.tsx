import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { profileSchema } from '@/lib/validation';
import { ProfileFormData } from '@/types';
import { useProfile } from '@/hooks/useProfile';
import { uploadAvatar } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Upload, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ProfileEditorProps {
  userId: string;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ userId }) => {
  const { profile, updateProfile } = useProfile(userId);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      tagline: profile?.tagline || '',
      location: profile?.location || '',
    },
  });

  const bioValue = watch('bio');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('avatar', file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      let avatarUrl = profile?.avatar_url;

      // Handle avatar upload if new file selected
      if (selectedFile) {
        setUploading(true);
        const { url, error } = await uploadAvatar(selectedFile, userId);
        if (error) throw error;
        avatarUrl = url;
      }

      const { error } = await updateProfile({
        ...data,
        avatar_url: avatarUrl,
      });

      if (error) throw error;
      toast.success('Profile updated successfully!');
      setSelectedFile(null);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setUploading(false);
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
        <h2 className="text-white text-4xl font-black tracking-tight">Profile Settings</h2>
        <p className="text-gray-cool text-base">
          Customize your landing page and personal information.
        </p>
      </motion.div>

      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar
                src={selectedFile ? URL.createObjectURL(selectedFile) : profile?.avatar_url}
                alt={profile?.full_name || 'User'}
                size="xl"
                className="ring-4 ring-teal-accent/20"
              />
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-teal-accent rounded-full flex items-center justify-center border-4 border-navy-base text-navy-base hover:scale-110 transition-transform cursor-pointer">
                <Upload className="w-5 h-5 font-bold" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col">
              <h3 className="text-white text-xl font-bold">Your Avatar</h3>
              <p className="text-gray-cool text-sm mt-1">Recommended size: 400x400px</p>
              <p className="text-gray-cool text-sm">JPG, PNG or WEBP. Max 2MB.</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => document.querySelector('input[type="file"]')?.click()}>
            Upload New
          </Button>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8 rounded-xl"
      >
        <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-teal-accent" />
          Personal Information
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Display Name"
              placeholder="e.g. Alex Rivera"
              {...register('full_name')}
              error={errors.full_name?.message}
            />

            <Input
              label="Professional Title"
              placeholder="e.g. Senior Product Designer"
              {...register('tagline')}
              error={errors.tagline?.message}
            />
          </div>

          <div className="space-y-2">
            <Textarea
              label="Bio"
              placeholder="Tell people about yourself..."
              rows={4}
              {...register('bio')}
              error={errors.bio?.message}
            />
            <p className="text-right text-[10px] text-gray-cool/50 uppercase tracking-widest">
              {bioValue?.length || 0} / 500 Characters
            </p>
          </div>

          <Input
            label="Location (Optional)"
            placeholder="City, Country"
            {...register('location')}
            error={errors.location?.message}
          />

          <div className="flex justify-end gap-4 pt-6">
            <Button variant="ghost" type="button">
              Discard changes
            </Button>
            <Button type="submit" loading={isSubmitting || uploading}>
              Save Changes
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};