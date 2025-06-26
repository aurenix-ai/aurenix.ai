import Link from "next/dist/client/link";

export default function FeaturesPage() {
    return (
      <div className="p-10 flex items-center justify-center h-screen">
        <li><Link href="/#ai-navigator" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
      </div>
    );
  }
  