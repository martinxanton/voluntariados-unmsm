export class Volunteering {
  constructor(
    public readonly id: string,
    public title?: string,
    public category?: string,
    public objective?: string,
    public location?: string,
    public tags?: [string]
  ) {}
}
