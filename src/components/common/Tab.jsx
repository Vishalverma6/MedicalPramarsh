import React from 'react';

const Tab = ({ tabData, field, setField }) => {
  return (
    <div className="flex gap-2 my-6 bg-gray-200 w-[300px] rounded-full p-1  shadow-inner">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`py-2 px-5 cursor-pointer  rounded-full w-full transition-all duration-200  font-medium ${
            field === tab.type
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-300 text-gray-700 hover:bg-blue-100'
          }`}
        >
          <div className='h-2'></div>
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
};

export default Tab;
