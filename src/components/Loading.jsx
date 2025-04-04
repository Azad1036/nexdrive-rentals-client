const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5  min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    </div>
  );
};

export default Loading;
