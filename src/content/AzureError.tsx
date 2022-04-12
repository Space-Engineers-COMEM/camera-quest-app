import React from 'react';

interface Props {
  error: string;
}

export default function AzureError(props: Props) {
  return (
    <div className="preview preview-error">
      <p>Azure Error</p>
      <p>{props.error}</p>
    </div>
  );
}
