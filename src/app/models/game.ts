export class Game {

  id: number;
  name: string;
  cover: string;
  genres: string[];
  platforms: string[];
  rating: number;
  first_release_date: number;

  constructor(id: number, name: string, cover: string, genres: string[], platforms: string[], rating: number, first_release_date: number) {
    this.id = id;
    this.name = name;
    this.cover = cover;
    this.genres = genres;
    this.platforms = platforms;
    this.rating = rating;
    this.first_release_date = first_release_date * 1000;
  }

}
