// TODO: revisar que interests no interfiera
export class User {
  constructor(
    public readonly id: string,
    public major?: string,
    public age?: number,
    public gender?: string,
    public location?: string,
    public interests?: [string]
  ) {}
}
