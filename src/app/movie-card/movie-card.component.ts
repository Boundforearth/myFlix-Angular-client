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

  //Get movies from the database
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  //get the users favorites from the database.  Onlt contains movie id's
 getUserFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((results) => {
      //set the favorites to the favorites array
      this.favorites = results.Favorites;
    })
  }

  //return a boolean to determine which icon to use in the HTML.  Pairs with the ng-container and ngIf statements
  favoritedMovie(movieId: any): boolean{
    let favorited: boolean;
    if(this.favorites.includes(movieId)) {
      favorited = true
    } else {
      favorited = false
    }
    return favorited
  }


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
