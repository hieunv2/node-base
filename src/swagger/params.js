module.exports = {
  page: {
    in: "query",
    name: "page",
    schema: { type: "number" },
    description: "Current page of api",
  },

  pageSize: {
    in: "query",
    name: "pageSize",
    schema: { type: "number" },
    description: "Amount of data in a page",
  },

  requestBody: (body, isFormData = false, files, otherProperties = {}) => {
    const requestBody = { required: true };

    if (!isFormData) {
      requestBody.content = {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ...Object.keys(body).reduce((acc, cur) => {
                return { ...acc, [cur]: { type: typeof body[cur] } };
              }, {}),
              ...otherProperties,
            },
            example: body,
          },
        },
      };
    } else {
      const properties = {
        ...Object.keys(body).reduce((acc, cur) => {
          return { ...acc, [cur]: { type: typeof body[cur] } };
        }, {}),
        ...otherProperties,
      };

      if (typeof files == "string") {
        properties[files] = {
          type: "string",
          format: "binary",
        };
      } else if (Array.isArray(files)) {
        files.forEach((file) => {
          properties[file.name] = {
            type: "array",
            items: { type: "string", format: "binary" },
            minItems: 1,
            maxItems: file.max,
          };
        });
      }

      requestBody.content = {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties,
            example: body,
          },
        },
      };
    }

    return requestBody;
  },
};
