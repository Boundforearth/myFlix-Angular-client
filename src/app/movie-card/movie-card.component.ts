import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatDialog } from "@angular/material/dialog";
import { GenreComponent } from '../genre-component/genre-component.component';
import { DirectorComponent } from '../director-component/director-component.component';
import { SynopsisComponent } from '../synopsis-component/synopsis-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Genre {
  Name: string;
  Description: string;
}

interface Director {
  Name: string;
  Bio: string;
  Birth: string;
  Death?: string;
}

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
 
  movies: any[] = [];
  user: string | null = localStorage.getItem("user")
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

   /**
   * Function to get all movies and put save them to an Type Array variable
   * Movies are all Objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  /**
   * Function to get a user Object and save the Favorites to an array
   */
 getUserFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((results) => {
      //set the favorites to the favorites array
      this.favorites = results.Favorites;
    })
  }

  /**
   * Function to determine which icon to use.  Used with ngIf in movie-card.components.html
   * @param movieId id comes from movie-card.components.html
   * @returns {boolean} 
   */
  favoritedMovie(movieId: any): boolean{
    let favorited: boolean;
    if(this.favorites.includes(movieId)) {
      favorited = true
    } else {
      favorited = false
    }
    return favorited
  }

  /**
  * Function that will add or delete a movie if it is in a users favorites
  * @param {string} title the movie title provided in movie-card.components.html
  * @param {string} id the movie id provided in movie-card.components.html
  */
  changeFavoriteStatus(title: string, id: string): void {
    //variables to determine existance and placement in the array
    let exists: boolean = false;
    let movieIndex: number = 0;
    for(let i = 0; i < this.favorites.length; i++) {
      if(this.favorites[i] === id) {
        //if the movie is found, record the index and existance, then break from the loop
        exists = true;
        movieIndex = i;
        break;
      }
    }
    if(exists) {
      //if the movie is already in the favorites list, delete it using the index from the for loop
      this.fetchApiData.deleteFavorite(id).subscribe((result) => {
        this.snackBar.open(`The movie ${title} has been deleted from your favorites!`, "OK", {
          duration: 2000
        });
      this.favorites.splice(movieIndex, 1);
      console.log(this.favorites);
    }, (results) => {
      //in case something goes wrong
      this.snackBar.open(results, "OK", {
        duration: 2000
      });
    }
    
    )}
    else {
      //if the movie was not found, then add it to the array
      this.fetchApiData.addFavorite(id).subscribe((result) => {
        this.snackBar.open(`The movie ${title} has been added to your favorites!`, "OK", {
          duration: 2000
        });
        this.favorites.push(id);
        console.log(this.favorites);
      }, (results) => {
        //in case something goes wrong
        this.snackBar.open(results, "OK", {
          duration: 2000
        })})
    }
  }

   /**
   * Function to open a dialog displaying Genre information
   * @param {Object} Genre the movie genre provided in movie-card.components.html
   * passes data to genre-component.component.ts
   */
  openGenreDialog(genre: Genre): void {
    this.dialog.open(GenreComponent, {
      width: "500px",
      //data will be passed to the Genre component
      data: {
        genre: genre.Name,
        description: genre.Description,
      }
    });
  }

  /**
   * Function to open a dialog displaying Director information
   * @param {Object}  Director the movie genre provided in movie-card.components.html
   * passes data to director-component.component.ts
   */
  openDirectorDialog(director: Director): void {
    this.dialog.open(DirectorComponent, {
      width: "500px",
      //data will be passed to the Director component
      data: {
        name: director.Name,
        bio: director.Bio,
        birth: director.Birth,
        death: director.Death,
      }
    });
  }

   /**
   * Function to open a dialog displyaing a movies synopsis
   * @param {string} title  Takes the movie title provided in movie-card.components.html
   * @param {string}  description Takes the description provided in movie-card.components.html
   * passes data to synopsis-component.component.ts
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      width: "500px",
      //data will be passed to the Synopsis component
      data: {
        title: title,
        description: description,
      }
    });
  }

}
