import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Journal API",
      version: "1.0.0",
      description: "API for managing users and travel journals"
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
            201: {
              description: "User registered",
              content: {
                "application/json": {
                  example: {
                    message: "User registered",
                    user: {
                      _id: "66f123abc",
                      username: "juanita",
                      email: "juanita@example.com"
                    }
                  }
                }
              }
            },
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
                    email: { type: "string", example: "juanita@example.com" },
                    password: { type: "string", example: "StrongPass123!" }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "User logged in",
              content: {
                "application/json": {
                  example: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    user: {
                      id: "66f123abc",
                      username: "juanita",
                      email: "juanita@example.com"
                    }
                  }
                }
              }
            },
            400: { description: "Invalid credentials" },
            401: { description: "Unauthorized" }
          }
        }
      },
      "/users/profile": {
        get: {
          summary: "Get user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "User profile",
              content: {
                "application/json": {
                  example: {
                    id: "66f123abc",
                    username: "juanita",
                    email: "juanita@example.com"
                  }
                }
              }
            },
            401: { description: "Unauthorized" },
            404: { description: "User not found" }
          }
        },
        put: {
          summary: "Update user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          },
          responses: {
            200: {
              description: "User updated",
              content: {
                "application/json": {
                  example: {
                    message: "User updated",
                    user: {
                      id: "66f123abc",
                      username: "juanita updated",
                      email: "juanita@example.com"
                    }
                  }
                }
              }
            },
            401: { description: "Unauthorized" },
            404: { description: "User not found" }
          }
        },
        delete: {
          summary: "Delete user profile",
          tags: ["Users"],
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
            201: {
              description: "Trip created",
              content: {
                "application/json": {
                  example: {
                    message: "Trip created",
                    trip: {
                      _id: "66f123xyz",
                      title: "Trip to Patagonia",
                      description: "Exploring the mountains and lakes",
                      startDate: "2025-10-10",
                      endDate: "2025-10-25",
                      user: "66f123abc"
                    }
                  }
                }
              }
            },
            400: { description: "Bad request" }
          }
        },
        get: {
          summary: "Get all trips for user",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of trips",
              content: {
                "application/json": {
                  example: [
                    {
                      _id: "66f123xyz",
                      title: "Trip to Patagonia",
                      description: "Exploring the mountains and lakes",
                      startDate: "2025-10-10",
                      endDate: "2025-10-25",
                      user: "66f123abc"
                    }
                  ]
                }
              }
            },
            401: { description: "Unauthorized" }
          }
        }
      },
      "/trips/{id}": {
        get: {
          summary: "Get a trip by ID",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            200: {
              description: "Trip found",
              content: {
                "application/json": {
                  example: {
                    _id: "66f123xyz",
                    title: "Trip to Patagonia",
                    description: "Exploring the mountains and lakes",
                    startDate: "2025-10-10",
                    endDate: "2025-10-25",
                    user: "66f123abc"
                  }
                }
              }
            },
            404: { description: "Trip not found" }
          }
        },
        put: {
          summary: "Update a trip by ID",
          tags: ["Trips"],
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
            200: {
              description: "Trip updated",
              content: {
                "application/json": {
                  example: {
                    message: "Trip updated",
                    trip: {
                      _id: "66f123xyz",
                      title: "Trip to Torres del Paine",
                      description: "Hiking adventure",
                      startDate: "2025-11-01",
                      endDate: "2025-11-15",
                      user: "66f123abc"
                    }
                  }
                }
              }
            },
            404: { description: "Trip not found" }
          }
        },
        delete: {
          summary: "Delete a trip by ID",
          tags: ["Trips"],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            200: { description: "Trip deleted" },
            404: { description: "Trip not found" }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
