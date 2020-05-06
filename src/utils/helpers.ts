import { RequesterTimeBenchmark } from '../types';
import { MILLISECONDS_IN_SECOND } from '../constants';

export const getLastChar = (str: string): string => str[str.length - 1];

export const getFirstChar = (str: string): string => str[0];

export const removeLastSlash = (url: string): string => url.replace(/\/$/gi, '');

export const removeFirstSlash = (url: string): string => url.replace(/^\//gi, '');

export const buildBasicAuth = ({ username, password }: any): string =>
  `Basic ${btoa(`${username}:${password}`)}`;

export const buildBenchmark = ({ benchmarkStart, benchmarkEnd }: any): RequesterTimeBenchmark => ({
  startTimestamp: benchmarkStart,
  endTimestamp: benchmarkEnd,
  totalRequestTime: `${(benchmarkEnd - benchmarkStart) / MILLISECONDS_IN_SECOND}s`
});
