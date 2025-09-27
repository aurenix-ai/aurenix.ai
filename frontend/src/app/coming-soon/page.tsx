'use client';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse">
          🚀 Coming Soon
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-300">
          We’re working hard to bring something amazing. Stay tuned!
        </p>
        <p className="text-sm text-gray-500 mb-6">aurenix.ai</p>
        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-full font-semibold shadow-lg">
          Notify Me
        </button>
      </div>
    </div>
  );
}
