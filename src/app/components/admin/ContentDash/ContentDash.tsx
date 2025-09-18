'use client'

import React, { useState } from 'react'

// EditModal component to accept props
const EditModal = ({ page, close }: { page: string; close: () => void }) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full backdrop-blur'>
      <div className='bg-white p-4 rounded shadow-md m-10 h-3/4 overflow-auto'>
      <div className='flex justify-between items-center'>
      <h2>{page}</h2>
      <button onClick={close}>Close</button>
    </div>
    </div>
    </div>
  );
}

function ContentDash() {
  const [edit, setEdit] = useState<string | null>(null); 

  const pagesToEdit = ['Home', 'About', 'Contact', 'Booking', 'Clients']; 

  return (
    <div className='grid grid-cols-3 gap-4'>
      {pagesToEdit.map((page, i) => (
        <button key={i} onClick={() => setEdit(page)}>
          {page}
        </button>
      ))}

      {edit !== null && <EditModal page={edit} close={() => setEdit(null)} />} 
    </div>
  );
}

export default ContentDash;
