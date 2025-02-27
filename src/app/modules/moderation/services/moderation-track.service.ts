import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateTrack, ModerationTrack} from '../models/moderation-track.model';

@Injectable({
  providedIn: 'root'
})
export class ModerationTrackService {

  private apiUrl = 'http://localhost:8080/api/tracks';

  constructor(private http: HttpClient) { }

  getTracks(): Observable<ModerationTrack[]> {
    return this.http.get<ModerationTrack[]>(this.apiUrl);
  }

  addTrack(track: CreateTrack): Observable<CreateTrack> {
    return this.http.post<CreateTrack>(this.apiUrl, track);
  }

  deleteTrack(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
