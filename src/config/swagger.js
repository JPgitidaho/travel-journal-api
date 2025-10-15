import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Journal API",
      version: "2.0.0",
      description: "API for managing users, trips, destinations and travel journals"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      },
      {
        url: "https://travel-journal-api-pc03.onrender.com",
        description: "Render server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string", example: "juanita" },
            email: { type: "string", example: "juanita@example.com" },
            password: { type: "string", example: "StrongPass123!" }
          }
        },
        Trip: {
          type: "object",
          properties: {
            title: { type: "string", example: "Trip to Patagonia" },
            description: { type: "string", example: "Exploring the mountains and lakes" },
            startDate: { type: "string", format: "date", example: "2025-10-10" },
            endDate: { type: "string", format: "date", example: "2025-10-25" }
          }
        },
        Destination: {
          type: "object",
          properties: {
            name: { type: "string", example: "Torres del Paine" },
            country: { type: "string", example: "Chile" },
            description: { type: "string", example: "National park known for its mountains and lakes" },
            image: { type: "string", example: "https://example.com/torres.jpg" }
          }
        },
        Journal: {
          type: "object",
          properties: {
            title: { type: "string", example: "Day 1 in Patagonia" },
            content: { type: "string", example: "We started hiking early in the morning..." },
            date: { type: "string", format: "date", example: "2025-10-12" }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {
      
      "/users/register": {
        post: {
          summary: "Register a new user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } }
            }
          },
          responses: {
            201: { description: "User registered" },
            400: { description: "Bad request" },
            409: { description: "User already exists" }
          }
        }
      },
      "/users/login": {
        post: {
          summary: "Login user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "User logged in" },
            400: { description: "Invalid credentials" }
          }
        }
      },
      "/users/profile": {
        get: {
          summary: "Get user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "User profile" },
            401: { description: "Unauthorized" }
          }
        },
        put: {
          summary: "Update user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } }
            }
          },
          responses: {
            200: { description: "User updated" },
            401: { description: "Unauthorized" }
          }
        },
        delete: {
          summary: "Delete user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "User deleted" },
            401: { description: "Unauthorized" }
          }
        }
      },

    
      "/trips": {
        post: {
          summary: "Create a new trip",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Trip" } }
            }
          },
          responses: {
            201: { description: "Trip created" },
            400: { description: "Bad request" }
          }
        },
        get: {
          summary: "Get all trips for user",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "List of trips" }, 401: { description: "Unauthorized" } }
        }
      },
      "/trips/{id}": {
        get: {
          summary: "Get a trip by ID",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true }],
          responses: { 200: { description: "Trip found" }, 404: { description: "Trip not found" } }
        },
        put: {
          summary: "Update a trip by ID",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Trip" } }
            }
          },
          responses: { 200: { description: "Trip updated" }, 404: { description: "Trip not found" } }
        },
        delete: {
          summary: "Delete a trip by ID",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true }],
          responses: { 200: { description: "Trip deleted" }, 404: { description: "Trip not found" } }
        }
      },

      "/destinations": {
        post: {
          summary: "Create a new destination",
          tags: ["Destinations"],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Destination" } }
            }
          },
          responses: {
            201: { description: "Destination created" },
            400: { description: "Bad request" }
          }
        },
        get: {
          summary: "Get all destinations",
          tags: ["Destinations"],
          responses: {
            200: { description: "List of destinations" },
            500: { description: "Server error" }
          }
        }
      },
      "/destinations/{id}": {
        get: {
          summary: "Get a destination by ID",
          tags: ["Destinations"],
          parameters: [{ name: "id", in: "path", required: true }],
          responses: {
            200: { description: "Destination found" },
            404: { description: "Destination not found" }
          }
        },
        put: {
          summary: "Update a destination",
          tags: ["Destinations"],
          parameters: [{ name: "id", in: "path", required: true }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Destination" } }
            }
          },
          responses: {
            200: { description: "Destination updated" },
            404: { description: "Destination not found" }
          }
        },
        delete: {
          summary: "Delete a destination",
          tags: ["Destinations"],
          parameters: [{ name: "id", in: "path", required: true }],
          responses: {
            200: { description: "Destination deleted" },
            404: { description: "Destination not found" }
          }
        }
      },

      
      "/journals": {
        post: {
          summary: "Create a new journal entry",
          tags: ["Journals"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Journal" } }
            }
          },
          responses: {
            201: { description: "Journal created" },
            400: { description: "Bad request" }
          }
        },
        get: {
          summary: "Get all journals for a user",
          tags: ["Journals"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "List of journals" },
            401: { description: "Unauthorized" }
          }
        }
      },
      "/journals/{id}": {
        get: {
          summary: "Get a journal by ID",
          tags: ["Journals"],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true }],
          responses: {
            200: { description: "Journal found" },
            404: { description: "Journal not found" }
          }
        },
        put: {
          summary: "Update a journal entry",
          tags: ["Journals"],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Journal" } }
            }
          },
          responses: {
            200: { description: "Journal updated" },
            404: { description: "Journal not found" }
          }
        },
        delete: {
          summary: "Delete a journal entry",
          tags: ["Journals"],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true }],
          responses: {
            200: { description: "Journal deleted" },
            404: { description: "Journal not found" }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
