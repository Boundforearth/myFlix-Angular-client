import { Injectable } from '@angular/core';
import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators"

//Declaring the api url that will provide data for the client app
const apiUrl = "https://myflix-57495.herokuapp.com/";

/**
 * userDetails parameters
 */
interface userDetails {
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
}

/**
 * loginDetails parameters
 */
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


  /**
   * Function to register a user
   * @param {Object} userDetails  Uses a User Details object, which is full of strings
   * returns an error message or the user
   */
  public userRegistration(userDetails: userDetails): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "users", userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   *
   * @param {Object} loginDetails containing Username and Password
   * @returns Returns the user and a token
   */
  userLogin(loginDetails: loginDetails): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.post(apiUrl + "login", loginDetails).pipe(
      catchError(this.handleError)
    )
  }

  /**
 * Gets an array of movie objects from the database
 * @method GET
 * @param {string} - endpoint url/movies
 * @returns {Array} Returns an array of movie objects.
 * Each object has _id, Title, Description, Genre, Director, ImagePath, and Featured keys
 */
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


  /**
 * Gets s single movie from the database
 * @method GET
 * @param {string} - endpoint url/moives/:movie :movie must be provided
 * @returns {Object} Returns a single movie object with _id, Title, Description, Genre, Director, ImagePath, and Featured keys
 * displays error message on failure
 */
  getMovie(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + `movie/:movie`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Function to get information on a genre
   * @param {string} genre Needs the genre name to complete the request
   * @returns {Object} returns a Genre object with  Name and Description keys
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + "genres/:genre", {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Function to get information on a Director
   * @param {string} director Needs the director name to complete the request
   * @returns {Object} returns driector from the database with Name, Bio, and Birth keys.  Some have a Death key as well
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "directors/:director", {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets a user from the database
   * @param {string} user takes the provided username
   * @returns {Object} Returns an object with Username, Email, _id, Birthday, and Favorites keys
   */
  getUser(user: string | null): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + `users/${user}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Function that gets a users favorite movies.  User taken from local storage
   * @returns {Array} returns an array of the users favorite movies by id only
   */
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

  /**
   * Function to add a movie to the users favorites
   * User is taken from local storage
   * @param {string} movieId id of movie needed to complete request
   * @returns {statusMessage} Returns a message about whether or not the movie was added
   */
  addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.post(apiUrl + `users/${user}/mylist/${movieId}`, movieId, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }), responseType: "text"}).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * This is a function that allows users to edit their profiles
   * @param {Object } userDetails Needs the userDetails object defined in the interface
   * @returns {statusMessage} Sends a message on success or failure
   */
  editUser(userDetails: userDetails): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http.put(apiUrl + `users/${user}`, userDetails, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    }), responseType: "text"}).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Function to delete the current user.  User taken from local storage
   * @returns {statusMessage} Message about success or failure to delete
   */
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

  /**
   * Function to delete a movie.  User parameter is taken from local storage
   * @param {string} movieId
   * @returns {statusMessage} Returns a message about success or failure status
   */
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

  /**
   * Function that will handle any errors that pop up
   * @param error
   * @returns {statusMessage} returns message about the error
   */
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
    const body = res;
    return body || { };
  }
}
