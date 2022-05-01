import { makeVar } from '@apollo/client';

import { User } from '../utils/types';

// eslint-disable-next-line unicorn/no-null
export const userVar = makeVar<User | null>(null);
