"use client"; // This is a client component

import React, { useState } from 'react';
import { UploadCloud, Link2, Facebook, Instagram, Linkedin, Send, X, Loader2, CheckCircle2, LogOut, Mail, KeyRound } from 'lucide-react';
import { auth } from '@/lib/firebase/client';
import { 
  useAuthState, 
  useSignInWithGoogle, 
  useSignInWithGithub, 
  useCreateUserWithEmailAndPassword, 
  useSignInWithEmailAndPassword,
  useSendEmailVerification
} from 'react-firebase-hooks/auth';

// Helper to create dynamic class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// SVG for TikTok Icon
const TikTokIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 7.34a10.39 10.39 0 0 1-5.34 7.24 10.39 10.39 0 0 1-11.32-1.28A10.39 10.39 0 0 1 8.66 2.66a10.39 10.39 0 0 1 7.24 5.34 10.39 10.39 0 0 1-1.28 11.32" />
    <path d="M12.5 8.5A4.5 4.5 0 0 1 8 13a4.5 4.5 0 0 1-4.5-4.5A4.5 4.5 0 0 1 8 4a4.5 4.5 0 0 1 4.5 4.5z" />
  </svg>
);

// Main Page Component
export default function HomePage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        </div>
    )
  }

  // If user exists but email is not verified, show verification message
  if (user && !user.emailVerified) {
    return <EmailVerificationScreen />;
  }

  // If user is logged in and verified, show the dashboard
  if (user) {
    return <AppDashboard user={user} />;
  }
  
  // Otherwise, show the login form
  return <LoginScreen />;
}

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithGoogle, , , errorGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub, , , errorGithub] = useSignInWithGithub(auth);
  const [createUserWithEmailAndPassword, , loadingCreate, errorCreate] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, , loadingSign, errorSign] = useSignInWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUserWithEmailAndPassword(email, password);
    if (newUser) {
      await sendEmailVerification();
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }
  
  const authError = errorGoogle || errorGithub || errorCreate || errorSign;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
          <div className="text-center mb-8">
              <Send className="h-12 w-auto text-indigo-600 mx-auto" />
              <h1 className="text-3xl font-bold text-gray-900 mt-4">Welcome to OmniPost</h1>
              <p className="text-gray-600 mt-2">Sign in or create an account to continue</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 sr-only">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
              </div>
               <div>
                <label className="text-sm font-medium text-gray-700 sr-only">Password</label>
                 <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </span>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 pt-2">
                <button type="button" onClick={handleSignUp} disabled={loadingCreate} className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                   {loadingCreate ? <Loader2 className="animate-spin h-5 w-5"/> : 'Sign Up'}
                </button>
                <button type="submit" disabled={loadingSign} className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                  {loadingSign ? <Loader2 className="animate-spin h-5 w-5"/> : 'Sign In'}
                </button>
              </div>
            </form>
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={() => signInWithGoogle()} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Google</button>
              <button onClick={() => signInWithGithub()} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">GitHub</button>
            </div>
            {authError && <p className="mt-4 text-center text-sm text-red-600">{authError.message}</p>}
          </div>
      </div>
    </div>
  );
}

const EmailVerificationScreen = () => {
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md">
        <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
        <p className="mt-4 text-gray-600">A verification link has been sent to your email address. Please click the link to continue.</p>
        <button 
          onClick={async () => await sendEmailVerification()}
          disabled={sending}
          className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Resend Verification Email'}
        </button>
        <button onClick={() => auth.signOut()} className="mt-4 text-sm text-gray-500 hover:underline">
          Use a different account
        </button>
      </div>
    </div>
  );
};


