import { IApiResponse } from "../interfaces";

export interface IBranchResponseData {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address?: string;
}
export interface IBranchWithDistanceAttributes extends IBranchResponseData {
  distanceToUser: number;
}

export interface IGetNearestBranchInput {
  longitude: number;
  latitude: number;
}
export type getBranchesResponse = IApiResponse<IBranchResponseData[]>;
