import { type ReactNode } from "react";
type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

const Card = ({ children, title, className, childrenClassName }: Props) => {
  return (
    <div
      className={`bg-zinc-900 p-4 bg-linear-to-br from-card to-card/60 rounded-xl text-white flex flex-col gap-4 ${className}`}
    >
      <h2 className="font-semibold text-2xl  text-amber-100">{title}</h2>
      <div
        className={`${childrenClassName} animate-[fade-in_0.6s_ease-out_forwards]`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
