/* eslint-disable unicorn/no-null */
import { makeVar } from '@apollo/client';

import { User } from '../utils/types';

export const userVar = makeVar<User | null>(null);

export const taskCategoryVar = makeVar<string | null>(null);
