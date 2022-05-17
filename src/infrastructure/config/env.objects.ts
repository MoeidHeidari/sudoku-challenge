/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { expandEnvVariables } from '../../domain/helpers';

expandEnvVariables();

/**
 * options enum
 */
export enum EnvObjects {
  INTERSECTION_OPTIONS = 'IntersectionOptions',
}
//===================================================================================================
/**
 * Intersection options
 */
export interface IntersectionOptions {
  /**
   * represents the number of decimal places to calculate and return back the muserment of intersection.
   */
  number_of_decimal_places: number;
}

/**
 * configuration function
 * @returns configuration taken from env
 */
export const configuration = (): any => ({
  IntersectionOptions: {
    number_of_decimal_places: process.env.DECIMAL_PLACES,
  },
});
