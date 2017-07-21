import React from 'react';

export default ({issue}) => {
  return (
    <h1 className="description">
      {issue.title}
      <span className="description__id">{` #${issue.id}`}</span>
    </h1>
  );
}