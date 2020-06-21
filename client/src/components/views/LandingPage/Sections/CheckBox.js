import React, { useState } from "react";
import { Collapse } from "antd";
import { Checkbox } from "antd";
import renderEmpty from "antd/lib/config-provider/renderEmpty";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  const handleToggle = (value) => {
    // 누른 것읜 index를 구한다
    const currentIndex = Checked.indexOf(value);
    // 전체 state에서 누른 CheckBox가 있는지 없는지 확인
    const newChecked = [...Checked];
    // -1이면 없고 그러면 추가
    if (currentIndex === -1) {
      newChecked.push(value);
    }
    // 있으면 제거해준다.
    else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
  const renderCheckboxList = () => {
    return (
      props.list &&
      props.list.map((value, index) => (
        <React.Fragment key={index}>
          <Checkbox
            onChange={() => handleToggle(value._id)}
            checked={Checked.indexOf(value._id) === -1 ? false : true}
          />
          <span>{value.name}</span>
        </React.Fragment>
      ))
    );
  };
  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="continents" key="1">
          {renderCheckboxList()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
