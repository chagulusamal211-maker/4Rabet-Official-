import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MessageCircle, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Plus, 
  Check,
  Mail,
  Smartphone,
  Loader2
} from 'lucide-react';

type AuthMode = 'login' | 'register';

export default function App() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#050b14] selection:bg-primary-blue selection:text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-radial-gradient from-primary-blue/5 via-transparent to-transparent pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[440px] bg-card-bg rounded-2xl border border-border-dark shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-dark/50">
          <button className="text-text-muted hover:text-white transition-all duration-200 active:scale-90">
            <MessageCircle className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold tracking-[0.15em] text-white">
            {mode === 'login' ? 'LOG IN' : 'REGISTRATION'}
          </h2>
          <button className="bg-white/5 p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence initial={false} mode="wait">
            {mode === 'login' ? (
              <LoginForm 
                key="login" 
                loginType={loginType}
                setLoginType={setLoginType}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onSwitch={() => setMode('register')}
              />
            ) : (
              <RegisterForm 
                key="register"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onSwitch={() => setMode('login')}
              />
            )}
          </AnimatePresence>

          {/* Social Login */}
          <div className="mt-8 space-y-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-border-dark/80"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-text-muted tracking-[0.3em] uppercase">OR</span>
              <div className="flex-grow border-t border-border-dark/80"></div>
            </div>

            <button className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-200 hover:bg-gray-100 active:scale-[0.98] shadow-lg">
              <div className="bg-white p-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <span className="text-[15px]">Continue with Google</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LoginForm({ 
  loginType, 
  setLoginType, 
  showPassword, 
  setShowPassword, 
  onSwitch 
}: { 
  loginType: 'email' | 'phone', 
  setLoginType: (t: 'email' | 'phone') => void,
  showPassword: boolean,
  setShowPassword: (s: boolean) => void,
  onSwitch: () => void
}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const isActive = identifier.trim().length > 0 && password.length > 0;

  const handleSubmit = async () => {
    if (!isActive || loading) return;
    setLoading(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'login', loginType, identifier, password })
      });
      // Silent success
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-[13px]">
        <span className="text-text-muted">New user?</span>
        <button onClick={onSwitch} className="text-primary-blue font-bold hover:brightness-125 transition-all">Registration</button>
      </div>

      {/* Login Tabs */}
      <div className="flex bg-input-bg/50 p-1 rounded-xl border border-white/5">
        <button 
          onClick={() => setLoginType('email')}
          className={`flex-1 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-bold text-sm ${loginType === 'email' ? 'bg-primary-blue text-white shadow-[0_4px_15px_rgba(0,118,255,0.3)]' : 'text-text-muted hover:text-white'}`}
        >
          <Mail className="w-4.5 h-4.5" />
          Email or ID
        </button>
        <button 
          onClick={() => setLoginType('phone')}
          className={`flex-1 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-bold text-sm ${loginType === 'phone' ? 'bg-primary-blue text-white shadow-[0_4px_15px_rgba(0,118,255,0.3)]' : 'text-text-muted hover:text-white'}`}
        >
          <Smartphone className="w-4.5 h-4.5" />
          Phone
        </button>
      </div>

      <div className="space-y-4">
        {loginType === 'phone' ? (
          <div className="flex items-center bg-input-bg border border-border-dark rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue focus-within:bg-input-bg/80 transition-all duration-200 group">
            <button className="flex items-center gap-2 px-4 py-4 border-r border-border-dark hover:bg-white/5 transition-colors">
              <span className="text-xl">🇮🇳</span>
              <span className="text-white font-bold">+91</span>
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>
            <input 
              type="tel" 
              placeholder="Phone number" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-transparent px-5 py-4 text-white placeholder-text-muted outline-none font-medium"
            />
          </div>
        ) : (
          <div className="bg-input-bg border border-border-dark rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue focus-within:bg-input-bg/80 transition-all duration-200">
            <input 
              type="text" 
              placeholder="Email or ID" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-transparent px-5 py-4 text-white placeholder-text-muted outline-none font-medium"
            />
          </div>
        )}

        <div className="bg-input-bg border border-border-dark rounded-xl overflow-hidden flex items-center focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue focus-within:bg-input-bg/80 transition-all duration-200 group">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent px-5 py-4 text-white placeholder-text-muted outline-none font-medium"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="px-5 text-text-muted hover:text-white transition-all duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex justify-start">
        <button className="text-[13px] text-text-muted hover:text-white transition-colors duration-200">
          Forgot password? <span className="text-primary-blue font-bold ml-1">Reset</span>
        </button>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={!isActive || loading}
        className={`w-full py-4.5 rounded-xl font-black uppercase tracking-[0.2em] text-[15px] transition-all duration-300 transform ${
          isActive 
            ? 'bg-primary-blue text-white shadow-[0_8px_25px_rgba(0,118,255,0.4)] cursor-pointer hover:shadow-[0_10px_30px_rgba(0,118,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]' 
            : 'bg-[#1e2c41] text-text-muted cursor-not-allowed opacity-50'
        } flex items-center justify-center`}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
      </button>
    </motion.div>
  );
}

