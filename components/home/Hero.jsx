import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src="/hero-bg.jpg?height=600&width=1200"
          alt="Fashion collection"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
            Discover the Best Fashion from Top Brands
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
            Shop the latest trends from multiple designers all in one place
          </p>
          <div className="w-full max-w-md bg-background p-2 rounded-lg flex flex-col md:flex-row gap-2">
            <Input
              type="search"
              placeholder="Search products, brands..."
              className="md:flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90">Shop Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
