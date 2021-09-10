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


  //Get all movies and save them to an array
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  //Get all user favorites, id's only, and save them to an array
 getUserFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((results) => {
      this.favorites = results.Favorites;
      //this time run a filter in the resulting array before saving it to the array.
      return this.favoritesFilter();
    })
  }
  

  //Run through each movie, if the id is in the user's favorites, push the entire movie object into the favoritesArray
 favoritesFilter(): void {
  this.movies.forEach((movie) => {
    if(this.favorites.includes(movie._id)) {
      //movie pushed if in the users favorites
     this.favoritesArray.push(movie)
     }
   })
 }
 
 //movie will be reomved from favorites and the page upon deletion.
 //Only Movies already favorited displayed, so no need to have the add movie part
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