function RegisterForm({ 
  showPassword, 
  setShowPassword, 
  onSwitch 
}: { 
  showPassword: boolean,
  setShowPassword: (s: boolean) => void,
  onSwitch: () => void
}) {
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isActive = phone.trim().length > 0 && password.length > 0 && agreed;

  const handleSubmit = async () => {
    if (!isActive || loading) return;
    setLoading(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'register', phone, password, agreed })
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-[13px]">
        <span className="text-text-muted">Have an account?</span>
        <button onClick={onSwitch} className="text-primary-blue font-bold hover:brightness-125 transition-all">Log In</button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center bg-input-bg border border-border-dark rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue focus-within:bg-input-bg/80 transition-all duration-200 group">
          <button className="flex items-center gap-2 px-4 py-4 border-r border-border-dark hover:bg-white/5 transition-colors">
            <span className="text-xl">🇮🇳</span>
            <span className="text-white font-bold">+91</span>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>
          <input 
            type="tel" 
            placeholder="Phone number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-transparent px-5 py-4 text-white placeholder-text-muted outline-none font-medium"
          />
        </div>

        <div className="bg-input-bg border border-border-dark rounded-xl overflow-hidden flex items-center focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue focus-within:bg-input-bg/80 transition-all duration-200 group">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent px-5 py-4 text-white placeholder-text-muted outline-none font-medium"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="px-5 text-text-muted hover:text-white transition-all duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="bg-input-bg border border-border-dark rounded-xl overflow-hidden flex items-center px-5 py-4 group cursor-pointer hover:bg-[#142133] focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all duration-200">
          <span className="text-xl mr-3">🇮🇳</span>
          <span className="text-white flex-grow font-medium text-[15px]">₹ — INR</span>
          <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5" />
        </div>

        <button className="flex items-center gap-2 text-primary-blue hover:brightness-125 font-bold text-[13px] transition-all active:scale-95">
          <Plus className="w-4.5 h-4.5 stroke-[3px]" />
          I have a promo code
        </button>
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">Choose your bonus</h3>
        <div className="bg-gradient-to-r from-primary-blue/50 to-[#00c6ff]/50 p-[1px] rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#101c2e] p-4 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-[#162439] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 rounded-xl bg-cover bg-center overflow-hidden border border-white/10 shadow-lg relative z-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&auto=format&fit=crop)' }}>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="flex-grow z-10">
              <h4 className="text-sm font-bold text-white tracking-wide">777% Tower Rush Welcome Pack</h4>
              <p className="text-[11px] text-text-muted font-medium mt-0.5">Climb the Tower with Boost</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-blue transition-all duration-300 z-10">
              <ChevronDown className="w-4 h-4 text-white -rotate-90 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 pt-2 group cursor-pointer" onClick={() => setAgreed(!agreed)}>
        <button 
          className={`mt-0.5 w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${agreed ? 'bg-success border-success shadow-[0_0_15px_rgba(0,200,83,0.3)]' : 'border-border-dark bg-input-bg group-hover:border-text-muted'}`}
        >
          <AnimatePresence>
            {agreed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Check className="w-4 h-4 text-white stroke-[4px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <p className="text-[12px] text-text-muted leading-relaxed font-medium select-none">
          I confirm all the <span className="text-white font-bold hover:underline cursor-help">Terms of user agreement</span> and that I am <span className="text-white font-bold">over 18</span>
        </p>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={!isActive || loading}
        className={`w-full py-4.5 rounded-xl font-black uppercase tracking-[0.2em] text-[15px] transition-all duration-300 transform ${
          isActive 
            ? 'bg-primary-blue text-white shadow-[0_8px_25px_rgba(0,118,255,0.4)] cursor-pointer hover:shadow-[0_10px_30px_rgba(0,118,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]' 
            : 'bg-[#1e2c41] text-text-muted cursor-not-allowed opacity-50'
        } flex items-center justify-center`}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Registration'}
      </button>
    </motion.div>
  );
}

