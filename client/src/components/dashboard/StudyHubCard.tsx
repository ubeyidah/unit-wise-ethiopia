import { Suspense } from "react";
import { useImage } from "react-image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImSpinner8 } from "react-icons/im";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";

const StudyHubCard = () => {
  return (
    <div className="border rounded-xl p-1">
      <Link
        className="group flex flex-col focus:outline-none"
        to="/dashboard/ubeyidah/aslkdfaj09sdfs9df8asd9"
      >
        <div className="aspect-w-16 aspect-h-12 overflow-hidden bg-gray-100 rounded-lg dark:bg-neutral-800">
          <Suspense>
            <Image
              url="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
              des="des"
              className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out object-cover rounded-lg w-full"
            />
          </Suspense>
        </div>

        <div className="pt-4 px-1">
          <h3 className="font-medium text-sm text-black dark:text-white line-clamp-2">
            eYoga thek aks kthe mental of the area intekak Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Non in illo aspernatur incidunt
            consequatur obcaecati, nam sit doloremque iste accusamus quisquam.
            Id quia dignissimos quas eos provident dolore unde voluptas.
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400 text-xs line-clamp-3">
            A revamped and dynamic approach to yoga analytics A revamped and
            dynamic approach to yoga analytics Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Numquam, quisquam est corporis ipsa
            esse autem labore, modi aliquid minima nostrum at. Voluptatem quis
            cupiditate optio placeat tempora, quos delectus qui!
          </p>

          <div className="flex flex-wrap gap-2 text-xs justify-between pb-4 py-2 items-center">
            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarImage
                  src="https://static.vecteezy.com/system/resources/thumbnails/022/006/509/small/science-background-illustration-scientific-design-flasks-glass-and-chemistry-physics-elements-generative-ai-photo.jpeg"
                  className="size-9 rounded-full object-cover object-center"
                />
                <AvatarFallback className="uppercase">as</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm opacity-90">ubeyidah</p>
                <p className="text-[11px] -mt-1  opacity-70">3 sec ago</p>
              </div>
            </div>
            <button
              className={`flex items-center justify-center rounded-full hover:bg-slate-500/30 gap-2 py-1.5 px-3 border border-slate-500/20`}
            >
              {/* <ImSpinner8 className="animate-spin text-sm" /> */}
              {/* <BiSolidLike className="size-4" /> */}
              <BiLike className="size-4" />

              <span className="text-xs">8k</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StudyHubCard;

function Image({
  url,
  des,
  className,
}: {
  url: string;
  des: string;
  className?: string;
}) {
  const { src } = useImage({
    srcList: url,
  });

  return <img src={src} alt={des} className={className} />;
}
