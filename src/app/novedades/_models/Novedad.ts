export class Novedad {
    id: number;
    titulo: string;
    contenido: string;
    imagePath: string;
    image: any;
    esPrioritaria: boolean;
    fechaCreacion: Date;

    fillFromJson(json): void {
        this.id = json.id;
        this.titulo = json.titulo;
        this.contenido = json.contenido;
        this.imagePath = json.image_path;
        this.esPrioritaria = Boolean(json.es_prioritaria);
        this.fechaCreacion = json.created_at && new Date(json.created_at);
    }
}
