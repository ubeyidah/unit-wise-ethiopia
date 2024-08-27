import { faqs } from "@/data/landing";
import {
  Accordion as Acc,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Accordion = () => {
  return (
    <section className="container px-4 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl max-md:text-xl mb-4">
        <span className="text-orange-500">frequently</span> asked questions
      </h2>
      <div>
        <Acc type="single" collapsible className="w-full !text-xl">
          {faqs.map((faq) => (
            <AccordionItem value={faq.title} key={faq.id}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Acc>
      </div>
    </section>
  );
};

export default Accordion;
