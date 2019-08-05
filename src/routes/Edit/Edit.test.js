import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Edit from "./Edit";

describe(`Edit component`, () => {
  it.skip("renders without crashing", () => {
    const wrapper = shallow(<Edit />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
