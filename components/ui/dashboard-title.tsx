export function DashboardTitle({ title }: { title: string }) {
  return (
    <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
      {title}
    </h1>
  );
}
