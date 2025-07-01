import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AfterLoginPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Aurenix AI!</h1>
        <p className="text-lg mb-8">You have successfully logged in. Start exploring your AI-powered productivity tools.</p>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">🎉 Authentication System Complete!</h2>
          <p className="text-gray-300 mb-4">
            Your FastAPI + Next.js authentication system is now fully functional with:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>JWT-based authentication with access and refresh tokens</li>
            <li>Secure password hashing with bcrypt</li>
            <li>Protected routes and authentication context</li>
            <li>Supabase PostgreSQL database integration</li>
            <li>Token refresh mechanism</li>
            <li>Clean, modern UI with Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
}
