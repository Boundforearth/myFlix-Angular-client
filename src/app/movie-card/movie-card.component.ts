import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatDialog } from "@angular/material/dialog";
import { GenreComponent } from '../genre-component/genre-component.component';
import { DirectorComponent } from '../director-component/director-component.component';
import { SynopsisComponent } from '../synopsis-component/synopsis-component.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreComponent, {
      width: "500px",
      data: {
        genre: genre.Name,
        description: genre.Description,
      }
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorComponent, {
      width: "500px",
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
      data: {
        title: title,
        description: description,
      }
    });
  }

}
