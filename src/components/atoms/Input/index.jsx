import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  :focus {
    border-color: rgba(100, 100, 255, .5);
  }
  ::placeholder {
    color: #ddd;
  }
`;

export const InputPresenter = ({
  className,
  onChange,
  defaultValue,
  placeHolder,
})=>(
  <Root
  className= {className}
  defaultValue={defaultValue}
  onChange= {onChange}
  placeHolder={placeHolder}
  />
);

InputPresenter.propTypes = {
  className:PropTypes.string,
  onChange:PropTypes.func,
  defaultValue:PropTypes.string,
  placeHolder:PropTypes.string,
};

InputPresenter.defaultProps = {
  className:'',
  onChange:null,
  defaultValue:'',
  placeHolder:'',
};

export const InputContainer = ({
  className,
  onChange,
  defaultValue,
  placeHolder,
  presenter,
})=> {
  const [value, setValue] = useState(defaultValue);
  return presenter({
    className,
    onChange:(e) => {
      const {value:newValue} = e.target;
      if(newValue ===value){
        return;
      }
      setvalue(newvalue);
      onChange(newValue);
    },
    defaultValue,
    placeHolder,
  });
};

InputContainer.propTypes = {
  className:PropTypes.string,
  onChange:PropTypes.func,
  defaultValue:PropTypes.string,
  placeHolder:PropTypes.string,
};

InputContainer.defaultProps = {
  className:'',
  onChange:null,
  defaultValue:'',
  placeHolder:'',
};

export default (props) => (
  <InputContainer
  presenter= {InputPresenter}
  {...props}
  />
);