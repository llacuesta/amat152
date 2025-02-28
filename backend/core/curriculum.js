class Curriculum {
    constructor(curriculumData) {
        this.curriculumData = curriculumData;
        this.graph = {};
        this.buildGraph();
    }

    // build curriculum graph
    buildGraph() {
        for (const year in this.curriculumData) {
            for (const semester in this.curriculumData[year]) {
                const semesterData = this.curriculumData[year][semester];

                if (semesterData.courses) {
                    semesterData.courses.forEach(course => {
                        this.addNode(course);

                        course.prereqs.forEach(prereq => {
                            this.addEdge(prereq, course.id);
                        });
                    });
                }
            }
        }
    }

    // misc graph functions
    addNode(course) {
        if (!this.graph[course.id]) {
            this.graph[course.id] = { ...course, edges: [] };
        }
    }

    addEdge(from, to) {
        if (this.graph[from] && !this.graph[from].edges.includes(to)) {
            this.graph[from].edges.push(to);
        }
    }

    // getters
    getGraph() {
        return this.graph;
    }

    getYear(year) {
        if (this.curriculumData[year]) {
            return {
                ...this.curriculumData[year],
                0: this.curriculumData[year][0] || null,
            };
        }
        return null;
    }

    getSemester(year, semester) {
        const yearData = this.getYear(year);
        return yearData ? yearData[semester] || null : null;
    }

    getMinimumUnits(year, semester) {
        const semesterData = this.getSemester(year, semester);
        return semesterData ? semesterData.minUnits : null;
    }

    getCourses(year, semester) {
        const semesterData = this.getSemester(year, semester);
        return semesterData ? semesterData.courses : [];
    }

    getCourseById(courseId) {
        if (this.graph[courseId]) {
            let course = this.graph[courseId];
            return {
                id: course.id,
                name: course.name,
                workload: course.workload,
                units: course.units,
            }
        }
    }
}

module.exports = Curriculum