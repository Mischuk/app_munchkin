export enum Gender {
    Female = 'female',
    Male = 'male',
}

export enum GameStatus {
    Setup,
    Active,
}

export interface iUser {
    name: string;
    gender: Gender;
    bonuses: number;
    level: number;
    image: string;
}

export interface iGame {
    status: GameStatus;
}

export class User implements iUser {
    name = '';
    gender = Gender.Male;
    bonuses = 0;
    level = 1;
    image = '0 0';

    constructor(data?: Partial<iUser>) {
        this.name = data?.name || this.name;
        this.gender = data?.gender || this.gender;
        this.bonuses = data?.bonuses || this.bonuses;
        this.level = data?.level || this.level;
        this.image = data?.image || this.image;
    }
}
