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
  Smartphone
} from 'lucide-react';

type AuthMode = 'login' | 'register';

export default function App() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#050b14]">
      {/* Background overlay if needed, but the body color is enough */}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] bg-card-bg rounded-xl border border-border-dark shadow-2xl overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-dark">
          <button className="text-text-muted hover:text-white transition-colors duration-150">
            <MessageCircle className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold tracking-wider text-white">
            {mode === 'login' ? 'LOG IN' : 'REGISTRATION'}
          </h2>
          <button className="bg-white/5 p-1 rounded-sm text-text-muted hover:text-white transition-colors duration-150">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence>
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
              <div className="flex-grow border-t border-border-dark"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-white tracking-widest">OR</span>
              <div className="flex-grow border-t border-border-dark"></div>
            </div>

            <button className="w-full bg-primary-blue hover:bg-primary-hover text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-3 transition-all duration-150 active:scale-95">
              <div className="bg-white p-1 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              Continue with Google
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
  
  const isActive = identifier.trim().length > 0 && password.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.05 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white font-medium">New user?</span>
        <button onClick={onSwitch} className="text-primary-blue font-bold hover:underline">Registration</button>
      </div>

      {/* Login Tabs */}
      <div className="flex bg-input-bg p-1 rounded-lg">
        <button 
          onClick={() => setLoginType('email')}
          className={`flex-1 py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-75 font-bold ${loginType === 'email' ? 'bg-primary-blue text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
        >
          <Mail className="w-4 h-4" />
          Email or ID
        </button>
        <button 
          onClick={() => setLoginType('phone')}
          className={`flex-1 py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-75 font-bold ${loginType === 'phone' ? 'bg-primary-blue text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
        >
          <Smartphone className="w-4 h-4" />
          Phone
        </button>
      </div>

      <div className="space-y-4">
        {loginType === 'phone' ? (
          <div className="flex items-center bg-input-bg border border-border-dark rounded-lg overflow-hidden focus-within:border-primary-blue/50 transition-all">
            <button className="flex items-center gap-2 px-3 py-4 border-r border-border-dark hover:bg-white/5 transition-colors">
              <span className="text-lg">🇮🇳</span>
              <span className="text-white">+91</span>
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>
            <input 
              type="tel" 
              placeholder="Phone number" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-white placeholder-text-muted outline-none"
            />
          </div>
        ) : (
          <div className="bg-input-bg border border-border-dark rounded-lg overflow-hidden focus-within:border-primary-blue/50 transition-all">
            <input 
              type="text" 
              placeholder="Email or ID" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-white placeholder-text-muted outline-none"
            />
          </div>
        )}

        <div className="bg-input-bg border border-border-dark rounded-lg overflow-hidden flex items-center focus-within:border-primary-blue/50 transition-all">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent px-4 py-4 text-white placeholder-text-muted outline-none"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="px-4 text-text-muted hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex justify-start">
        <button className="text-sm text-text-muted hover:text-white transition-colors">
          Forgot password? <span className="text-primary-blue font-bold">Reset</span>
        </button>
      </div>

      <button 
        className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all duration-150 ${
          isActive 
            ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20 cursor-pointer hover:bg-primary-hover active:scale-95' 
            : 'bg-[#1e2c41] text-gray-400 cursor-not-allowed'
        }`}
      >
        Log In
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

  const isActive = phone.trim().length > 0 && password.length > 0 && agreed;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.05 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white font-medium">Have an account?</span>
        <button onClick={onSwitch} className="text-primary-blue font-bold hover:underline">Log In</button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center bg-input-bg border border-border-dark rounded-lg overflow-hidden focus-within:border-primary-blue/50 transition-all">
          <button className="flex items-center gap-2 px-3 py-4 border-r border-border-dark hover:bg-white/5 transition-colors">
            <span className="text-lg">🇮🇳</span>
            <span className="text-white">+91</span>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>
          <input 
            type="tel" 
            placeholder="Phone number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-transparent px-4 py-4 text-white placeholder-text-muted outline-none"
          />
        </div>

        <div className="bg-input-bg border border-border-dark rounded-lg overflow-hidden flex items-center focus-within:border-primary-blue/50 transition-all">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent px-4 py-4 text-white placeholder-text-muted outline-none"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="px-4 text-text-muted hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="bg-input-bg border border-border-dark rounded-lg overflow-hidden flex items-center px-4 py-4 group cursor-pointer focus-within:border-primary-blue/50 transition-all">
          <span className="text-lg mr-3">🇮🇳</span>
          <span className="text-white flex-grow">₹ — INR</span>
          <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-white" />
        </div>

        <button className="flex items-center gap-2 text-primary-blue hover:text-primary-hover font-bold text-sm transition-colors">
          <Plus className="w-5 h-5" />
          I have a promo code
        </button>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Choose your bonus</h3>
        <div className="bg-gradient-to-r from-primary-blue to-[#00c6ff] p-[1px] rounded-lg">
          <div className="bg-[#162439] p-4 rounded-lg flex items-center gap-4 group cursor-pointer hover:bg-[#1e2c41] transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-cover bg-center overflow-hidden border border-white/20 shadow-inner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&auto=format&fit=crop)' }}>
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-white">777% Tower Rush Welcome Pack</h4>
              <p className="text-xs text-text-muted group-hover:text-white/70 transition-colors">Climb the Tower with Boost</p>
            </div>
            <ChevronDown className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform rotate-270" />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 pt-2">
        <button 
          onClick={() => setAgreed(!agreed)}
          className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${agreed ? 'bg-[#00c853] border-[#00c853]' : 'border-border-dark bg-input-bg'}`}
        >
          {agreed && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
        </button>
        <p className="text-xs text-text-muted leading-relaxed">
          I confirm all the <span className="text-white font-bold">Terms of user agreement</span> and that I am over 18
        </p>
      </div>

      <button 
        className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all duration-150 ${
          isActive 
            ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20 cursor-pointer hover:bg-primary-hover active:scale-95' 
            : 'bg-[#1e2c41] text-gray-400 cursor-not-allowed'
        }`}
      >
        Registration
      </button>
    </motion.div>
  );
}