// The main application UI for logged-in users
const AppDashboard = ({ user }: { user: import('firebase/auth').User }) => {
  const [activeTab, setActiveTab] = useState('create');
  const handleSignOut = async () => await auth.signOut();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar userEmail={user.email} onSignOut={handleSignOut} />
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Social Publisher</h1>
            <p className="mt-2 text-lg text-gray-600">Create once, publish everywhere. Your central hub for social media content.</p>
          </header>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button onClick={() => setActiveTab('create')} className={cn('whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'create' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')}>Create Post</button>
              <button onClick={() => setActiveTab('accounts')} className={cn('whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'accounts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')}>Connected Accounts</button>
            </nav>
          </div>
          <div className="mt-8">
            {activeTab === 'create' && <PostUploader user={user} />}
            {activeTab === 'accounts' && <AccountManager />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Navigation Bar Component
const Navbar = ({ userEmail, onSignOut }: { userEmail?: string | null, onSignOut: () => void }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
             <Send className="h-8 w-auto text-indigo-600" />
             <span className="ml-2 text-xl font-semibold text-gray-800">OmniPost</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">{userEmail}</span>
            <button onClick={onSignOut} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium"><LogOut size={16} />Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Post Uploader Component (with real API calls)
const PostUploader = ({ user }: { user: import('firebase/auth').User }) => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState({ facebook: false, instagram: false, linkedin: false, tiktok: false });
  const [isPosting, setIsPosting] = useState(false);
  const [postStatus, setPostStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const removeFile = () => {
      setFile(null);
      setFilePreview(null);
  }

  const handlePlatformToggle = (platform: string) => {
    setPlatforms(prev => ({ ...prev, [platform]: !prev[platform as keyof typeof prev] }));
  };

  const handlePost = async () => {
    if (!file || !caption || !user || Object.values(platforms).every(p => !p)) {
      setErrorMessage("Please add a file, caption, and select at least one platform.");
      setPostStatus('error');
      return;
    }
    
    setIsPosting(true);
    setPostStatus(null);
    setErrorMessage('');

    try {
      // Step 1: Upload file to Cloudinary via our API
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadResult.success) throw new Error(uploadResult.error || 'File upload failed.');
      
      const media_url = uploadResult.result.secure_url;
      const media_type = uploadResult.result.resource_type;

      // Step 2: Get Firebase ID token and save post data via our API
      const token = await user.getIdToken();
      const postData = { caption, media_url, media_type, platforms };
      const postResponse = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(postData),
      });

      const postResult = await postResponse.json();
      if (!postResponse.ok || !postResult.success) throw new Error(postResult.error || 'Failed to save post.');

      // Success
      setPostStatus('success');
      setTimeout(() => {
          setCaption('');
          setFile(null);
          setFilePreview(null);
          setPlatforms({ facebook: false, instagram: false, linkedin: false, tiktok: false });
          setPostStatus(null);
      }, 3000);

    } catch (error: any) {
        setPostStatus('error');
        setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
        setIsPosting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side: File Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Media</label>
                {!filePreview ? (
                    <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,video/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4 up to 50MB</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative group">
                        {file && file.type.startsWith('image/') ? ( <img src={filePreview ?? ''} alt="Preview" className="w-full h-auto object-cover rounded-lg shadow-md" />) : (<video src={filePreview ?? ''} controls className="w-full h-auto rounded-lg shadow-md"></video>)}
                        <button onClick={removeFile} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={18} /></button>
                    </div>
                )}
            </div>
            {/* Right side: Caption and Platforms */}
            <div>
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
                <textarea id="caption" rows={6} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="What's on your mind?" value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700">Publish to</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {Object.keys(platforms).map((p) => (<PlatformToggle key={p} platform={p} isSelected={platforms[p as keyof typeof platforms]} onToggle={() => handlePlatformToggle(p)} />))}
                    </div>
                </div>
            </div>
        </div>
        {/* Action Button & Status */}
        <div className="mt-8 pt-5 border-t border-gray-200">
            <div className="flex justify-end items-center gap-4">
                {postStatus === 'success' && (<div className="flex items-center gap-2 text-green-600"><CheckCircle2 size={20} /><span className="font-medium">Posted Successfully!</span></div>)}
                {postStatus === 'error' && (<div className="flex flex-col items-end text-red-600 text-right"><div className="flex items-center gap-2"><X size={20} /><span className="font-medium">Post failed.</span></div><p className="text-sm mt-1">{errorMessage}</p></div>)}
                <button onClick={handlePost} disabled={isPosting || postStatus === 'success'} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed">
                    {isPosting ? (<><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />Posting...</>) : (<><Send className="-ml-1 mr-2 h-5 w-5" />Publish Now</>)}
                </button>
            </div>
        </div>
    </div>
  );
};

// --- Unchanged Components ---
const PlatformToggle = ({ platform, isSelected, onToggle }: { platform: string, isSelected: boolean, onToggle: () => void }) => {
  const icons = { facebook: <Facebook size={20} />, instagram: <Instagram size={20} />, linkedin: <Linkedin size={20} />, tiktok: <TikTokIcon size={20} /> };
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  return (<button onClick={onToggle} className={cn('flex items-center p-3 rounded-lg border-2 transition-all duration-200', isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white hover:border-gray-400')}><div className={cn('mr-3', isSelected ? 'text-indigo-600' : 'text-gray-500')}>{icons[platform as keyof typeof icons]}</div><span className={cn('font-medium', isSelected ? 'text-indigo-800' : 'text-gray-700')}>{platformName}</span></button>);
};
const AccountManager = () => {
    const [accounts, setAccounts] = useState({ facebook: { connected: true, username: 'jane.doe.fb' }, instagram: { connected: false, username: null }, linkedin: { connected: true, username: 'Jane Doe' }, tiktok: { connected: false, username: null } });
    const handleConnect = (platform: string) => alert(`Connecting to ${platform}... (This is a placeholder for the real OAuth flow)`);
    const handleDisconnect = (platform: string) => alert(`Disconnecting from ${platform}...`);
    return (<div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"><h2 className="text-xl font-bold text-gray-900">Manage Connections</h2><p className="mt-1 text-sm text-gray-600">Connect your social media accounts to start publishing.</p><div className="mt-6 space-y-4">{Object.entries(accounts).map(([key, value]) => (<AccountCard key={key} platform={key} details={value} onConnect={() => handleConnect(key)} onDisconnect={() => handleDisconnect(key)} />))}</div></div>);
};
const AccountCard = ({ platform, details, onConnect, onDisconnect }: { platform: string, details: { connected: boolean, username: string | null }, onConnect: () => void, onDisconnect: () => void }) => {
    const icons = { facebook: <Facebook size={24} className="text-blue-600" />, instagram: <Instagram size={24} className="text-pink-500" />, linkedin: <Linkedin size={24} className="text-sky-700" />, tiktok: <TikTokIcon size={24} /> };
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
    return (<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"><div className="flex items-center"><div className="flex-shrink-0">{icons[platform as keyof typeof icons]}</div><div className="ml-4"><p className="text-md font-semibold text-gray-800">{platformName}</p>{details.connected ? (<p className="text-sm text-gray-500">Connected as @{details.username}</p>) : (<p className="text-sm text-gray-500">Not connected</p>)}</div></div>{details.connected ? (<button onClick={onDisconnect} className="font-medium text-sm text-red-600 hover:text-red-800">Disconnect</button>) : (<button onClick={onConnect} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"><Link2 className="-ml-1 mr-2 h-4 w-4" />Connect</button>)}</div>);
};
const Footer = () => {
  return (<footer className="bg-white border-t border-gray-200 mt-16"><div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"><div className="mt-12 border-t border-gray-200 pt-8"><p className="text-base text-gray-400 xl:text-center">&copy; 2025 OmniPost, Inc. All rights reserved.</p></div></div></footer>);
};