import axios, { AxiosInstance } from 'axios';
import { createContext } from 'react';


export const httpContext = createContext<AxiosInstance>(axios.create());
