import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faArrowsToCircle,
  faCheck,
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
          className="control-element scale-lis-element"
          key={i}
          onClick={() => handleOptionClick(i)}
        >
          {i}%
          {scale === i && (
            <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faCheck} />
          )}
        </div>
      );
    }
    return options;
  };

  return (
    <div className="controls-bar">
      <div className="control-element button" onClick={onCenterBoard}>
        <FontAwesomeIcon icon={faArrowsToCircle} />
      </div>

      <div
        className="control-element button"
        onClick={handleDecreaseClick}
        style={{ marginLeft: '15px' }}
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
        style={{ marginLeft: '5px', marginRight: '15px' }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default Controls;
