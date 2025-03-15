type PropsCameraTabDescription = {
  description: string;
}

export default function CameraTabDescription({description}: PropsCameraTabDescription): JSX.Element {
  return (
    <div className="tabs__element is-active">
      <div className="product__tabs-text">
        <p>{description}</p>
      </div>
    </div>
  );
}
