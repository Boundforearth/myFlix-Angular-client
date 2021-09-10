import { Injectable } from '@angular/core';
import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators"

//Declaring the api url that will provide data for the client app
const apiUrl = "https://myflix-57495.herokuapp.com/";

interface userDetails {
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
}

interface loginDetails {
  Username: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})


export class FetchDataApiService {
  //Inject the HttpClient module to the constructo params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {   
  }


  //Making the api call for the user registartion endpoint
  //Needs Username, Password, Email, and Birthday
  public userRegistration(userDetails: userDetails): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "users", userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //Make a call to the login endpoint
  //Needs Username and Password
  userLogin(userDetails: loginDetails): Observable<any> {
    const token = localStorage.getItem("token"); 
    return this.http.post(apiUrl + "login", userDetails).pipe(
      catchError(this.handleError)
    )
  }

  //gets all the movies in the database
  //Each movie has a Title, Director, Genre, _id, Description, Featured, and ImagePath keys
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


  //used to grab a single movie from the database
  getMovie(): Observable<any> {
    const token = localStorage.getItem("token"); 
    return this.http.get(apiUrl + `movie/:movie`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  //gets a genre from the database with Name and Description as the keys
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token'); 
    return this.http.get(apiUrl + "genres/:genre", {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  //gets a single driector from the database with Name, Bio, and Birth keys.  Some have a Death key as well
  getDirector(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "directors/:director", {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Returns a user with Username, Email, Birthday, _id, and Favorites keys
  getUser(user: string | null): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + `users/${user}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  //Gets a list of the users favorite movies, which are stored by movieId only.
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

  //adds a movie to the users favorite.  responseType text is needed to avoid a JSON error
  addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.post(apiUrl + `users/${user}/mylist/${movieId}`, movieId, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }), responseType: "text"}).pipe(
      catchError(this.handleError)
    )
  }

  //Used to edit the Username, Password, Email, and Birthday of a user.
  editUser(userDetails: userDetails): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.put(apiUrl + `users/${user}`, userDetails, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }), responseType: "text"}).pipe(
      catchError(this.handleError)
    )
  }

  //Deletes a user from the database permanently.  responseType text is needed to avoid a JSON error
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    }), responseType: "text"})
    .pipe(
      catchError(this.handleError)
    )
  }

  //deletes a movie from a user's favorites.  responseType text is needed to avoid a JSON error
  deleteFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.delete(apiUrl + `users/${user}/mylist/${movieId}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }),
    responseType: "text"})
    .pipe(
      catchError(this.handleError)
    )

  }

  private handleError(error: HttpErrorResponse): any {
    console.log(error)
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
    console.log(res)
    const body = res;
    return body || { };
  }
}
