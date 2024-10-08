const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Landing Page</h1>
            <p className="text-lg text-gray-600 mb-8">This is a simple landing page created with React and Tailwind CSS.</p>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                Get Started
            </button>
        </div>
    );
};

export default LandingPage;