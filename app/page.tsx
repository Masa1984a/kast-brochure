import ReferralCodeInput from '@/components/ReferralCodeInput';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Create Your Referral Brochure
          </h2>
          <p className="text-lg text-gray-600">
            Enter your referral code to generate a personalized KAST Card brochure
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <ReferralCodeInput />
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How it works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <p className="text-sm text-gray-600">
                Enter your referral code
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <p className="text-sm text-gray-600">
                Generate your brochure with QR code
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <p className="text-sm text-gray-600">
                Download and share
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
