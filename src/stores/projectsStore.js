import { defineStore } from "pinia";

export const useProjectsStore = defineStore("accountStore", {
  state: () => ({
    projects: [],
  }),
  getters: {
    findTasksByDateAndStatus: (state) => {
      return (status, dateString) => {
        // 1. Собираем все задачи и добавляем имя проекта
        const allTasks = state.projects.flatMap((project) =>
          (project.tasks || []).map((task) => ({
            ...task,
            projectName: project.name,
          })),
        );

        return allTasks.filter((task) => {
          // 2. Сравнение дат
          // Отрезаем всё после 'T', чтобы получить только "YYYY-MM-DD"
          const taskDateOnly = task.date ? task.date.split("T")[0] : null;

          // На всякий случай проверяем и передаваемую дату (если там вдруг тоже ISO)
          const targetDateOnly = dateString ? dateString.split("T")[0] : null;

          const dateMatch = taskDateOnly === targetDateOnly;

          // 3. Сравнение статуса
          // Добавляем проверку на 'All', чтобы показывать все задачи за день
          const statusMatch = status === "all" || task.boardType === status;

          return dateMatch && statusMatch;
        });
      };
    },

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
            type: "сompleted",
            title: "Completed",
            count: count("сompleted"),
          },
          {
            type: "in_progress",
            title: "In Progress",
            count: count("in_progress"),
          },
          {
            type: "not_started",
            title: "Not Started",
            count: count("not_started"),
          },
        ],
      };
    },

    updateTaskStatus(projectId, taskId, status) {
      // Ищем проект
      const project = this.projects.find(
        (p) => String(p.id) === String(projectId),
      );

      if (project) {
        // Ищем задачу внутри проекта
        const task = project.tasks.find((t) => String(t.id) === String(taskId));

        if (task) {
          // Обновляем только нужные поля
          task.boardType = status;

          // Обработка даты (сохраняем как ISO строку)

          return true;
        }
      }
      return false;
    },

    updateTaskPriority(projectId, taskId, priority) {
      // Ищем проект
      const project = this.projects.find(
        (p) => String(p.id) === String(projectId),
      );

      if (project) {
        // Ищем задачу внутри проекта
        const task = project.tasks.find((t) => String(t.id) === String(taskId));

        if (task) {
          // Обновляем только нужные поля
          task.priority = priority;

          // Обработка даты (сохраняем как ISO строку)

          return true;
        }
      }
      return false;
    },

    updateTaskFields(projectId, taskId, updatedFields) {
      // Ищем проект
      const project = this.projects.find(
        (p) => String(p.id) === String(projectId),
      );

      if (project) {
        // Ищем задачу внутри проекта
        const task = project.tasks.find((t) => String(t.id) === String(taskId));

        if (task) {
          // Обновляем только нужные поля
          task.name = updatedFields.name;

          // Обработка даты (сохраняем как ISO строку)
          task.date =
            updatedFields.date instanceof Date
              ? updatedFields.date.toISOString()
              : updatedFields.date;

          // Сохраняем время (DatePicker возвращает Date объект, берем его целиком или ISO)
          task.startTime =
            updatedFields.startTime instanceof Date
              ? updatedFields.startTime.toISOString()
              : updatedFields.startTime;

          task.endTime =
            updatedFields.endTime instanceof Date
              ? updatedFields.endTime.toISOString()
              : updatedFields.endTime;

          return true;
        }
      }
      return false;
    },

    addTaskToProject(projectName, taskData) {
      const projectIndex = this.projects.findIndex(
        (p) => p.name === projectName,
      );

      if (projectIndex !== -1) {
        const { project, date, ...otherData } = taskData;

        const newTask = {
          id: this.projects[projectIndex].tasks.length + 1,
          projectId: project.id,
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
