export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for personal use and early exploration.',
      features: ['Limited AI requests', 'Basic writing tools', '1 document upload', 'Email support'],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$12/mo',
      description: 'For professionals who want speed and quality at scale.',
      features: ['Unlimited AI access', 'Priority document analysis', 'Advanced tools', 'Priority support'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for teams and organizations.',
      features: ['Team collaboration', 'Private model deployment', 'Custom features', 'Dedicated support'],
      highlighted: false,
    },
  ];

  return (
    <section className="bg-gray-950 text-white py-24 px-6 md:px-16 lg:px-24" id="pricing">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Choose Your <span className="text-indigo-500">Plan</span>
        </h2>
        <p className="text-lg text-gray-400 mb-12">
          Aurenix grows with your needs — pick the plan that works best for your ideas.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 border-2 transition duration-300 ${
                plan.highlighted
                  ? 'border-indigo-500 bg-gray-900 shadow-xl scale-105'
                  : 'border-gray-800 bg-gray-900 hover:border-indigo-500'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-indigo-500 text-sm text-white px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-3xl font-extrabold text-indigo-400 mb-4">{plan.price}</p>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-2 text-left mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="text-indigo-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.highlighted ? 'Get Pro' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
