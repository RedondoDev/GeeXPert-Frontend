import {Component} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-trending',
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {

  games = [
    {
      id: 1,
      name: 'Game 1',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Action', 'Adventure', 'Action', 'Adventure'],
      platforms: ['PC', 'PS5', 'Xbox', 'PSP', 'PSVita', 'Switch', 'Luru', 'gameboy'],
      rating: 4.543223,
      release_date: '2023-01-15'
    },
    {
      id: 2,
      name: 'Game 2',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Terror', 'Adventure'],
      platforms: ['PS2', 'PSP'],
      rating: 3,
      release_date: '2022-11-10'
    },
    {
      id: 3,
      name: 'Game 3',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Action', 'Shooter'],
      platforms: ['PC', 'Xbox'],
      rating: 0,
      release_date: '2021-06-20'
    },
    {
      id: 4,
      name: 'Game 4',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['RPG', 'Adventure'],
      platforms: ['PC', 'PS5'],
      rating: 4.8,
      release_date: '2020-09-05'
    },
    {
      id: 5,
      name: 'Game 5',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Puzzle', 'Adventure'],
      platforms: ['PC', 'Switch'],
      rating: 10,
      release_date: '2019-03-12'
    },
    {
      id: 6,
      name: 'Game 6',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Puzzle', 'Adventure'],
      platforms: ['PC', 'Switch'],
      rating: 3.9,
      release_date: '2018-07-22'
    },
    {
      id: 7,
      name: 'Game 7',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Action', 'Adventure'],
      platforms: ['PC', 'PS5'],
      rating: 4.5,
      release_date: '2017-05-30'
    },
    {
      id: 8,
      name: 'Game 8',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Terror', 'Adventure'],
      platforms: ['PS2', 'PSP'],
      rating: 3,
      release_date: '2016-12-18'
    },
    {
      id: 9,
      name: 'Game 9',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['Action', 'Shooter'],
      platforms: ['PC', 'Xbox'],
      rating: 4.2,
      release_date: '2015-08-14'
    },
    {
      id: 10,
      name: 'Game 10',
      cover: '//images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
      genres: ['RPG', 'Adventure'],
      platforms: ['PC', 'PS5'],
      rating: 4.8,
      release_date: '2014-02-25'
    }
  ];

  isInCollection(gameId: number) {
    return gameId % 2 === 0;
  }

  addQuitToCollection(gameId: number) {
    gameId++;
  }

  formatRating(rating: number): string {
    if (rating === 0) {
      return '0.0';
    } else if (rating === 10) {
      return '10';
    } else {
      return rating.toFixed(1);
    }
  }

}
