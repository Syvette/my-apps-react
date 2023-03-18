const DEFAULT_TASKS = [
  {
    id: 100,
    avatar: "high-prio.webp",
    name: "Lean Jerios",
    description: "Build Todo App",
    priority: "high",
    completed: false,
  },
  {
    id: 101,
    avatar: "low-prio.webp",
    name: "Andria Degoma",
    description: "Feed the kittens",
    priority: "low",
    completed: false,
  },
  {
    id: 102,
    avatar: "mid-prio.webp",
    name: "Czedrick Rodis",
    description: "Play some games",
    priority: "mid",
    completed: false,
  },
];

module.exports = [
  {
    id: "get-default-tasks",
    url: "/api/tasks",
    method: ["OPTIONS", "GET"],
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: DEFAULT_TASKS,
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 404,
          body: { message: "User not found" },
        },
      },
    ],
  },
  {
    id: "get-default-tasks-error",
    url: "/api/tasks/_error",
    method: ["OPTIONS", "GET"],
    variants: [
      {
        id: "error",
        type: "json",
        options: {
          status: 404,
          body: {
            status: "failed",
            errorCode: "TSKE00001",
            message: "Tasks not found",
            data: { url: "/api/tasks/_error" },
          },
        },
      },
    ],
  },
];
