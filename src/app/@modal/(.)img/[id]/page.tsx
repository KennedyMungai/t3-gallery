type Props = {
  params: {
    id: string;
  };
};

const PhotoModal = ({ params: { id: photoId } }: Props) => {
  return <div>{photoId}</div>;
};

export default PhotoModal;
