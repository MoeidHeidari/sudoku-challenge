/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { SetMetadata } from '@nestjs/common';

/**
 * key for public state
 */
export const IS_PUBLIC_KEY = 'isPublic';
/**
 * decorates method as public
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
