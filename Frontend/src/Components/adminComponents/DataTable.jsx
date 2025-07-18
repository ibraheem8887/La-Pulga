import React from 'react';

const DataTable = ({ isProduct, data, onEdit, onDelete }) => {

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        {isProduct ? 'No Product available' : 'No Category available'}
      </div>
    );
  }

  const excludedColumns = ['__v', 'reviews', 'images'];

  const columns = Object.keys(data[0]).filter(
    (col) => !excludedColumns.includes(col)
  );

  return (
    <div className="p-4 overflow-x-auto">
      <table className="table-auto w-full text-left border border-gray-300">
        <thead>
          <tr className="bg-black text-white text-sm">
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 capitalize border">
                {col === '_id' ? 'ID' : col}
              </th>
            ))}
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 text-sm text-gray-700 border-b"
            >
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 border whitespace-nowrap">
                  {col === 'category' && typeof item[col] === 'object' ? (
                    item[col].name || 'Unknown Category'
                  ) : col === 'description' ? (
                    <div className="max-w-xs truncate">{item[col]}</div>
                  ) : (
                    item[col]
                  )}
                </td>
              ))}
              <td className="px-4 py-2 border whitespace-nowrap space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
