import { ArrowRight } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="mb-8 md:mb-16">
      <div className="relative h-64 md:h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden group">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLckoHcmaNphvrYXhvwIy-tMKroDqFGEs_qVHk74zZZg889Kh-QGEzfETsbuI4Rn-Xmy0yGehQ-cNhrDGDQrLy9YN7_qR5IqWuJlC74qOiFsOOJfKKu-s4Fya5dgiB2t1Y7ttvXDZwf29slrjOZVWsUgDPejaZMVB73_PICCHmTrmhtVqKdpwAN5FUuDU_fmN1jCCVxoctOuxKTTI8wmTI8pX9SVV7zF2qB5Ehge2wxopliK6zDJNtEP4_m7ziD90xt9wsrH7oZmpM"
          alt="Modern high-end electronic gadgets display with purple ambient lighting"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-center px-6 md:px-12 lg:px-16">
          <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 md:mb-4">
            Limited Edition
          </span>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black max-w-md lg:max-w-xl leading-[1.1] mb-4 md:mb-8 tracking-tighter">
            The Future of Sound is Fluid.
          </h1>
          <div>
            <button className="primary-gradient text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all flex items-center gap-2 md:gap-3 shadow-cta hover:scale-[1.02] active:scale-95">
              Shop Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
          <div className="w-8 md:w-12 h-1 md:h-1.5 bg-white rounded-full"></div>
          <div className="w-2 md:w-3 h-1 md:h-1.5 bg-white/40 rounded-full"></div>
          <div className="w-2 md:w-3 h-1 md:h-1.5 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
