import axios from 'axios';
import { createContext } from 'react';

import { HttpClient } from '@/lib/http/types';

export const httpContext = createContext<HttpClient>(axios.create());
