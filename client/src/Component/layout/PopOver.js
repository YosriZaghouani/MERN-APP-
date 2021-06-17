import React, {useState} from 'react';
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';

const PopOver = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button className="mt-4" style={{boxShadow: 'none'}} size="sm" id={props.index} type="button">
        {props.title}
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target={props.index} toggle={toggle}>
        <PopoverHeader>{props.header}</PopoverHeader>
        <PopoverBody>{props.text}</PopoverBody>
      </Popover>
    </div>
  );
};

export default PopOver;
