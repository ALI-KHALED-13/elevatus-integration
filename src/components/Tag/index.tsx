
const Tag = ({ text }: {text: string}) => {


  return (
    <span
      className={`
        font-medium text-[12px] capitalize shrink-0 flex p-2 rounded-[2px]
        cursor-pointer transition w-fit h-[31px] bg-[#8e919810]
      `}
    >
      {text}
    </span>
  );
};

export default Tag;