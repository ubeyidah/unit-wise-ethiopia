import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { testimonials } from "@/data/landing";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  return (
    <section className="container px-3">
      <h1 className="text-3xl max-sm:text-xl mb-4 ">
        What Our <span className="text-orange-400">Students Say</span>{" "}
      </h1>
      <div className="max-w-xl mx-auto">
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.photoUrl}>
                <div className="p-0">
                  <div className="relative">
                    <h3 className="text-xl mb-4 dar:text-gray-400 font-serif italic text-gray-600 dark:text-slate-300">
                      "{testimonial.feedback}"
                    </h3>
                    <FaQuoteLeft className="absolute -top-2 -left-2 size-16 text-slate-400/30 -z-10 dark:text-slate-400/20" />
                  </div>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        className="size-12 rounded-full"
                        src={testimonial.photoUrl}
                      />
                      <AvatarFallback>
                        {testimonial.name.split(" ")[0][0]}{" "}
                        {testimonial.name.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4>{testimonial.name}</h4>

                      <p className="text-sm dark:text-slate-400 text-slate-700">
                        from {testimonial.school}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="max-md:hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
