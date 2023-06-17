const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const HTTP_MESSAGE = {
  INVALID_CREDENTAILS() {
    return `Invalid username or password!`;
  },
  LOGIN_SUCCESS() {
    return `Login Successfully!`;
  },
  UNAUTHORIZED() {
    return `Unauthorized!`;
  },
  INVALID(input: string) {
    return `Invalid ${input}!`;
  },
  LISTED(module: string) {
    return `${module} listed successfully!`;
  },
  CREATED(module: string) {
    return `${module} created successfully!`;
  },
  UPDATED(module: string) {
    return `${module} updated successfully!`;
  },
  DELETED(module: string) {
    return `${module} deleted successfully!`;
  },
  NOT_LISTED(module: string) {
    return `${module} not listed!`;
  },
  NOT_CREATED(module: string) {
    return `${module} not created!`;
  },
  NOT_UPDATED(module: string) {
    return `${module} not updated!`;
  },
  NOT_DELETED(module: string, message: string = "") {
    return `${module} not deleted! ${message}`;
  },
  NOT_EXIST(module: string) {
    return `${module} not exist!`;
  },
  NOT_EXIST_WITH(module: string, field: string) {
    return `${module} not exist with this ${field}!`;
  },
  ALREADY_EXIST(module: string) {
    return `${module} already exist!`;
  },
  ALREADY_EXIST_WITH(module: string, field: string) {
    return `${module} already exist with this ${field}!`;
  },
  ALREADY_EXIST_DELETED(module: string, field: string) {
    return `${module} already exist with this ${field}! You need to activate ${module}!`;
  },
  EXIST_BUT_DELETED(module: string) {
    return `${module} exist! Need to activate ${module}! first`;
  },
  ALREADY_DELETED(module: string) {
    return `${module} already deleted!`;
  },
  CONTACT_ADMIN(module: string, field: string) {
    return `${module} already exist with this ${field}. Contact your Admin to activate account!`;
  },
  SOMETHING_WRONG() {
    return `Something went wrong!`;
  },
  REQUIRED(input: string) {
    return `${input} must be Rrquired!`;
  },
  IMAGE_UPLOADED(type: string) {
    return `${type} image is uploaded successfully`;
  },
  FORMAT_INVALID(type: string) {
    return `Format of the payload ${type} is invalid`;
  },
  MISSING_QUERY_VALUE(type: string) {
    return `Missing query value "${type}".`;
  },
};

const RESPONSE_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
};

export { HTTP_MESSAGE, HTTP_CODE, RESPONSE_TYPE };
