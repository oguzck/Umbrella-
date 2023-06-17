import React, { useState } from 'react';
import { Menu, Header } from 'semantic-ui-react';

interface Props{
    setActiveFilter (activeFilter:string) : void
    activeFilter : string
}

export default function JobAdversitementFilters({setActiveFilter,activeFilter}:Props) {

  const handleFilterClick = (filter:string) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 28 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Advertisements'
          active={activeFilter === 'all'}
          onClick={() => handleFilterClick('all')}
        />
        <Menu.Item
          content='Paid Jobs'
          active={activeFilter === 'paid'}
          onClick={() => handleFilterClick('paid')}
        />
        <Menu.Item
          content='Voluntarily Jobs'
          active={activeFilter === 'voluntary'}
          onClick={() => handleFilterClick('voluntary')}
        />
      </Menu>
      <Header />
    </>
  );
}
