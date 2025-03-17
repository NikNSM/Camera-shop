import { useState } from 'react';
import { ProductCard } from '../../../../type/type';
import { NameTabs } from '../../../../const';
import TabCharacteristic from './tab-characteristic/tab-characteristic';
import TabDescription from './tab-description/tab-description';

type PropsCameraTabs = {
  camera: ProductCard;
}

export default function CameraTabs({ camera }: PropsCameraTabs): JSX.Element {
  const [activeTab, setActiveTab] = useState<NameTabs>(NameTabs.CHARACTERISTIC);
  const assignClassTab = (nameTab: NameTabs) => activeTab === nameTab ? 'is-active' : '';
  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${assignClassTab(NameTabs.CHARACTERISTIC)}`}
          type="button"
          onClick={() => {
            setActiveTab(NameTabs.CHARACTERISTIC);
          }}
        >Характеристики
        </button>
        <button
          className={`tabs__control ${assignClassTab(NameTabs.DESCRIPTION)}`}
          type="button"
          onClick={() => {
            setActiveTab(NameTabs.DESCRIPTION);
          }}
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <TabCharacteristic camera={camera} assignClassTab={assignClassTab} />
        <TabDescription description={camera.description} assignClassTab={assignClassTab} />
      </div>
    </div>
  );
}
