import React, { useState } from 'react';
import './EventTablesForm.css';


const EventTablesForm = () => {
  const [tables, setTables] = useState([]);
  const [enableTables, setEnableTables] = useState(false);

  const handleAddTable = () => {
    setTables([...tables, { name: '', seats: '', price: '', total: '' }]);
  };

  const handleTableChange = (index, field, value) => {
    const updatedTables = tables.map((table, i) =>
      i === index ? { ...table, [field]: value } : table
    );
    setTables(updatedTables);
  };

  const handleRemoveTable = (index) => {
    setTables(tables.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={enableTables}
          onChange={(e) => setEnableTables(e.target.checked)}
        />
        Include table sales
      </label>

      {enableTables && (
        <div>
          <button type="button" onClick={handleAddTable}>
            Add Table
          </button>
          {tables.map((table, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Table Name"
                value={table.name}
                onChange={(e) =>
                  handleTableChange(index, 'name', e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Seats per Table"
                value={table.seats}
                onChange={(e) =>
                  handleTableChange(index, 'seats', e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Price per Table"
                value={table.price}
                onChange={(e) =>
                  handleTableChange(index, 'price', e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Total Tables"
                value={table.total}
                onChange={(e) =>
                  handleTableChange(index, 'total', e.target.value)
                }
              />
              <button type="button" onClick={() => handleRemoveTable(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventTablesForm;
