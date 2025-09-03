const BackgroundGlow = () => {
  return (
    <>
      <div 
        className="fixed inset-0 -z-10 bg-background"
        aria-hidden="true"
      ></div>
      <div 
        className="fixed top-0 left-1/4 w-1/2 h-1/2 -z-10 bg-gradient-to-b from-primary/10 to-transparent opacity-40 blur-3xl"
        aria-hidden="true"
      ></div>
      <div 
        className="fixed bottom-0 right-0 w-1/3 h-1/3 -z-10 bg-gradient-to-t from-primary/5 to-transparent opacity-30 blur-3xl"
        aria-hidden="true"
      ></div>
    </>
  );
};

export default BackgroundGlow;
