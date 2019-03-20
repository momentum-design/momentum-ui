const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};

export default handleErrors;
