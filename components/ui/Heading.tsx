import type { FC } from "react";

interface IProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}
const Heading: FC<IProps> = ({ title, center, subTitle }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <p className="text-2xl font-bold">{title}</p>
      {subTitle && (
        <span className="font-light text-neutral-500 mt-2">{subTitle}</span>
      )}
    </div>
  );
};

export default Heading;
