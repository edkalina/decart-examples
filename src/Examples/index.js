import Intro from "./0.Intro";
import Example1 from "./1.Empty";
import Example2 from "./2.StateValue";
import Example3 from "./3.ReusableStateValue";
import Example4 from "./4.Handler";
import Example5 from "./5.Handlers";
import Example6 from "./6.CalcValue";
import Example7 from "./7.ManyValues";
import Example8 from "./8.ConditionalRender";
import Example9 from "./9.RefValue";

import Example1Image from "./assets/example1.png";
import Example2Image from "./assets/example2.png";
import Example3Image from "./assets/example3.png";
import Example4Image from "./assets/example4.png";
import Example5Image from "./assets/example5.png";
import Example6Image from "./assets/example6.png";
import Example7Image from "./assets/example7.png";
import Example8Image from "./assets/example8.png";
import Example9Image from "./assets/example9.png";

export default [
  {
    title: "Intro",
    Component: Intro
  },
  {
    title: "Just wrapped",
    Component: Example1,
    screen: Example1Image,
  },
  {
    title: "StateValue",
    Component: Example2,
    screen: Example2Image,
  },
  {
    title: "Reusable stateValue",
    Component: Example3,
    screen: Example3Image,
  },
  {
    title: "Event handler",
    Component: Example4,
    screen: Example4Image,
  },
  {
    title: "Many handlers",
    Component: Example5,
    screen: Example5Image,
  },
  {
    title: "Calculable values",
    Component: Example6,
    screen: Example6Image,
  },
  {
    title: "Grouping calculable values",
    Component: Example7,
    screen: Example7Image,
  },
  {
    title: "Conditianal render",
    Component: Example8,
    screen: Example8Image,
  },
  {
    title: "Ref container",
    Component: Example9,
    screen: Example9Image,
  }
];
