import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { API_BASE } from 'src/app/shared/api.config';

export interface MasterItem { id: string; name: string; order?: number; active?: boolean }
export interface Country extends MasterItem {}
export interface State extends MasterItem { country_id: string }
export interface City extends MasterItem { state_id: string }

export interface LocationHierarchyResponse {
  statusMessage: string;
  status: boolean;
  data: {
    countries: Country[];
    states: State[];
    cities: City[];
  }
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  private hierarchy$?: Observable<LocationHierarchyResponse['data']>;
  private readonly url = `${API_BASE}/location-hierarchy`;

  constructor(private http: HttpClient) {}

  getHierarchy(forceReload = false): Observable<LocationHierarchyResponse['data']> {
    if (!this.hierarchy$ || forceReload) {
      this.hierarchy$ = this.http.get<LocationHierarchyResponse>(this.url).pipe(
        map(r => r.data),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.hierarchy$;
  }
  //26-06-2026 06:26 am
  // getCountries(forceReload = false): Observable<Country[]> {
  //   return this.getHierarchy(forceReload).pipe(map(d => (d.countries || []).slice().sort((a,b) => (a.order||0) - (b.order||0))));
  // }

  getCountries(forceReload = false): Observable<Country[]> {
  return this.getHierarchy(forceReload).pipe(map(d => (d.countries || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''))));
}

  getStatesForCountry(countryId: string): Observable<State[]> {
    if (!countryId) return of([]);
    return this.http.get<LocationHierarchyResponse>(`${this.url}?country_id=${encodeURIComponent(countryId)}`).pipe(
      map(r => (r.data?.states || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''))),
      catchError(() => of([]))
    );
  }

  getCitiesForState(stateId: string): Observable<City[]> {
    if (!stateId) return of([]);
    return this.http.get<LocationHierarchyResponse>(`${this.url}?state_id=${encodeURIComponent(stateId)}`).pipe(
      map(r => (r.data?.cities || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''))),
      catchError(() => of([]))
    );
  }
}
