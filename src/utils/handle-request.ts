import buildResponse from './build-response';

export default (
  xhr: XMLHttpRequest,
  { config, headers, benchmarkStart, url }: any,
  { resolve, reject }: any
): (() => void) => {
  return (): void => {
    if (xhr.readyState === xhr.DONE) {
      try {
        const response = buildResponse(
          xhr,
          config,
          headers,
          {
            benchmarkStart,
            benchmarkEnd: Date.now()
          },
          url
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }
  };
};
