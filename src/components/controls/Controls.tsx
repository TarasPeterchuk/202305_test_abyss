import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faArrowsToCircle,
} from '@fortawesome/free-solid-svg-icons';
import './controls.scss';

interface ControlsProps {
  scale: number;
  onScaleChange: (scale: number) => void;
  onCenterBoard: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  scale,
  onScaleChange,
  onCenterBoard,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNumberClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (value: number) => {
    onScaleChange(value);
    setIsDropdownOpen(false);
  };

  const handleDecreaseClick = () => {
    const newScale = scale - 10;
    if (newScale >= 0) {
      onScaleChange(newScale);
    }
  };

  const handleIncreaseClick = () => {
    const newScale = scale + 10;
    if (newScale <= 150) {
      onScaleChange(newScale);
    }
  };

  const renderDropdownOptions = () => {
    const options = [];
    for (let i = 10; i <= 150; i += 10) {
      options.push(
        <div
          className="control-element"
          key={i}
          onClick={() => handleOptionClick(i)}
        >
          {i}%
        </div>
      );
    }
    return options;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'flex-end',
        marginBottom: '10px',
        background: '#f5f7fb',
        height: '50px',
      }}
    >
      <div
        className="control-element button"
        onClick={onCenterBoard}
        style={{ marginRight: '20px', marginLeft: '5px' }}
      >
        <FontAwesomeIcon icon={faArrowsToCircle} />
      </div>

      <div
        className="control-element button"
        onClick={handleDecreaseClick}
        style={{ marginLeft: '5px' }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </div>

      <div
        className="control-element"
        style={{ marginLeft: '5px', width: '50px' }}
        onClick={handleNumberClick}
      >
        {scale}%
      </div>

      {isDropdownOpen && (
        <div className="dropdown">{renderDropdownOptions()}</div>
      )}

      <div
        className="control-element button"
        onClick={handleIncreaseClick}
        style={{ marginLeft: '5px' }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default Controls;
