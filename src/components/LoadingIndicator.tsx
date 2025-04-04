
const LoadingIndicator = () => {
    return (
        <div className="text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
    );
};

export default LoadingIndicator;
