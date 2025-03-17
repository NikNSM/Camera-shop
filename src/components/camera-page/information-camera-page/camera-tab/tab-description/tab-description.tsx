import { NameTabs } from '../../../../../const';

type PropsCameraTabDescription = {
  description: string;
  assignClassTab: (nameTab: NameTabs) => string;
}

export default function TabDescription({description, assignClassTab }: PropsCameraTabDescription): JSX.Element {
  return (
    <div className={`tabs__element ${assignClassTab(NameTabs.DESCRIPTION)}`}>
      <div className="product__tabs-text">
        <p>{description}</p>
      </div>
    </div>
  );
}
