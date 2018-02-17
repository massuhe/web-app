export class ItemInventario {

    id: number;
    descripcion: string;
    cantidad: number;
    imagePath: string;
    image: string;

    fillFromJson(json: any): void {
        this.id = json.id;
        this.descripcion = json.descripcion;
        this.cantidad = json.cantidad;
        this.imagePath = json.image_path;
    }

    setImage(image: string): void {
        this.image = image;
    }
}
