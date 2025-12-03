import { ModeToggle } from './mode-toggler';

export default function HeaderComponent() {
  return (
    <div className="text-center flex items-center px-10 justify-between animate-in fade-in slide-in-from-top duration-500">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact</h1>
      <ModeToggle />
    </div>
  );
}
