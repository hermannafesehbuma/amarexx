'use client';

import { useRef } from 'react';
import LeafletMap from '../LeafletMap';
import LeafletMapAir from '../LeafletMapAir';

export default function MapWrapper({
  status,
  duration,
  olat,
  olng,
  dlat,
  dlng,
  percentage,
  shipmentId,
  ilat1,
  ilng1,
  ilat2,
  ilng2,
  inter1,
  inter2,
  shipmentType,
}) {
  if (inter1 === null) {
    ilat1 = undefined;
    ilng1 = undefined;
  }
  if (inter2 === null) {
    ilat2 = undefined;
    ilng2 = undefined;
  }
  console.log(shipmentType);

  return (
    <>
      {shipmentType === 1 ? (
        <LeafletMap
          status={status}
          duration={duration}
          olat={olat}
          olng={olng}
          dlat={dlat}
          dlng={dlng}
          percentage={percentage}
          shipmentId={shipmentId}
        />
      ) : (
        <LeafletMapAir
          status={status}
          duration={duration}
          olat={olat}
          olng={olng}
          dlat={dlat}
          dlng={dlng}
          ilat1={ilat1}
          ilng1={ilng1}
          ilat2={ilat2}
          ilng2={ilng2}
          percentage={percentage}
          shipmentId={shipmentId}
        />
      )}
    </>
  );
}
