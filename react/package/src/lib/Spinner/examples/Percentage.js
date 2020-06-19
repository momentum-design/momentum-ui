import React from 'react';
import { Spinner } from '@momentum-ui/react';

export default function LoaderSpinnerPercentage() {
  return <Spinner percentage={65} showPercentage={true} />;
}
