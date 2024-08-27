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
    <section className="container px-4">
      <div className="max-w-lg mx-auto">
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.photoUrl}>
                <div>
                  <div className="relative">
                    <h3 className="text-xl mb-4 text-gray-400 font-serif italic">
                      "{testimonial.feedback}"
                    </h3>
                    <FaQuoteLeft className="absolute top-0 size-16 text-slate-400/30 -z-10 " />
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

                      <p className="text-sm text-slate-400">
                        from {testimonial.school}
                        {testimonial.school.includes("school") && "school"}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
