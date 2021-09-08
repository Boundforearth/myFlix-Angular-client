import { Injectable } from '@angular/core';
import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators"

//Declaring the api url that will provide data for the client app
const apiUrl = "https://myflix-57495.herokuapp.com/";
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  //Inject the HttpClient module to the constructo params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {   
  }

  //Making the api call for the user registartion endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "users", userDetails).pipe(
      catchError(this.handleError)
    );
  }

  userLogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem("token"); 
    return this.http.post(apiUrl + "login", userDetails).pipe(
      catchError(this.handleError)
    )
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token'); 
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  getMovie(): Observable<any> {
    const token = localStorage.getItem("token"); 
    return this.http.get(apiUrl + `movie/:movie`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token'); 
    return this.http.get(apiUrl + "genres/:genre", {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "directors/:director", {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.get(apiUrl + `users/${user}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  getFavorites(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.get(apiUrl + `users/${user}/mylist`, {headers: new HttpHeaders({
      Authirization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavorite(movieId: any): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.post(apiUrl + `/users/${user}/mylist/${movieId}`, movieId, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      catchError(this.handleError)
    )
  }

  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.put(apiUrl + `users/${user}`, userDetails, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      catchError(this.handleError)
    )
  }

  deleteFavorite(movieId: any): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.delete(apiUrl + `usres/${user}/mylist/${movieId}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      catchError(this.handleError)
    )

  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      "Something bad happened; please try again later."
    )
  }

// Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
}
