import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import PageNotFound from "./PageNotFound";

describe(`Page Not Found component`, () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<PageNotFound />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
