export class UserGame {

  name: string;
  state: string;
  userGameId: number;

  constructor(name: string, state: string, userGameId: number) {
    this.name = name;
    this.state = state;
    this.userGameId = userGameId;
  }

}
