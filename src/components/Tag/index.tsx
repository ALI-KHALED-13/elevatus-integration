import './styles.css';


const Tag = ({ text }: {text: string}) => {


  return (
    <span
      className="my-tag"
    >
      {text}
    </span>
  );
};

export default Tag;