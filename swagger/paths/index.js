module.exports = {
  isValidLisp: {
    post: {
      tags: [
        'Compiler',
      ],
      security: false,
      description: 'Check if input is valid Lisp.',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Body for compiler',
          schema: {
            type: 'object',
            required: [
              'input',
            ],
            properties: {
              input: {
                type: 'string',
              },
            },
          },
        },
      ],
      produces: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'Input is valid',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                //$ref: '#/definitions/Output',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
      },
    },
  },
  convertToJS: {
    post: {
      tags: [
        'Compiler',
      ],
      security: false,
      description: 'Compile Lisp to JS.',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Body for compiler',
          schema: {
            type: 'object',
            required: [
              'input',
            ],
            properties: {
              input: {
                type: 'string',
              },
            },
          },
        },
      ],
      produces: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'Successful compiling',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/definitions/Output',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
      },
    },
  },
};
