import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../../shared/api.config';

export interface DemoRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization: string;
  role?: string;
  teamSize?: string;
  source?: string;
  requirements?: string;
  agreedToTerms: boolean;
}

export interface ApiResponse {
  status: boolean;
  statusMessage: string;
  data?: any;
  errors?: string[];
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  getWelcomeMessage() {
    return 'Welcome from HomeService';
  }

  submitDemoRequest(payload: DemoRequestPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_BASE}/demo-request`, payload);
  }
}
