'use client';

import { useEffect, useRef } from 'react';

export default function Map ({ className }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const isNeedInitialization = useRef(true);

  useEffect(() => {
    if (mapRef.current && isNeedInitialization.current) {
      initMap();
      isNeedInitialization.current = false;
    }
  }, [mapRef])

  async function initMap() {
    await ymaps3.ready;
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

    if (mapRef.current) {
      const map = new YMap(
        mapRef.current,
        {
          location: {
            center: [61.331048, 55.201135],
            zoom: 14
          }
        }
      );
      map.addChild(new YMapDefaultSchemeLayer({ }));
      map.addChild(new YMapDefaultFeaturesLayer({ }));
      const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
      map.addChild(
        new YMapDefaultMarker({
          coordinates: [61.331048, 55.201135],
          title: 'Наш офис!',
          color: 'blue'
        })
      );
    }
  }

  return <div ref={mapRef} className={className} />
}

interface Props {
  className: string;
}