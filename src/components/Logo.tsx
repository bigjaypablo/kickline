export default function Logo({ className = 'text-2xl' }: { className?: string }) {
  return (
    <div className={`display font-extrabold ${className}`}>
      KICK<span className="text-volt">LINE</span>
    </div>
  )
}
