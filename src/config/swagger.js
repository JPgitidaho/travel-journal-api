export default {
  openapi: "3.0.0",
  info: {
    title: "Travel Journal API",
    version: "1.0.0",
    description: "API for managing travel journals with users, trips, places, and experiences"
  },
  servers: [
    { url: "http://localhost:3000", description: "Local server" },
    { url: "https://your-render-url.onrender.com", description: "Render server" }
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
          _id: { type: "string" },
          username: { type: "string", example: "juanita" },
          email: { type: "string", example: "juanita@example.com" },
          password: { type: "string", example: "StrongPass123!" }
        },
        required: ["username", "email", "password"]
      },
      Trip: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string", example: "Summer in Spain" },
          description: { type: "string", example: "Backpacking across Barcelona and Madrid" },
          startDate: { type: "string", format: "date" },
          endDate: { type: "string", format: "date" },
          user: { type: "string" }
        },
        required: ["title", "startDate", "endDate", "user"]
      },
      Place: {
        type: "object",
        properties: {
          _id: { type: "string" },
          trip: { type: "string" },
          name: { type: "string", example: "La Sagrada Familia" },
          location: { type: "string", example: "Barcelona" },
          notes: { type: "string", example: "Amazing architecture" }
        },
        required: ["trip", "name", "location"]
      },
      Experience: {
        type: "object",
        properties: {
          _id: { type: "string" },
          place: { type: "string" },
          text: { type: "string", example: "Best paella ever!" },
          photoUrl: { type: "string" }
        },
        required: ["place", "text"]
      }
    }
  },
  paths: {
    "/users/register": {
      post: {
        tags: ["Users"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/User" } }
          }
        },
        responses: {
          201: { description: "User registered" },
          400: { description: "Invalid input" },
          409: { description: "User already exists" }
        }
      }
    },
    "/users/login": {
      post: {
        tags: ["Users"],
        summary: "Login and get JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "juanita@example.com" },
                  password: { type: "string", example: "StrongPass123!" }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          200: { description: "Login successful, returns JWT" },
          400: { description: "Invalid credentials" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/users/profile": {
      get: {
        tags: ["Users"],
        summary: "Get user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "User profile returned" },
          401: { description: "Unauthorized" }
        }
      },
      put: {
        tags: ["Users"],
        summary: "Update user profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/User" } }
          }
        },
        responses: {
          200: { description: "User updated" },
          400: { description: "Invalid input" },
          401: { description: "Unauthorized" }
        }
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "User deleted" },
          401: { description: "Unauthorized" },
          404: { description: "User not found" }
        }
      }
    },
    "/trips": {
      post: {
        tags: ["Trips"],
        summary: "Create a new trip",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Trip" } }
          }
        },
        responses: {
          201: { description: "Trip created" },
          400: { description: "Invalid input" },
          401: { description: "Unauthorized" }
        }
      },
      get: {
        tags: ["Trips"],
        summary: "Get all trips of the logged user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "List of trips" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/trips/{id}": {
      get: {
        tags: ["Trips"],
        summary: "Get trip by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Trip found" },
          401: { description: "Unauthorized" },
          404: { description: "Trip not found" }
        }
      },
      put: {
        tags: ["Trips"],
        summary: "Update trip by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Trip" } }
          }
        },
        responses: {
          200: { description: "Trip updated" },
          400: { description: "Invalid input" },
          401: { description: "Unauthorized" },
          404: { description: "Trip not found" }
        }
      },
      delete: {
        tags: ["Trips"],
        summary: "Delete trip by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Trip deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Trip not found" }
        }
      }
    }
  }
};
