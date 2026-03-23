export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-12 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-md">
          <div className="text-sm font-bold text-on-surface">CollectorCapital</div>
          <p className="text-[11px] uppercase tracking-widest text-on-surface-variant leading-loose">
            © 2024 Collector Capital Global Markets. All rights reserved. High-risk investment notice: Trading involves significant risk.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <a href="#" className="text-[11px] uppercase tracking-widest text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a>
          <a href="#" className="text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a>
          <a href="#" className="text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">Risk Disclosure</a>
          <a href="#" className="text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}
