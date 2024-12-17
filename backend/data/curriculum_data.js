export const BSCSCurriculum = {
    1: {
        1: {
            minUnits: 15,
            courses: [
                { id: "cmsc12", name: "CMSC 12", workload: 2, units: 3, prereqs: [], availability: [1, 2, "M"] },
                { id: "cmsc56", name: "CMSC 56", workload: 2, units: 3, prereqs: [], availability: [1, 2] },
                { id: "math27", name: "MATH 27", workload: 4, units: 3, prereqs: [], availability: [1, 2, "M"] },
                { id: "ethics1", name: "ETHICS 1", workload: 2, units: 3, prereqs: [], availability: [1, 2] },
                { id: "sts1", name: "STS 1", workload: 3, units: 3, prereqs: [], availability: [1, 2] },
                { id: "hk11", name: "HK 11", workload: 1, units: 0, prereqs: [], availability: [1, 2] },
            ],
        },
        2: {
            minUnits: 15,
            courses: [
                { id: "cmsc21", name: "CMSC 21", workload: 3, units: 3, prereqs: ["cmsc12"], availability: [1, 2] },
                { id: "cmsc57", name: "CMSC 57", workload: 2, units: 3, prereqs: ["cmsc56"], availability: [2, "M"] },
                { id: "math28", name: "MATH 28", workload: 3, units: 3, prereqs: ["math27"], availability: [1, 2, "M"] },
                { id: "arts1", name: "ARTS 1", workload: 3, units: 3, prereqs: [], availability: [1, 2] },
                { id: "kas1", name: "KAS 1", workload: 3, units: 3, prereqs: [], availability: [1, 2] },
                { id: "hk12_1", name: "HK 12", workload: 2, units: 0, prereqs: ["hk11"], availability: [1, 2, "M"] },
            ],
        },
    },
    2: {
        1: {
            minUnits: 15,
            courses: [
                { id: "cmsc22", name: "CMSC 22", workload: 4, units: 3, prereqs: ["cmsc12"], availability: [1, 2] },
                { id: "cmsc150", name: "CMSC 150", workload: 4, units: 3, prereqs: ["cmsc21", "math27"], availability: [1] },
                { id: "cmsc123", name: "CMSC 123", workload: 3, units: 3, prereqs: ["cmsc21", "cmsc57"], availability: [1, 2] },
                { id: "cmsc130", name: "CMSC 130", workload: 1, units: 3, prereqs: ["cmsc57"], availability: [1] },
                { id: "pi10", name: "PI 10", workload: 4, units: 3, prereqs: [], availability: [1, 2, "M"] },
                { id: "nstp1", name: "NSTP 1", workload: 2, units: 0, prereqs: [], availability: [1, 2] },
                { id: "hk12_2", name: "HK 12", workload: 2, units: 0, prereqs: ["hk11"], availability: [1, 2, "M"] },
            ],
        },
        2: {
            minUnits: 15,
            courses: [
                { id: "cmsc23", name: "CMSC 23", workload: 4, units: 3, prereqs: ["cmsc22"], availability: [1, 2] },
                { id: "cmsc100", name: "CMSC 100", workload: 4, units: 3, prereqs: [], availability: [1, 2] },
                { id: "cmsc127", name: "CMSC 127", workload: 3, units: 3, prereqs: [], availability: [1, 2] },
                { id: "cmsc131", name: "CMSC 131", workload: 2, units: 3, prereqs: ["cmsc21"], availability: [2] },
                { id: "stat101", name: "STAT 101", workload: 2, units: 3, prereqs: [], availability: [1, 2] },
                { id: "nstp2", name: "NSTP 2", workload: 2, units: 0, prereqs: ["nstp1"], availability: [1, 2] },
                { id: "hk12_3", name: "HK 12", workload: 2, units: 0, prereqs: ["hk11"], availability: [1, 2, "M"] },
            ],
        },
    },
    3: {
        1: {
            minUnits: 18,
            courses: [
                { id: "cmsc124", name: "CMSC 124", workload: 4, units: 3, prereqs: ["cmsc123"], availability: [1] },
                { id: "cmsc125", name: "CMSC 125", workload: 3, units: 3, prereqs: ["cmsc123"], availability: [1] },
                { id: "cmsc141", name: "CMSC 141", workload: 4, units: 3, prereqs: ["cmsc123"], availability: [1, 2] },
                { id: "cmsc170", name: "CMSC 170", workload: 3, units: 3, prereqs: ["cmsc123"], availability: [1] },
                { id: "cmsc132", name: "CMSC 132", workload: 2, units: 3, prereqs: ["cmsc123"], availability: [1] },
                { id: "comm10", name: "COMM 10", workload: 3, units: 3, prereqs: [], availability: [1, 2] },
            ],
        },
        2: {
            minUnits: 18,
            courses: [
                { id: "cmsc128", name: "CMSC 128", workload: 5, units: 3, prereqs: ["cmsc123"], availability: [2] },
                { id: "cmsc142", name: "CMSC 142", workload: 2, units: 3, prereqs: ["cmsc123"], availability: [1, 2] },
                { id: "cmsc137", name: "CMSC 137", workload: 5, units: 3, prereqs: ["cmsc125"], availability: [2] },
                { id: "cmsc173", name: "CMSC 173", workload: 4, units: 3, prereqs: ["cmsc123", "stat101"], availability: [1, 2] },
                { id: "cmsc180", name: "CMSC 180", workload: 4, units: 3, prereqs: ["cmsc132"], availability: [2] },
            ],
        },
        3: {
            minUnits: 3,
            courses: [
                { id: "cmsc198", name: "CMSC 198", workload: 2, units: 3, prereqs: [], availability: ["M"] },
            ],
        },
    },
    4: {
        1: {
            minUnits: 16,
            courses: [
                { id: "cmsc190_1", name: "CMSC 190 (SP 1)", workload: 4, units: 1, prereqs: [], availability: [1, 2, "M"] },
                { id: "cmsc199", name: "CMSC 199", workload: 3, units: 1, prereqs: [], availability: [1, 2] },
                { id: "eng10", name: "ENG 10", workload: 1, units: 3, prereqs: [], availability: [1, 2, "M"] },
            ],
        },
        2: {
            minUnits: 15,
            courses: [
                { id: "cmsc190_2", name: "CMSC 190 (SP 2)", workload: 5, units: 2, prereqs: ["cmsc190_1"], availability: [1, 2, "M"] },
            ],
        },
    }
};