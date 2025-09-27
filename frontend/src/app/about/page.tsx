export default function FoundersPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-black text-white">
      <h2 className="text-gray-400 mb-4">Navigating the Future of Human + AI</h2>
      <h1 className="text-5xl font-bold mb-8">Our Founder</h1>

      {/* Compact Mission Statement */}
      <p className="max-w-2xl text-sm text-gray-400 leading-relaxed mb-6">
        At Aurenix.ai, we build intuitive AI that empowers people — blending technology with human insight to ensure no one is left behind in the intelligence era.
      </p>

      {/* Founder Block */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white mb-3">
          <img
            src="/images/Om.jpg"
            alt="Om Patil"
            className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-110"
          />
        </div>

        <h3 className="text-xl font-semibold flex items-center gap-2">
          Om Patil
        </h3>

        <p className="text-sm text-gray-400">Founder & CEO</p>
        <a
            href="https://www.linkedin.com/in/om-patil19"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-blue-500"
            >
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4V8zM8.5 8h3.6v2.2h.1c.5-.95 1.75-2.2 3.6-2.2 3.85 0 4.56 2.55 4.56 5.87V24h-4v-7.56c0-1.8-.04-4.12-2.51-4.12-2.51 0-2.89 1.95-2.89 3.98V24h-4V8z" />
            </svg>
          </a>
      </div>

      <p className="max-w-3xl text-lg leading-7 mb-6">
        Combining a sharp understanding of human potential with a bold vision for AI-powered innovation, <strong>Om Patil</strong> leads Aurenix.ai with a mission to reshape how people learn, grow, and collaborate with intelligent systems. With a background in engineering and a passion for building purposeful tech, Om brings a unique perspective to solving real-world problems using generative AI and data-driven personalization.
      </p>
    </div>
  );
}