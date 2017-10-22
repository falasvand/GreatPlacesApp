import { Location } from "./location";

export class Place {
  constructor(public title: string,
              public description: string,
              public rating: number,
              public location: Location,
              public imageUrl: string) {
  }
}
