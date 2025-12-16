// API Service Layer for Urban Tree API
import axios, { AxiosInstance, AxiosError } from 'axios';

import type {
  AuthLoginRequest,
  AuthLoginResponse,
  LogoutResponse,
  TreeListResponse,
  TreeDetail,
  TreeReadingsResponse,
  TreeProcessedReadingsResponse,
  TreeReadingSummaryResponse,
  HealthResponse,
  DbCheckResponse,
  TreeListQueryParams,
  ReadingsQueryParams,
  SummaryQueryParams,
  ReadingPoint,
  ErrorResponse,
} from './api-types';

// Base API URL - update this to your actual API URL
const API_BASE_URL = 'https://urban-tree-server.netlify.app/api/';

class UrbanTreeAPI {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important for cookies
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token
          this.clearToken();
        }
        return Promise.reject(error);
      }
    );

    // Load token from localStorage on init
    this.loadToken();
  }

  // ============================================================================
  // Token Management
  // ============================================================================

  private saveToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.token = token;
    }
  }

  private clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  public getToken(): string | null {
    return this.token;
  }

  // ============================================================================
  // Authentication
  // ============================================================================

  async login(credentials: AuthLoginRequest): Promise<AuthLoginResponse> {
    try {
      const response = await this.client.post<AuthLoginResponse>('/auth/login', credentials);
      this.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const response = await this.client.post<LogoutResponse>('/auth/logout');
      this.clearToken();
      return response.data;
    } catch (error) {
      this.clearToken(); // Clear token even if logout fails
      throw this.handleError(error);
    }
  }

  // ============================================================================
  // Trees
  // ============================================================================

  async getTrees(params?: TreeListQueryParams): Promise<TreeListResponse> {
    try {
      const response = await this.client.get<TreeListResponse>('/trees', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getTreeById(id: string): Promise<TreeDetail> {
    try {
      const response = await this.client.get<TreeDetail>(`/trees/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ============================================================================
  // Readings
  // ============================================================================

  async getTreeReadings(treeId: string, params?: ReadingsQueryParams): Promise<TreeReadingsResponse> {
    try {
      const response = await this.client.get<TreeReadingsResponse>(
        `/trees/${treeId}/readings`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getLatestReading(treeId: string): Promise<ReadingPoint> {
    try {
      const response = await this.client.get<ReadingPoint>(`/trees/${treeId}/readings/latest`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProcessedReadings(
    treeId: string,
    params?: ReadingsQueryParams
  ): Promise<TreeProcessedReadingsResponse> {
    try {
      const response = await this.client.get<TreeProcessedReadingsResponse>(
        `/trees/${treeId}/readings/processed`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getReadingSummary(
    treeId: string,
    params?: SummaryQueryParams
  ): Promise<TreeReadingSummaryResponse> {
    try {
      const response = await this.client.get<TreeReadingSummaryResponse>(
        `/trees/${treeId}/readings/summary`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ============================================================================
  // System
  // ============================================================================

  async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await this.client.get<HealthResponse>('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async checkDatabase(): Promise<DbCheckResponse> {
    try {
      const response = await this.client.get<DbCheckResponse>('/dbcheck');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ============================================================================
  // Error Handling
  // ============================================================================

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.error) {
        return new Error(axiosError.response.data.error);
      }
      if (axiosError.message) {
        return new Error(axiosError.message);
      }
    }
    return new Error('An unexpected error occurred');
  }
}

// Create and export a singleton instance
export const urbanTreeAPI = new UrbanTreeAPI();

// Export the class for testing or creating custom instances
export default UrbanTreeAPI;