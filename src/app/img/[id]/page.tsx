type Props = {
  params: {
    id: string;
  };
};

const ImagePage = ({ params: { id: photoId } }: Props) => {
  return <div>{photoId}</div>;
};

export default ImagePage;
