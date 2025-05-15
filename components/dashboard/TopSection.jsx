function TopSection({ children, description }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight">{children}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default TopSection;
