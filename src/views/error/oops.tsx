const OopsPage = (): React.ReactNode => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="mt-4 text-lg">Something went wrong.</p>
            <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
        </div>
    );
}

export default OopsPage;