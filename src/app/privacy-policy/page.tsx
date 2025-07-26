import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="w-full bg-white/50 backdrop-blur-lg border-b border-slate-200/80 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-slate-800">
                        Post That Once
                    </Link>
                </div>
            </header>
            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>

                    <p className="mb-4 text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>

                    <p className="mb-4">
                        This is a placeholder for your Privacy Policy. It&apos;s important to be transparent with your users about what data you collect, why you collect it, and how you use it. You should replace this text with your own policy.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">1. Information We Collect</h2>
                    <p className="mb-4">
                        We collect information you provide directly to us, such as when you create an account, connect your social media profiles, and create content. This may include your name, email address, and the content you upload.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use the information we collect to operate, maintain, and provide the features and functionality of Post That Once, including publishing content to your connected social media accounts on your behalf.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">3. Sharing Your Information</h2>
                    <p className="mb-4">
                        We do not share your personal information with third parties except as necessary to provide our services (e.g., with the social media platforms you connect to) or as required by law.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">4. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].
                    </p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;