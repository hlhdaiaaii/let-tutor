export default async function withLogCatch(promise) {
  let result, error;
  try {
    result = await promise;
  } catch (err) {
    error = err;
    console.log('withLogCatch: ', err);
    console.log(err.response.data);
  }

  return [result, error];
}
