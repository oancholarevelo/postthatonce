import React from 'react';
import Link from 'next/link';

const TermsOfUse = () => {
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Use</h1>

                    <p className="mb-4 text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>

                    <p className="mb-4">
                        This is a placeholder for your Terms of Use. This agreement outlines the rules and regulations for the use of your application. You should consult with a legal professional to draft terms that are appropriate for your service.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">1. Acceptance of Terms</h2>
                    <p className="mb-4">
                        By accessing and using Post That Once, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">2. User Accounts</h2>
                    <p className="mb-4">
                        You are responsible for safeguarding your account and for any activities or actions under your account. You agree not to disclose your password to any third party.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">3. Content</h2>
                    <p className="mb-4">
                        You are responsible for the content that you post on or through the service, including its legality, reliability, and appropriateness. By posting content, you grant us the right and license to use, modify, and distribute such content on and through the service on your behalf.
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">4. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default TermsOfUse;