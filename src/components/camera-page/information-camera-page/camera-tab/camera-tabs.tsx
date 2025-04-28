import { ProductCard } from '../../../../type/type';
import { NameSpaceSearchParams, NameTabs } from '../../../../const';
import TabCharacteristic from './tab-characteristic/tab-characteristic';
import TabDescription from './tab-description/tab-description';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
type PropsCameraTabs = {
  camera: ProductCard;
}

export default function CameraTabs({ camera }: PropsCameraTabs): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabSearch = searchParams.get(NameSpaceSearchParams.TAB_PAGE_CAMERA);
  const assignClassTab = (nameTab: NameTabs) => tabSearch === nameTab ? 'is-active' : '';

  useEffect(() => {
    const valuesTab = Object.values(NameTabs);
    const keysSearch = searchParams.keys();
    [...keysSearch].forEach((key) => {
      if(key !== NameSpaceSearchParams.TAB_PAGE_CAMERA){
        searchParams.delete(key);
      }
    });
    if(!searchParams.has(NameSpaceSearchParams.TAB_PAGE_CAMERA) || !valuesTab.includes(tabSearch as NameTabs)){
      searchParams.set(NameSpaceSearchParams.TAB_PAGE_CAMERA, NameTabs.CHARACTERISTIC);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${assignClassTab(NameTabs.CHARACTERISTIC)}`}
          type="button"
          onClick={() => {
            searchParams.set(NameSpaceSearchParams.TAB_PAGE_CAMERA, NameTabs.CHARACTERISTIC);
            setSearchParams(searchParams);
          }}
        >Характеристики
        </button>
        <button
          className={`tabs__control ${assignClassTab(NameTabs.DESCRIPTION)}`}
          type="button"
          onClick={() => {
            searchParams.set(NameSpaceSearchParams.TAB_PAGE_CAMERA, NameTabs.DESCRIPTION);
            setSearchParams(searchParams);
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
