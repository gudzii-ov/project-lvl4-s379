import React from 'react';
import { withContext } from 'with-context';

export const UserContext = React.createContext();
export const withUser = withContext(UserContext, 'userName');
