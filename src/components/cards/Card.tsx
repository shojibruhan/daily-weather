import { type ReactNode } from "react";
type Props = {
  children: ReactNode;
  title: string;
  childrenClassName: string;
};

const Card = ({ children, title, childrenClassName }: Props) => {
  return (
    <div className="bg-zinc-900 p-4 bg-linear-to-br from-card to-card/60 rounded-xl text-white flex flex-col gap-4">
      <h2 className="font-semibold text-2xl">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
