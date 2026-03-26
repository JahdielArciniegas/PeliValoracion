interface UserRating {
  userId: string;
  opinion: string;
  rating: number;
}

export interface CoupleMovie {
  id?: any;
  coupleId: string;
  movieId: string;
  movieName: string;
  moviePoster: string;
  rating: UserRating[];
}
