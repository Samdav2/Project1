import React, { useState } from 'react';
import './RadioOption.css';

const RadioOption = () => {
    const [selected, setSelected] = useState(false);

    return (
        <div className="radio-option">
            <label className="radio-label">
                <input
                    type="radio"
                    checked={selected}
                    onChange={() => setSelected(!selected)}
                    className="radio-input"
                />
                <span className="radio-custom"></span>
                Private Party
            </label>
        </div>
    );
};

export default RadioOption;
