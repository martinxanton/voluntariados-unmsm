export default function CardStat({ value, title }) {
    return (
      <div className="stat bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full">
        <div className="stat-value text-4xl font-bold text-primary text-center">{value}</div>
        <div className="stat-title text-sm sm:text-base md:text-lg text-gray-500 mt-2 text-center font-bold w-full break-words max-w-full">
          {title}
        </div>
      </div>
    );
  }
  