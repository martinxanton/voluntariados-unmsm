const DetailsColumn = ({ details }) => {
    return (
        <div className="w-full">
        <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            {details.map((detail, index) => (
            <div
                key={index}
                className={`flex flex-col ${index === 0 ? 'pb-3' : 'py-3'}`}
            >
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                {detail.title}
                </dt>
                <dd className="text-lg font-semibold">{detail.value}</dd>
            </div>
            ))}
        </dl>
        </div>
        );
};
    export default DetailsColumn ;