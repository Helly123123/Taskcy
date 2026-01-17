import { defineStore } from "pinia";

export const useProjectsStore = defineStore("accountStore", {
  state: () => ({
    projects: [],
  }),
  getters: {
    projectsWithInfo: (state) => {
      return state.projects.map((project) => {
        const total = project.tasks?.length || 0;
        const completed =
          project.tasks?.filter((t) => t.boardType === "сompleted").length || 0;
        return {
          ...project,
          info: { total, completed },
        };
      });
    },
  },
  actions: {
    addProject(data) {
      const newProject = {
        id: this.projects.length + 1,
        name: data.name,
        category: data.category,
        logo: data.logo,
        color: data.color,
        tasks: [],
      };
      this.projects.push(newProject);
      return newProject;
    },

    getTasksProjectById(id, type) {
      const project = this.projects.find((p) => String(p.id) === String(id));

      if (!project) return null;

      return project.tasks.filter((t) => t.boardType === type);
    },

    getInfoProjectById(id) {
      const project = this.projects.find((p) => String(p.id) === String(id));

      if (!project) return null;

      const count = (type) =>
        project.tasks.filter((t) => t.boardType === type).length;

      return {
        ...project,
        info: [
          {
            type: "not_started",
            title: "Not Started",
            count: count("not_started"),
          },
          {
            type: "in_progress",
            title: "In Progress",
            count: count("in_progress"),
          },
          {
            type: "completed",
            title: "Completed",
            count: count("сompleted"),
          },
        ],
      };
    },

    addTaskToProject(projectName, taskData) {
      const projectIndex = this.projects.findIndex(
        (p) => p.name === projectName,
      );

      if (projectIndex !== -1) {
        const { project, date, ...otherData } = taskData;

        const newTask = {
          id: this.projects[projectIndex].tasks.length + 1,
          ...otherData,

          date: date instanceof Date ? date.toISOString() : date,

          projectId: project?.id || this.projects[projectIndex].id,
        };

        this.$patch((state) => {
          state.projects[projectIndex].tasks.push(newTask);
        });

        return { id: project.id, type: taskData.type };
      }
    },
  },
  persist: true,
});
