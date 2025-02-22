export const throwError = (error) => {
  throw new Error(error);
}

export const throwErrorByMessage = (error) => {
  console.log("Error Message -> ", error.message);
  throwError(error);
}

export const throw404Error = (item, id) => {
  throwErrorByMessage(new Error(`${item} with id ${id} not found`));
}

export const throwRouteError = (route) => {
  throwErrorByMessage(new Error(`Route ${route} not found`));
}
