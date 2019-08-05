import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Gantt from "./Gantt";

describe(`Gantt component`, () => {
  it.skip("renders as expected given props", () => {
    const hi = {
      plotid: 99,
      plotname: "HI",
      plotnotes: "test plotnotes",
      crops: {
        crops: {
          cropname: "test",
          cropnotes: "test",
          dateplanted: "2019-6-9",
          dateharvested: "2019-8-7"
        }
      }
    };
    const wrapper = shallow(<Gantt plot={hi} />);
    expect(wrapper.props().plot.crops.crops.cropname).to.equal("test");
  });
});


