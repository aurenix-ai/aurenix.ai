import Link from "next/dist/client/link";

export default function FeaturesPage() {
    return (
      <div className="p-10 flex items-center justify-center h-screen">
        <li><Link href="#why-auernix" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
      </div>
    );
  }
  