import React from 'react';

export default function Spinner({ large = false }) {
  return <span className={large ? 'spinner spinner-lg' : 'spinner'} />;
}
