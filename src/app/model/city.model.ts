export class City {
    id: number;
    title: string;
    content: string;
    lat: string;
    long: string;
    image_url: string;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.lat = data.lat;
        this.long = data.long;
        this.image_url = data.image_url;
    }
}