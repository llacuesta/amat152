const courses = [
  {
    id: "cmsc12",
    type: "custom",
    position: { x: 0, y: 200 },
    data: {
      courseID: "CMSC 12",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc12",
    type: "custom",
    position: { x: 200, y: 200 },
    data: {
      courseID: "CMSC 15",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc56",
    type: "custom",
    position: { x: 0, y: 300 },
    data: {
      courseID: "CMSC 56",
      units: "3",
      status: 0,
    },
  },
  {
    id: "math27",
    type: "custom",
    position: { x: 0, y: 400 },
    data: {
      courseID: "Math 27",
      units: "3",
      status: 0,
    },
  },
  {
    id: "ethics1",
    type: "custom",
    position: { x: 0, y: 500 },
    data: {
      courseID: "ETHICS 1",
      units: "3",
      status: 0,
    },
  },
  {
    id: "sts1",
    type: "custom",
    position: { x: 0, y: 600 },
    data: {
      courseID: "STS 1",
      units: "3",
      status: 0,
    },
  },
  {
    id: "hk11",
    type: "custom",
    position: { x: 0, y: 700 },
    data: {
      courseID: "HK11 56",
      units: "2 (NC)",
      status: 0,
    },
  },
  {
    id: "cmsc21",
    type: "custom",
    position: { x: 200, y: 200 },
    data: {
      courseID: "CMSC 21",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc57",
    type: "custom",
    position: { x: 200, y: 300 },
    data: {
      courseID: "CMSC 57",
      units: "3",
      status: 0,
    },
  },
  {
    id: "math28",
    type: "custom",
    position: { x: 200, y: 400 },
    data: {
      courseID: "MATH 28",
      units: "3",
      status: 0,
    },
  },
  {
    id: "arts1",
    type: "custom",
    position: { x: 200, y: 500 },
    data: {
      courseID: "ARTS 1",
      units: "3",
      status: 0,
    },
  },
  {
    id: "kas1",
    type: "custom",
    position: { x: 200, y: 600 },
    data: {
      courseID: "KAS 1",
      units: "3",
      status: 0,
    },
  },
  {
    id: "hk12",
    type: "custom",
    position: { x: 200, y: 700 },
    data: {
      courseID: "HK 12",
      units: "2 (NC)",
      status: 0,
    },
  },
  {
    id: "cmsc22",
    type: "custom",
    position: { x: 600, y: 0 },
    data: {
      courseID: "CMSC 22",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc150",
    type: "custom",
    position: { x: 600, y: 200 },
    data: {
      courseID: "CMSC 150",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc123",
    type: "custom",
    position: { x: 600, y: 300 },
    data: {
      courseID: "CMSC 123",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc130",
    type: "custom",
    position: { x: 600, y: 400 },
    data: {
      courseID: "CMSC 130",
      units: "3",
      status: 0,
    },
  },
  {
    id: "pi10",
    type: "custom",
    position: { x: 600, y: 500 },
    data: {
      courseID: "PI 10",
      units: "3",
      status: 0,
    },
  },
  {
    id: "hk12",
    type: "custom",
    position: { x: 600, y: 600 },
    data: {
      courseID: "HK 12",
      units: "2 (NC)",
      status: 0,
    },
  },
  {
    id: "nstp1",
    type: "custom",
    position: { x: 600, y: 700 },
    data: {
      courseID: "NSTP 1",
      units: "3 (NC)",
      status: 0,
    },
  },
  {
    id: "cmsc23",
    type: "custom",
    position: { x: 800, y: 0 },
    data: {
      courseID: "CMSC 23",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc100",
    type: "custom",
    position: { x: 800, y: 100 },
    data: {
      courseID: "CMSC 100",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc127",
    type: "custom",
    position: { x: 800, y: 200 },
    data: {
      courseID: "CMSC 127",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc131",
    type: "custom",
    position: { x: 800, y: 400 },
    data: {
      courseID: "CMSC 131",
      units: "3",
      status: 0,
    },
  },
  {
    id: "stat101",
    type: "custom",
    position: { x: 800, y: 500 },
    data: {
      courseID: "STAT 101",
      units: "3",
      status: 0,
    },
  },
  {
    id: "hk12",
    type: "custom",
    position: { x: 800, y: 600 },
    data: {
      courseID: "hk12",
      units: "2 (NC)",
      status: 0,
    },
  },
  {
    id: "nstp2",
    type: "custom",
    position: { x: 800, y: 700 },
    data: {
      courseID: "NSTP 2",
      units: "3 (NC)",
      status: 0,
    },
  },
  {
    id: "cmsc124",
    type: "custom",
    position: { x: 1200, y: 200 },
    data: {
      courseID: "CMSC 124",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc125",
    type: "custom",
    position: { x: 1200, y: 300 },
    data: {
      courseID: "CMSC 125",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc141",
    type: "custom",
    position: { x: 1200, y: 400 },
    data: {
      courseID: "CMSC 141",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc170",
    type: "custom",
    position: { x: 1200, y: 500 },
    data: {
      courseID: "CMSC 170",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc132",
    type: "custom",
    position: { x: 1200, y: 600 },
    data: {
      courseID: "CMSC 132",
      units: "3",
      status: 0,
    },
  },
  {
    id: "comm10",
    type: "custom",
    position: { x: 1200, y: 700 },
    data: {
      courseID: "COMM 10",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc128",
    type: "custom",
    position: { x: 1400, y: 0 },
    data: {
      courseID: "CMSC 124",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc142",
    type: "custom",
    position: { x: 1400, y: 100 },
    data: {
      courseID: "CMSC 142",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc137",
    type: "custom",
    position: { x: 1400, y: 300 },
    data: {
      courseID: "CMSC 137",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc173",
    type: "custom",
    position: { x: 1400, y: 500 },
    data: {
      courseID: "CMSC 173",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc180",
    type: "custom",
    position: { x: 1400, y: 600 },
    data: {
      courseID: "CMSC 180",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc198",
    type: "custom",
    position: { x: 1600, y: 0 },
    data: {
      courseID: "CMSC 198",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc190_1",
    type: "custom",
    position: { x: 1800, y: 0 },
    data: {
      courseID: "CMSC 190",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc199",
    type: "custom",
    position: { x: 1800, y: 100 },
    data: {
      courseID: "CMSC 199",
      units: "3",
      status: 0,
    },
  },
  {
    id: "eng10",
    type: "custom",
    position: { x: 1800, y: 200 },
    data: {
      courseID: "CMSC 190",
      units: "3",
      status: 0,
    },
  },
  {
    id: "cmsc190_2",
    type: "custom",
    position: { x: 2000, y: 0 },
    data: {
      courseID: "CMSC 190",
      units: "3",
      status: 0,
    },
  },
  {
    id: "fy-fs",
    type: "annotation",
    position: { x: 50, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "FS",
    },
  },
  {
    id: "fy-ss",
    type: "annotation",
    position: { x: 250, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "SS",
    },
  },
  {
    id: "fy-md",
    type: "annotation",
    position: { x: 450, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "MIDYEAR",
    },
  },
  {
    id: "sy-fs",
    type: "annotation",
    position: { x: 650, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "FS",
    },
  },
  {
    id: "sy-ss",
    type: "annotation",
    position: { x: 850, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "SS",
    },
  },
  {
    id: "sy-md",
    type: "annotation",
    position: { x: 1050, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "MIDYEAR",
    },
  },
  {
    id: "ty-fs",
    type: "annotation",
    position: { x: 1250, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "FS",
    },
  },
  {
    id: "ty-ss",
    type: "annotation",
    position: { x: 1450, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "SS",
    },
  },
  {
    id: "ty-md",
    type: "annotation",
    position: { x: 1625, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "MIDYEAR",
    },
  },
  {
    id: "fo-fs",
    type: "annotation",
    position: { x: 1850, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "FS",
    },
  },
  {
    id: "fo-ss",
    type: "annotation",
    position: { x: 2050, y: -100 },
    draggable: false,
    selectable: false,
    data: {
      size: "sm",
      note: "SS",
    },
  },
  {
    id: "fy",
    type: "annotation",
    position: { x: 175, y: -150 },
    draggable: false,
    selectable: false,
    data: {
      size: "lg",
      note: "FIRST YEAR",
    },
  },
  {
    id: "sy",
    type: "annotation",
    position: { x: 750, y: -150 },
    draggable: false,
    selectable: false,
    data: {
      size: "lg",
      note: "SECOND YEAR",
    },
  },
  {
    id: "ty",
    type: "annotation",
    position: { x: 1360, y: -150 },
    draggable: false,
    selectable: false,
    data: {
      size: "lg",
      note: "THIRD YEAR",
    },
  },
  {
    id: "f0y",
    type: "annotation",
    position: { x: 1840, y: -150 },
    draggable: false,
    selectable: false,
    data: {
      size: "lg",
      note: "FOURTH YEAR",
    },
  },
];

const edges = [
  {
    id: "cs12-21",
    source: "cmsc12",
    target: "cmsc21",
  },
  {
    id: "cs56-57",
    source: "cmsc56",
    target: "cmsc57",
  },
  {
    id: "mt27-28",
    source: "math27",
    target: "math28",
  },
  {
    id: "hk11-12",
    source: "hk11",
    target: "hk12",
  },
  // 2y1s
  {
    id: "cs12-22",
    source: "cmsc12",
    target: "cmsc22",
  },
  {
    id: "cs21-150",
    source: "cmsc21",
    target: "cmsc150",
  },
  {
    id: "mt27-cs150",
    source: "math27",
    target: "cmsc150",
  },
  {
    id: "cs21-123",
    source: "cmsc21",
    target: "cmsc123",
  },
  {
    id: "cs57-123",
    source: "cmsc57",
    target: "cmsc123",
  },
  {
    id: "cs57-130",
    source: "cmsc57",
    target: "cmsc130",
  },
  // 2y2s
  {
    id: "cs22-23",
    source: "cmsc22",
    target: "cmsc23",
  },
  {
    id: "cs21-131",
    source: "cmsc21",
    target: "cmsc131",
  },
  {
    id: "nstp1-2",
    source: "nstp1",
    target: "nstp2",
  },
  // 3y1s
  {
    id: "cs123-124",
    source: "cmsc123",
    target: "cmsc124",
  },
  {
    id: "cs123-125",
    source: "cmsc123",
    target: "cmsc125",
  },
  {
    id: "cs123-141",
    source: "cmsc123",
    target: "cmsc141",
  },
  {
    id: "cs123-170",
    source: "cmsc123",
    target: "cmsc170",
  },
  {
    id: "cs123-132",
    source: "cmsc123",
    target: "cmsc132",
  },
  // 3rd year 2nd sem
  {
    id: "cs123-128",
    source: "cmsc123",
    target: "cmsc128",
  },
  {
    id: "cs123-142",
    source: "cmsc123",
    target: "cmsc142",
  },
  {
    id: "cs125-137",
    source: "cmsc125",
    target: "cmsc137",
  },
  {
    id: "cs123-173",
    source: "cmsc123",
    target: "cmsc173",
  },
  {
    id: "stat101-cs173",
    source: "stat101",
    target: "cmsc173",
  },
  {
    id: "cs132-180",
    source: "cmsc132",
    target: "cmsc180",
  },
  // 4th year 2nd sem
  {
    id: "cs190_1-190_2",
    source: "cmsc190_1",
    target: "cmsc190_2",
  },
];

export { courses, edges };
