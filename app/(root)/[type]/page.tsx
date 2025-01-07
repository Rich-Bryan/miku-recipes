import React from 'react';

const Page = async ({ params }: { params: { type?: string } }) => {
  const type = params?.type || ""; // Access params and handle the type key safely

  return (
    <div>
      <h1>Page Type: {type}</h1>
    </div>
  );
};

export default Page;
