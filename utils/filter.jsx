import React, { useMemo } from 'react';

const CustomFilter = ({ filters, values, onChange }) => {
  return (
    <div className=" w-full   ">
      {filters.map((filter) => (
        <div key={filter.name} className="w-full">
          <label htmlFor={filter.name} className="font-semibold mb-1 text-sm text-start block">
            {filter.label}
          </label>

          {filter.type === 'text' && (
            <input
              type="text"
              id={filter.name}
              name={filter.name}
              placeholder={filter.placeholder || ''}
              value={values[filter.name] || ''}
              onChange={(e) => onChange(filter.name, e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
            />
          )}

          {filter.type === 'number' && (
            <input
              type="number"
              id={filter.name}
              min={1}
              name={filter.name}
              placeholder={filter.placeholder || ''}
              value={values[filter.name] || ''}
              onChange={(e) => onChange(filter.name, Number(e.target.value) || undefined)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
            />
          )}

          {filter.type === 'select' && (
            <select
              id={filter.name}
              name={filter.name}
              value={values[filter.name] || ''}
              onChange={(e) => onChange(filter.name, e.target.value || undefined)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
            >
              <option value="">Select {filter.label}</option>
              {filter.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {filter.type === 'date' && (
            <input
              type="date"
              id={filter.name}
              name={filter.name}
              value={
                typeof values[filter.name] === 'string'
                  ? values[filter.name].split('T')[0]
                  : ''
              }
              onChange={(e) => {
                const selectedDate = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                onChange(filter.name, selectedDate);
              }}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
            />
          )}
        </div>
      ))}
     
    </div>
  );
};



export default CustomFilter;






