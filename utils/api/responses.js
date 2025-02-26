export const send404Response = (res, error) => {
  res.status(404).json({
    success: false,
    message: error.message,
  });
}

export const sendValidationErrorResponse = (res, error) => {
  const errors = JSON.parse(error.message);
  const mainError = errors[0];
  const errorMessage = `${mainError.path[0]} error :  ${mainError.message}`
  return res.status(442).json({
    success: false,
    message: errorMessage,
  });
}

export const sendUnauthResponse = (res, error) => {
  return res.status(401).json({
    success: false,
    message: error.message,
  });
}

