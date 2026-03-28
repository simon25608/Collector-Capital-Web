import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { User, Loader2, Save } from 'lucide-react';

export function ProfileView() {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFullName(user.user_metadata?.full_name || '');
        setEmail(user.email || '');
      }
      setFetching(false);
    };
    getUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      
      if (error) throw error;
      
      setMessage({ type: 'success', text: t('profile.updateSuccess', 'Profile updated successfully') });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="w-full max-w-3xl mx-auto px-6 py-24 min-h-[80vh]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
          <User className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-on-surface">{t('navbar.profileSettings', 'Profile Settings')}</h1>
      </div>
      
      <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-xl">
        <form onSubmit={handleUpdate} className="space-y-6">
          {message && (
            <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-error/10 text-error border border-error/20'}`}>
              {message.text}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2 ml-1">
              {t('auth.email', 'Email Address')}
            </label>
            <input 
              type="email" 
              value={email} 
              disabled 
              className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-3.5 text-on-surface-variant cursor-not-allowed" 
            />
            <p className="text-xs text-on-surface-variant/70 mt-2 ml-1">
              {t('profile.emailDisabled', 'Email cannot be changed from this panel.')}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2 ml-1">
              {t('auth.fullName', 'Full Name')}
            </label>
            <input 
              type="text" 
              value={fullName} 
              onChange={e => setFullName(e.target.value)} 
              className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/50 transition-all text-on-surface" 
              placeholder="Ej. Alex Sterling"
            />
          </div>
          
          <div className="pt-4 border-t border-outline-variant/10">
            <button 
              type="submit" 
              disabled={loading} 
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {t('profile.saveChanges', 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
