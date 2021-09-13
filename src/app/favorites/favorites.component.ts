import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatDialog } from "@angular/material/dialog";
import { GenreComponent } from '../genre-component/genre-component.component';
import { DirectorComponent } from '../director-component/director-component.component';
import { SynopsisComponent } from '../synopsis-component/synopsis-component.component';

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
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    //load movies and users favorites
    this.getMovies();
    this.getUserFavorites();
  }

  movies: any[] = [];
  user: string | null = localStorage.getItem("user")
  favorites: any[] = [];
  favoritesArray: any[] = [];


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
      this.favorites = results.Favorites;
      //this time run a filter in the resulting array before saving it to the array.
      return this.favoritesFilter();
    })
  }
  

  /**
   * Funtcion that finds what movies movies are in the User's favorites.  
   * Grabs the entire movie data and stores it in a new array
   */
 favoritesFilter(): void {
  this.movies.forEach((movie) => {
    if(this.favorites.includes(movie._id)) {
      //movie pushed if in the users favorites
     this.favoritesArray.push(movie)
     }
   })
 }
 

 /**
  * Function that will delete a movie if it is in a users favorites
  * @param {string} title the movie title provided in favorites.components.html
  * @param {string} id the movie id provided in favorites.components.html
  */
  changeFavoriteStatus(title: string, id: string): void {
    //find the index of the movie to be deleted
    let movieIndex: number = 0;
    for(let i = 0; i < this.favorites.length; i++) {
      if(this.favorites[i] === id) {
        movieIndex = i;
        break;
      }
    }
    //delete the movie based on the received input
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      this.snackBar.open(`The movie ${title} has been deleted from your favorites!`, "OK", {
        duration: 2000
      });
      //splce the arrays based on the received index
    this.favorites.splice(movieIndex, 1);
    this.favoritesArray.splice(movieIndex, 1);
    }, (result) => {
      //When everything burns
      this.snackBar.open(result, "OK", {
        duration: 2000
      })
    }
    
    )
  }

  /**
   * Function to open a dialog displaying Genre information
   * @param {Object} Genre the movie genre provided in favorites.components.html
   * passes data to genre-component.component.ts
   */
  openGenreDialog(genre: Genre): void {
    this.dialog.open(GenreComponent, {
      width: "500px",
      //Data is passed to the Genre Component
      data: {
        genre: genre.Name,
        description: genre.Description,
      }
    });
  }

  /**
   * Function to open a dialog displaying Director information
   * @param {Object}  Director the movie genre provided in favorites.components.html
   * passes data to director-component.component.ts
   */
  openDirectorDialog(director: Director): void {
    this.dialog.open(DirectorComponent, {
      width: "500px",
      //Data is passed to the Director component
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
   * @param {string} title  Takes the movie title provided in favorites.components.html
   * @param {string}  description Takes the description provided in favorites.components.html
   * passes data to synopsis-component.component.ts
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      width: "500px",
      //data is passed to the Synopsis component
      data: {
        title: title,
        description: description,
      }
    });
  }


}
