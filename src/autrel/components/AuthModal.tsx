import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles, AlertCircle, LogIn, CheckCircle2, Cloud, RefreshCw } from 'lucide-react';
import { useAuth } from '../lib/authContext';
import { TraveliciousLogo } from './TraveliciousLogo';
import { AutumnLeaf } from './AutumnLeaf';
import { useJourneyStore } from '../lib/journeyStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signin',
}) => {
  const {
    user,
    isAnonymous,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest,
    linkGuestWithGoogle,
    signOut,
  } = useAuth();
  const { stats } = useJourneyStore();

  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        if (!displayName.trim()) {
          throw new Error('Please enter your explorer callsign / adventurer name');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        await signUpWithEmail(email, password, displayName);
        setSuccessMessage('Explorer Passport issued successfully!');
        setTimeout(() => onClose(), 1200);
      } else {
        await signInWithEmail(email, password);
        setSuccessMessage('Welcome back, Explorer!');
        setTimeout(() => onClose(), 1000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      if (isAnonymous) {
        await linkGuestWithGoogle();
      } else {
        await signInWithGoogle();
      }
      setSuccessMessage('Signed in with Google!');
      setTimeout(() => onClose(), 1000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Google sign-in could not be completed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestContinue = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await signInAsGuest();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not start guest session');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md my-8 bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE] rounded-3xl border-2 border-[#E5D7C6] shadow-2xl p-6 sm:p-8 text-[#38281E]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F2E5D5] text-[#8A7568] transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Already Logged In Card State */}
          {user && !isAnonymous ? (
            <div className="space-y-6 text-center py-2">
              <div className="flex justify-center">
                <TraveliciousLogo variant="icon" size="lg" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#C1512F] bg-[#FDF2EE] border border-[#F1C6B7] px-3 py-1 rounded-full">
                  Passport Active · Verified Cloud Explorer
                </span>
                <h2 className="text-2xl font-black mt-2 font-display text-[#2B1B12]">
                  {user.displayName || user.email?.split('@')[0] || 'Adventurer'}
                </h2>
                <p className="text-xs text-[#8A7568] font-mono mt-0.5">{user.email}</p>
              </div>

              {/* Explorer Current Stats Preview */}
              <div className="grid grid-cols-3 gap-2.5 bg-white/70 p-3.5 rounded-2xl border border-[#E5D7C6]">
                <div className="text-center">
                  <div className="text-xs text-[#8A7568]">Gems Found</div>
                  <div className="font-black text-lg text-[#C1512F]">{stats.uniqueVisited}</div>
                </div>
                <div className="text-center border-x border-[#E5D7C6]">
                  <div className="text-xs text-[#8A7568]">Travel Coins</div>
                  <div className="font-black text-lg text-[#D97706]">{stats.totalCoins}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#8A7568]">Rank Level</div>
                  <div className="font-black text-lg text-[#163322]">Lvl {stats.level}</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-left flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  Your progress is synced to the cloud. You can switch devices or refresh without losing any visited gems or coins.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#C1512F] to-[#D95328] text-white font-black text-sm shadow-md hover:brightness-105 transition cursor-pointer"
                >
                  Continue Expedition
                </button>
                <button
                  onClick={async () => {
                    await signOut();
                    setSuccessMessage('Signed out');
                  }}
                  className="px-4 py-3 rounded-xl bg-[#FAF6F0] hover:bg-[#F2E5D5] text-[#8A7568] font-bold text-xs border border-[#DFD5CB] transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Login & Sign Up Forms */
            <div className="space-y-5">
              {/* Header with Reference Logo Lockup */}
              <div className="text-center space-y-1">
                <TraveliciousLogo variant="full" size="sm" />
                <h3 className="text-lg font-black text-[#2B1B12] mt-3">
                  {isAnonymous
                    ? 'Save Your Explorer Passport'
                    : mode === 'signup'
                    ? 'Issue Explorer Passport'
                    : 'Explorer Check-In'}
                </h3>
                <p className="text-xs text-[#8A7568] leading-relaxed max-w-xs mx-auto">
                  {isAnonymous
                    ? 'You are on a guest pass. Link your account to save your gems, coins, and badges forever.'
                    : 'Access your verified codex, saved expedition stamps, and Travel Coins from any device.'}
                </p>
              </div>

              {/* Cloud Sync Value Badge */}
              {stats.uniqueVisited > 0 && (
                <div className="p-2.5 rounded-xl bg-[#FFF8ED] border border-[#F5D8B8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-[#D97706]" />
                    <span className="font-semibold text-[#8A4A2B]">
                      {stats.uniqueVisited} Gems & {stats.totalCoins} Coins pending sync
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase font-mono px-1.5 py-0.5 rounded bg-white text-emerald-700 border border-emerald-300">
                    Safe
                  </span>
                </div>
              )}

              {/* Mode Toggle (Sign In vs Create) */}
              <div className="flex bg-[#EFE6DC] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    mode === 'signin'
                      ? 'bg-white text-[#38281E] shadow-2xs'
                      : 'text-[#8A7568] hover:text-[#38281E]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-white text-[#38281E] shadow-2xs'
                      : 'text-[#8A7568] hover:text-[#38281E]'
                  }`}
                >
                  Create Passport
                </button>
              </div>

              {/* Alerts */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Google One-Click Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 border border-[#D5C7B8] shadow-xs text-xs font-bold text-stone-800 flex items-center justify-center gap-2.5 transition cursor-pointer disabled:opacity-50"
              >
                {/* Google "G" icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#E5D7C6] w-full" />
                <span className="bg-[#FAF5EE] px-3 text-[10px] uppercase font-bold text-[#8A7568] absolute">
                  or email
                </span>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-[11px] font-bold text-[#6E5A4E] mb-1">
                      Explorer Callsign / Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#A89485] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Captain Ananya"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#DFD5CB] focus:outline-none focus:ring-2 focus:ring-[#C1512F]/40 text-[#2B1B12]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-[#6E5A4E] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A89485] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="explorer@autrel.app"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#DFD5CB] focus:outline-none focus:ring-2 focus:ring-[#C1512F]/40 text-[#2B1B12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#6E5A4E] mb-1">
                    Password {mode === 'signup' && <span className="font-normal text-[#8A7568]">(min 6 chars)</span>}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#A89485] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#DFD5CB] focus:outline-none focus:ring-2 focus:ring-[#C1512F]/40 text-[#2B1B12]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C1512F] to-[#D95328] hover:brightness-105 text-white font-black text-xs shadow-md shadow-[#C1512F]/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : mode === 'signup' ? (
                    <>
                      <span>Create Passport & Sync</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In & Sync</span>
                    </>
                  )}
                </button>
              </form>

              {/* Guest explorer escape hatch */}
              {!user && (
                <div className="text-center pt-1 border-t border-[#EFE6DC]">
                  <button
                    type="button"
                    onClick={handleGuestContinue}
                    className="text-xs text-[#8A7568] hover:text-[#C1512F] font-semibold underline decoration-dotted cursor-pointer"
                  >
                    Continue as Guest Explorer for now
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
