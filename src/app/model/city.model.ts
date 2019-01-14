export class City {
    id: number;
    title: string;
    content: string;
    lat: string;
    long: string;
    image_url: string;

    constructor(data?: any) {
        this.id = (data) ? data.id: undefined;
        this.title = (data) ? data.title : undefined;
        this.content = (data) ? data.content : undefined;
        this.lat = (data) ? data.lat : undefined;
        this.long = (data) ? data.long : undefined;
        this.image_url = (data) ? data.image_url : undefined;
    }
}