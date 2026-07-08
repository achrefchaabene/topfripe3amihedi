import Image from "next/image";

export function BrandLogo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const imageSize = size === "lg" ? "size-20" : "size-12";
  const titleSize = size === "lg" ? "text-2xl" : "text-lg";
  const subtitleSize = size === "lg" ? "text-sm" : "text-[11px]";

  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={`relative shrink-0 overflow-hidden rounded-full bg-cream ring-2 ring-cream/80 shadow-lg ${imageSize}`}
      >
        <Image
          src="/topfripe-mark.png"
          alt="TopFripe"
          fill
          priority
          sizes={size === "lg" ? "80px" : "48px"}
          className="object-cover"
        />
      </span>
      <span className="leading-none">
        <span className={`block font-semibold text-white ${titleSize}`}>TopFripe</span>
        <span className={`mt-1 block font-medium text-white/60 ${subtitleSize}`}>welcome!</span>
      </span>
    </span>
  );
}
